SharkGame.HomeActions = {

    // FREEBIES ////////////////////////////////////////////////////////////////////////////////

    'catchFish': {
        name: "Catch fish",
        effect: {
            resource: {
                'fish': 1
            }
        },
        cost: {},
        prereq: {
            // no prereqs
        },
        outcomes: [
            "Ate a tuna.",
            "Ate a mackerel.",
            "Ate a kipper. Wait. Hang on.",
            "You eat a fish hooray!",
            "Fish.",
            "Ate a cod.",
            "Ate a bass.",
            "Ate a shark. Wait. No, it wasn't a shark.",
            "Ate a salmon.",
            "Ate a carp.",
            "Ate an eel??",
            "Ate a shrimp. Wait. That's not a fish.",
            "Almost ate a remora.",
            "Dropped the bass."
        ],
        helpText: "Use your natural shark prowess to find and catch a fish."
    },

    'prySponge': {
        name: "Pry sponge",
        effect: {
            resource: {
                'sponge': 1
            }
        },
        cost: {},
        prereq: {
            upgrade: [
                "spongeCollection"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Grab a sponge from the seabed for future use."
    },

    'getClam': {
        name: "Get clam",
        effect: {
            resource: {
                'clam': 1
            }
        },
        cost: {},
        prereq: {
            upgrade: [
                "clamScooping"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Fetch a clam. Why do we need clams now? Who knows."
    },

    'getJellyfish': {
        name: "Get jellyfish",
        effect: {
            resource: {
                'jellyfish': 1
            }
        },
        cost: {},
        prereq: {
            upgrade: [
                "jellyfishHunting"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Take a great risk in catching a jellyfish without being stung."
    },

    // CONVERSIONS ////////////////////////////////////////////////////////////////////////////////

    'seaApplesToScience': {
        name: "Study sea apples",
        effect: {
            resource: {
                science: 5
            }
        },
        cost: [
            {resource: "seaApple", costFunction: "constant", priceIncrease: 1}
        ],
        max: "seaApple",
        prereq: {
            resource: {
                seaApple: 1
            },
            upgrade: [
                "xenobiology"
            ]
        },
        outcomes: [
            "There's science inside these things, surely!",
            "The cause of science is advanced!",
            "This is perhaps maybe insightful!",
            "Why are we even doing this? Who knows! Science!",
            "What is even the point of these things? Why are they named for fruit? They're squirming!"
        ],
        helpText: "Dissect sea apples to gain additional science. Research!"
    },

    'spongeToScience': {
        name: "Dissect sponge",
        effect: {
            resource: {
                science: 5
            }
        },
        cost: [
            {resource: "sponge", costFunction: "constant", priceIncrease: 1}
        ],
        max: "sponge",
        prereq: {
            resource: {
                sponge: 1
            },
            upgrade: [
                "xenobiology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Dissect sponges to learn their porous secrets. Science!"
    },

    'jellyfishToScience': {
        name: "Dismantle jellyfish",
        effect: {
            resource: {
                science: 5
            }
        },
        cost: [
            {resource: "jellyfish", costFunction: "constant", priceIncrease: 1}
        ],
        max: "jellyfish",
        prereq: {
            resource: {
                jellyfish: 1
            },
            upgrade: [
                "xenobiology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Examine the goop inside the stinging jellies! Discovery!"
    },

    'pearlConversion': {
        name: "Convert clam pearls",
        effect: {
            resource: {
                crystal: 0.2
            }
        },
        cost: [
            {resource: "clam", costFunction: "constant", priceIncrease: 1}
        ],
        max: "clam",
        prereq: {
            resource: {
                clam: 1
            },
            upgrade: [
                "pearlConversion"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Convert a pearl (and the clam around it) into crystal."
    },

    // MAKE ADVANCED RESOURCES  ///////////////////////////////////////////////////////////////////////////////

    'transmuteSharkonium': {
        name: "Transmute stuff to sharkonium",
        effect: {
            resource: {
                sharkonium: 1
            }
        },
        cost: [
            {resource: "crystal", costFunction: "constant", priceIncrease: 5},
            {resource: "sand", costFunction: "constant", priceIncrease: 15}
        ],
        max: "sharkonium",
        prereq: {
            upgrade: [
                "transmutation"
            ]
        },
        outcomes: [
            "Transmutation destination!",
            "Transmutation rejuvenation!",
            "Transmogrification revelation!",
            "Transformation libation!",
            "Transfiguration nation! ...wait.",
            "Sharkonium arise!",
            "Arise, sharkonium!",
            "More sharkonium!",
            "The substance that knows no name! Except the name sharkonium!",
            "The substance that knows no description! It's weird to look at.",
            "The foundation of a modern shark frenzy!"
        ],
        helpText: "Convert ordinary resources into sharkonium, building material of the future!"
    },

    'smeltCoralglass': {
        name: "Smelt stuff to coralglass",
        effect: {
            resource: {
                coralglass: 1
            }
        },
        cost: [
            {resource: "coral", costFunction: "constant", priceIncrease: 10},
            {resource: "sand", costFunction: "constant", priceIncrease: 10}
        ],
        max: "coralglass",
        prereq: {
            upgrade: [
                "coralglassSmelting"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Smelt resources into coralglass for use in crustacean machines!"
    },

    'fuseDelphinium': {
        name: "Fuse stuff into delphinium",
        effect: {
            resource: {
                delphinium: 1
            }
        },
        cost: [
            {resource: "coral", costFunction: "constant", priceIncrease: 15},
            {resource: "crystal", costFunction: "constant", priceIncrease: 5}
        ],
        max: "delphinium",
        prereq: {
            upgrade: [
                "aquamarineFusion"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Fuse valuable resources into delphinium, which is kinda like sharkonium. Except worse."
    },

    'forgeSpronge': {
        name: "Forge sponge into spronge",
        effect: {
            resource: {
                spronge: 1
            }
        },
        cost: [
            {resource: "sponge", costFunction: "constant", priceIncrease: 5},
            {resource: "junk", costFunction: "constant", priceIncrease: 15}
        ],
        max: "spronge",
        prereq: {
            upgrade: [
                "industrialGradeSponge"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Repurpose boring old sponge into spronge, building material of the future."
    },

    // BUY ANIMALS ////////////////////////////////////////////////////////////////////////////////

    'getShark': {
        name: "Recruit shark",
        effect: {
            resource: {
                'shark': 1
            }
        },
        cost: [
            {resource: "fish", costFunction: "linear", priceIncrease: 5}
        ],
        max: "shark",
        prereq: {
            resource: {
                'fish': 5
            }
        },
        outcomes: [
            "A bignose shark joins you.",
            "A blacktip reef shark joins you.",
            "A blue shark joins you.",
            "A bull shark joins you.",
            "A cat shark joins you.",
            "A crocodile shark joins you.",
            "A dusky whaler shark joins you.",
            "A dogfish joins you.",
            "A graceful shark joins you.",
            "A grey reef shark joins you.",
            "A goblin shark joins you.",
            "A hammerhead shark joins you.",
            "A hardnose shark joins you.",
            "A lemon shark joins you.",
            "A milk shark joins you.",
            "A nervous shark joins you.",
            "An oceanic whitetip shark joins you.",
            "A pigeye shark joins you.",
            "A sandbar shark joins you.",
            "A silky shark joins you.",
            "A silvertip shark joins you.",
            "A sliteye shark joins you.",
            "A speartooth shark joins you.",
            "A spinner shark joins you.",
            "A spot-tail shark joins you.",
            "A mako shark joins you.",
            "A tiger shark joins you.",
            "A tawny shark joins you.",
            "A white shark joins you.",
            "A zebra shark joins you."
        ],
        multiOutcomes: [
            "A whole bunch of sharks join you.",
            "That's a lot of sharks.",
            "The shark community grows!",
            "More sharks! MORE SHARKS!",
            "Sharks for the masses. Mass sharks.",
            "A shiver of sharks! No, that's a legit name. Look it up.",
            "A school of sharks!",
            "A shoal of sharks!",
            "A frenzy of sharks!",
            "A gam of sharks! Yes, that's correct." ,
            "A college of sharks! They're a little smarter than a school."
        ],
        helpText: "Recruit a shark to help catch more fish."
    },

    'getManta': {
        name: "Hire ray",
        effect: {
            resource: {
                'ray': 1
            }
        },
        cost: [
            {resource: "fish", costFunction: "linear", priceIncrease: 15}
        ],
        max: "ray",
        prereq: {
            resource: {
                'fish': 15
            }
        },
        outcomes: [
            "These guys seem to be kicking up a lot of sand!",
            "A spotted eagle ray joins you.",
            "A manta ray joins you.",
            "A stingray joins you.",
            "A clownnose ray joins you.",
            "A bluespotted maskray joins you.",
            "A bluntnose stingray joins you.",
            "A oman masked ray joins you.",
            "A bulls-eye electric ray joins you.",
            "A shorttailed electric ray joins you.",
            "A bentfin devil ray joins you.",
            "A lesser electric ray joins you.",
            "A cortez electric ray joins you.",
            "A feathertail stingray joins you.",
            "A thornback ray joins you.",
            "A giant shovelnose ray joins you.",
            "A pacific cownose ray joins you.",
            "A bluespotted ribbontail ray joins you.",
            "A marbled ribbontail ray joins you.",
            "A blackspotted torpedo ray joins you.",
            "A marbled torpedo ray joins you.",
            "A atlantic torpedo ray joins you.",
            "A panther torpedo ray joins you.",
            "A spotted torpedo ray joins you.",
            "A ocellated torpedo joins you.",
            "A caribbean torpedo joins you.",
            "A striped stingaree joins you.",
            "A sparesly-spotted stingaree joins you.",
            "A kapala stingaree joins you.",
            "A common stingaree joins you.",
            "A eastern fiddler ray joins you.",
            "A bullseye stingray joins you.",
            "A round stingray joins you.",
            "A yellow stingray joins you.",
            "A cortez round stingray joins you.",
            "A porcupine ray joins you.",
            "A sepia stingaree joins you.",
            "A banded stingaree joins you.",
            "A spotted stingaree joins you.",
            "A sea pancake joins you."
        ],
        multiOutcomes: [
            "A whole bunch of rays join you.",
            "That's a lot of rays.",
            "The ray conspiracy grows!",
            "I can't even deal with all of these rays.",
            "More rays more rays more more more.",
            "A school of rays!",
            "A fever of rays! Yes, seriously. Look it up.",
            "A whole lotta rays!",
            "The sand is just flying everywhere!" ,
            "So many rays."
        ],
        helpText: "Hire a ray to help collect fish. They might kick up some sand from the seabed."
    },


    'getCrab': {
        name: "Acquire crab",
        effect: {
            resource: {
                'crab': 1
            }
        },
        cost: [
            {resource: "fish", costFunction: "linear", priceIncrease: 10}
        ],
        max: "crab",
        prereq: {
            resource: {
                'shark': 4,
                'ray': 4
            }
        },
        outcomes: [
            "A crab starts sifting shiny things out of the sand.",
            "A bering hermit joins you.",
            "A blackeye hermit joins you.",
            "A butterfly crab joins you.",
            "A dungeness crab joins you.",
            "A flattop crab joins you.",
            "A greenmark hermit joins you.",
            "A golf-ball crab joins you.",
            "A graceful crab joins you.",
            "A graceful decorator crab joins you.",
            "A graceful kelp crab joins you.",
            "A green shore crab joins you.",
            "A heart crab joins you.",
            "A helmet crab joins you.",
            "A longhorn decorator crab joins you.",
            "A maroon hermit joins you.",
            "A moss crab joins you.",
            "A northern kelp crab joins you.",
            "A orange hairy hermit joins you.",
            "A purple shore crab joins you.",
            "A pygmy rock crab joins you.",
            "A puget sound king crab joins you.",
            "A red rock crab joins you.",
            "A scaled crab joins you.",
            "A sharpnose crab joins you.",
            "A spiny lithoid crab joins you.",
            "A widehand hermit joins you.",
            "A umbrella crab joins you."
        ],
        multiOutcomes: [
            "A lot of crabs join you.",
            "CRABS EVERYWHERE",
            "Crabs. Crabs. Crabs!",
            "Feels sort of crab-like around here.",
            "A cast of crabs!",
            "A dose of crabs!",
            "A cribble of crabs! Okay, no, that one's made up.",
            "So many crabs."
        ],
        helpText: "Hire a crab to find things that sharks and rays overlook."
    },

    'getShrimp': {
        name: "Acquire shrimp",
        effect: {
            resource: {
                'shrimp': 1
            }
        },
        cost: [
            {resource: "sponge", costFunction: "linear", priceIncrease: 5}
        ],
        max: "shrimp",
        prereq: {
            resource: {
                'sponge': 5
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Convince shrimp to assist you in the gathering of sponge."
    },

    'getLobster': {
        name: "Gain lobster",
        effect: {
            resource: {
                'lobster': 1
            }
        },
        cost: [
            {resource: "clam", costFunction: "linear", priceIncrease: 10}
        ],
        max: "lobster",
        prereq: {
            resource: {
                'clam': 10
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Lobster like clams. Will work for clams. Good work. Many clams."
    },

    'getDolphin': {
        name: "Fetch dolphin",
        effect: {
            resource: {
                'dolphin': 1
            }
        },
        cost: [
            {resource: "fish", costFunction: "linear", priceIncrease: 10}
        ],
        max: "dolphin",
        prereq: {
            resource: {
                'fish': 10,
                'shark': 50
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Pay a dolphin to help us catch fish. Prepare to put up with whining."
    },

    'getWhale': {
        name: "Reach whale",
        effect: {
            resource: {
                'whale': 1
            }
        },
        cost: [
            {resource: "fish", costFunction: "linear", priceIncrease: 1e5}
        ],
        max: "whale",
        prereq: {
            resource: {
                'fish': 1e5
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Persuade one of the great whales to help us out. They can round up entire schools."
    },

    'getEel': {
        name: "Hire eel",
        effect: {
            resource: {
                'eel': 1
            }
        },
        cost: [
            {resource: "fish", costFunction: "linear", priceIncrease: 15}
        ],
        max: "octopus",
        prereq: {
            resource: {
                'fish': 50
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Offer a new home and fish supply to an eel. They can round up fish and sand."
    },

    'getChimaera': {
        name: "Procure chimaera",
        effect: {
            resource: {
                'chimaera': 1
            }
        },
        cost: [
            {resource: "jellyfish", costFunction: "linear", priceIncrease: 20}
        ],
        max: "chimaera",
        prereq: {
            resource: {
                'jellyfish': 20
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Convince a chimaera to hunt in the darker depths for us."
    },

    'getOctopus': {
        name: "Employ octopus",
        effect: {
            resource: {
                'octopus': 1
            }
        },
        cost: [
            {resource: "clam", costFunction: "linear", priceIncrease: 15}
        ],
        max: "octopus",
        prereq: {
            resource: {
                'clam': 20
            }
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Pay an octopus for their efficient clam retrieval services."
    },

    // SHARK JOBS ////////////////////////////////////////////////////////////////////////////////

    'getScientist': {
        name: "Train science shark",
        effect: {
            resource: {
                'scientist': 1
            }
        },
        cost: [
            {resource: "shark", costFunction: "constant", priceIncrease: 1},
            {resource: "crystal", costFunction: "linear", priceIncrease: 20}
        ],
        max: "scientist",
        prereq: {
            resource: {
                'crystal': 20,
                'shark': 1
            }
        },
        outcomes: [
            "Doctor Shark, coming right up!",
            "A scientist shark is revealed!",
            "After many painful years of study, a shark that has developed excellent skills in making excuses-- er, in science!",
            "PhD approved!",
            "Graduation complete!",
            "A new insight drives a new shark to take up the cause of science!"
        ],
        multiOutcomes: [
            "The training program was a success!",
            "Look at all this science!",
            "Building a smarter, better shark!",
            "Beakers! Beakers underwater! It's madness!",
            "Let the science commence!",
            "Underwater clipboards! No I don't know how that works either!",
            "Careful teeth record the discoveries!"
        ],
        helpText: "Train a shark in the fine art of research and the science of, well, science."
    },

    'getNurse': {
        name: "Train nurse shark",
        effect: {
            resource: {
                'nurse': 1
            }
        },
        cost: [
            {resource: "shark", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 100}
        ],
        max: "nurse",
        prereq: {
            resource: {
                'shark': 1
            },
            upgrade: [
                "biology"
            ]
        },
        outcomes: [
            "A nurse shark is ready!",
            "Shark manufacturer primed.",
            "Nurse shark trained.",
            "Medical exam passed! Nurse shark is go!"
        ],
        multiOutcomes: [
            "More sharks are on the way soon.",
            "Shark swarm begins!",
            "There will be no end to the sharks!",
            "Sharks forever!",
            "The sharks will never end. The sharks are eternal.",
            "More sharks to make more sharks to make more sharks..."
        ],
        helpText: "Remove a shark from fish duty and set them to shark making duty."
    },

    // RAY JOBS ////////////////////////////////////////////////////////////////////////////////

    'getLaser': {
        name: "Equip laser ray",
        effect: {
            resource: {
                'laser': 1
            }
        },
        cost: [
            {resource: "ray", costFunction: "constant", priceIncrease: 1},
            {resource: "crystal", costFunction: "linear", priceIncrease: 50}
        ],
        max: "laser",
        prereq: {
            resource: {
                'ray': 1
            },
            upgrade: [
                "laserRays"
            ]
        },
        outcomes: [
            "Laser ray online!",
            "Laser ray! With a laser ray! It's laser ray, with a laaaaaser raaaay!",
            "Laser ray.",
            "Ray suited up with a laaaaaaser!",
            "Ray lasered. To use a laser. Not the subject of a laser."
        ],
        multiOutcomes: [
            "Boil the seabed!",
            "Churn the sand to crystal!",
            "Laser ray armada in position!",
            "Ray crystal processing initiative is growing stronger every day!",
            "Welcome to the future! The future is lasers!"
        ],
        helpText: "Remove a ray from sand detail and let them fuse sand into raw crystal."
    },

    'getMaker': {
        name: "Instruct a ray maker",
        effect: {
            resource: {
                'maker': 1
            }
        },
        cost: [
            {resource: "ray", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 300},
            {resource: "kelp", costFunction: "linear", priceIncrease: 15}
        ],
        max: "maker",
        prereq: {
            resource: {
                'ray': 1
            },
            upgrade: [
                "rayBiology"
            ]
        },
        outcomes: [
            "The application of kelp supplements has made a ray very productive.",
            "More rays lets you get more rays which you can then use to get more rays.",
            "The ray singularity begins!",
            "A ray maker is ready.",
            "Looks like you gave them quite the ray maker blow! 'Them' being the intangible enemy that is lacking in resources.",
            "The ray seems concerned, but obliges. The mission has been given."
        ],
        multiOutcomes: [
            "All these makers. What are they making? What is it for? Oh. It's rays, and it's probably for sand or something.",
            "More ray makers means more rays. Do you understand what that means?! Do you?! It means more rays. Good. On the same page, then.",
            "Rapidly breeding aquatic wildlife is probably a severe ecological hazard. Good thing this isn't Earth's oceans, probably!",
            "Have you ever thought about what the rays wanted? Because this might have been what they wanted after all.",
            "MORE LASER RAYS FOR THE LASER ARMY-- oh. Well, this is good too."
        ],
        helpText: "Remove a ray from sand business and let them concentrate on making more rays."
    },

    // CRAB JOBS ////////////////////////////////////////////////////////////////////////////////

    'getPlanter': {
        name: "Gear up planter crab",
        effect: {
            resource: {
                'planter': 1
            }
        },
        cost: [
            {resource: "crab", costFunction: "constant", priceIncrease: 1},
            {resource: "sand", costFunction: "linear", priceIncrease: 200}
        ],
        max: "planter",
        prereq: {
            resource: {
                'crab': 1
            },
            upgrade: [
                "kelpHorticulture"
            ]
        },
        outcomes: [
            "Crab set up with seeds.",
            "Shell studded with kelp.",
            "Crab is going on a mission. A mission... to farm.",
            "Planter crab equipped and ready to move a few feet and start planting some things!",
            "Crab is ready to farm!"
        ],
        multiOutcomes: [
            "Carpet the seabed!",
            "Kelp kelp kelp kelp kelp kelp kelp kelp.",
            "Horticulturists unite!",
            "Strike the sand!",
            "Pat the sand very gently and put kelp in it!",
            "More kelp. The apples. They hunger. They hunger for kelp."
        ],
        helpText: "Equip a crab with the equipment and training to plant kelp across the ocean bottom."
    },

    'getBrood': {
        name: "Form crab brood",
        effect: {
            resource: {
                'brood': 1
            }
        },
        cost: [
            {resource: "crab", costFunction: "constant", priceIncrease: 20},
            {resource: "fish", costFunction: "linear", priceIncrease: 200}
        ],
        max: "brood",
        prereq: {
            resource: {
                'crab': 1
            },
            upgrade: [
                "crabBiology"
            ]
        },
        outcomes: [
            "A bunch of crabs pile together into some sort of weird cluster.",
            "Crab team, assemble! FORM THE CRAB BROOD!",
            "[This message has been censored for reasons of being mostly really gross.]",
            "Eggs, eggs everywhere, but never stop and think.",
            "Writhing crab pile. Didn't expect those words next to each other today, did you.",
            "The crab brood is a rarely witnessed phenomenon, due to being some strange behaviour of crabs that have been driven to seek crystals for reasons only they understand."
        ],
        multiOutcomes: [
            "The broods grow. The swarm rises.",
            "All these crabs are probably a little excessive. ...is what I could say, but I'm going to say this instead. MORE CRABS.",
            "A sea of crabs on the bottom of the sea. Clickity clackity.",
            "Snip snap clack clack burble burble crabs crabs crabs crabs.",
            "More crabs are always a good idea. Crystals aren't cheap.",
            "The broods swell in number. The sharks are uneasy, but the concern soon passes.",
            "Yes. Feed the kelp. Feed it. Feeeeeed it."
        ],
        helpText: "Meld several crabs into a terrifying, incomprehensible crab-producing brood cluster."
    },

    // SHRIMP JOBS ////////////////////////////////////////////////////////////////////////////////

    'getQueen': {
        name: "Crown shrimp queen",
        effect: {
            resource: {
                'queen': 1
            }
        },
        cost: [
            {resource: "shrimp", costFunction: "constant", priceIncrease: 1},
            {resource: "sponge", costFunction: "linear", priceIncrease: 50}
        ],
        max: "queen",
        prereq: {
            resource: {
                'shrimp': 1
            },
            upgrade: [
                "eusociality"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "Okay, so it's not exactly a royal role, but hey, they're gonna be making eggs for a long time. Humour them."
        ],
        helpText: "Create a shrimp queen to make more shrimp."
    },

    'getWorker': {
        name: "Crown shrimp queen",
        effect: {
            resource: {
                'worker': 1
            }
        },
        cost: [
            {resource: "shrimp", costFunction: "constant", priceIncrease: 1},
            {resource: "sponge", costFunction: "linear", priceIncrease: 20}
        ],
        max: "worker",
        prereq: {
            resource: {
                'shrimp': 1
            },
            upgrade: [
                "eusociality"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Dedicate a shrimp to collecting crystals instead of algae."
    },

    // LOBSTER JOBS ////////////////////////////////////////////////////////////////////////////////

    'getBerrier': {
        name: "Form lobster berrier",
        effect: {
            resource: {
                'berrier': 1
            }
        },
        cost: [
            {resource: "lobster", costFunction: "constant", priceIncrease: 1},
            {resource: "clam", costFunction: "linear", priceIncrease: 30}
        ],
        max: "berrier",
        prereq: {
            resource: {
                'lobster': 1
            },
            upgrade: [
                "crustaceanBiology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Dedicate a lobster to egg production. We don't know how it works. Ask the lobsters."
    },

    'getHarvester': {
        name: "Train lobster harvester",
        effect: {
            resource: {
                'harvester': 1
            }
        },
        cost: [
            {resource: "lobster", costFunction: "constant", priceIncrease: 1},
            {resource: "clam", costFunction: "linear", priceIncrease: 25},
            {resource: "sponge", costFunction: "linear", priceIncrease: 5}
        ],
        max: "harvester",
        prereq: {
            resource: {
                'lobster': 1
            },
            upgrade: [
                "crustaceanBiology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Dedicate a lobster to egg production. We don't know how it works. Ask the lobsters."
    },

    // DOLPHIN JOBS ////////////////////////////////////////////////////////////////////////////////

    'getPhilosopher': {
        name: "Qualify dolphin philosopher",
        effect: {
            resource: {
                'philosopher': 1
            }
        },
        cost: [
            {resource: "dolphin", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 30},
            {resource: "coral", costFunction: "linear", priceIncrease: 10}
        ],
        max: "philosopher",
        prereq: {
            resource: {
                'dolphin': 1
            },
            upgrade: [
                "delphinePhilosophy"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Determine which of these dolphins is actually smart, and not just repeating empty phrases."
    },

    'getTreasurer': {
        name: "Promote dolphin treasurer",
        effect: {
            resource: {
                'treasurer': 1
            }
        },
        cost: [
            {resource: "dolphin", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 20},
            {resource: "crystal", costFunction: "linear", priceIncrease: 20}
        ],
        max: "treasurer",
        prereq: {
            resource: {
                'dolphin': 1
            },
            upgrade: [
                "delphinePhilosophy"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Promote a dolphin to a harder job involving interest on precious coral and crystal or something like that."
    },

    'getBiologist': {
        name: "Train dolphin biologist",
        effect: {
            resource: {
                'biologist': 1
            }
        },
        cost: [
            {resource: "dolphin", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 10},
            {resource: "science", costFunction: "linear", priceIncrease: 20}
        ],
        max: "biologist",
        prereq: {
            resource: {
                'dolphin': 1
            },
            upgrade: [
                "dolphinBiology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Train a dolphin to specialise in biology. Dolphin biology, specifically, and production, apparently."
    },

    // WHALE JOBS ////////////////////////////////////////////////////////////////////////////////

    'getChorus': {
        name: "Assemble whale chorus",
        effect: {
            resource: {
                'chorus': 1
            }
        },
        cost: [
            {resource: "whale", costFunction: "unique", priceIncrease: 1000}
        ],
        max: "chorus",
        prereq: {
            resource: {
                'whale': 1
            },
            upgrade: [
                "eternalSong"
            ]
        },
        outcomes: [
            "TODO"
        ],
        helpText: "Form the singers of the eternal song. Let it flow through this world."
    },

    // EEL JOBS ////////////////////////////////////////////////////////////////////////////////

    'getPit': {
        name: "Dig eel pit",
        effect: {
            resource: {
                'pit': 1
            }
        },
        cost: [
            {resource: "eel", costFunction: "constant", priceIncrease: 3},
            {resource: "fish", costFunction: "linear", priceIncrease: 50},
            {resource: "sand", costFunction: "linear", priceIncrease: 20}
        ],
        max: "pit",
        prereq: {
            resource: {
                'eel': 1
            },
            upgrade: [
                "eelHabitats"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Find a suitable pit for eels to make more eels."
    },

    'getTechnician': {
        name: "Teach eel technician",
        effect: {
            resource: {
                'technician': 1
            }
        },
        cost: [
            {resource: "eel", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 30},
            {resource: "crystal", costFunction: "linear", priceIncrease: 5}
        ],
        max: "technician",
        prereq: {
            resource: {
                'eel': 1
            },
            upgrade: [
                "eelHabitats"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Instruct an eel in the fine art of shark science."
    },

    'getSifter': {
        name: "Train eel sifter",
        effect: {
            resource: {
                'sifter': 1
            }
        },
        cost: [
            {resource: "eel", costFunction: "constant", priceIncrease: 1},
            {resource: "fish", costFunction: "linear", priceIncrease: 30}
        ],
        max: "sifter",
        prereq: {
            resource: {
                'eel': 1
            },
            upgrade: [
                "eelHabitats"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Specialise an eel in finding interesting things on the seabed."
    },

    // CHIMAERA JOBS ////////////////////////////////////////////////////////////////////////////////

    'getTransmuter': {
        name: "Induct chimaera transmuter",
        effect: {
            resource: {
                'transmuter': 1
            }
        },
        cost: [
            {resource: "chimaera", costFunction: "constant", priceIncrease: 1},
            {resource: "jellyfish", costFunction: "linear", priceIncrease: 10},
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 10}
        ],
        max: "transmuter",
        prereq: {
            resource: {
                'chimaera': 1
            },
            upgrade: [
                "chimaeraMysticism"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Reveal the mysteries of transmutation to a chimaera."
    },

    'getExplorer': {
        name: "Prepare chimaera explorer",
        effect: {
            resource: {
                'explorer': 1
            }
        },
        cost: [
            {resource: "chimaera", costFunction: "constant", priceIncrease: 1},
            {resource: "jellyfish", costFunction: "linear", priceIncrease: 30},
            {resource: "crystal", costFunction: "linear", priceIncrease: 30}
        ],
        max: "explorer",
        prereq: {
            resource: {
                'chimaera': 1
            },
            upgrade: [
                "chimaeraMysticism"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Help prepare a chimaera for exploration to parts unknown. Their efforts will be good for science."
    },

    // OCTOPUS JOBS ////////////////////////////////////////////////////////////////////////////////

    'getCollector': {
        name: "Reassign octopus as collector",
        effect: {
            resource: {
                'collector': 1
            }
        },
        cost: [
            {resource: "octopus", costFunction: "constant", priceIncrease: 1},
            {resource: "clam", costFunction: "linear", priceIncrease: 50}
        ],
        max: "collector",
        prereq: {
            resource: {
                'octopus': 1
            },
            upgrade: [
                "octopusMethodology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Delegate an octopus to collect crystal and coral."
    },

    'getScavenger': {
        name: "Reassign octopus as scavenger",
        effect: {
            resource: {
                'scavenger': 1
            }
        },
        cost: [
            {resource: "octopus", costFunction: "constant", priceIncrease: 1},
            {resource: "clam", costFunction: "linear", priceIncrease: 30}
        ],
        max: "scavenger",
        prereq: {
            resource: {
                'octopus': 1
            },
            upgrade: [
                "octopusMethodology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Delegate an octopus to scavenge sponge and sand."
    },

    // SHARK MACHINES ////////////////////////////////////////////////////////////////////////////////

    'getCrystalMiner': {
        name: "Build crystal miner",
        effect: {
            resource: {
                'crystalMiner': 1
            }
        },
        cost: [
            {resource: "crystal", costFunction: "linear", priceIncrease: 100},
            {resource: "sand", costFunction: "linear", priceIncrease: 200},
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 20}
        ],
        max: "crystalMiner",
        prereq: {
            resource: {
                'sharkonium': 20
            },
            upgrade: [
                "automation"
            ]
        },
        outcomes: [
            "Crystal miner activated.",
            "Crystal miner constructed.",
            "Mining machine online.",
            "Construction complete.",
            "Carve rock. Remove sand. Retrieve target."
        ],
        multiOutcomes: [
            "The machines rise.",
            "The miners dig.",
            "The crystal shall be harvested.",
            "Crystal miners are complete.",
            "Giant machines blot out our sun."
        ],
        helpText: "Construct a machine to automatically harvest crystals efficiently."
    },

    'getSandDigger': {
        name: "Build sand digger",
        effect: {
            resource: {
                'sandDigger': 1
            }
        },
        cost: [
            {resource: "sand", costFunction: "linear", priceIncrease: 500},
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 150}
        ],
        max: "sandDigger",
        prereq: {
            resource: {
                'sharkonium': 150
            },
            upgrade: [
                "automation"
            ]
        },
        outcomes: [
            "Sand digger constructed.",
            "Sand digger reaches into the seabed.",
            "The digger begins to shuffle sand into its machine maw. Rays dart away.",
            "The machine is online.",
            "The machine acts immediately, shovelling sand."
        ],
        multiOutcomes: [
            "The machines increase in number.",
            "The diggers devour.",
            "All sand must be gathered.",
            "The rays are concerned.",
            "Devour the sands. Consume.",
            "Giant machines blot out our sun."
        ],
        helpText: "Construct a machine to automatically dig up sand efficiently."
    },

    'getFishMachine': {
        name: "Build fish machine",
        effect: {
            resource: {
                fishMachine: 1
            }
        },
        cost: [
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 100}
        ],
        max: "fishMachine",
        prereq: {
            resource: {
                'sharkonium': 100
            },
            upgrade: [
                "automation"
            ]
        },
        outcomes: [
            "Fish machine activated.",
            "Fish machine constructed.",
            "Fishing machine online.",
            "Construction complete.",
            "The quarry moves. But the machine is faster."
        ],
        multiOutcomes: [
            "One day there will be no fish left. Only the machines.",
            "Today the shark is flesh. Tomorrow, machine.",
            "Your metal servants can sate the hunger. The hunger for fish.",
            "The fishing machines are more efficient than the sharks. But they aren't very smart.",
            "Automated fishing.",
            "The power of many, many sharks, in many, many devices."
        ],
        helpText: "Construct a machine to automatically gather fish efficiently."
    },

    'getAutoTransmuter': {
        name: "Build auto-transmuter",
        effect: {
            resource: {
                'autoTransmuter': 1
            }
        },
        cost: [
            {resource: "crystal", costFunction: "linear", priceIncrease: 100},
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 200}
        ],
        max: "autoTransmuter",
        prereq: {
            resource: {
                'sharkonium': 200
            },
            upgrade: [
                "engineering"
            ]
        },
        outcomes: [
            "Auto-transmuter activated.",
            "Auto-transmuter constructed.",
            "Transmutation machine online.",
            "Construction complete.",
            "Provide inputs. Only the output matters."
        ],
        multiOutcomes: [
            "Auto-transmuters are prepared.",
            "The difference between science and magic is reliable application.",
            "All is change.",
            "Change is all.",
            "The machines know many secrets, yet cannot speak of them."
        ],
        helpText: "Construct a machine to automatically transmute sand and crystal to sharkonium."
    },

    'getSkimmer': {
        name: "Build skimmer",
        effect: {
            resource: {
                'skimmer': 1
            }
        },
        cost: [
            {resource: "residue", costFunction: "linear", priceIncrease: 300},
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 200}
        ],
        max: "skimmer",
        prereq: {
            resource: {
                'residue': 100
            },
            upgrade: [
                "engineering"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Construct a machine to automatically recycle kelp and sand into residue."
    },

    'getPurifier': {
        name: "Build purifier",
        effect: {
            resource: {
                'purifier': 1
            }
        },
        cost: [
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 500}
        ],
        max: "purifier",
        prereq: {
            resource: {
                'sharkonium': 500
            },
            upgrade: [
                "environmentalism"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Construct a machine to restore vitality to our increasingly murky waters."
    },

    'getHeater': {
        name: "Build heater",
        effect: {
            resource: {
                'heater': 1
            }
        },
        cost: [
            {resource: "sharkonium", costFunction: "linear", priceIncrease: 300}
        ],
        max: "heater",
        prereq: {
            resource: {
                'ice': 1,
                'sharkonium': 300
            },
            upgrade: [
                "thermalConditioning"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "Construct a machine to combat the advancing ice shelf."
    },

    // CRUSTACEAN MACHINES /////////////////////////////////////////////////////////

    'getSpongeFarmer': {
        name: "Build sponge farmer",
        effect: {
            resource: {
                'spongeFarmer': 1
            }
        },
        cost: [
            {resource: "coralglass", costFunction: "linear", priceIncrease: 200}
        ],
        max: "spongeFarmer",
        prereq: {
            resource: {
                'coralglass': 200
            },
            upgrade: [
                "coralCircuitry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This crustacean machine automatically farms and harvests sponge."
    },

    'getBerrySprayer': {
        name: "Build berry sprayer",
        effect: {
            resource: {
                'berrySprayer': 1
            }
        },
        cost: [
            {resource: "coralglass", costFunction: "linear", priceIncrease: 500}
        ],
        max: "berrySprayer",
        prereq: {
            resource: {
                'coralglass': 500,
                'lobster': 2
            },
            upgrade: [
                "coralCircuitry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This crustacean machine distributes lobster eggs for optimal hatching conditions."
    },

    'getGlassMaker': {
        name: "Build glass maker",
        effect: {
            resource: {
                'glassMaker': 1
            }
        },
        cost: [
            {resource: "coralglass", costFunction: "linear", priceIncrease: 400},
            {resource: "sand", costFunction: "linear", priceIncrease: 200},
            {resource: "coral", costFunction: "linear", priceIncrease: 200}
        ],
        max: "glassMaker",
        prereq: {
            resource: {
                'coralglass': 400
            },
            upgrade: [
                "coralCircuitry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This crustacean machine automatically makes coralglass out of coral and sand through processes we don't fully understand."
    },

    // DOLPHIN MACHINES /////////////////////////////////////////////////////////

    'getSilentArchivist': {
        name: "Build silent archivist",
        effect: {
            resource: {
                'silentArchivist': 1
            }
        },
        cost: [
            {resource: "delphinium", costFunction: "linear", priceIncrease: 300},
            {resource: "science", costFunction: "linear", priceIncrease: 200}
        ],
        max: "silentArchivist",
        prereq: {
            resource: {
                'delphinium': 300
            },
            upgrade: [
                "dolphinTechnology"
            ]
        },
        outcomes: [
            "I think the machine is mocking us. They automated mocking our works. Those crafty blighters!"
        ],
        multiOutcomes: [
            "More archivers of our grand works as a collective."
        ],
        helpText: "This dolphin machine archives, critiques, and catalogues our science."
    },

    'getTirelessCrafter': {
        name: "Build tireless crafter",
        effect: {
            resource: {
                'tirelessCrafter': 1
            }
        },
        cost: [
            {resource: "delphinium", costFunction: "linear", priceIncrease: 200},
            {resource: "crystal", costFunction: "linear", priceIncrease: 200},
            {resource: "coral", costFunction: "linear", priceIncrease: 200}
        ],
        max: "tirelessCrafter",
        prereq: {
            resource: {
                'delphinium': 200
            },
            upgrade: [
                "dolphinTechnology"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This dolphin machine creates delphinium. What good that is to us is a mystery. Use it to make their useless machines, I guess?"
    },

    // OCTOPUS MACHINES /////////////////////////////////////////////////////////

    'getClamCollector': {
        name: "Build clam collector",
        effect: {
            resource: {
                'clamCollector': 1
            }
        },
        cost: [
            {resource: "spronge", costFunction: "linear", priceIncrease: 50}
        ],
        max: "clamCollector",
        prereq: {
            resource: {
                'spronge': 50
            },
            upgrade: [
                "sprongeBiomimicry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This octopus machine collects clams. Simple purpose, simple machine."
    },

    'getSprongeSmelter': {
        name: "Build spronge smelter",
        effect: {
            resource: {
                'sprongeSmelter': 1
            }
        },
        cost: [
            {resource: "spronge", costFunction: "linear", priceIncrease: 100}
        ],
        max: "sprongeSmelter",
        prereq: {
            resource: {
                'spronge': 100
            },
            upgrade: [
                "sprongeBiomimicry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This octopus machine imbues sponge with industrial potential. Requires residue for function."
    },

    'getSeaScourer': {
        name: "Build sea scourer",
        effect: {
            resource: {
                'seaScourer': 1
            }
        },
        cost: [
            {resource: "spronge", costFunction: "linear", priceIncrease: 100},
            {resource: "junk", costFunction: "linear", priceIncrease: 50}
        ],
        max: "seaScourer",
        prereq: {
            resource: {
                'spronge': 100
            },
            upgrade: [
                "sprongeBiomimicry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This octopus machine converts pollution into more useful resources."
    },

    'getProstheticPolyp': {
        name: "Build prosthetic polyp",
        effect: {
            resource: {
                'prostheticPolyp': 1
            }
        },
        cost: [
            {resource: "spronge", costFunction: "linear", priceIncrease: 100},
            {resource: "coral", costFunction: "linear", priceIncrease: 50}
        ],
        max: "prostheticPolyp",
        prereq: {
            resource: {
                'spronge': 100,
                'coral': 50
            },
            upgrade: [
                "sprongeBiomimicry"
            ]
        },
        outcomes: [
            "TODO"
        ],
        multiOutcomes: [
            "TODO"
        ],
        helpText: "This octopus machine synthesizes coral faster than an entire colony of polyps ever could."
    }

};

SharkGame.HomeActionCategories = {

    all: { // This category should be handled specially.
        name: "All",
        actions: []
    },

    basic: {
        name: "Frenzy",
        actions: [
            "catchFish",
            "prySponge",
            "getClam",
            "getJellyfish",
            "getShark",
            "getManta",
            "getCrab",
            "getShrimp",
            "getLobster",
            "getDolphin",
            "getWhale",
            "getEel",
            "getChimaera",
            "getOctopus"
        ]
    },

    professions: {
        name: "Jobs",
        actions: [
            "getScientist",
            "getLaser",
            "getPlanter",
            "getWorker",
            "getHarvester",
            "getPhilosopher",
            "getTreasurer",
            "getTechnician",
            "getSifter",
            "getTransmuter",
            "getExplorer",
            "getCollector",
            "getScavenger"
        ]
    },

    breeders: {
        name: "Producers",
        actions: [
            "getNurse",
            "getMaker",
            "getBrood",
            "getQueen",
            "getBerrier",
            "getBiologist",
            "getPit"
        ]
    },

    processing: {
        name: "Processing",
        actions: [
            "seaApplesToScience",
            "spongeToScience",
            "jellyfishToScience",
            "pearlConversion",
            "transmuteSharkonium",
            "smeltCoralglass",
            "fuseDelphinium",
            "forgeSpronge"
        ]
    },

    machines: {
        name: "Shark Machines",
        actions: [
            "getCrystalMiner",
            "getSandDigger",
            "getAutoTransmuter",
            "getFishMachine",
            "getSkimmer",
            "getPurifier",
            "getHeater"
        ]
    },

    otherMachines: {
        name: "Other Machines",
        actions: [
            "getSpongeFarmer",
            "getBerrySprayer",
            "getGlassMaker",
            "getSilentArchivist",
            "getTirelessCrafter",
            "getClamCollector",
            "getSprongeSmelter",
            "getSeaScourer",
            "getProstheticPolyp"
        ]
    },

    unique: {
        name: "Unique",
        actions: [
            "getChorus"
        ]
    }
};