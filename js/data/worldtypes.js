SharkGame.WorldTypes = {
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
            "warren",
            "seeker",
            "harvester",
            "savant",
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
            fish: 1E9,
            sand: 1E9,
            crystal: 1E9,
            kelp: 1E6,
            seaApple: 1E6,
            sharkonium: 1E8
        }
    },
    marine: {
        name: "Marine",
        desc: "A serene blue world. Peaceful, beautiful, so close to home.",
        absentResources: [
            "ice",
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
        desc: "A",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "frenzy", amount: 0.1 },
            { modifier: "planetaryIncome", resource: "animals", amount: -0.1 },
            { modifier: "planetaryIncome", resource: "stuff", amount: -0.1 }
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
    haven: {
        name: "Haven",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryIncomeMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryResourceBoost", resource: "animals", amount: 1 },
            { modifier: "planetaryResourceBoost", resource: "tar", amount: 1 },
            { modifier: "planetaryIncomeMultiplier", resource: "tar", amount: 2 }
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
    tempestuous: {
        name: "Tempestuous",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "tar", amount: 1 },
            { modifier: "planetaryIncome", resource: "stuff", amount: -0.2 }
        ]
    },
    violent: {
        name: "Violent",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryIncome", resource: "sand", amount: 1 },
            { modifier: "planetaryIncome", resource: "kelp", amount: 1 },
            { modifier: "planetaryIncome", resource: "coral", amount: 1 },
            { modifier: "planetaryIncome", resource: "algae", amount: 1 },
            { modifier: "planetaryIncome", resource: "sponge", amount: 1 }
        ]
    },
    abandoned: {
        name: "Abandoned",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryIncome", resource: "tar", amount: 1 },
            { modifier: "planetaryStartingResources", resource: "machines", amount: 5 }
        ],
        // remember to slash these severely
        gateCosts: {
            fish: 1E9,
            sand: 1E9,
            crystal: 1E9,
            kelp: 1E6,
            seaApple: 1E6,
            sharkonium: 1E8
        }
    },
    shrouded: {
        name: "Shrouded",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryResourceBoost", resource: "crystal", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "animals", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "kelp", amount: 1 },
            { modifier: "planetaryResourceReciprocalBoost", resource: "coral", amount: 1 },
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "specialists", amount: 0.5 }
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
    frigid: {
        name: "Frigid",
        desc: "",
        absentResources: [

        ],
        modifiers: [
            { modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { modifier: "planetaryIncomeMultiplier", resource: "machines", amount: 1},
            { modifier: "planetaryResourceBoost", resource: "ice", amount: 5 },
            { modifier: "planetaryIncome", resource: "ice", amount: 0.5 }
        ],
        gateCosts: {
            fish: 1E9,
            sand: 1E9,
            crystal: 1E9,
            kelp: 1E6,
            seaApple: 1E6,
            sharkonium: 1E8
        }
    }
};