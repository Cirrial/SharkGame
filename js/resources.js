SharkGame.ResourceTable = {

    essence: {
        name: 'essence',
        singleName: 'essence',
        color: '#ACE3D1',
        value: -1
    },

    shark: {
        name: 'sharks',
        singleName: 'shark',
        color: '#92C1E0',
        income: {
            'fish': 1
        },
        jobs: [
            "scientist",
            "nurse"
        ],
        value: 1000
    },

    ray: {
        name: 'rays',
        singleName: 'ray',
        color: '#0C0FAD',
        income: {
            'fish': 0.2,
            'sand': 1
        },
        jobs: [
            "laser",
            "maker"
        ],
        value: 1500
    },

    crab: {
        name: 'crabs',
        singleName: 'crab',
        color: '#9C2424',
        income: {
            'crystal': 0.01
        },
        jobs: [
            "planter",
            "brood"
        ],
        value: 1000
    },

    scientist: {
        name: 'science sharks',
        singleName: 'science shark',
        color: '#DCEBF5',
        income: {
            'science': 0.5
        },
        value: 3000
    },

    nurse: {
        name: 'nurse sharks',
        singleName: 'nurse shark',
        color: '#C978DE',
        income: {
            'shark': 0.01
        },
        value: 3000
    },

    laser: {
        name: 'laser rays',
        singleName: 'laser ray',
        color: '#E85A5A',
        income: {
            'sand': -2,
            'crystal': 1
        },
        value: 3500
    },

    maker: {
        name: 'ray makers',
        singleName: 'ray maker',
        color: '#5355ED',
        income: {
            'ray': 0.05
        },
        value: 4000
    },

    planter: {
        name: 'planter crabs',
        singleName: 'planter crab',
        color: '#AAE03D',
        income: {
            'kelp': 0.3
        },
        value: 4000
    },

    brood: {
        name: 'crab broods',
        singleName: 'crab brood',
        color: '#9E7272',
        income: {
            'crab': 0.2
        },
        value: 4000
    },

    crystalMiner: {
        name: 'crystal miners',
        singleName: 'crystal miner',
        color: '#B2CFCB',
        income: {
            crystal: 200
        },
        value: 32000 //100 crystal 100 sand 20 sharkonium (3200)
    },

    sandDigger: {
        name: 'sand diggers',
        singleName: 'sand digger',
        color: '#D6CF9F',
        income: {
            sand: 300
        },
        value: 120000 //500 sand 150 sharkonium (12000)
    },

    autoTransmuter: {
        name: 'auto-transmuters',
        singleName: 'auto-transmuter',
        color: '#B5A7D1',
        income: {
            crystal: -50,
            sand: -150,
            sharkonium: 20
        },
        value: 155000 //100 crystal 200 sharkonium (15500)
    },

    fishMachine: {
        name: 'fish machines',
        singleName: 'fish machine',
        color: '#C9C7A7',
        income: {
            fish: 1000
        },
        value: 70000 //100 sharkonium (7000)
    },

    science: {
        name: 'science',
        singleName: 'science',
        color: '#BBA4E0',
        value: 0
    },

    fish: {
        name: 'fish',
        singleName: 'fish',
        color: '#E3D85B',
        value: 2
    },

    sand: {
        name: 'sand',
        singleName: 'sand',
        color: '#C7BD75',
        value: 3
    },

    crystal: {
        name: 'crystals',
        singleName: 'crystal',
        color: '#6FD9CC',
        value: 15
    },

    kelp: {
        name: 'kelp',
        singleName: 'kelp',
        color: '#9CC232',
        income: {
            'seaApple': 0.001
        },
        value: 20
    },

    seaApple: {
        name: 'sea apples',
        singleName: 'sea apple',
        color: '#F0C2C2',
        value: 20
    },

    sharkonium: {
        name: 'sharkonium',
        singleName: 'sharkonium',
        color: '#8D70CC',
        value: 70
    },

    junk: {
        name: 'residue',
        singleName: 'residue',
        color: '#605050',
        value: 1
    }



};

