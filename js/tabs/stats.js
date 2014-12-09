SharkGame.Stats = {

    tabId: "stats",
    tabDiscovered: false,
    tabName: "Grotto",
    tabBg: "img/bg/bg-grotto.png",

    sceneImage: "img/events/misc/scene-grotto.png",

    recreateIncomeTable: true,

    discoverReq: {
        upgrade: [
            "statsDiscovery"
        ]
    },

    bannedDisposeCategories: [
        "special",
        "harmful"
    ],

    message: "The grotto is a place to keep a better track of resources." +
        "</br></br>You can also dispose of those you don't need anymore." +
        "</br>Disposing specialists returns them to their normal, previous lives.",

    init: function() {
        var s = SharkGame.Stats;
        // register tab
        SharkGame.Tabs[s.tabId] = {
            id: s.tabId,
            name: s.tabName,
            discovered: s.tabDiscovered,
            discoverReq: s.discoverReq,
            code: s
        };
        s.recreateIncomeTable = true;
    },

    switchTo: function() {
        var s = SharkGame.Stats;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        var statsContainer = $('<div>').attr("id", "statsContainer");
        content.append(statsContainer);
        statsContainer.append($('<div>').attr("id", "statsLeftContainer")
                .append($('<div>').attr("id", "incomeData"))
                .append($('<div>').attr("id", "disposeResource"))
        );
        statsContainer.append($('<div>').attr("id", "statsRightContainer")
                .append($('<div>').attr("id", "generalStats"))
        );

        statsContainer.append($('<div>').addClass("clear-fix"));
        var message = s.message;
        message = "<img width=400 height=200 src='" + s.sceneImage + "' id='tabSceneImage'>" + message;
        $('#tabMessage').html(message).css("background-image", "url('" + s.tabBg + "')");

        var disposeSel = $('#disposeResource');
        disposeSel.append($('<h3>').html("Dispose of Stuff"));
        s.createDisposeButtons();

        var table = s.createIncomeTable();
        var incomeDataSel = $('#incomeData');
        incomeDataSel.append($('<h3>').html("Income Details"));
        incomeDataSel.append($('<p>').html("(Listed below are resources, the income each resource gives you, and the total income you're getting from each thing.)").addClass("medDesc"));
        incomeDataSel.append(table);

        var genStats = $('#generalStats');
        genStats.append($('<h3>').html("General Stats"));
        genStats.append($('<p>').html("Time since you began:<br/><span id='gameTime' class='timeDisplay'></span>").addClass("medDesc"));
        if(SharkGame.Resources.getResource("essence") > 0) {
            genStats.append($('<p>').html("Time since you came through the gate:<br/><span id='runTime' class='timeDisplay'></span>").addClass("medDesc"));
        }
        genStats.append($('<h3>').html("Total Ocean Resources Acquired"));
        genStats.append(s.createTotalAmountTable());

        SharkGame.Main.createBuyButtons("rid");
    },

    update: function() {
        var m = SharkGame.Main;
        var s = SharkGame.Stats;

        s.updateDisposeButtons();
        s.updateIncomeTable();
        s.updateTotalAmountTable();
        if(s.recreateIncomeTable) {
            s.createIncomeTable();
            s.createTotalAmountTable();
            s.recreateIncomeTable = false;
        }

        // update run times
        var currTime = (new Date()).getTime();
        $('#gameTime').html(m.formatTime(currTime - SharkGame.timestampGameStart));
        $('#runTime').html(m.formatTime(currTime - SharkGame.timestampRunStart));
    },

    createDisposeButtons: function() {
        var r = SharkGame.Resources;
        var s = SharkGame.Stats;
        var m = SharkGame.Main;
        var buttonDiv = $('#disposeResource');
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0 && s.bannedDisposeCategories.indexOf(r.getCategoryOfResource(k)) === -1) {
                SharkGame.Button.makeButton("dispose-" + k, "Dispose of " + r.getResourceName(k), buttonDiv, SharkGame.Stats.onDispose);
            }
        });
    },

    updateDisposeButtons: function() {
        var r = SharkGame.Resources;
        var m = SharkGame.Main;
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0) {
                var button = $('#dispose-' + k);
                var resourceAmount = r.getResource(k);
                var amountToDispose = SharkGame.Settings.current.buyAmount;
                if(amountToDispose < 0) {
                    var max = resourceAmount;
                    var divisor = Math.floor(amountToDispose) * -1;
                    amountToDispose = (max / divisor);
                }
                var forceSingular = amountToDispose === 1;
                var disableButton = (resourceAmount < amountToDispose) || (amountToDispose <= 0);
                var label = "Dispose of " + m.beautify(amountToDispose) + " " + r.getResourceName(k, disableButton, forceSingular);
                if(amountToDispose <= 0) {
                    label = "Can't dispose any more " + r.getResourceName(k, disableButton, forceSingular);
                }

                button.html(label).prop("disabled", disableButton);
            }
        });
    },

    onDispose: function() {
        var r = SharkGame.Resources;
        var l = SharkGame.Log;
        var resourceName = ($(this).attr("id")).split("-")[1];
        var resourceAmount = r.getResource(resourceName);
        var amountToDispose = SharkGame.Settings.current.buyAmount;
        if(amountToDispose < 0) {
            var max = resourceAmount;
            var divisor = Math.floor(amountToDispose) * -1;
            amountToDispose = (max / divisor);
        }
        if(resourceAmount >= amountToDispose) {
            r.changeResource(resourceName, -amountToDispose);
            var category = SharkGame.ResourceCategories[r.getCategoryOfResource(resourceName)];
            var employmentPool = r.getBaseOfResource(resourceName);
            if(employmentPool) {
                r.changeResource(employmentPool, amountToDispose);
            }
            l.addMessage(SharkGame.choose(category.disposeMessage));
        } else {
            l.addMessage("Can't dispose that much! You don't have enough of it.");
        }
    },

    updateIncomeTable: function() {
        var r = SharkGame.Resources;
        var m = SharkGame.Main;
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0 && SharkGame.ResourceTable[k].income) {
                var income = SharkGame.ResourceTable[k].income;
                $.each(income, function(incomeKey, incomeValue) {
                    var cell = $("#income-" + k + "-" + incomeKey);
                    var changeChar = incomeValue > 0 ? "+" : "";
                    cell.html("<span style='color: " + r.TOTAL_INCOME_COLOR + "'>" + changeChar + m.beautify(r.getIncomeFromResource(k, incomeKey)) + "/s</span>");
                });
            }
        });
    },

    updateTotalAmountTable: function() {
        var r = SharkGame.Resources;
        var m = SharkGame.Main;
        $.each(SharkGame.ResourceTable, function(k,v) {
            var totalResource = r.getTotalResource(k);
            if(totalResource > 0) {
                var cell = $("#totalAmount-" + k);
                cell.html(m.beautify(totalResource));
            }
        });
    },

    createIncomeTable: function() {
        var r = SharkGame.Resources;
        var m = SharkGame.Main;
        var incomesTable = $("#incomeTable");
        if(incomesTable.length === 0) {
            incomesTable = $("<table>").attr("id", "incomeTable");
        } else {
            incomesTable.empty();
        }

        var essenceMultiplierCol = null;
        var addEssenceMultiplier = false;
        if(r.getResource("essence")) {
            addEssenceMultiplier = true;
        }

        var formatCounter = 0;

        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0 && SharkGame.ResourceTable[k].income) {
                var income = SharkGame.ResourceTable[k].income;
                var row = $("<tr>");
                var numIncomes = _.size(income);
                var counter = 0;

                var rowStyle = (formatCounter % 2 === 0) ? "evenRow" : "oddRow";
                row.append($("<td>").html(r.getResourceName(k)).attr("rowspan", numIncomes).addClass(rowStyle));

                $.each(income, function(incomeKey, incomeValue) {
                    var changeChar = incomeValue > 0 ? "+" : "";
                    row.append($("<td>").html(r.getResourceName(incomeKey)).addClass(rowStyle));
                    row.append($("<td>").html("<span style='color: " + r.INCOME_COLOR + "'>" + changeChar + m.beautify(incomeValue) + "/s</span>").addClass(rowStyle));
                    if(counter === 0) {
                        row.append($("<td>").attr("rowspan", numIncomes).html("<span style='color: " + r.MULTIPLIER_COLOR + "'>x" + r.getMultiplier(k) + "</span>").addClass(rowStyle));
                    }
                    if(addEssenceMultiplier) {
                        essenceMultiplierCol = $("<td>").html("<span class='essenceGlow'>x" + (r.getResource("essence") + 1) + "</span>").addClass("essenceGlow");
                        row.append(essenceMultiplierCol);
                        addEssenceMultiplier = false;
                    }

                    row.append($("<td>").attr("id", "income-" + k + "-" + incomeKey)
                        .html("<span style='color: " + r.TOTAL_INCOME_COLOR + "'>" + changeChar + m.beautify(r.getIncomeFromResource(k, incomeKey)) + "/s</span>").addClass(rowStyle));

                    counter++;
                    incomesTable.append(row);
                    row = $("<tr>");
                });

                // throw away dangling values
                row = null;
                formatCounter++;
            }
        });

        if(essenceMultiplierCol) {
            var rowCount = incomesTable.find("tr").length;
            essenceMultiplierCol.attr("rowspan", rowCount);
        }

        return incomesTable;
    },

    createTotalAmountTable: function() {
        var r = SharkGame.Resources;
        var m = SharkGame.Main;
        var totalAmountTable = $("#totalAmountTable");
        if(totalAmountTable.length === 0) {
            totalAmountTable = $("<table>").attr("id", "totalAmountTable");
        } else {
            totalAmountTable.empty();
        }

        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0) {
                var row = $('<tr>');

                row.append($('<td>').html(r.getResourceName(k)));
                row.append($('<td>').html(m.beautify(r.getTotalResource(k))).attr("id", "totalAmount-" + k));

                totalAmountTable.append(row);
            }
        });

        return totalAmountTable;
    }




};