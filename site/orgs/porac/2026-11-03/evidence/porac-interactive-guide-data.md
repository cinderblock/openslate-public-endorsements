# Evidence: PORAC — Interactive Voter Guide (embedded data)

- **Source URL**: https://maps.cartifact.com/porac/ (page title "PORAC 2026 Voting Guide"), data file https://maps.cartifact.com/porac/index.js
- **Retrieved**: 2026-10-19T21:41:20Z (curl GET of index.js, 112 MB, with a browser user agent and the guide page as referer; a first try without them got a Mod_Security 406). Records were extracted with a regex over the GeoJSON `"properties"` objects; the `fid` field and the polygon geometry are dropped. Only records with a non-null `Endorsed` value are shown (121 of 737).

## Guide page header (verbatim, from https://maps.cartifact.com/porac/)

```text
Interactive Voter Guide
This tool is designed to help you identify the PORAC endorsed candidates in your area for the upcoming election. Please allow up to a few minutes to load.
```

## Endorsement records (verbatim properties)

```text
"properties": { "District": "AD 1", "Label": "Assembly District 1", "Endorsed": "Heather Hadwick" }
"properties": { "District": "AD 3", "Label": "Assembly District 3", "Endorsed": "Dom Belza" }
"properties": { "District": "AD 5", "Label": "Assembly District 5", "Endorsed": "Joe Patterson" }
"properties": { "District": "AD 6", "Label": "Assembly District 6", "Endorsed": "Maggy Krell" }
"properties": { "District": "AD 7", "Label": "Assembly District 7", "Endorsed": "Josh Hoover" }
"properties": { "District": "AD 9", "Label": "Assembly District 9", "Endorsed": "Heath Flora" }
"properties": { "District": "AD 10", "Label": "Assembly District 10", "Endorsed": "Stephanie Nguyen" }
"properties": { "District": "AD 12", "Label": "Assembly District 12", "Endorsed": "Eric Lucan" }
"properties": { "District": "AD 13", "Label": "Assembly District 13", "Endorsed": "Rhodesia Ransom" }
"properties": { "District": "AD 14", "Label": "Assembly District 14", "Endorsed": "Buffy Wicks" }
"properties": { "District": "AD 15", "Label": "Assembly District 15", "Endorsed": "Annamarie Avila Farias" }
"properties": { "District": "AD 16", "Label": "Assembly District 16", "Endorsed": "Rebecca Bauer-Kahan" }
"properties": { "District": "AD 19", "Label": "Assembly District 19", "Endorsed": "Catherine Stefani" }
"properties": { "District": "AD 21", "Label": "Assembly District 21", "Endorsed": "Diane Papan" }
"properties": { "District": "AD 22", "Label": "Assembly District 22", "Endorsed": "Juan Alanis" }
"properties": { "District": "AD 23", "Label": "Assembly District 23", "Endorsed": "Marc Berman" }
"properties": { "District": "AD 26", "Label": "Assembly District 26", "Endorsed": "Patrick Ahrens" }
"properties": { "District": "AD 27", "Label": "Assembly District 27", "Endorsed": "Brian Pacheco" }
"properties": { "District": "AD 28", "Label": "Assembly District 28", "Endorsed": "Gail Pellerin" }
"properties": { "District": "AD 29", "Label": "Assembly District 29", "Endorsed": "Robert Rivas" }
"properties": { "District": "AD 31", "Label": "Assembly District 31", "Endorsed": "Annalisa Perea" }
"properties": { "District": "AD 32", "Label": "Assembly District 32", "Endorsed": "David Couch" }
"properties": { "District": "AD 33", "Label": "Assembly District 33", "Endorsed": "Alexandra Macedo" }
"properties": { "District": "AD 34", "Label": "Assembly District 34", "Endorsed": "Charles Hughes" }
"properties": { "District": "AD 35", "Label": "Assembly District 35", "Endorsed": "Saul Ayon" }
"properties": { "District": "AD 36", "Label": "Assembly District 36", "Endorsed": "Jeff Gonzalez" }
"properties": { "District": "AD 43", "Label": "Assembly District 43", "Endorsed": "Celeste Rodriguez" }
"properties": { "District": "AD 45", "Label": "Assembly District 45", "Endorsed": "James Ramos" }
"properties": { "District": "AD 47", "Label": "Assembly District 47", "Endorsed": "Greg Wallis" }
"properties": { "District": "AD 48", "Label": "Assembly District 48", "Endorsed": "Blanca Rubio" }
"properties": { "District": "AD 53", "Label": "Assembly District 53", "Endorsed": "Michelle Rodriguez" }
"properties": { "District": "AD 56", "Label": "Assembly District 56", "Endorsed": "Lisa Calderon" }
"properties": { "District": "AD 58", "Label": "Assembly District 58", "Endorsed": "Leticia Castillo" }
"properties": { "District": "AD 59", "Label": "Assembly District 59", "Endorsed": "Phillip Chen" }
"properties": { "District": "AD 60", "Label": "Assembly District 60", "Endorsed": "Ed Delgado" }
"properties": { "District": "AD 63", "Label": "Assembly District 63", "Endorsed": "Natasha Johnson" }
"properties": { "District": "AD 64", "Label": "Assembly District 64", "Endorsed": "Blanca Pacheco" }
"properties": { "District": "AD 65", "Label": "Assembly District 65", "Endorsed": "Ayanna Davis" }
"properties": { "District": "AD 66", "Label": "Assembly District 66", "Endorsed": "Paul Seo" }
"properties": { "District": "AD 68", "Label": "Assembly District 68", "Endorsed": "David Penaloza" }
"properties": { "District": "AD 70", "Label": "Assembly District 70", "Endorsed": "Tri Ta" }
"properties": { "District": "AD 71", "Label": "Assembly District 71", "Endorsed": "Kate Sanchez" }
"properties": { "District": "AD 72", "Label": "Assembly District 72", "Endorsed": "Gracey Van Der Mark" }
"properties": { "District": "AD 73", "Label": "Assembly District 73", "Endorsed": "Cottie Petrie-Norris" }
"properties": { "District": "AD 74", "Label": "Assembly District 74", "Endorsed": "Laurie Davies" }
"properties": { "District": "AD 76", "Label": "Assembly District 76", "Endorsed": "Darshana Patel" }
"properties": { "District": "AD 77", "Label": "Assembly District 77", "Endorsed": "Tasha Boerner" }
"properties": { "District": "AD 80", "Label": "Assembly District 80", "Endorsed": "David Alvarez" }
"properties": { "District": "CD 01", "Label": "Congressional District 01", "Endorsed": "James Gallagher" }
"properties": { "District": "CD 04", "Label": "Congressional District 04", "Endorsed": "Michael Thompson" }
"properties": { "District": "CD 06", "Label": "Congressional District 06", "Endorsed": "Kevin Kiley" }
"properties": { "District": "CD 08", "Label": "Congressional District 08", "Endorsed": "John Garamendi" }
"properties": { "District": "CD 09", "Label": "Congressional District 09", "Endorsed": "Josh Harder" }
"properties": { "District": "CD 13", "Label": "Congressional District 13", "Endorsed": "Adam Gray" }
"properties": { "District": "CD 14", "Label": "Congressional District 14", "Endorsed": "Aisha Wahab" }
"properties": { "District": "CD 18", "Label": "Congressional District 18", "Endorsed": "Zoe Lofgren" }
"properties": { "District": "CD 19", "Label": "Congressional District 19", "Endorsed": "Jimmy Panetta" }
"properties": { "District": "CD 20", "Label": "Congressional District 20", "Endorsed": "Vince Fong" }
"properties": { "District": "CD 21", "Label": "Congressional District 21", "Endorsed": "Jim Costa" }
"properties": { "District": "CD 22", "Label": "Congressional District 22", "Endorsed": "David Valadao" }
"properties": { "District": "CD 23", "Label": "Congressional District 23", "Endorsed": "Jay Obernolte" }
"properties": { "District": "CD 24", "Label": "Congressional District 24", "Endorsed": "Salud Carbajal" }
"properties": { "District": "CD 26", "Label": "Congressional District 26", "Endorsed": "Jacqui Irwin" }
"properties": { "District": "CD 27", "Label": "Congressional District 27", "Endorsed": "Judy Chu" }
"properties": { "District": "CD 33", "Label": "Congressional District 33", "Endorsed": "Pete Aguilar" }
"properties": { "District": "CD 46", "Label": "Congressional District 46", "Endorsed": "Jose Correa" }
"properties": { "District": "CD 47", "Label": "Congressional District 47", "Endorsed": "Dave Min" }
"properties": { "District": "CD 48", "Label": "Congressional District 48", "Endorsed": "Jim Desmond" }
"properties": { "District": "CD 49", "Label": "Congressional District 49", "Endorsed": "Mike Levin" }
"properties": { "District": "CD 50", "Label": "Congressional District 50", "Endorsed": "Scott Peters" }
"properties": { "District": "CD 52", "Label": "Congressional District 52", "Endorsed": "Juan Vargas" }
"properties": { "District": "Capitola City", "Label": "Capitola City (Local)", "Endorsed": "Joe Clarke - Capitola City Council" }
"properties": { "District": "Clovis City", "Label": "Clovis City (Local)", "Endorsed": "Matthew Basgall - Clovis City Council" }
"properties": { "District": "El Cajon City", "Label": "El Cajon City (Local)", "Endorsed": "Chuck Kaye - El Cajon City Council, District 1" }
"properties": { "District": "Fairfield City", "Label": "Fairfield City (Local)", "Endorsed": "Robert Marin - Fairfield City Council, District 3" }
"properties": { "District": "Fresno County", "Label": "Fresno County (Local)", "Endorsed": "Ashley Paulson - Fresno Co Superior Court Judge, District 6" }
"properties": { "District": "Fresno County", "Label": "Fresno County (Local)", "Endorsed": "Mike Karbassi - Fresno Co Supervisor, District 1" }
"properties": { "District": "Governor", "Label": "California", "Endorsed": "Xavier Becerra - Governor" }
"properties": { "District": "Hanford City", "Label": "Hanford City (Local)", "Endorsed": "Victor Chavarin, Jr. - Hanford City Council" }
"properties": { "District": "Hollister City", "Label": "Hollister City (Local)", "Endorsed": "Delores Morales - Hollister City Council" }
"properties": { "District": "Insurance Commissioner", "Label": "California", "Endorsed": "Ben Allen - Insurance Commissioner" }
"properties": { "District": "Kern High", "Label": "Kern High", "Endorsed": "Derek Tisinger - Kern High School District Trustee, Area 1" }
"properties": { "District": "Los Angeles County", "Label": "Los Angeles County (Local)", "Endorsed": "Anthony Bayne - Los Angeles Co Superior Court Judge, Seat 87" }
"properties": { "District": "Los Angeles County", "Label": "Los Angeles County (Local)", "Endorsed": "Robert Luna - Los Angeles Sheriff" }
"properties": { "District": "Lt. Governor", "Label": "California", "Endorsed": "Fiona Ma - California Lt. Governor" }
"properties": { "District": "Morgan Hill City", "Label": "Morgan Hill City (Local)", "Endorsed": "Steven Hayes - Morgan Hill City Council" }
"properties": { "District": "Oakland City", "Label": "Oakland City (Local)", "Endorsed": "Kevin Jenkins - Oakland City Council, District 6" }
"properties": { "District": "Pico Rivera City", "Label": "Pico Rivera City (Local)", "Endorsed": "Genaro Moreno - Pico Rivera City Council, District 38" }
"properties": { "District": "Pinole City", "Label": "Pinole City (Local)", "Endorsed": "Matthew Avery - Pinole City Council, At Large Seat" }
"properties": { "District": "Prop", "Label": "California", "Endorsed": "Prop 40 - Oppose" }
"properties": { "District": "Prop", "Label": "California", "Endorsed": "Prop 42 - Support" }
"properties": { "District": "Prop", "Label": "California", "Endorsed": "Prop 43 - Oppose" }
"properties": { "District": "Prop", "Label": "California", "Endorsed": "Prop 44 - Oppose" }
"properties": { "District": "Prop", "Label": "California", "Endorsed": "Prop 45 - Support" }
"properties": { "District": "SD 6", "Label": "State Senate District 6", "Endorsed": "Roger Niello" }
"properties": { "District": "SD 8", "Label": "State Senate District 8", "Endorsed": "Angelique Ashby" }
"properties": { "District": "SD 10", "Label": "State Senate District 10", "Endorsed": "Scott Sakakihara" }
"properties": { "District": "SD 12", "Label": "State Senate District 12", "Endorsed": "Nathan Magsig" }
"properties": { "District": "SD 14", "Label": "State Senate District 14", "Endorsed": "Esmeralda Soria" }
"properties": { "District": "SD 16", "Label": "State Senate District 16", "Endorsed": "Guillermo Gonzalez" }
"properties": { "District": "SD 18", "Label": "State Senate District 18", "Endorsed": "Steve Padilla" }
"properties": { "District": "SD 22", "Label": "State Senate District 22", "Endorsed": "Susan Rubio" }
"properties": { "District": "SD 24", "Label": "State Senate District 24", "Endorsed": "Brian Goldsmith" }
"properties": { "District": "SD 30", "Label": "State Senate District 30", "Endorsed": "Bob Archuleta" }
"properties": { "District": "SD 32", "Label": "State Senate District 32", "Endorsed": "Kelly Seyarto" }
"properties": { "District": "SD 34", "Label": "State Senate District 34", "Endorsed": "Avelino Valencia" }
"properties": { "District": "SD 36", "Label": "State Senate District 36", "Endorsed": "Tony Strickland" }
"properties": { "District": "SD 38", "Label": "State Senate District 38", "Endorsed": "Catherine Blakespear" }
"properties": { "District": "SD 40", "Label": "State Senate District 40", "Endorsed": "Mara Elliott" }
"properties": { "District": "SPI", "Label": "California", "Endorsed": "Richard Barrera - Superintendent of Public Instruction" }
"properties": { "District": "Sanger City", "Label": "Sanger City (Local)", "Endorsed": "Michael Montelongo - Sanger City Council" }
"properties": { "District": "Santa Clara City", "Label": "Santa Clara City (Local)", "Endorsed": "David Kertes - Santa Clara Mayor" }
"properties": { "District": "Santa Clara City", "Label": "Santa Clara City (Local)", "Endorsed": "Kathy Watanabe - Santa Clara Mayor" }
"properties": { "District": "Santa Clara City", "Label": "Santa Clara City (Local)", "Endorsed": "Kyle Madej - Santa Clara City Council District 3" }
"properties": { "District": "Santa Clara City", "Label": "Santa Clara City (Local)", "Endorsed": "Yvonne Inciarte - Santa Clara City Council District 2" }
"properties": { "District": "Santa Cruz City", "Label": "Santa Cruz City (Local)", "Endorsed": "Ryan Coonerty - Santa Cruz Mayor" }
"properties": { "District": "Santa Monica City", "Label": "Santa Monica City (Local)", "Endorsed": "Lana Negrete - Santa Monica City Council" }
"properties": { "District": "Southern Kern Unified", "Label": "Southern Kern Unified", "Endorsed": "Joel McKay - Southern Kern Unified School District, District 2" }
"properties": { "District": "Supreme Court", "Label": "California", "Endorsed": "NO on the Retention of Justice Kelli Evans" }
"properties": { "District": "Vacaville City", "Label": "Vacaville City (Local)", "Endorsed": "Roy Stockton - Vacaville Mayor" }
"properties": { "District": "Vacaville City", "Label": "Vacaville City (Local)", "Endorsed": "Thomas Chalk - Vacaville City Council, District 2" }
```