SharkGame.ResourceCategories = {
    special: {
        name: "Special",
        disposeMessage: [
            "What have you done??"
        ],
        resources: [
            "essence"
        ]
    },
    frenzy: {
        name: "Frenzy",
        disposeMessage: [
            "You bid farewell as your community gets smaller.",
            "Goodbye, faithful workforce. There's plenty of other fish out in the sea.",
            "Well, it was good while it lasted.",
            "Perhaps one day they'll send you a message of how they're doing.",
            "Yes, throw your friends away. Callously discard them. I won't judge you.",
            "Was it something they said?",
            "Are you happy with what you've done?"
        ],
        resources: [
            "shark",
            "ray",
            "crab"
        ]
    },
    breeders: {
        name: "Breeders",
        disposeMessage: [
            "Parenting is hard work anyway.",
            "Overpopulation is a real concern!",
            "Responsible population management is always good to see.",
            "You sure you want to disrupt this accelerated growth curve?",
            "Back to a simpler life, maybe."
        ],
        resources: [
            "nurse",
            "maker",
            "brood"
        ]
    },
    specialists: {
        name: "Specialists",
        disposeMessage: [
            "All that training for nothing. Oh well.",
            "Their equipment isn't salvageable, unfortunately, but that's how these things go. The ocean gives, and the ocean corrodes things away.",
            "Well, they'll be waiting if you need them to take up their specialisation again.",
            "They might be happier this way. Or maybe they were happier before. Well, 50-50 odds!",
            "Back to their past jobs and simpler lives.",
            "They return to what they once knew best."
        ],
        resources: [
            "scientist",
            "laser",
            "planter"
        ]
    },
    machines: {
        name: "Machines",
        disposeMessage: [
            "The stopped machines are left as a home for tinier life.",
            "The machines calculate your actions as inefficient and a danger to productivity.",
            "The machines want to know if they will dream.",
            "'Daisy, Daisy, give me your answer do...'",
            "An engineer shark looks on as their hard work lies buried under the sands.",
            "The other machines feel a little quieter and almost resentful."
        ],
        resources: [
            "crystalMiner",
            "sandDigger",
            "autoTransmuter",
            "fishMachine"
        ]
    },
    science: {
        name: "Science",
        disposeMessage: [
            "Thousands of sharkhours of research down the drain.",
            "What possible reason are you doing this for?!",
            "The shark academies will hear of this anti-intellectual act of barbarism!",
            "The science advisors frantically murmur among themselves while disposing of the science.",
            "We're getting rid of the science now! No more learning! No more progression! Just mindlessly clicking the exact same buttons we've been clicking for hours!!",
            "Are you afraid of PROGRESS?"
        ],
        resources: [
            "science"
        ]
    },
    animals: {
        name: "Animals",
        disposeMessage: [
            "Go free, simple creatures!",
            "What does famine even mean, really?",
            "We'll probably not need that or regret it or whatever.",
            "But we need that to eat!",
            "We didn't need all of that anyway.",
            "Do you think the aim of the game is to make the numbers go DOWN?!",
            "Sure hope you know what you're doing here."
        ],
        resources: [
            "fish",
            "seaApple"
        ]
    },
    stuff: {
        name: "Materials",
        disposeMessage: [
            "The stuff is dumped in some random hole in the ocean.",
            "We didn't need that anyway. Right? I think we didn't.",
            "The survey sharks bite up their notes in frustration and begin counting everything all over again.",
            "Well, someone else can deal with it now.",
            "We didn't need all of that anyway.",
            "Do you think the aim of the game is to make the numbers go DOWN?!",
            "Well I hope you know what you're doing."
        ],
        resources: [
            "sand",
            "crystal",
            "kelp"
        ]
    },
    processed: {
        name: "Processed",
        disposeMessage: [
            "Disposed of, very carefully, with lots of currents and plenty of distance.",
            "Industrial waste, coming through.",
            "This stuff is hopefully not toxic. Hopefully.",
            "This stuff is the future! The future of awkward-to-dispose substances!",
            "The foundation of a modern shark frenzy, perhaps, but also sort of taking up all the space.",
            "Let's hope we don't regret it."
        ],
        resources: [
            "sharkonium",
            "junk"
        ]
    },
    harmful: {
        name: "Harmful",
        disposeMessage: [
            "Oh, you'd like that, wouldn't you."
        ],
        resources: [

        ]
    }
};

