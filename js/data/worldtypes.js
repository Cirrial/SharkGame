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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
            "tar",
            "ice",
            "heater",
            "shrimp",
            "chimaera",
            "eel"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryResourceBoost", resource: "fish", amount: 1.5 }
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
            "tar",
            "ice",
            "heater",
            "eel",
            "whale",
            "octopus",
            "shrimp",
			"jellyfish",
            "chimaera",
			"dolphin",
			"biologist",
			"queen",
			"pit"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryIncome", resource: "frenzy", amount: 0.01 },
			{ type: "multiplier", modifier: "planetaryIncome", resource: "breeders", amount: 0.0005 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "animals", amount: -0.2 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "stuff", amount: -0.2 },
			{ type: "multiplier", modifier: "planetaryResourceReciprocalBoost", resource: "animals", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryResourceReciprocalBoost", resource: "stuff", amount: 0.5 }
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
            "tar",
            "ice",
            "heater",
            "chimaera",
			"whale"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "breeders", amount: 1 },
            { type: "multiplier", modifier: "planetaryResourceBoost", resource: "animals", amount: 0.5 }
        ],
        gateCosts: {
            fish: 1E8,
            clam: 1E7,
            sponge: 1E8,
            kelp: 1E9,
            coralglass: 1E5,
            coral: 1E7
        }
    },
    tempestuous: {
        name: "Tempestuous",
        desc: "A swirling maelstrom of storms where nothing rests.",
        shortDesc: "stormy grey",
        entry: "You recall nothing and know only the storms. The unrelenting, restless storms scattering your possessions and allies.",
        style: "tempestuous",
        absentResources: [
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
            "tar",
            "ice",
            "heater",
            "chimaera",
            "jellyfish",
			"eel",
			"dolphin"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryIncome", resource: "stuff", amount: -0.1 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "crystal", amount: -0.02 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "frenzy", amount: -0.005 },
			{ type: "multiplier", modifier: "planetaryIncome", resource: "breeders", amount: -0.0005 },
			{ type: "multiplier", modifier: "planetaryResourceBoost", resource: "stuff", amount: 0.5 }
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
            "tar",
            "ice",
            "heater",
            "octopus",
            "eel",
            "chimaera",
            "whale"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "sand", amount: 0.1 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "kelp", amount: 0.01 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "coral", amount: 0.01 },
            { type: "multiplier", modifier: "planetaryIncome", resource: "algae", amount: 0.001 },
			{ type: "multiplier", modifier: "planetaryResourceBoost", resource: "sand", amount: 1 }
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
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
            { type: "multiplier", modifier: "planetaryIncome", resource: "tar", amount: 0.05 },
			{ type: "multiplier", modifier: "planetaryResourceBoost", resource: "tar", amount: 0.1 },
            { type: "multiplier", modifier: "planetaryStartingResources", resource: "crystalMiner", amount: 1 },
            { type: "multiplier", modifier: "planetaryStartingResources", resource: "sandDigger", amount: 1 },
            { type: "multiplier", modifier: "planetaryStartingResources", resource: "fishMachine", amount: 1 },
            { type: "multiplier", modifier: "planetaryStartingResources", resource: "silentArchivist", amount: 1 }
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
            "tar",
            "ice",
            "heater",
            "lobster",
            "crab",
            "shrimp",
            "sponge",
			"dolphin"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryIncome", resource: "crystal", amount: 0.05 },
            { type: "multiplier", modifier: "planetaryResourceBoost", resource: "crystal", amount: 1 },
            { type: "multiplier", modifier: "planetaryResourceReciprocalBoost", resource: "animals", amount: 1 },
            { type: "multiplier", modifier: "planetaryResourceReciprocalBoost", resource: "kelp", amount: 1 },
            { type: "multiplier", modifier: "planetaryResourceReciprocalBoost", resource: "coral", amount: 1 },
            { type: "multiplier", modifier: "planetaryIncomeReciprocalMultiplier", resource: "specialists", amount: 0.5 }
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
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
			"knowledge",
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
            { type: "multiplier", modifier: "planetaryIncomeReciprocalMultiplier", resource: "breeders", amount: 1 },
			{ type: "multiplier", modifier: "planetaryIncomeReciprocalMultiplier", resource: "frenzy", amount: 0.2 },
            { type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "machines", amount: 0.5},
            { type: "multiplier", modifier: "planetaryIncome", resource: "ice", amount: 0.001 },
			{ type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "ice", amount: 0.1}
        ],
        gateCosts: {
            sand: 1E6,
            crystal: 1E4,
            clam: 1E3,
            heater: 5,
            sharkonium: 1E7,
            fish: 1E7
        }
    },
	ethereal: {
        name: "Ethereal",
        desc: "A strange, glowing ocean, where thought escapes into reality.",
        shortDesc: "radiant teal",
        entry: "As you arrive, you feel woozy, and you black out. When you wake up, you feel clear-headed and focused.",
        style: "haven",
        absentResources: [
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer",
            "tar",
            "ice",
            "heater",
			"eel",
			"shrimp",
			"sponge",
			"algae",
			"lobster",
			"chimaera"
        ],
        modifiers: [
			{ type: "multiplier", modifier: "planetaryResourceBoost", resource: "science", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "science", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryIncome", resource: "science", amount: 0.5 },
            { type: "multiplier", modifier: "planetaryResourceReciprocalBoost", resource: "animals", amount: 0.5 }
        ],
        gateCosts: {
            science: 1E9,
            crystal: 1E8,
            coral: 1E8,
            silentArchivist: 5,
            delphinium: 1E8,
            jellyfish: 1E7
        }
    },
	template: {
        name: "",
        desc: "description in gateway i think",
        shortDesc: "status",
        entry: "enter world",
        style: "default",
        absentResources: [
			"knowledge",
            "tar",
            "ice",
            "heater",
            "chimaera",
			"stone",
			"gravel",
			"prospector",
			"shoveler",
			"miller",
			"crusher",
			"pulverizer"
			
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryResourceBoost", resource: "fish", amount: 1.5 }
        ],
        gateCosts: {
            fish: 1,
            sand: 1,
            crystal: 1,
            kelp: 1,
            seaApple: 1,
            sharkonium: 1
        }
	},
	stone: {
        name: "Stone",
        desc: "A world unweathered by ocean currents. It has no natural sand.",
        shortDesc: "rock-bottom",
        entry: "As you enter, the usual shades of green and yellow are nowhere to be found. You look down, and realize there's no sand: just cold, hard slate.",
        style: "default",
        absentResources: [
			"knowledge",
            "tar",
            "ice",
            "heater",
            "chimaera",
			"dolphin",
			"kelp",
			"coral",
			"eel",
			"sandDigger",
			"treasurer",
			"philosopher",
			"jellyfish"
        ],
        modifiers: [
            { type: "multiplier", modifier: "planetaryResourceBoost", resource: "sponge", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "sponge", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "shrimp", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "worker", amount: 0.5 },
			{ type: "multiplier", modifier: "planetaryConstantIncomeMultiplier", resource: "ray", amount: 5 },
			{ type: "restriction", modifier: "planetaryGeneratorRestriction", resource: "ray", restriction: "sand" },
			{ type: "restriction", modifier: "planetaryGeneratorRestriction", resource: "lobster", restriction: "sand" },
			{ type: "restriction", modifier: "planetaryGeneratorRestriction", resource: "scavenger", restriction: "sand" }
        ],
        gateCosts: {
            gravel: 1E9,
            sand: 1E6,
            crystal: 1E8,
            pulverizer: 2,
            sponge: 1E9,
            clam: 1E7
        }
	}
};

