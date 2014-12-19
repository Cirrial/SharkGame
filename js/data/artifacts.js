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
        name: "Permanent Multiplier",
        desc: "TODO",
        max: 5,
        cost: function(level) {
            return Math.floor(Math.pow(10, level + 1));
        },
        effect: function(level) {
            SharkGame.Resources.specialMultiplier *= Math.max((2 * level), 1);
        }
    },
    planetTerraformer: {
        name: "World-Shaping Will",
        desc: "Reduce the severity of planet features.",
        max: 10,
        cost: function(level) {
            return Math.floor(Math.pow(4, level + 1));
        }
        // effect is handled specially
        // check SharkGame.World.getTerraformMultiplier
    },
    gateCostReducer: {
        name: "Gate Cost Reducer",
        desc: "TODO",
        max: 10,
        cost: function(level) {
            return Math.floor(Math.pow(3, level + 1));
        }
        // effect is handled specially
        // check SharkGame.World.getGateCostMultiplier
    },
    planetScanner: {
        name: "Planet Scanner",
        desc: "TODO",
        max: 15,
        cost: function(level) {
            return Math.floor(Math.pow(1.5, level + 1));
        }
        // effect is handled specially
        // check SharkGame.Gateway.getMaxWorldQualitiesToShow
    },
    sharkMigrator: {
        name: "Shark Migrator",
        desc: "TODO",
        max: 10,
        required: ["shark"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "shark");
        }
    },
    rayMigrator: {
        name: "Ray Migrator",
        desc: "TODO",
        max: 10,
        required: ["ray"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "ray");
        }
    },
    crabMigrator: {
        name: "Crab Migrator",
        desc: "TODO",
        max: 10,
        required: ["crab"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "crab");
        }
    },
    shrimpMigrator: {
        name: "Shrimp Migrator",
        desc: "TODO",
        max: 10,
        required: ["shrimp"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "shrimp");
        }
    },
    lobsterMigrator: {
        name: "Lobster Migrator",
        desc: "TODO",
        max: 10,
        required: ["lobster"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "lobster");
        }
    },
    dolphinMigrator: {
        name: "Dolphin Migrator",
        desc: "TODO",
        max: 10,
        required: ["dolphin"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "dolphin");
        }
    },
    whaleMigrator: {
        name: "Whale Migrator",
        desc: "TODO",
        max: 10,
        required: ["whale"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "whale");
        }
    },
    eelMigrator: {
        name: "Eel Migrator",
        desc: "TODO",
        max: 10,
        required: ["eel"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "eel");
        }
    },
    chimaeraMigrator: {
        name: "Chimaera Migrator",
        desc: "TODO",
        max: 10,
        required: ["chimaera"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "chimaera");
        }
    },
    octopusMigrator: {
        name: "Octopus Migrator",
        desc: "TODO",
        max: 10,
        required: ["octopus"],
        cost: SharkGame.ArtifactUtil.migratorCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.migratorEffect(level, "octopus");
        }
    },
    sharkTotem: {
        name: "Totem of Shark",
        desc: "Increase the effectivness of sharks and their roles. ",
        max: 10,
        required: ["shark"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["shark", "scientist", "nurse"]);
        }
    },
    rayTotem: {
        name: "Totem of Ray",
        desc: "TODO",
        max: 10,
        required: ["ray"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["ray", "laser", "maker"]);
        }
    },
    crabTotem: {
        name: "Totem of Crab",
        desc: "TODO",
        max: 10,
        required: ["crab"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["crab", "planter", "brood"]);
        }
    },
    shrimpTotem: {
        name: "Totem of Shrimp",
        desc: "TODO",
        max: 10,
        required: ["shrimp"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["shrimp", "worker", "queen"]);
        }
    },
    lobsterTotem: {
        name: "Totem of Lobster",
        desc: "TODO",
        max: 10,
        required: ["lobster"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["lobster", "berrier", "harvester"]);
        }
    },
    dolphinTotem: {
        name: "Totem of Dolphin",
        desc: "TODO",
        max: 10,
        required: ["dolphin"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["dolphin", "philosopher", "biologist", "treasurer"]);
        }
    },
    whaleTotem: {
        name: "Totem of Whale",
        desc: "TODO",
        max: 10,
        required: ["whale"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["whale", "chorus"]);
        }
    },
    eelTotem: {
        name: "Totem of Eel",
        desc: "TODO",
        max: 10,
        required: ["eel"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["eel", "sifter", "pit", "technician"]);
        }
    },
    chimaeraTotem: {
        name: "Totem of Chimaera",
        desc: "TODO",
        max: 10,
        required: ["chimaera"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["chimaera", "transmuter", "explorer"]);
        }
    },
    octopusTotem: {
        name: "Totem of Octopus",
        desc: "TODO",
        max: 10,
        required: ["octopus"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["octopus", "collector", "scavenger"]);
        }
    },
    progressTotem: {
        name: "Totem of Progress",
        desc: "TODO",
        max: 10,
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["fishMachine", "sandDigger", "autoTransmuter", "crystalMiner", "skimmer", "purifier", "heater"]);
        }
    },
    carapaceTotem: {
        name: "Totem of Carapace",
        desc: "TODO",
        max: 10,
        required: ["shrimp", "lobster"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["spongeFarmer", "berrySprayer", "glassMaker"]);
        }
    },
    inspirationTotem: {
        name: "Totem of Inspiration",
        desc: "TODO",
        max: 10,
        required: ["dolphin"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["silentArchivist", "tirelessCrafter"]);
        }
    },
    industryTotem: {
        name: "Totem of Industry",
        desc: "TODO",
        max: 10,
        required: ["octopus"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            SharkGame.ArtifactUtil.totemEffect(level, ["clamCollector", "sprongeSmelter", "seaScourer", "prostheticPolyp"]);
        }
    },
    wardingTotem: {
        name: "Totem of Warding",
        desc: "TODO",
        max: 10,
        required: ["tar", "ice"],
        cost: SharkGame.ArtifactUtil.totemCost,
        effect: function(level) {
            if(level === 0) {
                return;
            }
            var resourceList = ["tar", "ice"];
            var wr = SharkGame.World.worldResources;
            var multiplier = 1 / (level + 1);
            _.each(resourceList, function(resourceName) {
                wr[resourceName].artifactMultiplier *= multiplier;
            });
        }
    }
};