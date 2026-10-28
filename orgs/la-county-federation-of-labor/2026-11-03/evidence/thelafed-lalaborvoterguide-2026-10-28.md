# Evidence: LA Fed voter guide page, re-fetch of 2026-10-28 (page 7 re-check, new PDF links)

- **Source URL**: https://thelafed.org/resource/lalaborvoterguide/
- **Retrieved**: 2026-10-28T16:08:57Z (curl GET with a browser User-Agent; HTML converted to text with a stdlib HTML-to-text script; guide images re-downloaded with GET at 2026-10-28T16:09–16:10Z, since HEAD requests now return 404 for every upload)
- **WP record**: `/wp-json/wp/v2/resource?slug=lalaborvoterguide` (id 4345) reports `"modified_gmt":"2026-10-22T20:49:59"`. The 10-22 edit added two Google Drive links (an English PDF of the guide and a Spanish one); the embedded images are unchanged.
- **Result: no new, changed or removed positions. The "missing page 7" gap is closed:** the LA Fed's own PDF of the guide has nine pages, and they are exactly the nine embedded images (see `lafed-voter-guide-pdf-2026-10-28.md`). There is no page 7; the image file names just skip the number.

## Page text (verbatim; nav/footer stripped; link targets in brackets; `-791x1024` are WordPress thumbnails of the full-size images listed below)

```text
#  2026 Midterm Election: LA County Federation of Labor Endorsements

The Los Angeles County Federation of Labor supports initiatives and leaders that address the urgent concerns of our community. The candidates below are the best choices for working people in the upcoming 2026 election!

Questions? Contact Michael Contreras at michael@thelafed.org [mailto:michael@thelafed.org].

[img alt="" src=https://thelafed.org/app/uploads/2026/10/Political-Season-2026_Website-Page-Icons-8.5-x-11-in-791x1024.png] [https://drive.google.com/file/d/17Qd-dBCdZdi7LjmEHbVmLca-mlfQ8ENC/view?usp=sharing]

BAJA LA GUÍA DE VOTACIONES EN ESPAÑOL AQUÍ [https://drive.google.com/file/d/1kyo4XAaV3adtLGj0QVXitZkZECChc4yX/view?usp=sharing]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-1-791x1024.png]

## NOVEMBER 2026 MIDTERM ELECTION VOTER GUIDE:

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-1-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-2-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-3-1-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-4-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-5-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-6-1-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-8-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-9-791x1024.jpg]

[img alt="" src=https://thelafed.org/app/uploads/2026/10/LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-1-791x1024.jpg]
```

## Full-size guide images (GET, 2026-10-28), `Last-Modified` header

```text
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-1.png          Wed, 07 Oct 2026 20:49:28 GMT   ("CRITICAL UNION VOTES" card)
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-1.jpg          Fri, 02 Oct 2026 00:41:19 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-2.jpg          Fri, 02 Oct 2026 00:41:31 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-3-1-scaled.jpg Thu, 08 Oct 2026 20:31:14 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-4.jpg          Fri, 02 Oct 2026 00:41:48 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-5.jpg          Fri, 02 Oct 2026 00:41:59 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-6-1.jpg        Mon, 05 Oct 2026 18:23:25 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-8.jpg          Fri, 02 Oct 2026 00:42:48 GMT
LA-FED-MIDTERM-2026-ENDORSEMENT-GUIDE-9.jpg          Fri, 02 Oct 2026 00:43:06 GMT
```

Same files and dates as on 2026-10-19, so the 2026-10-15 transcriptions (`lafed-guide-*.md`) are current.

## Other checks (2026-10-28)

- `...-GUIDE-7.jpg`, `-7-1.jpg`, `-7-2.jpg`, `-7-scaled.jpg`, `-7-1-scaled.jpg` and `-10.jpg`: 404.
- WP media IDs 4834 and 4837: still 401 (unpublished).
- WP media list, newest uploads: `APPROVED-V2.png` (2026-10-22, an "MLK Day 2027" breakfast flyer) and `unnamed-45.jpg` (2026-10-22, a "No Robo Bosses" rally photo at LA City Hall). Both opened; neither has endorsements.
