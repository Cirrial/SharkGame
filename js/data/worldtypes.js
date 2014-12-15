SharkGame.WorldTypes = {
    test: {
        name: "Test",
        desc: "You REALLY shouldn't be seeing this.",
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
        name: "Start",
        desc: "You shouldn't be seeing this.",
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
        absentResources: [
            "ice",
            "heater",
            "shrimp",
            "chimaera",
            "eel"
        ],
        modifiers: [
            { modifier: "planetaryResourceBoost", resource: "fish", amount: 0.5 }
        ],
        gateCosts: {
            fish: 1E9,
            sand: 1E9,
            crystal: 1E9,
            kelp: 1E6,
            seaApple: 1E6,
            sharkonium: 1E8
        }
    },
    chaotic: {
        name: "Chaotic",
        desc: "A frenetic world, torn by immaterial force.",
        absentResources: [
            "ice",
            "heater",
            "eel",
            "whale"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "frenzy", amount: 0.1 },
            { modifier: "planetaryIncome", resource: "animals", amount: -0.1 },
            { modifier: "planetaryIncome", resource: "stuff", amount: -0.1 }
        ],
        gateCosts: {
            sponge: 1E8,
            clam: 1E8,
            sand: 1E10,
            crystal: 1E10,
            purifier: 1E4,
            sharkonium: 1E10
        }
    },
    haven: {
        name: "Haven",
        desc: "An aquamarine world of plenty. So beautiful, yet so vulnerable.",
        absentResources: [
            "ice",
            "heater",
            "chimaera",
            "eel"
        ],
        modifiers: [
            { modifier: "planetaryIncomeMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryResourceBoost", resource: "animals", amount: 1 },
            { modifier: "planetaryResourceBoost", resource: "tar", amount: 1 },
            { modifier: "planetaryIncomeMultiplier", resource: "tar", amount: 2 }
        ],
        gateCosts: {
            fish: 1E10,
            clam: 1E10,
            sponge: 1E10,
            kelp: 1E12,
            coralglass: 1E7,
            coral: 1E9
        }
    },
    tempestuous: {
        name: "Tempestuous",
        desc: "A swirling maelstrom of storms where nothing rests.",
        absentResources: [
            "ice",
            "heater",
            "sand",
            "clam"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "tar", amount: 1 },
            { modifier: "planetaryIncome", resource: "stuff", amount: -0.2 }
        ],
        gateCosts: {
            residue: 1E12,
            coral: 1E9,
            spronge: 1E9,
            delphinium: 1E9,
            sharkonium: 1E9,
            crystal: 1E9
        }
    },
    violent: {
        name: "Violent",
        desc: "An ocean close to boiling and choking under sulphuric fumes.",
        absentResources: [
            "ice",
            "heater",
            "octopus",
            "eel",
            "chimaera",
            "whale"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryIncome", resource: "sand", amount: 1 },
            { modifier: "planetaryIncome", resource: "kelp", amount: 1 },
            { modifier: "planetaryIncome", resource: "coral", amount: 1 },
            { modifier: "planetaryIncome", resource: "algae", amount: 1 },
            { modifier: "planetaryIncome", resource: "sponge", amount: 1 }
        ],
        gateCosts: {
            sand: 1E12,
            kelp: 1E12,
            coral: 1E12,
            algae: 1E12,
            sponge: 1E12,
            residue: 1E12
        }
    },
    abandoned: {
        name: "Abandoned",
        desc: "A dying world filled with machinery.",
        absentResources: [
            "ice",
            "heater",
            "shrimp",
            "chimaera",
            "lobster",
            "eel",
            "jellyfish",
            "clam",
            "algae",
            "whale"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "tar", amount: 1 },
            { modifier: "planetaryStartingResources", resource: "machines", amount: 5 }
        ],
        gateCosts: {
            residue: 1E12,
            tar: 1E7,
            coralglass: 1E6,
            spronge: 1E6,
            delphinium: 1E6,
            sharkonium: 1E6
        }
    },
    shrouded: {
        name: "Shrouded",
        desc: "A dark, murky ocean of secrecy and danger.",
        absentResources: [
            "ice",
            "heater",
            "lobster",
            "crab",
            "shrimp",
            "sponge"
        ],
        modifiers: [
            { modifier: "planetaryResourceBoost", resource: "crystal", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "animals", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "kelp", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "coral", amount: 1 },
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "specialists", amount: 0.5 }
        ],
        gateCosts: {
            jellyfish: 1E12,
            clam: 1E9,
            crystal: 1E11,
            science: 1E14,
            sharkonium: 1E10,
            fish: 1E10
        }
    },
    frigid: {
        name: "Frigid",
        desc: "A cold, chilling ocean freezing slowly to death.",
        absentResources: [
            "dolphin",
            "whale",
            "crab",
            "lobster",
            "shrimp",
            "seaApple",
            "coral",
            "algae"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryIncomeMultiplier", resource: "machines", amount: 1},
            { modifier: "planetaryResourceBoost", resource: "ice", amount: 5 },
            { modifier: "planetaryIncome", resource: "ice", amount: 0.5 }
        ],
        gateCosts: {
            sand: 1E9,
            crystal: 1E6,
            clam: 1E8,
            ice: 1E4,
            sharkonium: 1E9,
            fish: 1E9
        }
    }
};