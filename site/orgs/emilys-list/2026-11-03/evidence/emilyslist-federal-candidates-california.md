# Evidence: EMILYs List — Federal and Gubernatorial Candidates (California filter)

- **Source URL**: https://emilyslist.org/donate/all-candidates/
- **Retrieved**: 2026-10-19T21:03:46Z (curl GET). The page renders its candidate grid from JSON embedded in the HTML; the same data comes from the site's search API, queried with the California filter: https://emilyslist.org/wp-json/emea/v1/search?state=california&type=all&per_page=100

## API response for state=california (verbatim, image fields removed)

```json
{
 "max": 1,
 "count": 1,
 "page": 1,
 "candidates": [
  {
   "id": 10315,
   "uri": "https://emilyslist.org/candidate/marni-von-wilpert/",
   "title": "Marni von Wilpert",
   "name": "Marni von Wilpert",
   "gateway_id": 70122,
   "position": [
    "U.S. House"
   ],
   "race_priority": [
    "Majority Maker"
   ],
   "state": [
    "California"
   ],
   "election_cycle": [
    "2026"
   ],
   "contribution_limit": 3500,
   "contribution_limit_disclaimer": "Cycle contribution limit is $3,500. ",
   "candidate_blackout": false,
   "candidate_blackout_notice": "This candidate is not currently accepting donations.",
   "election_blackout": 1793865599,
   "candidate_runoff": false,
   "high_dollar_donation_amounts": [
    3500,
    500
   ],
   "isCandidate": true
  }
 ]
}
```

The full embedded list on the page holds 64 federal and gubernatorial candidates; Marni von Wilpert is the only one with state "California".
