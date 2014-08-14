SharkGame.ResourceTable = {

    // THIS IS SPECIAL: DO NOT RENAME IT
    'essence': {
        name: 'essence',
        singleName: 'essence',
        color: '#ACE3D1',
        junkValue: -1
    },

    'shark': {
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
        junkValue: 100
    },

    'ray': {
        name: 'rays',
        singleName: 'ray',
        color: '#1E209E',
        income: {
            'fish': 0.2,
            'sand': 1
        },
        jobs: [
            "laser",
            "maker"
        ],
        junkValue: 150
    },

    'crab': {
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
        junkValue: 100
    },

    'scientist': {
        name: 'science sharks',
        singleName: 'science shark',
        color: '#DCEBF5',
        income: {
            'science': 0.5
        }
    },

    'nurse': {
        name: 'nurse sharks',
        singleName: 'nurse shark',
        color: '#C978DE',
        income: {
            'shark': 0.01
        }
    },

    'laser': {
        name: 'laser rays',
        singleName: 'laser ray',
        color: '#E85A5A',
        income: {
            'sand': -2,
            'crystal': 1
        }
    },

    'maker': {
        name: 'ray makers',
        singleName: 'ray maker',
        color: '#216ED1',
        income: {
            'ray': 0.05
        }
    },

    'planter': {
        name: 'planter crabs',
        singleName: 'planter crab',
        color: '#56731C',
        income: {
            'kelp': 0.3
        }
    },

    'brood': {
        name: 'crab broods',
        singleName: 'crab brood',
        color: '#9E7272',
        income: {
            'crab': 0.5
        }
    },

    'crystalMiner': {
        name: 'crystal miners',
        singleName: 'crystal miner',
        color: '#B2CFCB',
        income: {
            crystal: 200
        }
    },

    'autoTransmuter': {
        name: 'auto-transmuters',
        singleName: 'auto-transmuter',
        color: '#B5A7D1',
        income: {
            crystal: -50,
            sand: -150,
            sharkonium: 20
        }
    },

    'fishMachine': {
        name: 'fish machines',
        singleName: 'fish machine',
        color: '#C9C7A7',
        income: {
            fish: 1000
        }
    },

    'science': {
        name: 'science',
        singleName: 'science',
        color: '#BBA4E0'
    },

    'fish': {
        name: 'fish',
        singleName: 'fish',
        color: '#E3D85B'
    },

    'sand': {
        name: 'sand',
        singleName: 'sand',
        color: '#C7BD75'
    },

    'crystal': {
        name: 'crystals',
        singleName: 'crystal',
        color: '#6FD9CC'
    },

    'kelp': {
        name: 'kelp',
        singleName: 'kelp',
        color: '#9CC232',
        income: {
            'seaApple': 0.001
        }
    },

    'seaApple': {
        name: 'sea apples',
        singleName: 'sea apple',
        color: '#F0C2C2'
    },

    'sharkonium': {
        name: 'sharkonium',
        singleName: 'sharkonium',
        color: '#8D70CC'
    }

};

SharkGame.IncomeTable = {
};