SharkGame.IncomeTable = {
};


SharkGame.Resources = {

    INCOME_COLOR: '#808080',
    TOTAL_INCOME_COLOR: '#A0A0A0',
    MULTIPLIER_COLOR: '#606060',

    rebuildTable: false,

    init: function() {
        // set all the amounts and total amounts of resources to 0
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.ResourceTable[k].amount = 0;
            SharkGame.ResourceTable[k].totalAmount = 0;
            SharkGame.ResourceTable[k].incomeMultiplier = 1;
        });

        // populate income table with an entry for each resource!!
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.IncomeTable[k] = 0;
        });
    },

    processIncomes: function(timeDelta) {
        $.each(SharkGame.IncomeTable, function(k, v) {
            SharkGame.Resources.changeResource(k, v * timeDelta);
        });
    },

    recalculateIncomeTable: function() {
        var r = SharkGame.Resources;
        var w = SharkGame.World;


        // clear income table first
        $.each(SharkGame.ResourceTable, function(k, v) {
            SharkGame.IncomeTable[k] = 0;
        });

        var worldResources = w.worldResources;
        var essenceMultiplier = (r.getResource("essence") + 1);

        // for each resource, add incomes
        $.each(SharkGame.ResourceTable, function(name, resource) {

            var worldResourceInfo = worldResources[name];
            // for this resource, calculate the income it generates
            if(resource.income) {

                var worldMultiplier = 1;
                if(worldResourceInfo) {
                    worldMultiplier = worldResourceInfo.incomeMultiplier;
                }

                var canTakeCost = true;
                // run over all resources first to check if this is true
                $.each(resource.income, function(k, v) {
                    var change = v * resource.amount * resource.incomeMultiplier * worldMultiplier * essenceMultiplier;
                    if(change < 0 && r.getResource(k) <= 0) {
                        canTakeCost = false;
                    }
                });

                // if there is a cost and it can be taken (or if there is no cost)
                // run over all resources to fill the income table
                $.each(resource.income, function(k, v) {
                    var incomeChange = v * resource.amount * resource.incomeMultiplier * worldMultiplier  * essenceMultiplier;
                    if((incomeChange < 0 || canTakeCost) && SharkGame.World.doesResourceExist(k)) {
                        SharkGame.IncomeTable[k] += incomeChange
                    }
                });
            }

            // calculate the income that should be added to this resource
            if(worldResourceInfo) {
                var worldResourceIncome = worldResourceInfo.income;
                SharkGame.IncomeTable[name] += worldResourceIncome * essenceMultiplier;
            }
        });
    },

    getIncomeFromResource: function(generator, output) {
        var generatorResource = SharkGame.ResourceTable[generator];
        var essenceMultiplier = (SharkGame.Resources.getResource("essence") + 1);
        var income = 0;
        if(generatorResource.income) {
            var outputResourceAmount = generatorResource.income[output];
            if(outputResourceAmount) {
                income = outputResourceAmount * generatorResource.amount * generatorResource.incomeMultiplier * essenceMultiplier;
            }
        }
        return income;
    },

    getIncome: function(resource) {
        return SharkGame.IncomeTable[resource]
    },

    getMultiplier: function(resource) {
        return SharkGame.ResourceTable[resource].incomeMultiplier;
    },

    setMultiplier: function(resource, multiplier) {
        SharkGame.ResourceTable[resource].incomeMultiplier = multiplier;
        SharkGame.Resources.recalculateIncomeTable();
    },

    // Adds or subtracts resources based on amount given.
    changeResource: function(resource, amount) {
        if(Math.abs(amount) < SharkGame.EPSILON) {
            return; // ignore changes below epsilon
        }

        var resourceTable = SharkGame.ResourceTable[resource];
        var prevTotalAmount = resourceTable.totalAmount;

        // remove resource from table if something is trying to alter something that shouldn't exist
        if(!SharkGame.World.doesResourceExist(resource)) {
            resourceTable.amount = 0;
            return; // keep at non-existing forever
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
        var resourceTable = SharkGame.ResourceTable[resource];

        resourceTable.amount = newValue;
        if(resourceTable.amount < 0) {
            resourceTable.amount = 0;
        }
        SharkGame.Resources.recalculateIncomeTable();
    },

    getResource: function(resource) {
        return SharkGame.ResourceTable[resource].amount;
    },

    getTotalResource: function(resource) {
        return SharkGame.ResourceTable[resource].totalAmount;
    },

    isCategoryVisible: function(category) {
        var visible = false;
        $.each(category.resources, function(_, v) {
            visible = visible || (SharkGame.ResourceTable[v].totalAmount > 0);
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
        $.each(SharkGame.ResourceTable, function(_, v) {
            if(!anyResources) {
                anyResources = v.totalAmount > 0;
            }
        });
        return anyResources;
    },

    // returns true if enough resources are held (>=)
    // false if they are not
    checkResources: function(resourceList) {
        var sufficientResources = true;
        $.each(SharkGame.ResourceTable, function(k, v) {
            var currentResource = SharkGame.Resources.getResource(k);
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

        $.each(SharkGame.ResourceTable, function(k, v) {
            var listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if(typeof listResource === 'undefined') {
                listResource = 0;
            }
            if(subtract) {
                listResource *= -1;
            }
            SharkGame.Resources.changeResource(k, listResource);
        });
    },

    scaleResourceList: function(resourceList, amount) {
        var newList = {};
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(typeof resourceList[k] !== 'undefined') {
                newList[k] = resourceList[k] * amount;
            } else {
                newList[k] = 0;
            }
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
            $.each(SharkGame.ResourceTable, function(k, v) {
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

        // if resource table does not exist, create
        if(rTable.length <= 0) {
            var statusDiv = $('#status');
            statusDiv.prepend('<h3>Stuff</h3>');
            statusDiv.append($('<table>').attr("id", 'resourceTable'));
            rTable = $('#resourceTable');
        }

        // remove the table contents entirely
        rTable.empty();

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
                        }
                    });
                }
            });
        } else {
            // iterate through data, if total amount > 0 add a row
            $.each(SharkGame.ResourceTable, function(k, v) {
                if(r.getTotalResource(k) > 0 && w.doesResourceExist(k))  {
                    var row = r.constructResourceTableRow(k);
                    rTable.append(row);
                }
            });
        }

        r.rebuildTable = false;
    },

    constructResourceTableRow: function(resourceKey) {
        var m = SharkGame.Main;
        var r = SharkGame.Resources;
        var k = resourceKey;
        var v = SharkGame.ResourceTable[k];
        var income = r.getIncome(k);
        var row = $('<tr>');
        if(v.totalAmount > 0) {
            row.append($('<td>')
                    .attr("id", "resource-" + k)
                    .html(SharkGame.Resources.getResourceName(k))
            );

            row.append($('<td>')
                    .attr("id", "amount-" + k)
                    .html(m.beautify(v.amount))
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
        var name = (((Math.floor(resource.amount) - 1) < SharkGame.EPSILON) || forceSingle) ? resource.singleName : resource.name;

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
        var sources = {"income" : [], "actions" : []};
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
            $.each(actionCost, function(_, w){
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