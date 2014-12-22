SharkGame.ArtifactUtil = {
    migratorCost: function(level) {
        return Math.floor(Math.pow(2, level + 1));
    },
    migratorEffect: function(level, resourceName) {
        if(level < 1) {
            return;
        }
        var amount = Math.pow(5, level);
        // force existence
        SharkGame.World.forceExistence(resourceName);
        var res = SharkGame.Resources.getTotalResource(resourceName);
        if(res < amount) {
            SharkGame.Resources.changeResource(resourceName, amount);
        }
    },
    totemCost: function(level) {
        return Math.floor(Math.pow(2.5, level + 1));
    },
    totemEffect: function(level, resourceList) {
        if(level < 1) {
            return;
        }
        var wr = SharkGame.World.worldResources;
        var multiplier = level + 1;
        _.each(resourceList, function(resourceName) {
            if(wr[resourceName].artifactMultiplier) {
                wr[resourceName].artifactMultiplier *= multiplier;
            } else {
                wr[resourceName].artifactMultiplier = multiplier;
            }
        });
    }
};

SharkGame.Artifacts = {
    permanentMultiplier: {
        name: "Time Anemone",
        desc: "Applies a multiplier to all income.",
        flavour: "As creatures dwell within the sea, so too do creature dwell within causality.",
        max: 5,
        cost: function(level) {
            return Math.floor(Math.pow(10, level + 1));
        },
        effect: function(level) {
            SharkGame.Resources.specialMultiplier = Math.max((2 * level), 1);
        }
    },
    planetTerraformer: {
        name: "World Shaper",
        desc: "Reduce the severity of planet climates.",
        flavour: "Intelligence is not changing to fit an environment, but changing the environment to fit you.",
        max: 10,
        cost: function(level) {
            return Math.floor(Math.pow(4, level + 1));
        }
        // effect is handled specially
        // check SharkGame.World.getTerraformMultiplier
    },
    gateCostReducer: {
        name: "Gate Controller",
        desc: "Reduces the cost requirements of gates.",
        flavour: "Power over the unknown can only reach so far.",
        max: 10,
        cost: function(level) {
            return Math.floor(Math.pow(3, level + 1));
        }
        // effect is handled specially
        // check SharkGame.World.getGateCostMultiplier
    },
    planetScanner: {
        name: "Distant Foresight",
        desc: "Reveals properties of worlds before travelling to them.",
        flavour: "Knowledge may not change destiny, but it may divert it.",
        max: 15,
        cost: function(level) {
            return Math.floor(Math.pow(1.5, level + 1));
        }
        // effect is handled specially
        // check SharkGame.Gateway.getMaxWorldQualitiesToShow
    },
    sharkMigrator: {
        name: "Shark Migrator",
        desc: "Bring some sharks with you to the next world.",
        flavour: "Essence forges a barrier. Sharks are fragile between worlds.",
        max: 10,
        required: ["shark"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "shark");
        }
    },
    rayMigrator: {
        name: "Ray Migrator",
        desc: "Bring some rays with you to the next world.",
        flavour: "The gateway has no sand to hide in.",
        max: 10,
        required: ["ray"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "ray");
        }
    },
    crabMigrator: {
        name: "Crab Migrator",
        desc: "Bring some crabs with you to the next world.",
        flavour: "Essence-refined shells to keep the crabs alive.",
        max: 10,
        required: ["crab"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "crab");
        }
    },
    shrimpMigrator: {
        name: "Shrimp Migrator",
        desc: "Bring some shrimp with you to the next world.",
        flavour: "The hive produces a new hive.",
        max: 10,
        required: ["shrimp"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "shrimp");
        }
    },
    lobsterMigrator: {
        name: "Lobster Migrator",
        desc: "Bring some lobsters with you to the next world.",
        flavour: "Relaxing in the astral seas.",
        max: 10,
        required: ["lobster"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "lobster");
        }
    },
    dolphinMigrator: {
        name: "Dolphin Migrator",
        desc: "Bring some dolphins with you to the next world.",
        flavour: "They will find this transportation strangely familiar.",
        max: 10,
        required: ["dolphin"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "dolphin");
        }
    },
    whaleMigrator: {
        name: "Whale Migrator",
        desc: "Bring some whales with you to the next world.",
        flavour: "They need no protection, only persuasion.",
        max: 10,
        required: ["whale"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "whale");
        }
    },
    eelMigrator: {
        name: "Eel Migrator",
        desc: "Bring some eels with you to the next world.",
        flavour: "Essence tunnels for them to slide into a new domain.",
        max: 10,
        required: ["eel"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "eel");
        }
    },
    chimaeraMigrator: {
        name: "Chimaera Migrator",
        desc: "Bring some chimaeras with you to the next world.",
        flavour: "The light is unbearable. Essence dulls the brightness.",
        max: 10,
        required: ["chimaera"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "chimaera");
        }
    },
    octopusMigrator: {
        name: "Octopus Migrator",
        desc: "Bring some octopuses with you to the next world.",
        flavour: "The gateway defies reason. It is uncomfortable to the rational mind.",
        max: 10,
        required: ["octopus"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "octopus");
        }
    },
    sharkTotem: {
        name: "Totem of Shark",
        desc: "Increase the effectiveness of sharks and their roles.",
        flavour: "To hunt. To catch. To win.",
        max: 10,
        required: ["shark"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["shark", "scientist", "nurse", "diver"]);
        }
    },
    rayTotem: {
        name: "Totem of Ray",
        desc: "Increase the effectiveness of rays and their roles.",
        flavour: "Flying across the ocean in grace and serenity.",
        max: 10,
        required: ["ray"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["ray", "laser", "maker"]);
        }
    },
    crabTotem: {
        name: "Totem of Crab",
        desc: "Increase the effectiveness of crabs and their roles.",
        flavour: "No stone left unturned.",
        max: 10,
        required: ["crab"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["crab", "planter", "brood"]);
        }
    },
    shrimpTotem: {
        name: "Totem of Shrimp",
        desc: "Increase the effectiveness of shrimp and their roles.",
        flavour: "The hive mind awakens.",
        max: 10,
        required: ["shrimp"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["shrimp", "worker", "queen"]);
        }
    },
    lobsterTotem: {
        name: "Totem of Lobster",
        desc: "Increase the effectiveness of lobster and their roles.",
        flavour: "The seabed is a priceless treasure.",
        max: 10,
        required: ["lobster"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["lobster", "berrier", "harvester"]);
        }
    },
    dolphinTotem: {
        name: "Totem of Dolphin",
        desc: "Increase the effectiveness of dolphins and their roles.",
        flavour: "Exiles of a greater threat.",
        max: 10,
        required: ["dolphin"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["dolphin", "philosopher", "biologist", "treasurer"]);
        }
    },
    whaleTotem: {
        name: "Totem of Whale",
        desc: "Increase the effectiveness of whales.",
        flavour: "Keepers of song and mystery.",
        max: 10,
        required: ["whale"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["whale"]);
        }
    },
    eelTotem: {
        name: "Totem of Eel",
        desc: "Increase the effectiveness of eels and their roles.",
        flavour: "Snaking elegance, talented attendants.",
        max: 10,
        required: ["eel"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["eel", "sifter", "pit", "technician"]);
        }
    },
    chimaeraTotem: {
        name: "Totem of Chimaera",
        desc: "Increase the effectiveness of chimaeras and their roles.",
        flavour: "The prodigal descendants return.",
        max: 10,
        required: ["chimaera"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["chimaera", "transmuter", "explorer"]);
        }
    },
    octopusTotem: {
        name: "Totem of Octopus",
        desc: "Increase the effectiveness of octopuses and their roles.",
        flavour: "The cold, rational response is to maximise rewards.",
        max: 10,
        required: ["octopus"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["octopus", "collector", "scavenger"]);
        }
    },
    progressTotem: {
        name: "Totem of Progress",
        desc: "Increase the effectiveness of shark machines.",
        flavour: "Progress can be slowed, but it can never be stopped.",
        max: 10,
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["fishMachine", "sandDigger", "autoTransmuter", "crystalMiner", "skimmer", "purifier", "heater"]);
        }
    },
    carapaceTotem: {
        name: "Totem of Carapace",
        desc: "Increase the effectiveness of crustacean machines.",
        flavour: "The shelled machines are slow, but clean.",
        max: 10,
        required: ["shrimp", "lobster"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["spongeFarmer", "berrySprayer", "glassMaker"]);
        }
    },
    inspirationTotem: {
        name: "Totem of Inspiration",
        desc: "Increase the effectiveness of cetacean machines.",
        flavour: "Dreams of a former glory.",
        max: 10,
        required: ["dolphin"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["silentArchivist", "tirelessCrafter"]);
        }
    },
    industryTotem: {
        name: "Totem of Industry",
        desc: "Increase the effectiveness of cephalopod machines.",
        flavour: "Find unity in efficiency. Seek octal rationalities.",
        max: 10,
        required: ["octopus"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["clamCollector", "sprongeSmelter", "seaScourer", "prostheticPolyp"]);
        }
    },
    wardingTotem: {
        name: "Totem of Warding",
        desc: "Reduce the adverse effects of harmful materials.",
        flavour: "The end is inevitable, but the wait can be lengthened.",
        max: 10,
        required: ["tar", "ice"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            if(level < 1) {
                return;
            }
            var resourceList = ["tar", "ice"];
            var wr = SharkGame.World.worldResources;
            var multiplier = 1 / (level + 1);
            _.each(resourceList, function(resourceName) {
                if(wr[resourceName].artifactMultiplier) {
                    wr[resourceName].artifactMultiplier *= multiplier;
                } else {
                    wr[resourceName].artifactMultiplier = multiplier;
                }
            });
        }
    }
};