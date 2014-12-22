SharkGame.PlayerResources = {};
SharkGame.PlayerIncomeTable = {};


SharkGame.Resources = {

    INCOME_COLOR: '#808080',
    TOTAL_INCOME_COLOR: '#A0A0A0',
    UPGRADE_MULTIPLIER_COLOR: '#606060',
    BOOST_MULTIPLIER_COLOR: '#60A060',
    WORLD_MULTIPLIER_COLOR: '#6060A0',
    ARTIFACT_MULTIPLIER_COLOR: '#6F968A',

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
    },

    processIncomes: function(timeDelta) {
        $.each(SharkGame.PlayerIncomeTable, function(k, v) {
            SharkGame.Resources.changeResource(k, v * timeDelta);
        });
    },

    recalculateIncomeTable: function(resources) {
        var r = SharkGame.Resources;
        var w = SharkGame.World;


        // clear income table first
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.PlayerIncomeTable[k] = 0;
        });

        var worldResources = w.worldResources;

        $.each(SharkGame.ResourceTable, function(name, resource) {

            var worldResourceInfo = worldResources[name];
            if(worldResourceInfo.exists) {
                var playerResource = SharkGame.PlayerResources[name];
                // for this resource, calculate the income it generates
                if(resource.income) {

                    var worldMultiplier = 1;
                    if(worldResourceInfo) {
                        worldMultiplier = worldResourceInfo.incomeMultiplier;
                    }


                    var costScaling = 1;
                    // run over all resources first to check if costs can be met
                    // if the cost can't be taken, scale the cost and output down to feasible levels
                    if(!resource.forceIncome) {
                        $.each(resource.income, function(k, v) {
                            var change = r.getProductAmountFromGeneratorResource(name, k);
                            if(change < 0) {
                                var resourceHeld = r.getResource(k);
                                if(resourceHeld + change <= 0) {
                                    var scaling = resourceHeld / -change;
                                    if(scaling >= 0 && scaling < 1) { // sanity checking
                                        costScaling = Math.min(costScaling, scaling);
                                    } else {
                                        costScaling = 0; // better to break this way than break explosively
                                    }
                                }
                            }
                        });
                    }

                    // if there is a cost and it can be taken (or if there is no cost)
                    // run over all resources to fill the income table
                    $.each(resource.income, function(k, v) {
                        var incomeChange = r.getProductAmountFromGeneratorResource(name, k, costScaling);
                        if(SharkGame.World.doesResourceExist(k)) {
                            SharkGame.PlayerIncomeTable[k] += incomeChange;
                        }
                    });
                }

                // calculate the income that should be added to this resource
                if(worldResourceInfo) {
                    var worldResourceIncome = worldResourceInfo.income;
                    var affectedResourceBoostMultiplier = worldResources[name].boostMultiplier;
                    SharkGame.PlayerIncomeTable[name] += worldResourceIncome * affectedResourceBoostMultiplier * r.getSpecialMultiplier();
                }
            }
        });
    },

    getProductAmountFromGeneratorResource: function(generator, product, costScaling) {
        var r = SharkGame.Resources;
        var w = SharkGame.World;
        var playerResource = SharkGame.PlayerResources[generator];
        if(typeof(costScaling) !== "number") {
            costScaling = 1;
        }
        return SharkGame.ResourceTable[generator].income[product] * r.getResource(generator) * costScaling *
            playerResource.incomeMultiplier * w.getWorldIncomeMultiplier(generator) *
            w.getWorldBoostMultiplier(product) * w.getArtifactMultiplier(generator) *
            r.getSpecialMultiplier();
    },

    getSpecialMultiplier: function() {
        return Math.max((SharkGame.Resources.getResource("numen") * 10), 1) * SharkGame.Resources.specialMultiplier;
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

        var resourceTable = SharkGame.PlayerResources[resource];
        var prevTotalAmount = resourceTable.totalAmount;

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
        var resourceTable = SharkGame.PlayerResources[resource];

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
        var visible = false;
        $.each(category.resources, function(_, v) {
            visible = visible || ((SharkGame.PlayerResources[v].totalAmount > 0) && SharkGame.World.doesResourceExist(v));
        });
        return visible;
    },

    getCategoryOfResource: function(resourceName) {
        var categoryName = "";
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
        var resources = [];
        $.each(SharkGame.ResourceCategories[categoryName].resources, function(i, v) {
            resources.push(v);
        });
        return resources;
    },

    isCategory: function(name) {
        return !(typeof(SharkGame.ResourceCategories[name]) === 'undefined')
    },

    isInCategory: function(resource, category) {
        return SharkGame.ResourceCategories[category].resources.indexOf(resource) !== -1;
    },

    getBaseOfResource: function(resourceName) {
        // if there are super-categories/base jobs of a resource, return that, otherwise return null
        var baseResourceName = null;
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
        var anyResources = false;
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
        var sufficientResources = true;
        $.each(SharkGame.ResourceTable, function(k, v) {
            var currentResource;
            if(!checkTotal) {
                currentResource = SharkGame.Resources.getResource(k);
            } else {
                currentResource = SharkGame.Resources.getTotalResource(k);
            }
            var listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if(typeof listResource === 'undefined') {
                listResource = 0;
            }
            if(currentResource < listResource) {
                sufficientResources = false;
            }
        });
        return sufficientResources;
    },

    changeManyResources: function(resourceList, subtract) {
        if(typeof subtract === 'undefined') {
            subtract = false;
        }

        $.each(resourceList, function(k, v) {
            var amount = v;
            if(subtract) {
                amount *= -1;
            }
            SharkGame.Resources.changeResource(k, amount);
        });
    },

    scaleResourceList: function(resourceList, amount) {
        var newList = {};
        $.each(resourceList, function(k, v) {
            newList[k] = v * amount;
        });
        return newList;
    },

    // update values in table without adding rows
    updateResourcesTable: function() {
        var rTable = $('#resourceTable');
        var m = SharkGame.Main;
        var r = SharkGame.Resources;

        // if resource table does not exist, there are no resources, so do not construct table
        // if a resource became visible when it previously wasn't, reconstruct the table
        if(r.rebuildTable) {
            r.reconstructResourcesTable();
        } else {
            // loop over table rows, update values
            $.each(SharkGame.PlayerResources, function(k, v) {
                $('#amount-' + k).html(m.beautify(v.amount, true));

                var income = r.getIncome(k);
                if(Math.abs(income) > SharkGame.EPSILON) {
                    var changeChar = income > 0 ? "+" : "";
                    $('#income-' + k).html("<span style='color:" + r.INCOME_COLOR + "'>" + changeChar + m.beautify(income) + "/s</span>");
                } else {
                    $('#income-' + k).html("");
                }
            });
        }
    },

    // add rows to table (more expensive than updating existing DOM elements)
    reconstructResourcesTable: function() {
        var rTable = $('#resourceTable');
        var m = SharkGame.Main;
        var r = SharkGame.Resources;
        var w = SharkGame.World;

        var statusDiv = $('#status');
        // if resource table does not exist, create
        if(rTable.length <= 0) {
            statusDiv.prepend('<h3>Stuff</h3>');
            var tableContainer = $('<div>').attr("id", "resourceTableContainer");
            tableContainer.append($('<table>').attr("id", 'resourceTable'));
            statusDiv.append(tableContainer);
            rTable = $('#resourceTable');
        }

        // remove the table contents entirely
        rTable.empty();

        var anyResourcesInTable = false;

        if(SharkGame.Settings.current.groupResources) {
            $.each(SharkGame.ResourceCategories, function(_, category) {
                if(r.isCategoryVisible(category)) {
                    var headerRow = $("<tr>").append($("<td>")
                        .attr("colSpan", 3)
                        .append($("<h3>")
                            .html(category.name)
                    ));
                    rTable.append(headerRow);
                    $.each(category.resources, function(k, v) {
                        if(r.getTotalResource(v) > 0) {
                            var row = r.constructResourceTableRow(v);
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
                    var row = r.constructResourceTableRow(k);
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
        var m = SharkGame.Main;
        var r = SharkGame.Resources;
        var k = resourceKey;
        var v = SharkGame.ResourceTable[k];
        var pr = SharkGame.PlayerResources[k];
        var income = r.getIncome(k);
        var row = $('<tr>');
        if(pr.totalAmount > 0) {
            row.append($('<td>')
                    .attr("id", "resource-" + k)
                    .html(SharkGame.Resources.getResourceName(k))
            );

            row.append($('<td>')
                    .attr("id", "amount-" + k)
                    .html(m.beautify(pr.amount))
            );

            var incomeId = $('<td>')
                .attr("id", "income-" + k);

            row.append(incomeId);

            if(Math.abs(income) > SharkGame.EPSILON) {
                var changeChar = income > 0 ? "+" : "";
                incomeId.html("<span style='color:" + r.INCOME_COLOR + "'>" + changeChar + m.beautify(income) + "/s</span>");
            }
        }
        return row;
    },

    getResourceName: function(resourceName, darken, forceSingle) {
        var resource = SharkGame.ResourceTable[resourceName];
        var name = (((Math.floor(SharkGame.PlayerResources[resourceName].amount) - 1) < SharkGame.EPSILON) || forceSingle) ? resource.singleName : resource.name;

        if(SharkGame.Settings.current.colorCosts) {
            var color = resource.color;
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
        var formattedResourceList = "";
        $.each(SharkGame.ResourceTable, function(k, v) {
            var listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if(listResource > 0 && SharkGame.World.doesResourceExist(k)) {
                var isSingular = (Math.floor(listResource) - 1) < SharkGame.EPSILON;
                formattedResourceList += SharkGame.Main.beautify(listResource);
                formattedResourceList += " " + SharkGame.Resources.getResourceName(k, darken, isSingular) + ", ";
            }
        });
        // snip off trailing suffix
        formattedResourceList = formattedResourceList.slice(0, -2);
        return formattedResourceList;
    },

    getResourceSources: function(resource) {
        var sources = {"income": [], "actions": []};
        // go through all incomes
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(v.income) {
                var incomeForResource = v.income[resource];
                if(incomeForResource > 0) {
                    sources.income.push(k);
                }
            }
        });
        // go through all actions
        $.each(SharkGame.HomeActions, function(k, v) {
            var resourceEffect = v.effect.resource;
            if(resourceEffect) {
                if(resourceEffect[resource] > 0) {
                    sources.actions.push(k);
                }
            }
        });
        return sources;
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
        var r = SharkGame.Resources;
        var l = SharkGame.World;
        var dependencies = [];
        if(!alreadyKnownList) {
            alreadyKnownList = []; // tracks resources we've already seen, an effort to combat cyclic dependencies
        }

        var sources = r.getResourceSources(resource);
        // get resource costs for actions that directly get this
        // only care about the resource types required
        $.each(sources.actions, function(_, v) {
            var actionCost = SharkGame.HomeActions[v].cost;
            $.each(actionCost, function(_, w) {
                var resource = w.resource;
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