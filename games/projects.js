/* ==========================================================================
   Project data. Every case-study page (project.html?p=<slug>) is built from
   this file, so adding or editing a project means editing only this list.

   TO ADD A PROJECT
   1. Copy the "TEMPLATE" object at the bottom of this file into the list.
   2. Give it a unique `slug` (lowercase, hyphens). Its page is project.html?p=<slug>
   3. Drop its images into /images using the file names you set below.
   4. Add a card for it on index.html (link to project.html?p=<slug>).

   Every field except slug, title, type and role is optional. A section only
   appears on the page if you give it content. See the TEMPLATE at the bottom.
   ========================================================================== */

window.PROJECTS = [

  /* ----------------------------------------------------------------------
     GHOSTIE TOWN
     ---------------------------------------------------------------------- */
  {
    slug: "ghostie-town",
    title: "Ghostie Town",
    tagline: "A cozy restoration adventure about fixing up a forgotten town, designed, built and launched solo.",   // used for the page's search description
    type: "Commercial release",
    role: "Solo developer: design, programming, 3D art, VFX, music, sound and marketing",
    facts: [
      ["Role", "Solo developer (everything)"],
      ["Tools", "Unity, C#, Blender, Miro, Git"],
      ["Released", "October 28, 2026"],
      ["Platform", "Steam (Windows, macOS, Linux)"]
    ],
    image: "images/ghostie-town-hero.png",
    imageAlt: "Ghostie Town key art: a small ghost holding a broom on a lantern-lit street",
    embed: {
      src: "https://store.steampowered.com/widget/4206880/", width: 646, height: 190,
      title: "Ghostie Town on Steam",
      linkUrl: "https://store.steampowered.com/app/4206880/Ghostie_Town/", linkText: "Ghostie Town on Steam"
    },

    /* Shown at the top of the page, beside the main image. */
    overview: [
      "In Ghostie Town you play a small ghost on a big mission: fix fences, water plants, sweep streets and help ghostie residents settle in as a forgotten town comes back to life.",
      "I designed, built and launched it alone over 15 months, releasing on Steam on October 28, 2026 with a Halloween theme. So far it has 300+ copies sold, 2,400+ wishlists and 20+ Steam reviews. Below is how I scoped, designed and paced it."
    ],

    /* Each section: text on one side, images on the other (stacked under the text on phones).
       side: "right" or "left" = where the images sit on desktop.
       layout: "stack" (default, images one above the other) or "trio" (one big image left, two stacked right). */
    sections: [
      {
        title: "Production Scope",
        side: "right",
        text: [
          "I started by deciding what the game would not have: no building interiors, hats instead of unique NPC models, no walk cycle and a maximum of four tools. Each limit removed weeks of work, and several became design features. When the player can't pass through objects, the story explains it as the Restoration Prophecy.",
          "Low-poly models with no texturing are fast to build and fast to colour, and a strict 60/30/10 palette of sage green, lavender purple and amber gold keeps the town consistent."
        ],
        images: [
          { src: "images/ghostie-town-content-sketch.jpg", alt: "Sketch of the different pieces of content to model for the game", caption: "Content to model, sketched out before building." },
          { src: "images/ghostie-town-scope-limits.png", alt: "Slide listing the scope limits set for the game", caption: "The scope limits I set before production." }
        ]
      },
      {
        title: "Level Design",
        side: "left",
        text: [
          "The tutorial does the teaching without a wall of text. A blocked path sends you looking for the broom, an NPC nudges you in the right direction, the route takes you behind buildings so you learn to explore, and a trail of coins acts as breadcrumbs."
        ],
        images: [
          { src: "images/ghostie-town-tutorial-1.png", alt: "Tutorial level design, first view", caption: "" },
          { src: "images/ghostie-town-tutorial-2.png", alt: "Tutorial level design, second view", caption: "" }
        ]
      },
      {
        title: "World Design",
        side: "right",
        layout: "trio",
        text: [
          "I sketched the town on paper first, marking the gate, fences, bridges and the dust and webs that block the way. Then I blocked it out in grey boxes, coloured the key buildings, sketched the paths into the terrain and placed progress gates, all before any final art. The finished town is built on that map."
        ],
        images: [
          { src: "images/Ghostie_Town_Map_Sketch.jpg", alt: "Hand-drawn map of the town marking the gate, fences, bridges, dust and webs", caption: "Paper map of the town." },
          { src: "images/early town greyboxing3_annotated.png", alt: "Greybox view of the town with key buildings in colour and paths sketched into the terrain", caption: "Greybox, with key buildings in colour." },
          { src: "images/FinalTownLayout2.png", alt: "The finished town at night with lit windows and lanterns", caption: "The final town layout." }
        ]
      },
      {
        title: "Pacing & Game Balance",
        side: "left",
        text: [
          "In Miro I mapped how each tool unlocks different work and how Town Appeal levels open up the story, with several paths to success. Finishing the game requires every tool, which pulls the player through the whole town.",
          "A spreadsheet models how quickly the player levels up, so the pacing can be tuned with numbers."
        ],
        images: [
          { src: "images/ghostie-town-progression.png", alt: "Miro board mapping tool progression and Town Appeal gates", caption: "Progression map with Town Appeal gates and multiple routes." },
          { src: "images/ghostie-town-leveling-pace.png", alt: "Spreadsheet modelling how fast the player levels up", caption: "Level-up pacing spreadsheet." }
        ]
      }
    ],

    gallery: [
      { src: "images/ghostie-town-screen-1.png", alt: "Ghostie Town gameplay screenshot", caption: "" },
      { src: "images/ghostie-town-screen-2.png", alt: "Ghostie Town gameplay screenshot", caption: "" },
      { src: "images/ghostie-town-screen-3.png", alt: "Ghostie Town gameplay screenshot", caption: "" }
    ],

    takeaways: [
      "Decide your constraints before you start, then turn them into features.",
      "Show the game publicly early. The first reel proved the low-poly look appealed before the game was finished.",
      "Playtests changed a core interaction. Watch what people do, not just what they say."
    ]

    /* UNUSED COPY from the earlier version, in case you want it in the body later
       (Instagram: https://instagram.com/ghostie_town  TikTok: https://www.tiktok.com/@ghostie_town/):
       - Playtest and polish: Virtual playtests showed that object selection felt wrong: with a simple trigger box the last object entered was selected, so players had to approach head-on. I replaced it with a list of nearby objects ranked by angle and distance. Small touches like dust particles and a trash-shake animation made repetitive chores satisfying.
       - Market while building: Marketing ran alongside development, not after it. I posted on Instagram and TikTok for a year, and the first dev reel earned 4,000+ views with under 20 followers. I manned a booth at a consumer trade show, ran virtual playtests, took part in Steam Next Fest and co-promoted through bundles with other developers. Between 4 and 6 streamers played the game.
       - Launch on the date I promised: I committed to a Halloween-themed launch and hit it, with Steam achievements and the store page ready on day one.
       - Set a visual direction early: AI-generated concept images were used only as mood references (night time, low-poly, isometric, lavender and sage). Everything in the game was modelled and built by me.
    */
  },

  /* ----------------------------------------------------------------------
     ACORN ISLAND
     ---------------------------------------------------------------------- */
  {
    slug: "acorn-island",
    title: "Acorn Island",
    tagline: "Collect acorns on a procedurally generated island dotted with mysterious ruins.",
    type: "Personal project",
    role: "Everything: design, programming, 3D art, rigging, music and sound",
    facts: [
      ["Role", "Solo developer (everything)"],
      ["Tools", "Unity, C#, Blender"],
      ["Platform", "itch.io"]
    ],
    image: "images/acorn-island.png",
    imageAlt: "A squirrel exploring a low-poly island with trees and water",
    embed: { src: "https://itch.io/embed/1747995", width: 552, height: 167, title: "Acorn Island by jshanneson", linkUrl: "https://jshanneson.itch.io/acorn-island", linkText: "Acorn Island by jshanneson" },

    overview: [
      "This is a short game where you collect acorns on a procedurally generated island. There are ruins scattered throughout the islands that add some mystery to the island origins.",
      "I built it end to end: concept, terrain, character, gameplay, music and sound."
    ],

    highlights: [
      "Procedural terrain generation shapes the island",
      "Randomized placement of gameplay items so every playthrough differs",
      "Ruins scattered across the islands hint at where they came from"
    ],

    sections: [
      {
        title: "Colour concept",
        text: ["I started from a colour concept, collecting autumn reference photos into a palette of warm oranges against deep blues, then carried it into the low-poly trees, sand and water."]
      },
      {
        title: "Procedural terrain generation",
        text: ["Rather than sculpting the island by hand, I generate the terrain procedurally, so the landscape can change from run to run. Trees, ruins and other scenery are placed on top of it."]
      },
      {
        title: "Randomized item placement",
        text: ["Gameplay items such as acorns are scattered at random across the island, so no two playthroughs follow the same route."]
      },
      {
        title: "A playable character",
        text: ["The squirrel is modelled and rigged in Blender, then brought into the game as the player character."]
      }
    ]
    /* Add more detail here: how the terrain algorithm works, what you'd change next,
       and a gallery of screenshots (see the TEMPLATE object at the bottom). */
  },

  {
    slug: "invending-doom",
    title: "Invending Doom",
    tagline: "Pay a mysterious vending machine with the right item, or face its wrath.",
    type: "Game jam",
    role: "3D modeling and sound design, producing game-ready assets in Godot",
    facts: [
      ["Role", "3D modeling, sound design"],
      ["Tools", "Godot, Blender"],
      ["Format", "Game jam"]
    ],
    image: "images/invending-doom.png",
    imageAlt: "Invending Doom screenshot",
    embed: { src: "https://itch.io/embed/5064816", width: 552, height: 167, title: "INVENDING DOOM by jshanneson", linkUrl: "https://jshanneson.itch.io/invending-doom", linkText: "INVENDING DOOM by jshanneson" },
    overview: [
      "Play as a dinosaur collecting items as payment for a mysterious vending machine. Find the right item, and you will enjoy sodas with your friends! Bring back the wrong item... and face the wrath of the machine.",
      "My part: I made the 3D models and the sound design, and prepared the assets so they dropped straight into Godot ready to use."
    ],
    highlights: [
      "Built game-ready 3D assets for Godot",
      "Designed the game's sound"
    ]
  },

  /* ----------------------------------------------------------------------
     GAME JAMS
     ---------------------------------------------------------------------- */
  {
    slug: "a-crabby-adventure",
    title: "A Crabby Adventure",
    tagline: "A crab wants some sunshine, and the ocean is full of things that pop.",
    type: "Game jam",
    role: "Level design, 2D art and 3D art",
    facts: [
      ["Role", "Level design, 2D art, 3D art"],
      ["Format", "Game jam"]
    ],
    image: "images/a-crabby-adventure.png",
    imageAlt: "A Crabby Adventure screenshot",
    embed: { src: "https://itch.io/embed/3275604", width: 552, height: 167, title: "A Crabby Adventure by BitShaper, Aiden CC, jshanneson, Purrding", linkUrl: "https://bitshaper.itch.io/a-crabby-adventure", linkText: "A Crabby Adventure by BitShaper, Aiden CC, jshanneson, Purrding" },
    overview: [
      "This crab doesn't think it is better down where it's wetter, and wants to go catch some sunshine up on the beach!",
      "These waters are full of dangers! Don't let Bubbles get too close to the ocean mines or else the bubble won't be the only thing that pops! Be sure to stay clear of any scared pufferfish and spikes that lie in the ocean, one touch and you're out!",
      "Bubbles in a bubble! Our awesome crab Bubbles will have to find ocean vents to surround him with his most favorite thing in the ocean. BUBBLES!!! These bubbles will keep Bubbles safe throughout his journey and help him navigate to his destination. To pop the bubbles you will need to come into contact with spikes or pufferfish, but once Bubbles is out don't let him run into it again!!",
      "Now no more stalling! Pop pop and away!",
      "My part: I designed the levels and created the 2D and 3D art."
    ],
    highlights: [
      "Designed and built the levels",
      "Produced 2D and 3D art under jam time pressure"
    ]
  },

  {
    slug: "hive",
    title: "HIVE",
    tagline: "Lead your colony as an ant warrior and conquer rival hives.",
    type: "Game jam",
    role: "Enemy movement programming (nav mesh) and music",
    facts: [
      ["Role", "Programming, music"],
      ["Format", "Game jam, team project"]
    ],
    image: "images/hive.png",
    imageAlt: "HIVE screenshot of an ant invading a hive",
    embed: { src: "https://itch.io/embed/2537110", width: 552, height: 167, title: "HIVE by Achyuthsr, hl__ur, ReignyRen, jshanneson", linkUrl: "https://achyuthsr.itch.io/hive", linkText: "HIVE by Achyuthsr, hl__ur, ReignyRen, jshanneson" },
    overview: [
      "A thrilling and action-packed game where players take on the role of an ant warrior, navigating through intricate hive structures to invade and conquer rival ant colonies. Strategize and engage in fast-paced battles as you lead your colony to victory, overcoming obstacles and adversaries along the way. Will you rise as the ultimate ruler of the Hive or fall to the might of your enemies?",
      "My part: I programmed how the enemies move around the world using a nav mesh, and composed the music."
    ],
    highlights: [
      "Enemy movement built on nav mesh pathfinding",
      "Original music for the game"
    ]
  },

  {
    slug: "jam-jar-lid",
    title: "Jam Jar Lid",
    tagline: "You are a jar of jam, and you lost your lid.",
    type: "Game jam",
    role: "3D art, programming and level design",
    facts: [
      ["Role", "3D art, programming, level design"],
      ["Format", "Game jam"],
      ["Platform", "Browser"]
    ],
    image: "images/jam-jar-lid.png",
    imageAlt: "Jam Jar Lid screenshot",
    embed: { src: "https://itch.io/embed/1729003", width: 552, height: 167, title: "Jam Jar Lid by jshanneson", linkUrl: "https://jshanneson.itch.io/jam-jar-lid", linkText: "Jam Jar Lid by jshanneson" },
    overview: [
      "You are a jar of jam... but you lost your jam jar lid! Better go find it...",
      "My part: I covered the 3D art, the programming and the level design. It plays right in the browser."
    ],
    highlights: [
      "Playable in the browser with no install",
      "Art, code and level design by one person on a jam schedule"
    ]
  }


  /* ----------------------------------------------------------------------
     TEMPLATE: copy this into the list above for a new project.
     Delete any field you don't need.

  ,{
    slug: "my-new-game",
    title: "My New Game",
    tagline: "One sentence on what it is (used for the page's search description).",
    type: "Game jam",                       // e.g. Commercial release, Personal project, Game jam
    role: "What you did, in one line",
    facts: [["Role", "..."], ["Tools", "..."], ["Team", "4 people"]],
    image: "images/my-new-game.png",        // main image, top right on desktop
    imageAlt: "Describe the image",
    embed: { src: "https://itch.io/embed/123456", width: 552, height: 167, title: "My New Game on itch.io",
             linkUrl: "https://...", linkText: "My New Game on itch.io" },   // shown under the main image
    overview: ["Paragraph one (shown at the top, left of the image).", "Paragraph two."],
    highlights: ["Short bullet", "Short bullet"],       // optional; shown as a "Highlights" list
    sections: [                                         // optional; text on one side, images on the other
      { title: "Section title", side: "right",          // side = where the images sit on desktop: "right" or "left"
        layout: "stack",                                // "stack" (default) or "trio" (one big image, two stacked)
        text: ["Paragraph one.", "Paragraph two."],
        images: [{ src: "images/step.png", alt: "...", caption: "..." }] }
    ],
    gallery: [{ src: "images/shot-1.png", alt: "...", caption: "..." }],
    takeaways: ["Lesson one", "Lesson two"]
  }
  ---------------------------------------------------------------------- */
];