SharkGame.Resources = {

    INCOME_COLOR: '#808080',
    MULTIPLIER_COLOR: '#606060',

    rebuildTable: false,

    init: function () {
        // set all the amounts and total amounts of resources to 0
        $.each(SharkGame.ResourceTable, function (i, v) {
            SharkGame.ResourceTable[i].amount = 0;
            SharkGame.ResourceTable[i].totalAmount = 0;
            SharkGame.ResourceTable[i].incomeMultiplier = 1;
        });

        // populate income table with an entry for each resource!!
        $.each(SharkGame.ResourceTable, function (i, v) {
            SharkGame.IncomeTable[i] = 0;
        });
    },

    processIncomes: function (timeDelta) {
        $.each(SharkGame.IncomeTable, function (i, v) {
            SharkGame.Resources.changeResource(i, v * timeDelta);
        });
    },

    recalculateIncomeTable: function () {
        var r = SharkGame.Resources;
        // clear income table first
        $.each(SharkGame.ResourceTable, function (i, v) {
            SharkGame.IncomeTable[i] = 0;
        });

        // for each resource, add incomes
        $.each(SharkGame.ResourceTable, function (index, value) {
            if ( value.income ) {
                var essenceMultiplier = (r.getResource("essence") + 1);

                var canTakeCost = true;
                // run over all resources first to check if this is true
                $.each(value.income, function (i, v) {
                    var change = v * value.amount * value.incomeMultiplier * essenceMultiplier;
                    if ( change < 0 && r.getResource(i) <= 0 ) {
                        canTakeCost = false;
                    }
                });

                // if there is a cost and it can be taken (or if there is no cost)
                // run over all resources to fill the income table
                if ( canTakeCost ) {
                    $.each(value.income, function (i, v) {
                        SharkGame.IncomeTable[i] += v * value.amount * value.incomeMultiplier * essenceMultiplier;
                    });
                }
            }
        });
    },

    getIncome: function (resource) {
        return SharkGame.IncomeTable[resource]
    },

    getMultiplier: function (resource) {
        return SharkGame.ResourceTable[resource].incomeMultiplier;
    },

    setMultiplier: function (resource, multiplier) {
        SharkGame.ResourceTable[resource].incomeMultiplier = multiplier;
        SharkGame.Resources.recalculateIncomeTable();
    },

    // Adds or subtracts resources based on amount given.
    changeResource: function (resource, amount) {
        if ( Math.abs(amount) < SharkGame.EPSILON ) {
            return; // ignore changes below epsilon
        }

        var resourceTable = SharkGame.ResourceTable[resource];
        var prevTotalAmount = resourceTable.totalAmount;

        resourceTable.amount += amount;
        if ( resourceTable.amount < 0 ) {
            resourceTable.amount = 0;
        }

        if ( amount > 0 ) {
            resourceTable.totalAmount += amount;
        }

        if ( prevTotalAmount < SharkGame.EPSILON ) {
            // we got a new resource
            SharkGame.Resources.rebuildTable = true;
        }

        SharkGame.Resources.recalculateIncomeTable();
    },

    getResource: function (resource) {
        return SharkGame.ResourceTable[resource].amount;
    },

    haveAnyResources: function () {
        var anyResources = false;
        $.each(SharkGame.ResourceTable, function (i, v) {
            if ( !anyResources ) {
                anyResources = v.totalAmount > 0;
            }
        });
        return anyResources;
    },

    // returns true if enough resources are held (>=)
    // false if they are not
    checkResources: function (resourceList) {
        var sufficientResources = true;
        $.each(SharkGame.ResourceTable, function (i, v) {
            var currentResource = SharkGame.Resources.getResource(i);
            var listResource = resourceList[i];
            // amend for unspecified resources (assume zero)
            if ( typeof listResource === 'undefined' ) {
                listResource = 0;
            }
            if ( currentResource < listResource ) {
                sufficientResources = false;
            }
        });
        return sufficientResources;
    },

    changeManyResources: function (resourceList, subtract) {
        if ( typeof subtract === 'undefined' ) {
            subtract = false;
        }

        $.each(SharkGame.ResourceTable, function (i, v) {
            var listResource = resourceList[i];
            // amend for unspecified resources (assume zero)
            if ( typeof listResource === 'undefined' ) {
                listResource = 0;
            }
            if ( subtract ) {
                listResource *= -1;
            }
            SharkGame.Resources.changeResource(i, listResource);
        });
    },

    scaleResourceList: function (resourceList, amount) {
        var newList = {};
        $.each(SharkGame.ResourceTable, function (i, v) {
            if ( typeof resourceList[i] !== 'undefined' ) {
                newList[i] = resourceList[i] * amount;
            } else {
                newList[i] = 0;
            }
        });
        return newList;
    },

    // update values in table without adding rows
    updateResourcesTable: function () {
        var rTable = $('#resourceTable');
        var m = SharkGame.Main;
        var r = SharkGame.Resources;

        // if resource table does not exist, there are no resources, so do not construct table
        // if a resource became visible when it previously wasn't, reconstruct the table
        if ( r.rebuildTable ) {
            r.reconstructResourcesTable();
        } else {
            // loop over table rows, update values
            $.each(SharkGame.ResourceTable, function (i, v) {
                $('#amount-' + i).html(m.beautify(v.amount, true));

                var income = r.getIncome(i);
                if ( Math.abs(income) > SharkGame.EPSILON ) {
                    var changeChar = income > 0 ? "+" : "";
                    $('#income-' + i).html("<span style='color:" + r.INCOME_COLOR + "'>" + changeChar + m.beautify(income) + "/s</span>");
                } else {
                    $('#income-' + i).html("");
                }

                var multiplier = r.getMultiplier(i);
                if ( multiplier > 1 ) {
                    $('#multiplier-' + i).html("<span style='color:" + r.MULTIPLIER_COLOR + "'>x" + m.beautify(multiplier) + "</span>")
                }
            });
        }
    },

    // add rows to table (more expensive than updating existing DOM elements)
    reconstructResourcesTable: function () {
        var rTable = $('#resourceTable');
        var m = SharkGame.Main;
        var r = SharkGame.Resources;

        // if resource table does not exist, create
        if ( rTable.length <= 0 ) {
            var statusDiv = $('#status');
            statusDiv.prepend('<h3>Stuff</h3>');
            statusDiv.append($('<table>').attr("id", 'resourceTable'));
            rTable = $('#resourceTable');
        }

        // remove the table contents entirely
        rTable.empty();

        // iterate through data, if total amount > 0 add a row
        $.each(SharkGame.ResourceTable, function (i, v) {
            var income = r.getIncome(i);
            var row = $('<tr>');
            if ( v.totalAmount > 0 ) {
                row.append($('<td>')
                        .attr("id", "resource-" + i)
                        .html("<span style='color:" + v.color + "'>" + v.name + "</span>")
                );

                row.append($('<td>')
                        .attr("id", "amount-" + i)
                        .html(m.beautify(v.amount))
                );

                row.append($('<td>')
                        .attr("id", "multiplier-" + i)
                );

                var incomeId = $('<td>')
                    .attr("id", "income-" + i);

                row.append(incomeId);

                if ( Math.abs(income) > SharkGame.EPSILON ) {
                    var changeChar = income > 0 ? "+" : "";
                    incomeId.html("<span style='color:" + r.INCOME_COLOR + "'>" + changeChar + m.beautify(income) + "/s</span>");
                }


                rTable.append(row);
            }
        });

        r.rebuildTable = false;
    },

    getResourceName: function (resourceName, darken, forceSingle) {
        var resource = SharkGame.ResourceTable[resourceName];
        var name = ((Math.floor(resource.amount) === 1) || forceSingle) ? resource.singleName : resource.name;

        if ( SharkGame.Settings.current.colorCosts ) {
            var color = resource.color;
            if ( darken ) {
                color = SharkGame.colorLum(resource.color, -0.5);
            }
            name = "<span class='click-passthrough' style='color:" + color + "'>" + name + "</span>";
        }
        return name;
    },

    // make a resource list object into a string describing its contents
    resourceListToString: function (resourceList, darken) {
        if ( $.isEmptyObject(resourceList) ) {
            return "";
        }
        var formattedResourceList = "";
        $.each(SharkGame.ResourceTable, function (i, v) {
            var listResource = resourceList[i];
            // amend for unspecified resources (assume zero)
            if ( listResource > 0 ) {
                formattedResourceList += SharkGame.Main.beautify(listResource);
                formattedResourceList += " " + SharkGame.Resources.getResourceName(i, darken) + ", ";
            }
        });
        // snip off trailing suffix
        formattedResourceList = formattedResourceList.slice(0, -2);
        return formattedResourceList;
    }
};