SharkGame.WorldModifiers = {
    planetaryIncome: {
        name: "Planetary Income",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).income = level * amount;
        },
    },
    planetaryConstantIncome: {
        name: "Planetary Constant Income",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).income = amount;
        },
    },
    planetaryIncomeMultiplier: {
        name: "Planetary Income Multiplier",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).incomeMultiplier = 1 + level * amount;
        },
    },
    planetaryFixedIncomeMultiplier: {
        name: "Fixed Planetary Income Multiplier",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).incomeMultiplier = amount;
        },
    },
    planetaryIncomeReciprocalMultiplier: {
        name: "Planetary Income Reciprocal Multiplier",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).incomeMultiplier = 1 / (1 + level * amount);
        },
    },
    planetaryFixedIncomeReciprocalMultiplier: {
        name: "Fixed Planetary Income Reciprocal Multiplier",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).incomeMultiplier = 1 / amount;
        },
    },
    planetaryResourceBoost: {
        name: "Planetary Boost",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).boostMultiplier = 1 + level * amount;
        },
    },
    planetaryResourceReciprocalBoost: {
        name: "Planetary Reciprocal Boost",
        apply(level, resourceName, amount) {
            const wr = w.worldResources;
            wr.get(resourceName).boostMultiplier = 1 / (1 + level * amount);
        },
    },
    planetaryStartingResources: {
        name: "Planetary Starting Resources",
        apply(level, resourceName, amount) {
            const bonus = level * amount;
            const res = r.getTotalResource(resourceName);
            if (res < bonus) {
                r.changeResource(resourceName, bonus);
            }
        },
    },
    planetaryGeneratorRestriction: {
        name: "Restricted Generator-Income Combination",
        apply(generator, restrictedResource) {
            w.worldRestrictedCombinations.set(generator, restrictedResource);
        },
    },
};

SharkGame.World = {
    worldType: "start",
    worldResources: new Map(),
    worldRestrictedCombinations: new Map(),
    planetLevel: 1,

    init() {
        //w.worldType = "start";
        //w.planetLevel = 1;
        //w.worldResources = {};
        w.resetWorldProperties();
    },

    apply() {
        w.applyWorldProperties(w.planetLevel);
        w.applyGateCosts(w.planetLevel);
    },

    resetWorldProperties() {
        const wr = w.worldResources;
        w.worldRestrictedCombinations.clear();

        // set up defaults
        SharkGame.ResourceMap.forEach((v, k, m) => {
            wr.set(k, {});
            wr.get(k).exists = true;
            wr.get(k).income = 0;
            wr.get(k).incomeMultiplier = 1;
            wr.get(k).boostMultiplier = 1;
            wr.get(k).artifactMultiplier = 1;
        });
    },

    applyWorldProperties(level) {
        const wr = w.worldResources;
        const worldInfo = SharkGame.WorldTypes[w.worldType];

        // get multiplier
        const terraformMultiplier = w.getTerraformMultiplier();
        const effectiveLevel = Math.max(Math.floor(level * terraformMultiplier), 1);

        // enable resources allowed on the planet
        if (worldInfo.includedResources) {
            SharkGame.ResourceMap.forEach((v, k, m) => {
                wr.get(k).exists = false;
            });
            $.each(worldInfo.includedResources, (ident, group) => {
                if (SharkGame.InternalCategories[group]) {
                    $.each(SharkGame.InternalCategories[group].resources, (identwo, resource) => {
                        wr.get(resource).exists = true;
                    });
                } else {
                    wr.get(group).exists = true;
                }
            });
        }


        // disable resources not allowed on planet
        if (worldInfo.absentResources) {
            $.each(worldInfo.absentResources, (i, v) => {
                wr.get(v).exists = false;
            });
        }

        // apply world modifiers
        _.each(worldInfo.modifiers, (modifierData) => {
            if (modifierData.type === "multiplier") {
                if (r.isCategory(modifierData.resource)) {
                    const resourceList = r.getResourcesInCategory(modifierData.resource);
                    _.each(resourceList, (resourceName) => {
                        SharkGame.WorldModifiers[modifierData.modifier].apply(
                            effectiveLevel,
                            resourceName,
                            modifierData.amount
                        );
                    });
                } else {
                    SharkGame.WorldModifiers[modifierData.modifier].apply(
                        effectiveLevel,
                        modifierData.resource,
                        modifierData.amount
                    );
                }
            } else {
                let resourceList = [modifierData.resource];
                let restrictionList = [modifierData.restriction];
                if (r.isCategory(modifierData.resource)) {
                    resourceList = r.getResourcesInCategory(modifierData.resource);
                }
                if (r.isCategory(modifierData.restriction)) {
                    restrictionList = r.getResourcesInCategory(modifierData.restriction);
                }
                _.each(resourceList, (resourceName) => {
                    _.each(restrictionList, (restriction) => {
                        SharkGame.WorldModifiers[modifierData.modifier].apply(resourceName, restriction);
                    });
                });
            }
        });
        r.buildApplicableNetworks();
    },

    applyGateCosts(_level) {
        const worldInfo = SharkGame.WorldTypes[w.worldType];

        // get multiplier
        const gateCostMultiplier = w.getGateCostMultiplier();

        SharkGame.Gate.createSlots(worldInfo.gateCosts, w.planetLevel, gateCostMultiplier);
    },

    getWorldEntryMessage() {
        return SharkGame.WorldTypes[w.worldType].entry;
    },

    // does this resource exist on this planet?
    doesResourceExist(resourceName) {
        return w.worldResources.get(resourceName).exists;
    },

    forceExistence(resourceName) {
        w.worldResources.get(resourceName).exists = true;
    },

    getWorldIncomeMultiplier(resourceName) {
        return w.worldResources.get(resourceName).incomeMultiplier;
    },

    getWorldBoostMultiplier(resourceName) {
        return w.worldResources.get(resourceName).boostMultiplier;
    },

    getArtifactMultiplier(resourceName) {
        const artifactMultiplier = w.worldResources.get(resourceName).artifactMultiplier;
        return artifactMultiplier;
    },

    // these things are only impacted by artifacts so far

    getTerraformMultiplier() {
        // temporarily disabled the terraformer because it might screw with game balance down the line.
        //
        // const ptLevel = SharkGame.Artifacts.planetTerraformer.level;
        // return ptLevel > 0 ? Math.pow(0.9, ptLevel) : 1;
        return 1;
    },

    getGateCostMultiplier() {
        const gcrLevel = SharkGame.Artifacts.gateCostReducer.level;
        return gcrLevel > 0 ? Math.pow(0.9, gcrLevel) : 1;
    },
};
