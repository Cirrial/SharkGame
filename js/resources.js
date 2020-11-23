SharkGame.PlayerResources = {};
SharkGame.PlayerIncomeTable = {};


SharkGame.Resources = {

    INCOME_COLOR: "#808080",
    TOTAL_INCOME_COLOR: "#A0A0A0",
    UPGRADE_MULTIPLIER_COLOR: "#606060",
    BOOST_MULTIPLIER_COLOR: "#60A060",
    WORLD_MULTIPLIER_COLOR: "#6060A0",
    ARTIFACT_MULTIPLIER_COLOR: "#6F968A",
    RESOURCE_AFFECT_MULTIPLIER_COLOR: "#BFBF5A",

    specialMultiplier: null,
    rebuildTable: false,

    init: function() {
        // set all the amounts and total amounts of resources to 0
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.PlayerResources[k] = {};
            SharkGame.PlayerResources[k].amount = 0;
            SharkGame.PlayerResources[k].totalAmount = 0;
            SharkGame.PlayerResources[k].incomeMultiplier = 1;
        });

        // populate income table with an entry for each resource!!
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.PlayerIncomeTable[k] = 0;
        });

        SharkGame.Resources.specialMultiplier = 1;
        SharkGame.Resources.buildIncomeNetwork();
    },

    processIncomes: function(timeDelta) {
        if(timeDelta > 51) {
            for(let i = 0;i < 50;i++) {
                $.each(SharkGame.PlayerIncomeTable, function(k, v) {
                    if(!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                        SharkGame.Resources.changeResource(k, v);
                    } else {
                        SharkGame.Resources.changeResource(k, v);
                    }
                });
                SharkGame.Resources.recalculateIncomeTable();
                timeDelta -= 1;
            }

            if(timeDelta > 172800) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta,timeDelta/1000,50000);
            }

            if(timeDelta > 43200) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta,200,8000);
            }

            if(timeDelta > 7200) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta,125,2250);
            }

            if(timeDelta > 2000) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta,50,500);
            }

            if(timeDelta > 50) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta,20,50);
            }
        }
        while(timeDelta > 1) {
            $.each(SharkGame.PlayerIncomeTable, function(k, v) {
                if(!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, v);
                } else {
                    SharkGame.Resources.changeResource(k, v);
                }
            });
            SharkGame.Resources.recalculateIncomeTable();
            timeDelta -= 1;
        }
        $.each(SharkGame.PlayerIncomeTable, function(k, v) {
            if(!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                SharkGame.Resources.changeResource(k, v*timeDelta);
            } else {
                SharkGame.Resources.changeResource(k, v);
            }
        });
    },

    doRKMethod: function(time, h, stop) {
        const r = SharkGame.Resources
        const w = SharkGame.World

        let originalResources
        let originalIncomes
        let stepTwoIncomes
        let stepThreeIncomes
        let stepFourIncomes

        while(time > stop) {
            originalResources = $.extend(true,{},SharkGame.PlayerResources);
            originalIncomes = $.extend(true,{},SharkGame.PlayerIncomeTable);

            $.each(SharkGame.PlayerIncomeTable, function(k, v) {
                if(!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, v*h/2);
                }
            });

            r.recalculateIncomeTable();

            stepTwoIncomes = $.extend(true,{},SharkGame.PlayerIncomeTable);
            $.each(SharkGame.PlayerIncomeTable, function(k, v) {
                if(!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, v*h/2);
                }
            });

            r.recalculateIncomeTable();

            stepThreeIncomes = $.extend(true,{},SharkGame.PlayerIncomeTable);
            $.each(SharkGame.PlayerIncomeTable, function(k, v) {
                if(!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, v*h);
                }
            });

            r.recalculateIncomeTable();

            stepFourIncomes = $.extend(true,{},SharkGame.PlayerIncomeTable);

            SharkGame.PlayerResources = $.extend(true,{},originalResources);

            $.each(originalIncomes, function(resource, object) {
                SharkGame.Resources.changeResource(resource,h*(originalIncomes[resource]+2*stepTwoIncomes[resource]+2*stepThreeIncomes[resource]+stepFourIncomes[resource])/6);
            });
            r.recalculateIncomeTable();
            time -= h;
        }
        return time;
    },

    recalculateIncomeTable: function() {
        const r = SharkGame.Resources;
        const w = SharkGame.World;


        // clear income table first
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.PlayerIncomeTable[k] = 0;
        });

        const worldResources = w.worldResources;

        $.each(SharkGame.ResourceTable, function(name, resource) {

            const worldResourceInfo = worldResources[name];
            if(worldResourceInfo.exists) {
                // for this resource, calculate the income it generates
                if(resource.income) {
                    $.each(resource.income, function(k, v) {
                        // run over all resources first to check if costs can be met
                        // if the cost can't be taken, scale the cost and output down to feasible levels
                        if(SharkGame.World.doesResourceExist(k)) {
                            let costScaling = 1;
                            const change = r.getProductAmountFromGeneratorResource(name, k);
                            if(!resource.forceIncome) {
                                if(change < 0) {
                                    const resourceHeld = r.getResource(k);
                                    if(resourceHeld + change <= 0) {
                                        const scaling = resourceHeld / -change;
                                        if(scaling >= 0 && scaling < 1) { // sanity checking
                                            costScaling = Math.min(costScaling, scaling);
                                        } else {
                                            costScaling = 0; // better to break this way than break explosively
                                        }
                                    }
                                }
                            }
                            SharkGame.PlayerIncomeTable[k] += change * costScaling;
                        }
                    });
                }

                // calculate the income that should be added to this resource
                if(worldResourceInfo) {
                    const worldResourceIncome = worldResourceInfo.income;
                    const affectedResourceBoostMultiplier = worldResources[name].boostMultiplier;
                    SharkGame.PlayerIncomeTable[name] += worldResourceIncome * affectedResourceBoostMultiplier;
                }
            }
        });
    },

    getProductAmountFromGeneratorResource: function(generator, product, costScaling) {
        const r = SharkGame.Resources;
        const w = SharkGame.World;
        const rp = SharkGame.ResourceSpecialProperties
        const playerResource = SharkGame.PlayerResources[generator];
        if(!r.getResourceCombinationAllowed(generator, product)) {
            return 0;
        }
        if(typeof(costScaling) !== "number") {
            costScaling = 1;
        }
        const generated = SharkGame.ResourceTable[generator].income[product] * r.getResource(generator) * costScaling *
            playerResource.incomeMultiplier * w.getWorldIncomeMultiplier(generator) *
            w.getWorldBoostMultiplier(product) * w.getArtifactMultiplier(generator) *
            r.getResourceGeneratorMultiplier(generator) * r.getResourceIncomeMultiplier(product);
        if(rp.incomeCap[product]) {
            if(SharkGame.PlayerIncomeTable[product] + generated > rp.incomeCap[product]) {
                return rp.incomeCap[product] - SharkGame.PlayerIncomeTable[product];
            }
        }
        return generated;
    },

    getResourceGeneratorMultiplier: function(generator) {
        return SharkGame.Resources.getNetworkIncomeModifier(2,generator);
    },

    getResourceIncomeMultiplier: function(product) {
        return SharkGame.Resources.getNetworkIncomeModifier(1,product);
    },

    getNetworkIncomeModifier: function(network, resource) {
        let node;
        if(network === 1) {
            node = SharkGame.ResourceIncomeAffectedApplicable[resource]
        } else if(network === 2) {
            node = SharkGame.GeneratorIncomeAffectedApplicable[resource]
        } else {
            return 1;
        }
        let multiplier = 1;
        if(node) {
            if(node.multiply){
                $.each(node.multiply, function(k, v) {
                    multiplier = multiplier + v * SharkGame.Resources.getResource(k);
                });
            }
            if(node.reciprocate){
                $.each(node.reciprocate, function(k, v) {
                    multiplier = multiplier / (1 + v * SharkGame.Resources.getResource(k));
                });
            }
            if(node.exponentiate){
                $.each(node.exponentiate, function(k, v) {
                    multiplier = multiplier * Math.pow(v, SharkGame.Resources.getResource(k));
                });
            }
            if(node.polynomial){
                $.each(node.polynomial, function(k, v) {
                    multiplier = multiplier + Math.pow(SharkGame.Resources.getResource(k), v);
                });
            }
        }
        return multiplier;
    },

    getResourceCombinationAllowed: function(generator, product) {
        if(generator in SharkGame.World.worldRestrictedCombinations) {
            return !(SharkGame.World.worldRestrictedCombinations[generator].includes(product));
        } else {
            return true;
        }
    },

    getSpecialMultiplier: function(generator) {
        return 1;
    },

    getIncome: function(resource) {
        return SharkGame.PlayerIncomeTable[resource]
    },

    getMultiplier: function(resource) {
        return SharkGame.PlayerResources[resource].incomeMultiplier;
    },

    setMultiplier: function(resource, multiplier) {
        SharkGame.PlayerResources[resource].incomeMultiplier = multiplier;
        SharkGame.Resources.recalculateIncomeTable();
    },

    // Adds or subtracts resources based on amount given.
    changeResource: function(resource, amount) {
        if(Math.abs(amount) < SharkGame.EPSILON) {
            return; // ignore changes below epsilon
        }

        const resourceTable = SharkGame.PlayerResources[resource];
        const prevTotalAmount = resourceTable.totalAmount;

        if(!SharkGame.World.doesResourceExist(resource)) {
            return; // don't change resources that don't technically exist
        }

        resourceTable.amount += amount;
        if(resourceTable.amount < 0) {
            resourceTable.amount = 0;
        }

        if(amount > 0) {
            resourceTable.totalAmount += amount;
        }

        if(prevTotalAmount < SharkGame.EPSILON) {
            // we got a new resource
            SharkGame.Resources.rebuildTable = true;
        }

        SharkGame.Resources.recalculateIncomeTable();
    },

    setResource: function(resource, newValue) {
        const resourceTable = SharkGame.PlayerResources[resource];

        resourceTable.amount = newValue;
        if(resourceTable.amount < 0) {
            resourceTable.amount = 0;
        }
        SharkGame.Resources.recalculateIncomeTable();
    },

    setTotalResource: function(resource, newValue) {
        SharkGame.PlayerResources[resource].totalAmount = newValue;
    },

    getResource: function(resource) {
        return SharkGame.PlayerResources[resource].amount;
    },

    getTotalResource: function(resource) {
        return SharkGame.PlayerResources[resource].totalAmount;
    },

    isCategoryVisible: function(category) {
        let visible = false;
        $.each(category.resources, function(_, v) {
            visible = visible || ((SharkGame.PlayerResources[v].totalAmount > 0) && SharkGame.World.doesResourceExist(v));
        });
        return visible;
    },

    getCategoryOfResource: function(resourceName) {
        let categoryName = "";
        $.each(SharkGame.ResourceCategories, function(categoryKey, categoryValue) {
            if(categoryName !== "") {
                return;
            }
            $.each(categoryValue.resources, function(k, v) {
                if(categoryName !== "") {
                    return;
                }
                if(resourceName == v) {
                    categoryName = categoryKey;
                }
            });
        });
        return categoryName;
    },

    getResourcesInCategory: function(categoryName) {
        const resources = [];
        $.each(SharkGame.ResourceCategories[categoryName].resources, function(i, v) {
            resources.push(v);
        });
        return resources;
    },

    isCategory: function(name) {
        return !(typeof(SharkGame.ResourceCategories[name]) === "undefined")
    },

    isInCategory: function(resource, category) {
        return SharkGame.ResourceCategories[category].resources.indexOf(resource) !== -1;
    },

    getBaseOfResource: function(resourceName) {
        // if there are super-categories/base jobs of a resource, return that, otherwise return null
        let baseResourceName = null;
        $.each(SharkGame.ResourceTable, function(key, value) {
            if(baseResourceName) {
                return;
            }
            if(value.jobs) {
                $.each(value.jobs, function(_, jobName) {
                    if(baseResourceName) {
                        return;
                    }
                    if(jobName === resourceName) {
                        baseResourceName = key;
                    }
                });
            }
        });
        return baseResourceName;
    },

    haveAnyResources: function() {
        let anyResources = false;
        $.each(SharkGame.PlayerResources, function(_, v) {
            if(!anyResources) {
                anyResources = v.totalAmount > 0;
            }
        });
        return anyResources;
    },

    // returns true if enough resources are held (>=)
    // false if they are not
    checkResources: function(resourceList, checkTotal) {
        let sufficientResources = true;
        $.each(SharkGame.ResourceTable, function(k, v) {
            let currentResource;
            if(!checkTotal) {
                currentResource = SharkGame.Resources.getResource(k);
            } else {
                currentResource = SharkGame.Resources.getTotalResource(k);
            }
            let listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if(typeof listResource === "undefined") {
                listResource = 0;
            }
            if(currentResource < listResource) {
                sufficientResources = false;
            }
        });
        return sufficientResources;
    },

    changeManyResources: function(resourceList, subtract) {
        if(typeof subtract === "undefined") {
            subtract = false;
        }

        $.each(resourceList, function(k, v) {
            let amount = v;
            if(subtract) {
                amount *= -1;
            }
            SharkGame.Resources.changeResource(k, amount);
        });
    },

    scaleResourceList: function(resourceList, amount) {
        const newList = {};
        $.each(resourceList, function(k, v) {
            newList[k] = v * amount;
        });
        return newList;
    },

    // update values in table without adding rows
    updateResourcesTable: function() {
        const rTable = $("#resourceTable");
        const m = SharkGame.Main;
        const r = SharkGame.Resources;

        // if resource table does not exist, there are no resources, so do not construct table
        // if a resource became visible when it previously wasn't, reconstruct the table
        if(r.rebuildTable) {
            r.reconstructResourcesTable();
        } else {
            // loop over table rows, update values
            $.each(SharkGame.PlayerResources, function(k, v) {
                $("#amount-" + k).html(m.beautify(v.amount, true));

                const income = r.getIncome(k);
                if(Math.abs(income) > SharkGame.EPSILON) {
                    const changeChar = income > 0 ? "+" : "";
                    $("#income-" + k).html("<span style='color:" + r.INCOME_COLOR + "'>" + changeChar + m.beautify(income,false,2) + "/s</span>");
                } else {
                    $("#income-" + k).html("");
                }
            });
        }
    },

    // add rows to table (more expensive than updating existing DOM elements)
    reconstructResourcesTable: function() {
        let rTable = $("#resourceTable");
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const w = SharkGame.World;

        const statusDiv = $("#status");
        // if resource table does not exist, create
        if(rTable.length <= 0) {
            statusDiv.prepend("<h3>Stuff</h3>");
            const tableContainer = $("<div>").attr("id", "resourceTableContainer");
            tableContainer.append($("<table>").attr("id", "resourceTable"));
            statusDiv.append(tableContainer);
            rTable = $("#resourceTable");
        }

        // remove the table contents entirely
        rTable.empty();

        let anyResourcesInTable = false;

        if(SharkGame.Settings.current.groupResources) {
            $.each(SharkGame.ResourceCategories, function(_, category) {
                if(r.isCategoryVisible(category)) {
                    const headerRow = $("<tr>").append($("<td>")
                        .attr("colSpan", 3)
                        .append($("<h3>")
                            .html(category.name)
                        ));
                    rTable.append(headerRow);
                    $.each(category.resources, function(k, v) {
                        if(r.getTotalResource(v) > 0) {
                            const row = r.constructResourceTableRow(v);
                            rTable.append(row);
                            anyResourcesInTable = true;
                        }
                    });
                }
            });
        } else {
            // iterate through data, if total amount > 0 add a row
            $.each(SharkGame.ResourceTable, function(k, v) {
                if(r.getTotalResource(k) > 0 && w.doesResourceExist(k)) {
                    const row = r.constructResourceTableRow(k);
                    rTable.append(row);
                    anyResourcesInTable = true;
                }
            });
        }

        // if the table is still empty, hide the status div
        // otherwise show it
        if(!anyResourcesInTable) {
            statusDiv.hide();
        } else {
            statusDiv.show();
        }

        r.rebuildTable = false;
    },

    constructResourceTableRow: function(resourceKey) {
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const k = resourceKey;
        const v = SharkGame.ResourceTable[k];
        const pr = SharkGame.PlayerResources[k];
        const income = r.getIncome(k);
        const row = $("<tr>");
        if(pr.totalAmount > 0) {
            row.append($("<td>")
                .attr("id", "resource-" + k)
                .html(SharkGame.Resources.getResourceName(k))
            );

            row.append($("<td>")
                .attr("id", "amount-" + k)
                .html(m.beautify(pr.amount))
            );

            const incomeId = $("<td>")
                .attr("id", "income-" + k);

            row.append(incomeId);

            if(Math.abs(income) > SharkGame.EPSILON) {
                const changeChar = income > 0 ? "+" : "";
                incomeId.html("<span style='color:" + r.INCOME_COLOR + "'>" + changeChar + m.beautify(income,false,2) + "/s</span>");
            }
        }
        return row;
    },

    getResourceName: function(resourceName, darken, forceSingle) {
        const resource = SharkGame.ResourceTable[resourceName];
        let name = (((Math.floor(SharkGame.PlayerResources[resourceName].amount) - 1) < SharkGame.EPSILON) || forceSingle) ? resource.singleName : resource.name;

        if(SharkGame.Settings.current.colorCosts) {
            let color = resource.color;
            if(darken) {
                color = SharkGame.colorLum(resource.color, -0.5);
            }
            name = "<span class='click-passthrough' style='color:" + color + "'>" + name + "</span>";
        }
        return name;
    },


    // make a resource list object into a string describing its contents
    resourceListToString: function(resourceList, darken) {
        if($.isEmptyObject(resourceList)) {
            return "";
        }
        let formattedResourceList = "";
        $.each(SharkGame.ResourceTable, function(k, v) {
            const listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if(listResource > 0 && SharkGame.World.doesResourceExist(k)) {
                const isSingular = (Math.floor(listResource) - 1) < SharkGame.EPSILON;
                formattedResourceList += SharkGame.Main.beautify(listResource);
                formattedResourceList += " " + SharkGame.Resources.getResourceName(k, darken, isSingular) + ", ";
            }
        });
        // snip off trailing suffix
        formattedResourceList = formattedResourceList.slice(0, -2);
        return formattedResourceList;
    },

    getResourceSources: function(resource) {
        const sources = {"income": [], "actions": []};
        // go through all incomes
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(v.income) {
                const incomeForResource = v.income[resource];
                if(incomeForResource > 0) {
                    sources.income.push(k);
                }
            }
        });
        // go through all actions
        $.each(SharkGame.HomeActions, function(k, v) {
            const resourceEffect = v.effect.resource;
            if(resourceEffect) {
                if(resourceEffect[resource] > 0) {
                    sources.actions.push(k);
                }
            }
        });
        return sources;
    },

    buildIncomeNetwork: function(specifically) {
        // completes the network of resources whose incomes are affected by other resources
        // takes the order of the gia and reverses it to get the rgad.

        const gia = SharkGame.GeneratorIncomeAffectors
        const rgad = SharkGame.GeneratorIncomeAffected
        const rc = SharkGame.ResourceCategories
        if(specifically) {
            null;
        } else {
            // recursively parse the gia
            $.each(gia, function(resource) {
                $.each(gia[resource], function(type) {
                    $.each(gia[resource][type], function(generator, value) {
                        // check for issues worth throwing over
                        if(SharkGame.ResourceTable[generator]) {
                            if(!SharkGame.ResourceTable[generator].income) {
                                throw new Error("Issue building income network, generator has no income, not actually a generator! Try changing resource table generators.");
                            }
                        }

                        // is it a category or a generator?
                        const nodes = SharkGame.Resources.isCategory(generator) ? rc[generator].resources : [generator]

                        // recursively reconstruct the table with the keys in the inverse order
                        $.each(nodes, function(k, v) {
                            if(!rgad[v]) {
                                rgad[v] = {};
                                rgad[v][type] = {};
                            } else {
                                if(!rgad[v][type]) {
                                    rgad[v][type] = {};
                                }
                            }
                            rgad[v][type][resource] = value;
                        });
                    });
                });
            });
        }

        // resources incomes below, generators above

        const ria = SharkGame.ResourceIncomeAffectors
        const rad = SharkGame.ResourceIncomeAffected
        if(specifically) {
            null;
        } else {
            // recursively parse the ria
            $.each(ria, function(affectorResource) {
                $.each(ria[affectorResource], function(type) {
                    $.each(ria[affectorResource][type], function(affectedResource, degree) {
                        // s: is it a category?
                        const nodes = SharkGame.Resources.isCategory(affectedResource) ? rc[affectedResource].resources : [affectedResource]

                        // recursively reconstruct the table with the keys in the inverse order
                        $.each(nodes, function(k, v) {
                            if(!rad[v]) {
                                rad[v] = {};
                                rad[v][type] = {};
                            } else {
                                if(!rad[v][type]) {
                                    rad[v][type] = {};
                                }
                            }
                            rad[v][type][affectorResource] = degree;
                        });
                    });
                });
            });
        }
    },

    buildApplicableNetworks: function() {
        // this function builds two networks that contain all actually relevant relationships for a given world
        const w = SharkGame.World
        const apprgad = SharkGame.GeneratorIncomeAffectedApplicable
        const apprad = SharkGame.ResourceIncomeAffectedApplicable
        const rgad = SharkGame.GeneratorIncomeAffected
        const rad = SharkGame.ResourceIncomeAffected
        $.each(rgad, function(generator) {
            $.each(rgad[generator], function(type) {
                $.each(rgad[generator][type], function(affector, degree) {
                    if(w.worldResources[generator].exists && w.worldResources[affector].exists) {
                        if(!apprgad[generator]) {
                            apprgad[generator] = {};
                            apprgad[generator][type] = {};
                        } else if(!apprgad[generator][type]) {
                            apprgad[generator][type] = {};
                        }
                        apprgad[generator][type][affector] = degree;
                    }
                });
            });
        });
        $.each(rad, function(resource) {
            $.each(rad[resource], function(type) {
                $.each(rad[resource][type], function(affector, degree) {
                    if(w.worldResources[resource].exists && w.worldResources[affector].exists) {
                        if(!apprad[resource]) {
                            apprad[resource] = {};
                            apprad[resource][type] = {};
                        } else if(!apprad[resource][type]) {
                            apprad[resource][type] = {};
                        }
                        apprad[resource][type][affector] = degree;
                    }
                });
            });
        });
    },

    // TESTING FUNCTIONS
    giveMeSomeOfEverything: function(amount) {
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.Resources.changeResource(k, amount);
        });
    },


    // this was going to be used to randomise what resources were available but it needs better work to point out what is REQUIRED and what is OPTIONAL
    // create all chains that terminate only at a cost-free action to determine how to get to a resource
    // will return a weird vaguely tree structure of nested arrays (ughhh I need to learn how to OOP in javascript at some point, what a hack)
    getResourceDependencyChains: function(resource, alreadyKnownList) {
        const r = SharkGame.Resources;
        const l = SharkGame.World;
        const dependencies = [];
        if(!alreadyKnownList) {
            alreadyKnownList = []; // tracks resources we've already seen, an effort to combat cyclic dependencies
        }

        const sources = r.getResourceSources(resource);
        // get resource costs for actions that directly get this
        // only care about the resource types required
        $.each(sources.actions, function(_, v) {
            const actionCost = SharkGame.HomeActions[v].cost;
            $.each(actionCost, function(_, w) {
                const resource = w.resource;
                if(l.doesResourceExist(resource)) {
                    dependencies.push(resource);
                    alreadyKnownList.push(resource);
                }
            })
        });

        // get dependencies for income resources
        $.each(sources.income, function(_, v) {
            if(l.doesResourceExist(v)) {
                if(alreadyKnownList.indexOf(v) === -1) {
                    dependencies.push(r.getResourceDependencyChains(v, alreadyKnownList));
                }
            }
        });

        return dependencies;
    }
};