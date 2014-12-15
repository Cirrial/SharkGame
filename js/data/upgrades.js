SharkGame.Upgrades = {
    crystalBite: {
        name: "Crystal Bite-Gear",
        desc: "Bite the crystals we have into something to help biting!",
        researchedMessage: "Weird teeth-wear has been developed, and sharks can now catch fish better as a result.",
        effectDesc: "Sharks are twice as effective with their new biting gear. Turns out they work better outside the mouth!",
        cost: {
            science: 50,
            fish: 10
        },
        effect: {
            multiplier: {
                shark: 2
            }
        }
    },

    crystalSpade: {
        name: "Crystal Spades",
        desc: "Fashion strange harness-tools for the rays.",
        researchedMessage: "The rays can now bother the sand more effectively, and dig up more sand now!",
        effectDesc: "Rays are twice as effective with their specially adapted digging tools.",
        cost: {
            science: 50,
            sand: 20
        },
        effect: {
            multiplier: {
                ray: 2
            }
        }
    },

    crystalContainer: {
        name: "Crystal Containers",
        desc: "Make weird bottle things from the crystals we have. Maybe useful??",
        researchedMessage: "Well, things can go into these containers that aren't water. This makes science easier!",
        effectDesc: "Scientists are twice as effective at making with the science.",
        cost: {
            science: 100,
            crystal: 50
        },
        effect: {
            multiplier: {
                scientist: 2
            }
        }
    },

    statsDiscovery: {
        name: "Storage Caverns",
        desc: "It's about time to start moving the stores we have to a better place. We've found one but it needs setting up.",
        researchedMessage: "All the goods we've acquired are now being stored and itemised in a mostly flooded cavern system. No more stray currents washing it all away hopefully!",
        effectDesc: "By storing things in a centralised location, we now finally have an idea of what we're doing. Sort of.",
        cost: {
            science: 150
        },
        required: {
            upgrades: [
                "crystalContainer"
            ]
        }
    },

    underwaterChemistry: {
        name: "Underwater Chemistry",
        desc: "With the weird bottles, we can now put things and other things into them and see what happens.",
        researchedMessage: "Well, nothing useful was determined, but if we keep on doing it we make tremendous leaps for science!",
        effectDesc: "Scientists are twice as effective with their new chemical insights.",
        cost: {
            science: 200,
            crystal: 50
        },
        required: {
            upgrades: [
                "crystalContainer"
            ]
        },
        effect: {
            multiplier: {
                scientist: 2
            }
        }
    },

    seabedGeology: {
        name: "Seabed Geology",
        desc: "Study the bottom of the ocean to determine the rich, deep, juicy secrets it contains.",
        researchedMessage: "Not only did we find a whole bunch of weird things, the rays found that there was more sand!",
        effectDesc: "Rays are twice as effective with their understanding of the seabed and its varieties of sediment.",
        cost: {
            science: 250,
            sand: 250
        },
        required: {
            upgrades: [
                "crystalContainer"
            ]
        },
        effect: {
            multiplier: {
                ray: 2
            }
        }
    },

    thermalVents: {
        name: "Thermal Vents",
        desc: "Investigate the boiling vents that just seem to keep on heating things up.",
        researchedMessage: "This is a wondrous, unending source of heat! Something good must come from this.",
        effectDesc: "A power source for future technologies has been discovered.",
        cost: {
            science: 300,
            sand: 500
        },
        required: {
            upgrades: [
                "seabedGeology"
            ]
        }
    },

    spongeCollection: {
        name: "Sponge Collection",
        desc: "We can see these things littering the reefs and beds, but we don't know how to collect them without breaking them.",
        researchedMessage: "Understanding the fragile nature of sponges and their weird porous texture, we can now collect sponges by not biting so hard.",
        effectDesc: "Sponge can be collected in the same way fish can be.",
        cost: {
            science: 400
        },
        required: {
            upgrades: [
                "seabedGeology"
            ],
            resources: [
                "sponge"
            ]
        }
    },

    clamScooping: {
        name: "Clam Scooping",
        desc: "We see these things all over the seabed but we can't tell which are clams and which are rocks.",
        researchedMessage: "Patient observation has shown that clams and rocks are in fact different and distinct things. Now we won't be scooping up any more rocks!",
        effectDesc: "Clams can be collected like fish. The rays do a better job of scooping things, for some reason.",
        cost: {
            science: 600
        },
        required: {
            upgrades: [
                "seabedGeology"
            ],
            resources: [
                "clam"
            ]
        }
    },

    pearlConversion: {
        name: "Pearl Conversion",
        desc: "There's these things inside the clams that look shiny like crystals. Maybe we can transmute them to crystals?",
        researchedMessage: "Well, we can transmute pearls to crystals now, but we need more of the clam. The whole clam. Yes. The entire clam.",
        effectDesc: "We can turn clams into crystals using the pearls inside them as a focus. Maybe one day we won't need to use the entire clam.",
        cost: {
            science: 1500
        },
        required: {
            upgrades: [
                "clamScooping",
                "transmutation"
            ],
            resources: [
                "clam"
            ]
        }
    },

    jellyfishHunting: {
        name: "Jellyfish Hunting",
        desc: "Jellyfish are plenty in the farther waters, but our attempts to catch them is met only with pain. We need better tactics.",
        researchedMessage: "The trick to catching jellyfish is caution and avoiding the stinging tendrils. They burn. Oh, they burn.",
        effectDesc: "Jellyfish can be caught like fish. Hey, a fish is a fish, right?",
        cost: {
            science: 800
        },
        required: {
            upgrades: [
                "seabedGeology"
            ],
            resources: [
                "jellyfish"
            ]
        }
    },

    laserRays: {
        name: "Laser Rays",
        desc: "Using arcane shark mystery science, capture the heat of the vents for use by rays.",
        researchedMessage: "The rays can now be granted gear that will let them fuse sand into crystal! Future!",
        effectDesc: "Laser rays can now be geared up to burn the very sand to glassy crystal.",
        cost: {
            science: 100,
            sand: 2000,
            crystal: 100
        },
        required: {
            upgrades: [
                "thermalVents"
            ],
            resources: [
                "ray"
            ]
        }
    },

    automation: {
        name: "Automation",
        desc: "Using sharkonium, we can make things to do things so we don't have to do the things!",
        researchedMessage: "Now we don't have to do all the work, machines can do it for us! Future!!",
        effectDesc: "Machines can be built to supplement population duties. This is efficient.",
        cost: {
            science: 1000,
            sharkonium: 100
        },
        required: {
            upgrades: [
                "thermalVents",
                "transmutation"
            ]
        }
    },

    environmentalism: {
        name: "Environmentalism",
        desc: "So the machines might be destroying the ocean. We need to fix this.",
        researchedMessage: "We've determined that the goop produced by our technology can be refined away into nothing but crystal fresh water!",
        effectDesc: "Purifiers can be made to combat the harmful effects of the other machines. Anti-machine machines?",
        cost: {
            science: 500
        },
        required: {
            upgrades: [
                "automation"
            ],
            resources: [
                "tar"
            ]
        }
    },

    thermalConditioning: {
        name: "Thermal Conditioning",
        desc: "We're freezing to death! Machines make heat, right? We need to work on this!!",
        researchedMessage: "Breakthrough! Machines can run alarmingly hot if we take out some of the safeguards!",
        effectDesc: "Heaters can be made to fight the freezing process. We don't want to become giant novelty ice cubes!",
        cost: {
            science: 1000
        },
        required: {
            upgrades: [
                "environmentalism"
            ],
            resources: [
                "ice"
            ]
        }
    },

    engineering: {
        name: "Engineering",
        desc: "The machines sort of suck. Let's make them better by learning how!",
        researchedMessage: "The machines are twice as good now! We've figured out new designs in the process, too!",
        effectDesc: "Machines are twice as effective. Skimmers and auto-transmuters are now possible to create.",
        cost: {
            science: 2000,
            sharkonium: 2000
        },
        required: {
            upgrades: [
                "automation"
            ]
        },
        effect: {
            multiplier: {
                crystalMiner: 2,
                fishMachine: 2,
                sandDigger: 2
            }
        }
    },

    recyclerDiscovery: {
        name: "Recycler",
        desc: "Devise a system of pulverising unwanted resources into a component paste, and reusing them as something else.",
        researchedMessage: "Well this thing is frankly terrifying. I wouldn't swim anywhere near the input holes if I were you. Maybe it'll help though!",
        effectDesc: "Allows recycling of materials by virtue of a horrifying mechanical maw that consumes all that ventures near it. Future?",
        cost: {
            science: 3000,
            sharkonium: 3000
        },
        required: {
            upgrades: [
                "automation"
            ]
        }
    },

    coralCircuitry: {
        name: "Coral Circuitry",
        desc: "We almost know enough to replicate crustacean technology. Just a few core components remain.",
        researchedMessage: "We've unlocked the secrets of crustacean machinery. It's more environmentally friendly, but less efficient.",
        effectDesc: "We can copy some of the safe but slow machines used by the lobsters and shrimp.",
        cost: {
            science: 3000,
            coralglass: 3000
        },
        required: {
            upgrades: [
                "automation",
                "coralglassSmelting"
            ],
            resources: [
                "coral",
                "sand"
            ]
        }
    },

    sprongeBiomimicry: {
        name: "Spronge Biomimicry",
        desc: "The cephalopod school of thought is that a machine that mimics life is a better machine. We don't understand this so well yet.",
        researchedMessage: "For machines that mimic life, these things sure put out a lot of pollution. It's sort of alarming. Very alarming, even.",
        effectDesc: "We can mimic some of the life-mimicking biotechnology the octopuses use, but it gums up the oceans so quickly. So very dangerous.",
        cost: {
            science: 3000,
            spronge: 3000
        },
        required: {
            upgrades: [
                "automation",
                "industrialGradeSponge"
            ],
            resources: [
                "sponge",
                "residue"
            ]
        }
    },

    dolphinTechnology: {
        name: "Dolphin Technology",
        desc: "The warm-blooded squeakers have machinery that might be useful. Let's reverse-engineer it.",
        researchedMessage: "The elaborate crystalline structures of dolphin technology are a ruse to mask their limited function. Inside, they're not so different to our machines.",
        effectDesc: "We've reverse-engineered some dolphin machinery. We also, regretfully, learned what the designs are called.",
        cost: {
            science: 3000,
            delphinium: 3000
        },
        required: {
            upgrades: [
                "automation",
                "aquamarineFusion"
            ],
            resources: [
                "coral",
                "crystal"
            ]
        }
    },

    kelpHorticulture: {
        name: "Kelp Horticulture",
        desc: "Determine what it takes to plant kelp all over the seabed. Maybe this is useful.",
        researchedMessage: "Crab-specific gear has been invented to allow for kelp farming! This is possibly useful.",
        effectDesc: "Crabs can become kelp farmers and grow a living carpet across the bottom of the sea.",
        cost: {
            science: 500,
            sand: 2000
        },
        required: {
            upgrades: [
                "seabedGeology"
            ],
            resources: [
                "kelp"
            ]
        }
    },

    biology: {
        name: "Biology",
        desc: "What is a shark? What is inside a shark, except for large amounts of fish?",
        researchedMessage: "With a new understanding of their own biology, sharks can now specialise in the manufacture of new sharks.",
        effectDesc: "Sharks are twice as effective. Did you know shark eggs don't actually form just because a shark wills them to exist?",
        cost: {
            science: 400
        },
        required: {
            upgrades: [
                "underwaterChemistry"
            ]
        },
        effect: {
            multiplier: {
                shark: 2
            }
        }
    },

    xenobiology: {
        name: "Xenobiology",
        desc: "Determine what is with these weird faceless creatures we keep finding.",
        researchedMessage: "Results inconclusive! Further research required. It could be such a benefit for science!",
        effectDesc: "Kelp produces sea apples twice as fast. Also, sea apple isn't a fruit. We can also dissect sea apples, jellyfish and sponge for science.",
        cost: {
            science: 600
        },
        required: {
            upgrades: [
                "kelpHorticulture",
                "biology"
            ],
            resources: [
                "seaApple",
                "jellyfish",
                "sponge"
            ]
        },
        effect: {
            multiplier: {
                kelp: 2
            }
        }
    },

    rayBiology: {
        name: "Ray Biology",
        desc: "Though kindred to the sharks, we know so little about the rays. If only we could fix this. We need to bait a sand trap.",
        researchedMessage: "Apparently we could have just asked. We learned how rays make more rays. It's kinda similar to sharks, really, but rays.",
        effectDesc: "Rays and laser rays are twice as effective. We may never repair the shark-ray relations to their former state after how awkward this whole affair was.",
        cost: {
            science: 700,
            sand: 600
        },
        required: {
            upgrades: [
                "biology",
                "laserRays"
            ],
            resources: [
                "ray"
            ]
        },
        effect: {
            multiplier: {
                ray: 2,
                laser: 2
            }
        }
    },

    crabBiology: {
        name: "Crab Biology",
        desc: "Crabs are a mystery. They keep to themselves and dig up crystals or put down plants. What is even up with that? What ARE crabs??",
        researchedMessage: "It turns out crabs are friendly crustaceans that have revealed to the sharks the secrets of crab generation. It involves eggs, or something. Squirmy eggs.",
        effectDesc: "Crabs and planter crabs are twice as effective. Crabs are alright but they are also sort of terrifying and weird. Good job they're on our side!",
        cost: {
            science: 500,
            kelp: 1000
        },
        required: {
            upgrades: [
                "biology",
                "sunObservation"
            ],
            resources: [
                "crab"
            ]
        },
        effect: {
            multiplier: {
                crab: 4,
                planter: 2
            }
        }
    },

    crustaceanBiology: {
        name: "Crustacean Biology",
        desc: "These strange creatures related to crabs require further investigation. What is with exoskeletons?",
        researchedMessage: "We've figured out how these shellfish function. There's far too many limbs involved.",
        effectDesc: "Shrimp and lobsters are twice as effective. Lobsters can now gather other things or cover themselves in shiny eggs, also called 'berries'. What's a berry?",
        cost: {
            science: 1000,
            clam: 500
        },
        required: {
            upgrades: [
                "crabBiology"
            ],
            resources: [
                "shrimp",
                "lobster"
            ]
        },
        effect: {
            multiplier: {
                shrimp: 2,
                lobster: 2
            }
        }
    },

    eusociality: {
        name: "Eusociality",
        desc: "The shrimp are weirder than we thought. They have some advanced social system beyond our comprehension. What is the deal?",
        researchedMessage: "We have learned far more than we needed to about the duties of egg bearing queens in eusocial colonies.",
        effectDesc: "Shrimp are twice as effective. Shimp queens and dedicated shrimp workers are available, and we'll never sleep soundly again.",
        cost: {
            science: 2000,
            sponge: 500
        },
        required: {
            upgrades: [
                "crustaceanBiology"
            ],
            resources: [
                "shrimp"
            ]
        },
        effect: {
            multiplier: {
                shrimp: 2
            }
        }
    },

    wormWarriors: {
        name: "Worm Warriors",
        desc: "Shrimp sponge hives are under constant threat from outside invaders that aren't us. A collaboration effort might help them out.",
        researchedMessage: "Primordial shark techniques of self-defense have lead to the establishment of a new shrimp caste - the worm warrior.",
        effectDesc: "Shrimp, shrimp queens and shrimp workers are twice as effective now that they don't need to worry about worms eating them.",
        cost: {
            science: 3000,
            shrimp: 300
        },
        required: {
            upgrades: [
                "eusociality"
            ],
            resources: [
                "shrimp"
            ]
        },
        effect: {
            multiplier: {
                shrimp: 2,
                queen: 2,
                worker: 2
            }
        }
    },

    cetaceanAwareness: {
        name: "Cetacean Awareness",
        desc: "From a distance, it's harder to tell which of us are really sharks or... those other things. We need to figure this out.",
        researchedMessage: "Right, so, dolphins and whales have a horizontal tail and sharks have a vertical tail. Also, they have warm blood and bigger brains. Jerks.",
        effectDesc: "Whales and dolphins are twice as effective, now that we can adapt our hunting strategies to their supposed 'strengths'.",
        cost: {
            science: 2000,
            fish: 500
        },
        required: {
            upgrades: [
                "biology"
            ],
            resources: [
                "dolphin",
                "whale"
            ]
        },
        effect: {
            multiplier: {
                dolphin: 2,
                whale: 2
            }
        }
    },

    dolphinBiology: {
        name: "Dolphin Biology",
        desc: "Do we really have to learn about this? We do? Alright, then.",
        researchedMessage: "We managed to offend the dolphins with our questions so much they decided to form their own biological research team.",
        effectDesc: "Dolphins are twice as effective but double a small number is still small. Also now they can make more dolphins. <em>Hooray.</em>",
        cost: {
            science: 3000,
            fish: 1000
        },
        required: {
            upgrades: [
                "cetaceanAwareness"
            ],
            resources: [
                "dolphin"
            ]
        },
        effect: {
            multiplier: {
                dolphin: 2
            }
        }
    },

    delphinePhilosophy: {
        name: "Delphine Philosophy",
        desc: "The whales are known to be natural philosophers. The dolphins, not so much. Nonetheless, we need to appreciate their culture for them to pay attention to us.",
        researchedMessage: "Please let's never do this again. They have fifty dozen parables involving bubbles. BUBBLES. NEVER AGAIN.",
        effectDesc: "Dolphin biologists are twice as effective now that we don't keep openly mocking them. Also, dolphins are more comfortable in their former roles.",
        cost: {
            science: 5000,
            fish: 1000
        },
        required: {
            upgrades: [
                "dolphinBiology"
            ],
            resources: [
                "dolphin"
            ]
        },
        effect: {
            multiplier: {
                biologist: 2
            }
        }
    },

    coralHalls: {
        name: "Coral Halls",
        desc: "The demands don't stop! Now they want living spaces made of coral! Is this really necessary?",
        researchedMessage: "We begrudingly helped them establish new living spaces a little distant from the rest of our frenzy.",
        effectDesc: "Dolphins are happier and twice as effective. Savants and treasurers are also twice as effective. Everyone wins, and all it cost us was our dignity and resolve. Sigh.",
        cost: {
            science: 10000,
            coral: 2000
        },
        required: {
            upgrades: [
                "delphinePhilosophy"
            ],
            resources: [
                "dolphin"
            ]
        },
        effect: {
            multiplier: {
                dolphin: 2,
                savant: 2,
                treasurer: 2
            }
        }
    },

    eternalSong: {
        name: "Eternal Song",
        desc: "The whales claim to know segments of some form of ancient ethereal music that connects worlds. We can collect what they know to piece it together ourselves.",
        researchedMessage: "We have determined the eternal song of the gates. We don't know what it does yet.",
        effectDesc: "A chorus of whales can be assembled to sing the eternal song, but we have no clue what it will do.",
        cost: {
            science: 1E12
        },
        required: {
            upgrades: [
                "cetaceanAwareness"
            ],
            resources: [
                "whale"
            ]
        }
    },

    eelHabitats: {
        name: "Eel Habitats",
        desc: "So we keep seeing these things we thought were kelp on the seabed, but it turns out they're not kelp. What are they?",
        researchedMessage: "After some discussion with the eels on the nature of eel pits and safety and security in the form of seabed holes, we understand, maybe.",
        effectDesc: "Eels are twice as effective now we know how they prefer to live. Eels are also able to specialise in a variety of different ways with a place to store their things.",
        cost: {
            science: 800,
            clam: 200
        },
        required: {
            upgrades: [
                "biology",
                "seabedGeology"
            ],
            resources: [
                "eel"
            ]
        },
        effect: {
            multiplier: {
                eel: 2
            }
        }
    },

    creviceCreches: {
        name: "Crevice Creches",
        desc: "We can probably figure out a way to make eel pits cosier for their inhabitants.",
        researchedMessage: "We've developed a design to improve the quality of eel pits involving a complicated system of chambers and subterranean warrens. Look, it... let's not worry about the specifics this time, okay?",
        effectDesc: "Eels are twice as effective, and so are eel pits. Expect many baby eels in the future.",
        cost: {
            science: 800,
            clam: 200
        },
        required: {
            upgrades: [
                "eelHabitats"
            ],
            resources: [
                "eel"
            ]
        },
        effect: {
            multiplier: {
                eel: 2,
                pit: 2
            }
        }
    },

    bioelectricity: {
        name: "Bioelectricity",
        desc: "There has to be a way to harness the powers of some of the eels. We all know they have powers. Painful ones.",
        researchedMessage: "The technically inclined electric eels practically jumped out of the water at the chance to work with the machines. Should we be concerned?",
        effectDesc: "Eel technicians are twice as effective. So are our machines. Convenient!",
        cost: {
            science: 1600,
            clam: 400
        },
        required: {
            upgrades: [
                "eelHabitats",
                "engineering"
            ],
            resources: [
                "eel"
            ]
        },
        effect: {
            multiplier: {
                technician: 2,
                fishMachine: 2,
                sandDigger: 2,
                autoTransmuter: 2,
                skimmer: 2
            }
        }
    },

    octopusMethodology: {
        name: "Octopus Methodology",
        desc: "The octopuses claim they know ways to improve their routines and machines.",
        researchedMessage: "We have no idea what thought processes guide these cephalopod allies of ours, but they know how to get results.",
        effectDesc: "Octopuses can specialise in different tasks, and their machines are constructed to be twice as efficient.",
        cost: {
            science: 8888,
            clam: 88
        },
        required: {
            upgrades: [
                "exploration"
            ],
            resources: [
                "octopus"
            ]
        },
        effect: {
            multiplier: {
                clamCollector: 2,
                sprongeSmelter: 2,
                seaScourer: 2,
                prostheticPolyp: 2
            }
        }
    },

    octalEfficiency: {
        name: "Octal Efficiency",
        desc: "The octopuses wish to further enhance their productivity for collective gain.",
        researchedMessage: "The instructions constructed and disseminated by the octopuses are complex and only understood to other octopuses. Head hurts. Something about the number eight.",
        effectDesc: "Octopuses and their specialists are twice as effective, as our their machines. Find unity in efficiency.",
        cost: {
            science: 88888,
            clam: 888
        },
        required: {
            upgrades: [
                "octopusMethodology"
            ],
            resources: [
                "octopus"
            ]
        },
        effect: {
            multiplier: {
                clamCollector: 2,
                sprongeSmelter: 2,
                seaScourer: 2,
                prostheticPolyp: 2,
                octopus: 2,
                collector: 2,
                scavenger: 2
            }
        }
    },

    chimaeraMysticism: {
        name: "Chimaera Mysticism",
        desc: "We know the chimaeras, but we don't them very well. We need to adjust our thinking to understand their riddles.",
        researchedMessage: "After much thoughtful contemplation, the chimaeras have despaired at our inability to understand and shared their knowledge with us.",
        effectDesc: "Chimaeras can now become dedicated transmuters or explorers, using our knowledge to assist our industry or sharing their knowledge as they journey through the deeper seas.",
        cost: {
            science: 12000,
            jellyfish: 700
        },
        required: {
            upgrades: [
                "farExploration"
            ],
            resources: [
                "chimaera"
            ]
        }
    },

    abyssalEnigmas: {
        name: "Abyssal Enigmas",
        desc: "The chimaeras have returned from the deeper oceans with artifacts they can't explain. We need to work together to understand them.",
        researchedMessage: "Well, we still have no idea what these things are, but we've formed a stronger bond with our estranged kin.",
        effectDesc: "Chimaeras and their specialists are twice as effective thanks to stronger trust and friendship. Also we still don't know what these things they found do.",
        cost: {
            science: 40000,
            jellyfish: 2000
        },
        required: {
            upgrades: [
                "chimaeraMysticism"
            ],
            resources: [
                "chimaera"
            ]
        },
        effect: {
            multiplier: {
                chimaera: 2,
                transmuter: 2,
                explorer: 2
            }
        }
    },

    sunObservation: {
        name: "Sun Observation",
        desc: "We must determine what is with the weird glare on the surface of the water.",
        researchedMessage: "Shark science has discovered the sun! It has also discovered that looking directly into the sun hurts.",
        effectDesc: "Planter crabs are twice as effective. Is a suns worth many fish? We can see a sun, but where is it really? And by what is it made of?",
        cost: {
            science: 5000
        },
        required: {
            upgrades: [
                "kelpHorticulture"
            ],
            resources: [
                "crab"
            ]
        },
        effect: {
            multiplier: {
                planter: 2
            }
        }
    },

    transmutation: {
        name: "Transmutation",
        desc: "By heating things up and doing science things to them, maybe new things can be made!",
        researchedMessage: "A new form of material has been discovered! It has been named after its discoverer, Dr. Sharkonium.",
        effectDesc: "Enables transmutation of some random junk we have lying around into sharkonium, material of the future.",
        cost: {
            science: 1000,
            crystal: 2000,
            sand: 4000
        },
        required: {
            upgrades: [
                "thermalVents",
                "underwaterChemistry"
            ]
        }
    },

    coralglassSmelting: {
        name: "Coralglass Smelting",
        desc: "Careful observation of crustacean smelting processes will let us copy their method for coralglass creation.",
        researchedMessage: "Our allies among the shelled creatures have revealed to us the secrets of underwater glassmaking! It's, uh, complicated.",
        effectDesc: "Enables smelting of coralglass, a vital component in crustacean technology.",
        cost: {
            science: 1000,
            coral: 3000,
            sand: 3000
        },
        required: {
            upgrades: [
                "thermalVents",
                "crustaceanBiology"
            ],
            resources: [
                "coral",
                "sand"
            ]
        }
    },

    industrialGradeSponge: {
        name: "industrial-Grade Sponge",
        desc: "Our octopus contacts inform us that sponge is highly useful with a little augmentation. Let's figure this out.",
        researchedMessage: "By infusing sponge with processed matter, we have devised spronge, a versatile super-material that kind of freaks us out!",
        effectDesc: "Enables creation of spronge, the backbone... uh... the core material in cephalopod technology.",
        cost: {
            science: 1000,
            sponge: 2000,
            junk: 4000
        },
        required: {
            upgrades: [
                "thermalVents",
                "octopusMethodology"
            ],
            resources: [
                "sponge",
                "junk"
            ]
        }
    },

    aquamarineFusion: {
        name: "Aquamarine Fusion",
        desc: "Those uppity dolphins think they're the only ones who can make their special delphinium. We'll show them.",
        researchedMessage: "In a weird corrupted version of our own transmutation, we've figured out how to make delphinium and now we feel gross.",
        effectDesc: "Enables transmutation of a different bunch of junk into delphinium, a substance inherently inferior to sharkonium.",
        cost: {
            science: 1000,
            coral: 4000,
            crystal: 4000
        },
        required: {
            upgrades: [
                "transmutation",
                "cetaceanAwareness"
            ],
            resources: [
                "coral",
                "crystal"
            ]
        }
    },

    exploration: {
        name: "Exploration",
        desc: "Swim beyond the home seas to see what can be found!",
        researchedMessage: "Found lots of schools of fish! So many different schools! And such untapped sand reserves!",
        effectDesc: "Sharks and rays are twice as effective. Did you know oceans are big? Fascinating!",
        cost: {
            science: 5000,
            fish: 5000
        },
        required: {
            upgrades: [
                "seabedGeology",
                "sunObservation"
            ]
        },
        effect: {
            multiplier: {
                shark: 2,
                ray: 2
            }
        }
    },

    farExploration: {
        name: "Far Explorations",
        desc: "Explore the vast reaches beyond the home ocean.",
        researchedMessage: "Crystal-rich deposits were found, as well as strange, deep chasms.",
        effectDesc: "Crabs are four times as effective. Did you know oceans are actually even bigger than big? Remarkable!",
        cost: {
            science: 8000,
            fish: 15000
        },
        required: {
            upgrades: [
                "exploration"
            ]
        },
        effect: {
            multiplier: {
                crab: 4
            }
        }
    },

    gateDiscovery: {
        name: "Chasm Exploration",
        desc: "A campaign of risky, foolhardy expeditions to the deeps, to find whatever can be found.",
        researchedMessage: "A strange structure was found from clues within the chasms. The cost was great, but the discovery is greater!",
        effectDesc: "Something ancient lurked in the depths.",
        cost: {
            science: 1E8,
            shark: 50000,
            ray: 50000,
            crab: 50000
        },
        required: {
            upgrades: [
                "farExploration"
            ]
        }
    }

};