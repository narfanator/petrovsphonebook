const protests = [
   {
      "name":"Standing Rock",
      "jurisdiction": ["United States", "North Dakota", "County", "Collbone"],
      "website": "https://nodaplsolidarity.org",
      "contacts": [
        {"name": "United States",
        "list": [
          { "name": "White House",
            "facebook": "<fb link>",
            "phone": "<phone line>",
            "people":[]
          }
        ]},
        {"name": "North Dakota",
        "list": [
          {"name":"Governer's Office", "facebook":"<fb link>", "phone": "<phone line>", "people":[]},
          {"name": "State Troopers", "facebook":"<fb link>", "phone":"<phone line>", "people":[]},
          {"name":"National Guard", "phone":"<phone line>", "people":[]},
        ]}
      ]
   },
   {
     //TODO: When localizing, also have how jurisdiction list turns into human name - in the US, it's City, State
      "name": "Occupy LA",
      "jurisdiction": ["United States", "California", "Los Angeles", "Los Angeles"],
      "website": "http://occupyla.org/",
      "contacts": [
      ]
    }
];

export default protests;
