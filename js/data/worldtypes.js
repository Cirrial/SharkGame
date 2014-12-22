SharkGame.WorldTypes = {
    test: {
        name: "Test",
        desc: "You REALLY shouldn't be seeing this.",
        shortDesc: "testing",
        entry: "You enter a debug ocean.",
        style: "default",
        absentResources: [],
        modifiers: [],
        gateCosts: {
            fish: 1E3,
            sand: 1E3,
            crystal: 1E3,
            kelp: 1E3,
            seaApple: 1E3,
            sharkonium: 1E3
        }
    },
    start: {
        name: "Home",
        desc: "You shouldn't be seeing this.",
        shortDesc: "strange blue",
        entry: "You enter a familiar blue sea, all your previous knowledge a dim memory.",
        style: "default",
        absentResources: [
            "tar",
            "ice",
            "shrimp",
            "lobster",
            "dolphin",
            "whale",
            "chimaera",
            "octopus",
            "eel",
            "queen",
            "berrier",
            "biologist",
            "pit",
            "worker",
            "harvester",
            "philosopher",
            "treasurer",
            "chorus",
            "transmuter",
            "explorer",
            "collector",
            "scavenger",
            "technician",
            "sifter",
            "purifier",
            "heater",
            "spongeFarmer",
            "berrySprayer",
            "glassMaker",
            "silentArchivist",
            "tirelessCrafter",
            "clamCollector",
            "sprongeSmelter",
            "seaScourer",
            "prostheticPolyp",
            "sponge",
            "jellyfish",
            "clam",
            "coral",
            "algae",
            "coralglass",
            "delphinium",
            "spronge"
        ],
        modifiers: [],
        // initial gate cost, scaled by planetary level
        gateCosts: {
            fish: 1E4,
            sand: 1E4,
            crystal: 1E4,
            kelp: 1E3,
            seaApple: 1E3,
            sharkonium: 1E4
        }
    },
    marine: {
        name: "Marine",
        desc: "A serene blue world. Peaceful, beautiful, so close to home.",
        shortDesc: "strange blue",
        entry: "You enter a familiar blue sea, all your previous knowledge a dim memory.",
        style: "default",
        absentResources: [
            "tar",
            "ice",
            "heater",
            "shrimp",
            "chimaera",
            "eel"
        ],
        modifiers: [
            { modifier: "planetaryResourceBoost", resource: "fish", amount: 1.5 }
        ],
        gateCosts: {
            fish: 1E6,
            sand: 1E6,
            crystal: 1E6,
            kelp: 1E3,
            seaApple: 1E3,
            sharkonium: 1E5
        }
    },
    chaotic: {
        name: "Chaotic",
        desc: "A frenetic world, torn by immaterial force.",
        shortDesc: "swirling teal",
        entry: "You enter a chaotic fray, with no recollection of your former journey. New creatures charge at you from all directions.",
        style: "chaotic",
        absentResources: [
            "tar",
            "ice",
            "heater",
            "eel",
            "whale",
            "octopus",
            "shrimp",
            "chimaera"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "frenzy", amount: 0.0001 },
            { modifier: "planetaryIncome", resource: "animals", amount: -0.0001 },
            { modifier: "planetaryIncome", resource: "stuff", amount: -0.001 }
        ],
        gateCosts: {
            sponge: 1E5,
            clam: 1E5,
            sand: 1E7,
            crystal: 1E7,
            shark: 1E4,
            sharkonium: 1E7
        }
    },
    haven: {
        name: "Haven",
        desc: "An aquamarine world of plenty. So beautiful, yet so vulnerable.",
        shortDesc: "thriving aquamarine",
        entry: "Remembering nothing, you find yourself in a beautiful atoll teeming with life. Life will be good here.",
        style: "haven",
        absentResources: [
            "tar",
            "ice",
            "heater",
            "chimaera",
            "eel"
        ],
        modifiers: [
            { modifier: "planetaryIncomeMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryResourceBoost", resource: "animals", amount: 1 }
        ],
        gateCosts: {
            fish: 1E7,
            clam: 1E7,
            sponge: 1E7,
            kelp: 1E9,
            coralglass: 1E4,
            coral: 1E6
        }
    },
    tempestuous: {
        name: "Tempestuous",
        desc: "A swirling maelstrom of storms where nothing rests.",
        shortDesc: "stormy grey",
        entry: "You recall nothing and know only the storms. The unrelenting, restless storms scattering your possessions and allies.",
        style: "tempestuous",
        absentResources: [
            "tar",
            "ice",
            "heater",
            "chimaera",
            "jellyfish"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "stuff", amount: -0.02 },
            { modifier: "planetaryIncome", resource: "crystal", amount: -0.002 },
            { modifier: "planetaryIncome", resource: "frenzy", amount: -0.0001 }
        ],
        gateCosts: {
            junk: 1E9,
            coral: 1E6,
            spronge: 1E6,
            delphinium: 1E6,
            sharkonium: 1E6,
            crystal: 1E6
        }
    },
    violent: {
        name: "Violent",
        desc: "An ocean close to boiling and choking under sulphuric fumes.",
        shortDesc: "searing red",
        entry: "The burning waters sear the last traces of your past experiences from you. From beneath, the vents spew forth a heavy cloud of sand.",
        style: "violent",
        absentResources: [
            "tar",
            "ice",
            "heater",
            "octopus",
            "eel",
            "chimaera",
            "whale"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryIncome", resource: "sand", amount: 0.1 },
            { modifier: "planetaryIncome", resource: "kelp", amount: 0.001 },
            { modifier: "planetaryIncome", resource: "coral", amount: 0.00001 },
            { modifier: "planetaryIncome", resource: "algae", amount: 0.0001 }
        ],
        gateCosts: {
            sand: 1E10,
            kelp: 1E9,
            coral: 1E6,
            algae: 1E3,
            sponge: 1E6,
            junk: 1E9
        }
    },
    abandoned: {
        name: "Abandoned",
        desc: "A dying world filled with machinery.",
        shortDesc: "murky dark green",
        entry: "You do not know who left this world so torn and empty. Was it some predecessor of yours? Was it you yourself?",
        style: "abandoned",
        absentResources: [
            "ice",
            "heater",
            "shrimp",
            "chimaera",
            "eel",
            "jellyfish",
            "algae",
            "whale"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "tar", amount: 0.1 },
            { modifier: "planetaryStartingResources", resource: "crystalMiner", amount: 1 },
            { modifier: "planetaryStartingResources", resource: "sandDigger", amount: 1 },
            { modifier: "planetaryStartingResources", resource: "fishMachine", amount: 1 },
            { modifier: "planetaryStartingResources", resource: "silentArchivist", amount: 1 }
        ],
        gateCosts: {
            junk: 1E8,
            purifier: 5,
            coralglass: 1E5,
            spronge: 1E5,
            delphinium: 1E5,
            sharkonium: 1E5
        }
    },
    shrouded: {
        name: "Shrouded",
        desc: "A dark, murky ocean of secrecy and danger.",
        shortDesc: "dark mysterious",
        entry: "Blackness. You know only blindness in these dark forsaken waters. Foggy memory leads you to follow a stream of crystals.",
        style: "shrouded",
        absentResources: [
            "tar",
            "ice",
            "heater",
            "lobster",
            "crab",
            "shrimp",
            "sponge"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "crystal", amount: 0.05 },
            { modifier: "planetaryResourceBoost", resource: "crystal", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "animals", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "kelp", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "coral", amount: 1 },
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "specialists", amount: 0.5 }
        ],
        gateCosts: {
            jellyfish: 1E8,
            clam: 1E6,
            crystal: 1E9,
            science: 1E9,
            sharkonium: 1E7,
            fish: 1E8
        }
    },
    frigid: {
        name: "Frigid",
        desc: "A cold, chilling ocean freezing slowly to death.",
        shortDesc: "freezing white",
        entry: "As you struggle with sudden amnesia, you notice crystals forming in front of you. So cold.",
        style: "frigid",
        absentResources: [
            "tar",
            "dolphin",
            "whale",
            "lobster",
            "chimaera",
            "shrimp",
            "seaApple",
            "coral",
            "algae"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryIncomeMultiplier", resource: "machines", amount: 1},
            { modifier: "planetaryIncome", resource: "ice", amount: 0.001 }
        ],
        gateCosts: {
            sand: 1E6,
            crystal: 1E4,
            clam: 1E3,
            heater: 5,
            sharkonium: 1E7,
            fish: 1E7
        }
    }
};

