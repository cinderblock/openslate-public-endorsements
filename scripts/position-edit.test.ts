import { describe, expect, test } from "bun:test";
import { editPositionText, editPositions } from "./position-edit";

const file = (nl: string) =>
  [
    "{",
    '  "positions": [',
    "    {",
    '      "subject": { "title": "Mayor", "jurisdiction": "us/ca/x" },',
    '      "stance": "endorse",',
    '      "choice": "Don Wagner",',
    '      "statement": "Yes."',
    "    },",
    "    {",
    '      "subject": { "title": "Mayor" },',
    '      "stance": "endorse",',
    '      "choice": "Shirley Weber"',
    "    }",
    "  ]",
    "}",
  ].join(nl);

describe("editPositions", () => {
  test("respells and adds an id after the choice, on its own line", () => {
    const { text, failed } = editPositions(file("\n"), [
      { index: 0, choice: "Donald P. (Don) Wagner", choiceId: "x:wagner" },
    ]);
    expect(failed).toEqual([]);
    expect(text).toContain(
      '      "choice": "Donald P. (Don) Wagner",\n      "choice_id": "x:wagner",\n      "statement": "Yes."',
    );
    expect(JSON.parse(text).positions[0].choice_id).toBe("x:wagner");
  });

  test("adds an id after a choice that ends the object", () => {
    const { text } = editPositions(file("\n"), [{ index: 1, choiceId: "x:weber" }]);
    expect(JSON.parse(text).positions[1]).toMatchObject({
      choice: "Shirley Weber",
      choice_id: "x:weber",
    });
  });

  test("keeps CRLF files CRLF", () => {
    const { text } = editPositions(file("\r\n"), [{ index: 0, choiceId: "x:wagner" }]);
    expect(text).toContain('"choice": "Don Wagner",\r\n      "choice_id": "x:wagner",\r\n');
    expect(text.replace(/\r\n/g, "")).not.toContain("\n");
  });

  test("replaces an id that's there, and sets or removes write_in", () => {
    const once = editPositions(file("\n"), [{ index: 0, choiceId: "x:old", writeIn: true }]).text;
    const twice = editPositions(once, [{ index: 0, choiceId: "x:new" }]).text;
    expect(JSON.parse(twice).positions[0]).toMatchObject({ choice_id: "x:new", write_in: true });
    const removed = editPositions(twice, [{ index: 0, writeIn: false, choiceId: null }]).text;
    expect(JSON.parse(removed).positions[0]).toEqual({
      subject: { title: "Mayor", jurisdiction: "us/ca/x" },
      stance: "endorse",
      choice: "Don Wagner",
      statement: "Yes.",
    });
  });

  test("a position without a choice, or past the end, is reported, not edited", () => {
    const text = '{ "positions": [ { "subject": { "title": "Prop 1" }, "stance": "oppose" } ] }';
    expect(
      editPositions(text, [
        { index: 0, choiceId: "x" },
        { index: 3, choiceId: "y" },
      ]),
    ).toEqual({
      text,
      failed: [0, 3],
    });
  });

  test("one-line objects get the id inline", () => {
    expect(editPositionText('{ "choice": "A", "stance": "endorse" }', { choiceId: "x:a" })).toBe(
      '{ "choice": "A", "choice_id": "x:a", "stance": "endorse" }',
    );
  });
});
