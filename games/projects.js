/* ==========================================================================
   Project data. Every case-study page (project.html?p=<slug>) is built from
   this file, so adding or editing a project means editing only this list.

   TO ADD A PROJECT
   1. Copy the "TEMPLATE" object at the bottom of this file into the list.
   2. Give it a unique `slug` (lowercase, hyphens). Its page is project.html?p=<slug>
   3. Drop its images into /images using the file names you set below.
   4. Add a card for it on index.html (link to project.html?p=<slug>).

   Every field except slug, title, type and role is optional. A section only
   appears on the page if you give it content.
   ========================================================================== */

window.PROJECTS = [

  /* ----------------------------------------------------------------------
     GHOSTIE TOWN
     ---------------------------------------------------------------------- */
  {
    slug: "ghostie-town",
    title: "Ghostie Town",
    tagline: "A cozy restoration adventure about fixing up a forgotten town, designed, built and launched solo.",
    type: "Commercial release",
    role: "Solo developer: design, programming, 3D art, VFX, music, sound and marketing",
    facts: [
      ["Role", "Solo developer (everything)"],
      ["Tools", "Unity, C#, Blender, Miro, Git"],
      ["Timeline", "15 months"],
      ["Released", "October 28, 2026"],
      ["Platform", "Steam (Windows, macOS, Linux)"]
    ],
    links: [
      { label: "Play on Steam", url: "https://store.steampowered.com/app/4206880/Ghostie_Town/", primary: true },
      { label: "Instagram", url: "https://instagram.com/ghostie_town" },
      { label: "TikTok", url: "https://www.tiktok.com/@ghostie_town/" }
    ],
    image: "images/ghostie-town-hero.png",
    imageAlt: "Ghostie Town key art: a small ghost holding a broom on a lantern-lit street",

    overview: [
      "In Ghostie Town you play a small ghost on a big mission: fix fences, water plants, sweep streets and help ghostie residents settle in as a forgotten town comes back to life.",
      "I made it alone over 15 months and launched it on Steam on October 28, 2026, with a Halloween theme. This page walks through how I scoped, designed, marketed and shipped it."
    ],

    results: [
      { value: "15", label: "months, solo development" },
      { value: "300+", label: "copies sold" },
      { value: "2,400+", label: "Steam wishlists" },
      { value: "20+", label: "Steam reviews" }
    ],

    process: [
      {
        title: "Scope on purpose",
        text: "I started by deciding what the game would not have: no building interiors, hats instead of unique NPC models, no walk cycle and a maximum of four tools. Each limit removed weeks of work, and several became design features. When the player can't pass through objects, the story explains it as the Restoration Prophecy."
      },
      {
        title: "Make it cheap to look good",
        text: "Low-poly models with no texturing are fast to build and fast to colour. A strict 60/30/10 palette of sage green, lavender purple and amber gold keeps the town consistent, with warm lit windows and lamps pulling the eye through the night-time scenes.",
        image: "images/ghostie-town-lowpoly.png",
        imageAlt: "Low-poly Blender models of a house, bench, bridge and ghost next to the finished in-engine scene",
        caption: "Simple untextured models in Blender, then the finished scene in Unity."
      },
      {
        title: "Set a visual direction early",
        text: "I used AI-generated concept images only as mood references (night time, low-poly, isometric, lavender and sage). Everything in the game itself was modelled and built by me in Blender and Unity."
      },
      {
        title: "Greybox and map the progression",
        text: "Before any final art I blocked out the town in grey boxes, coloured the key buildings and placed progress gates. In Miro I mapped how each tool unlocks different work and how Town Appeal levels open up the story, with several paths to success. Finishing the game requires every tool, which pulls the player through the whole town.",
        image: "images/ghostie-town-greybox.png",
        imageAlt: "Greybox view of the town with red progress gates and coloured key buildings",
        caption: "Greybox town with progress gates, before final art."
      },
      {
        title: "Teach through level design",
        text: "The tutorial does the teaching without a wall of text. A blocked path sends you looking for the broom, an NPC nudges you in the right direction, the route takes you behind buildings so you learn to explore, and a trail of coins acts as breadcrumbs."
      },
      {
        title: "Playtest and polish",
        text: "Virtual playtests showed that object selection felt wrong: with a simple trigger box the last object entered was selected, so players had to approach head-on. I replaced it with a list of nearby objects ranked by angle and distance. Small touches like dust particles and a trash-shake animation made repetitive chores satisfying.",
        image: "images/ghostie-town-progression.png",
        imageAlt: "Miro board mapping tool progression and Town Appeal gates",
        caption: "Progression map with Town Appeal gates and multiple routes."
      },
      {
        title: "Market while building",
        text: "Marketing ran alongside development, not after it. I posted on Instagram and TikTok for a year, and the first dev reel earned 4,000+ views with under 20 followers. I manned a booth at a consumer trade show, ran virtual playtests, took part in Steam Next Fest and co-promoted through bundles with other developers. Between 4 and 6 streamers played the game."
      },
      {
        title: "Launch on the date I promised",
        text: "I committed to a Halloween-themed launch and hit it, with Steam achievements and the store page ready on day one."
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
    links: [
      { label: "Play on itch.io", url: "https://jshanneson.itch.io/", primary: true } /* TODO: direct game URL */
    ],
    image: "images/acorn-island.png",
    imageAlt: "A squirrel exploring a low-poly island with trees and water",

    overview: [
      "This is a short game where you collect acorns on a procedurally generated island. There are ruins scattered throughout the islands that add some mystery to the island origins.",
      "I built it end to end: concept, terrain, character, gameplay, music and sound."
    ],

    highlights: [
      "Procedural terrain generation shapes the island",
      "Randomized placement of gameplay items so every playthrough differs",
      "Ruins scattered across the islands hint at where they came from"
    ],

    process: [
      {
        title: "Colour concept",
        text: "I started from a colour concept, collecting autumn reference photos into a palette of warm oranges against deep blues, then carried it into the low-poly trees, sand and water."
      },
      {
        title: "Procedural terrain generation",
        text: "Rather than sculpting the island by hand, I generate the terrain procedurally, so the landscape can change from run to run. Trees, ruins and other scenery are placed on top of it."
      },
      {
        title: "Randomized item placement",
        text: "Gameplay items such as acorns are scattered at random across the island, so no two playthroughs follow the same route."
      },
      {
        title: "A playable character",
        text: "The squirrel is modelled and rigged in Blender, then brought into the game as the player character."
      }
    ]
    /* Add more detail here: how the terrain algorithm works, what you'd change next,
       and a gallery of screenshots (see the TEMPLATE object at the bottom). */
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
    links: [
      { label: "View on itch.io", url: "https://jshanneson.itch.io/", primary: true } /* TODO: direct game URL */
    ],
    image: "images/a-crabby-adventure.png",
    imageAlt: "A Crabby Adventure screenshot",
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
    links: [
      { label: "View on itch.io", url: "https://jshanneson.itch.io/", primary: true } /* TODO: direct game URL */
    ],
    image: "images/invending-doom.png",
    imageAlt: "Invending Doom screenshot",
    overview: [
      "Play as a dinosaur collecting items as payment for a mysterious vending machine. Find the right item, and you will enjoy sodas with your friends! Bring back the wrong item... and face the wrath of the machine.",
      "My part: I made the 3D models and the sound design, and prepared the assets so they dropped straight into Godot ready to use."
    ],
    highlights: [
      "Built game-ready 3D assets for Godot",
      "Designed the game's sound"
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
    links: [
      { label: "Play in browser", url: "https://jshanneson.itch.io/", primary: true } /* TODO: direct game URL */
    ],
    image: "images/jam-jar-lid.png",
    imageAlt: "Jam Jar Lid screenshot",
    overview: [
      "You are a jar of jam... but you lost your jam jar lid! Better go find it...",
      "My part: I covered the 3D art, the programming and the level design. It plays right in the browser."
    ],
    highlights: [
      "Playable in the browser with no install",
      "Art, code and level design by one person on a jam schedule"
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
    links: [
      { label: "View on itch.io", url: "https://jshanneson.itch.io/", primary: true } /* TODO: direct game URL */
    ],
    image: "images/hive.png",
    imageAlt: "HIVE screenshot of an ant invading a hive",
    overview: [
      "A thrilling and action-packed game where players take on the role of an ant warrior, navigating through intricate hive structures to invade and conquer rival ant colonies. Strategize and engage in fast-paced battles as you lead your colony to victory, overcoming obstacles and adversaries along the way. Will you rise as the ultimate ruler of the Hive or fall to the might of your enemies?",
      "My part: I programmed how the enemies move around the world using a nav mesh, and composed the music."
    ],
    highlights: [
      "Enemy movement built on nav mesh pathfinding",
      "Original music for the game"
    ]
  }

  /* ----------------------------------------------------------------------
     TEMPLATE: copy this into the list above for a new project.
     Delete any field you don't need.

  ,{
    slug: "my-new-game",
    title: "My New Game",
    tagline: "One sentence on what it is.",
    type: "Game jam",                       // e.g. Commercial release, Personal project, Game jam
    role: "What you did, in one line",
    facts: [["Role", "..."], ["Tools", "..."], ["Timeline", "48 hours"], ["Team", "4 people"]],
    links: [{ label: "Play on itch.io", url: "https://...", primary: true }],
    image: "images/my-new-game.png",
    imageAlt: "Describe the image",
    overview: ["Paragraph one.", "Paragraph two."],
    highlights: ["Short bullet", "Short bullet"],
    results: [{ value: "48h", label: "jam time limit" }],
    process: [
      { title: "Step title", text: "What you did and why.",
        image: "images/step.png", imageAlt: "...", caption: "..." }
    ],
    gallery: [{ src: "images/shot-1.png", alt: "...", caption: "..." }],
    takeaways: ["Lesson one", "Lesson two"]
  }
  ---------------------------------------------------------------------- */
];
