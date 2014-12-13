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

    engineering: {
        name: "Engineering",
        desc: "The machines sort of suck. Let's make them better by learning how!",
        researchedMessage: "The machines are twice as good now! And... restless. Ceaseless. Awesome! Fuuutuuure!!",
        effectDesc: "Machines are twice as effective. This is good. This is necessary. This is optimal.",
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
                autoTransmuter: 2,
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
        desc: "Determine what is with these weird twitching organisms that keep appearing in the kelp fields.",
        researchedMessage: "Results inconclusive! Further research required. It could be such a benefit for science!",
        effectDesc: "Kelp produces sea apples twice as fast. We finally almost sort of understand what a sea apple is. It isn't a fruit.",
        cost: {
            science: 600,
            seaApples: 300
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