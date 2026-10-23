// Edit positions.json files as text, so their formatting survives: find the n-th position by
// walking the top-level "positions" array, then set its choice, choice_id and write_in.

export interface ChoiceEdit {
  /** The new `subject.title`; absent leaves it. */
  title?: string;
  /** The new `subject.jurisdiction`; absent leaves it. */
  jurisdiction?: string;
  /** The new `choice`; absent leaves it. */
  choice?: string;
  /** The new `choice_id`; `null` removes it, absent leaves it. */
  choiceId?: string | null;
  /** `true` sets `write_in`, `false` removes it, absent leaves it. */
  writeIn?: boolean;
}

/** [start, end) of the index-th object in the file's top-level "positions" array. */
export function positionSpan(text: string, index: number): [number, number] | undefined {
  const m = /"positions"\s*:\s*\[/.exec(text);
  let i = m ? m.index + m[0].length : text.indexOf("[") + 1;
  if (i <= 0) return undefined;
  let n = -1;
  let depth = 0;
  let start = 0;
  let inString = false;
  for (; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (c === "\\") i++;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === "{" || c === "[") {
      if (depth === 0 && c === "{" && ++n === index) start = i;
      depth++;
    } else if (c === "}" || c === "]") {
      if (depth === 0) return undefined; // end of the positions array
      depth--;
      if (depth === 0 && n === index) return [start, i + 1];
    }
  }
  return undefined;
}

const STRING = String.raw`"(?:[^"\\]|\\.)*"`;
const property = (key: string, value: string) => new RegExp(`"${key}"\\s*:\\s*${value}`);

/**
 * Apply an edit to one position object's text. Its own properties sit at depth 1; `choice`,
 * `choice_id` and `write_in` appear nowhere deeper (subjects don't have them), so a plain match
 * inside the object is safe. Returns undefined when the position has no `choice` to anchor on.
 */
export function editPositionText(body: string, edit: ChoiceEdit): string | undefined {
  const choiceRe = new RegExp(`("choice"\\s*:\\s*)(${STRING})`);
  if (!choiceRe.test(body)) return undefined;
  let out = body;
  if (edit.title !== undefined) {
    // The subject's title: the only "title" key in a position.
    const titleRe = new RegExp(`("title"\\s*:\\s*)(${STRING})`);
    if (!titleRe.test(out)) return undefined;
    out = out.replace(titleRe, (_, key: string) => key + JSON.stringify(edit.title));
  }
  if (edit.jurisdiction !== undefined) {
    // The subject's jurisdiction; added after its title when the subject has none.
    const jurisdictionRe = new RegExp(`("jurisdiction"\\s*:\\s*)(${STRING})`);
    if (jurisdictionRe.test(out))
      out = out.replace(
        jurisdictionRe,
        (_, key: string) => key + JSON.stringify(edit.jurisdiction),
      );
    else
      out = out.replace(
        new RegExp(`("title"\\s*:\\s*${STRING})`),
        (m: string) => `${m}, "jurisdiction": ${JSON.stringify(edit.jurisdiction)}`,
      );
  }
  if (edit.choice !== undefined)
    out = out.replace(choiceRe, (_, key: string) => key + JSON.stringify(edit.choice));

  const set = (key: string, value: string | null, valuePattern: string) => {
    const existing = new RegExp(`("${key}"\\s*:\\s*)${valuePattern}`);
    if (value === null) {
      // Drop the property and the comma that joins it to a neighbour.
      out = out
        .replace(new RegExp(`,\\s*${property(key, valuePattern).source}`), "")
        .replace(new RegExp(`${property(key, valuePattern).source}\\s*,\\s*`), "");
      return;
    }
    if (existing.test(out)) {
      out = out.replace(existing, (_, k: string) => k + value);
      return;
    }
    // Insert after `choice`, on its own line with the same indent when it has one.
    const m = new RegExp(`("choice"\\s*:\\s*${STRING})`).exec(out);
    if (!m) return;
    const lineStart = out.lastIndexOf("\n", m.index) + 1;
    const lead = out.slice(lineStart, m.index);
    const newline = out[lineStart - 2] === "\r" ? "\r\n" : "\n";
    const sep = /^\s*$/.test(lead) ? `,${newline}${lead}` : ", ";
    const at = m.index + m[0].length;
    out = `${out.slice(0, at)}${sep}"${key}": ${value}${out.slice(at)}`;
  };

  if (edit.choiceId !== undefined)
    set("choice_id", edit.choiceId === null ? null : JSON.stringify(edit.choiceId), STRING);
  if (edit.writeIn !== undefined) set("write_in", edit.writeIn ? "true" : null, "true");
  return out;
}

/** Apply edits to a positions.json text by position index. Returns the text and the indexes it couldn't edit. */
export function editPositions(
  text: string,
  edits: Array<{ index: number } & ChoiceEdit>,
): { text: string; failed: number[] } {
  let out = text;
  const failed: number[] = [];
  for (const edit of edits) {
    const span = positionSpan(out, edit.index);
    const body = span && out.slice(span[0], span[1]);
    const edited = body ? editPositionText(body, edit) : undefined;
    if (!span || edited === undefined) {
      failed.push(edit.index);
      continue;
    }
    out = out.slice(0, span[0]) + edited + out.slice(span[1]);
  }
  return { text: out, failed };
}

/**
 * The positions.json files git tracks. `--apply` edits only these: an untracked bundle is
 * someone's work in progress, theirs to fix.
 */
export async function trackedBundles(): Promise<Set<string>> {
  const out = await Bun.$`git ls-files -- "orgs/*/*/positions.json"`.quiet().text();
  return new Set(out.split(/\r?\n/).filter(Boolean));
}
