SharkGame.Stats = {

    tabId: "stats",
    tabDiscovered: false,
    tabName: "Grotto",
    tabBg: "img/bg/bg-grotto.png",

    sceneImage: "img/events/misc/scene-grotto.png",

    recreateIncomeTable: null,

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
        const s = SharkGame.Stats;
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
        const s = SharkGame.Stats;
        const content = $("#content");
        content.append($("<div>").attr("id", "tabMessage"));
        const statsContainer = $("<div>").attr("id", "statsContainer");
        content.append(statsContainer);
        statsContainer.append($("<div>").attr("id", "statsLeftContainer")
            .append($("<div>").attr("id", "incomeData"))
            .append($("<div>").attr("id", "disposeResource"))
        );
        statsContainer.append($("<div>").attr("id", "statsRightContainer")
            .append($("<div>").attr("id", "generalStats"))
        );

        statsContainer.append($("<div>").addClass("clear-fix"));
        let message = s.message;
        const tabMessageSel = $("#tabMessage");
        if(SharkGame.Settings.current.showTabImages) {
            message = "<img width=400 height=200 src='" + s.sceneImage + "' id='tabSceneImage'>" + message;
            tabMessageSel.css("background-image", "url('" + s.tabBg + "')");
        }
        tabMessageSel.html(message);

        const disposeSel = $("#disposeResource");
        disposeSel.append($("<h3>").html("Dispose of Stuff"));
        s.createDisposeButtons();

        const table = s.createIncomeTable();
        const incomeDataSel = $("#incomeData");
        incomeDataSel.append($("<h3>").html("Income Details"));
        incomeDataSel.append($("<p>").html("(Listed below are resources, the income each resource gives you, and the total income you're getting from each thing.)").addClass("medDesc"));
        incomeDataSel.append(table);

        const genStats = $("#generalStats");
        genStats.append($("<h3>").html("General Stats"));
        const firstTime = SharkGame.Main.isFirstTime();
        if(!firstTime) {
            genStats.append($("<p>").html("<span class='medDesc'>Climate Level</span><br>" + SharkGame.Main.beautify(SharkGame.World.planetLevel)));
        }
        genStats.append($("<p>").html("Time since you began:<br/><span id='gameTime' class='timeDisplay'></span>").addClass("medDesc"));
        if(!firstTime) {
            genStats.append($("<p>").html("Time since you came through the gate:<br/><span id='runTime' class='timeDisplay'></span>").addClass("medDesc"));
        }
        genStats.append($("<h3>").html("Total Ocean Resources Acquired"));
        if(!firstTime) {
            genStats.append($("<p>").html("Essence given is the total acquired for the entire game and not just for this world.").addClass("medDesc"));
        }
        genStats.append(s.createTotalAmountTable());

        SharkGame.Main.createBuyButtons("rid");
    },

    update: function() {
        const m = SharkGame.Main;
        const s = SharkGame.Stats;

        s.updateDisposeButtons();
        s.updateIncomeTable();
        s.updateTotalAmountTable();
        if(s.recreateIncomeTable) {
            s.createIncomeTable();
            s.createTotalAmountTable();
            s.recreateIncomeTable = false;
        }

        // update run times
        const currTime = (new Date()).getTime();
        $("#gameTime").html(m.formatTime(currTime - SharkGame.timestampGameStart));
        $("#runTime").html(m.formatTime(currTime - SharkGame.timestampRunStart));
    },

    createDisposeButtons: function() {
        const r = SharkGame.Resources;
        const s = SharkGame.Stats;
        const m = SharkGame.Main;
        const buttonDiv = $("#disposeResource");
        SharkGame.ResourceMap.forEach(function(v, k, m) {
            if(r.getTotalResource(k) > 0 && s.bannedDisposeCategories.indexOf(r.getCategoryOfResource(k)) === -1) {
                SharkGame.Button.makeButton("dispose-" + k, "Dispose of " + r.getResourceName(k), buttonDiv, SharkGame.Stats.onDispose);
            }
        });
    },

    updateDisposeButtons: function() {
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        SharkGame.ResourceMap.forEach(function(v, k, m) {
            if(r.getTotalResource(k) > 0) {
                const button = $("#dispose-" + k);
                const resourceAmount = r.getResource(k);
                let amountToDispose = SharkGame.Settings.current.buyAmount;
                if(amountToDispose < 0) {
                    const max = resourceAmount;
                    const divisor = Math.floor(amountToDispose) * -1;
                    amountToDispose = Math.floor(max / divisor);
                }
                const forceSingular = amountToDispose === 1;
                const disableButton = (resourceAmount < amountToDispose) || (amountToDispose <= 0);
                let label = "Dispose of " + m.beautify(amountToDispose) + " " + r.getResourceName(k, disableButton, forceSingular);
                if(amountToDispose <= 0) {
                    label = "Can't dispose any more " + r.getResourceName(k, disableButton, forceSingular);
                }

                button.html(label).prop("disabled", disableButton);
            }
        });
    },

    onDispose: function() {
        const r = SharkGame.Resources;
        const l = SharkGame.Log;
        const resourceName = ($(this).attr("id")).split("-")[1];
        const resourceAmount = r.getResource(resourceName);
        let amountToDispose = SharkGame.Settings.current.buyAmount;
        if(amountToDispose < 0) {
            const max = resourceAmount;
            const divisor = Math.floor(amountToDispose) * -1;
            amountToDispose = (max / divisor);
        }
        if(resourceAmount >= amountToDispose) {
            r.changeResource(resourceName, -amountToDispose);
            const category = SharkGame.ResourceCategories[r.getCategoryOfResource(resourceName)];
            const employmentPool = r.getBaseOfResource(resourceName);
            if(employmentPool) {
                r.changeResource(employmentPool, amountToDispose);
            }
            l.addMessage(SharkGame.choose(category.disposeMessage));
        } else {
            l.addMessage("Can't dispose that much! You don't have enough of it.");
        }
    },

    updateIncomeTable: function() {
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        SharkGame.ResourceMap.forEach(function(v, k, m) {
            if(r.getTotalResource(k) > 0 && SharkGame.ResourceMap.get(k).income) {
                const income = SharkGame.ResourceMap.get(k).income;
                $.each(income, function(incomeKey, incomeValue) {
                    const cell = $("#income-" + k + "-" + incomeKey);
                    const changeChar = incomeValue > 0 ? "+" : "";
                    cell.html("<span style='color: " + r.TOTAL_INCOME_COLOR + "'>" + changeChar + m.beautify(r.getProductAmountFromGeneratorResource(k, incomeKey),false,2) + "/s</span>");
                });
            }
        });
    },

    updateTotalAmountTable: function() {
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        SharkGame.ResourceMap.forEach(function(v, k, m) {
            const totalResource = r.getTotalResource(k);
            if(totalResource > 0) {
                const cell = $("#totalAmount-" + k);
                cell.html(m.beautify(totalResource));
            }
        });
    },

    createIncomeTable: function() {
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        const w = SharkGame.World;
        let incomesTable = $("#incomeTable");
        if(incomesTable.length === 0) {
            incomesTable = $("<table>").attr("id", "incomeTable");
        } else {
            incomesTable.empty();
        }

        const specialMultiplierCol = null;

        let formatCounter = 0;

        SharkGame.ResourceMap.forEach(function(generatorData, generatorName, m) {
            if(r.getTotalResource(generatorName) > 0 && generatorData.income) {


                // if the resource has an income requiring any costs
                // and it isn't a forced income
                // do not display the resource's income if it requires a non-existent resource (looking at you, sponge)
                let validIncome = true;
                const income = generatorData.income;
                let row = $("<tr>");

                let numIncomes = 0;
                $.each(income, function(incomeResourceName, incomeResourceAmount) {
                    if(w.doesResourceExist(incomeResourceName) && r.getTotalResource(incomeResourceName) > 0) {
                        numIncomes++;
                    } else if(incomeResourceAmount < 0 && !generatorData.forceIncome) {
                        // non-existent cost! abort! ABORT
                        validIncome = false;
                    }
                });

                if(validIncome) {
                    let counter = 0;

                    const rowStyle = (formatCounter % 2 === 0) ? "evenRow" : "oddRow";
                    row.append($("<td>").html(r.getResourceName(generatorName)).attr("rowspan", numIncomes).addClass(rowStyle));

                    $.each(income, function(incomeKey, incomeValue) {
                        if(w.doesResourceExist(incomeKey) && r.getTotalResource(incomeKey) > 0) {
                            const changeChar = incomeValue > 0 ? "+" : "";
                            row.append($("<td>").html(r.getResourceName(incomeKey)).addClass(rowStyle));
                            row.append($("<td>").html("<span style='color: " + r.INCOME_COLOR + "'>" + changeChar + m.beautify(incomeValue,false,2) + "/s</span>").addClass(rowStyle));

                            // does this resource get a boost multiplier?
                            const boostMultiplier = w.worldResources[incomeKey].boostMultiplier;
                            if(boostMultiplier !== 1) {
                                row.append($("<td>").html("<span style='color: " + r.BOOST_MULTIPLIER_COLOR + "'>x" + m.beautify(boostMultiplier) + "</span>").addClass(rowStyle));
                            } else {
                                row.append($("<td>").addClass(rowStyle)); // empty cell
                            }

                            if(counter === 0) {
                                row.append($("<td>").attr("rowspan", numIncomes).html("<span style='color: " + r.UPGRADE_MULTIPLIER_COLOR + "'>x" + r.getMultiplier(generatorName) + "</span>").addClass(rowStyle));
                                // does this income get a world multiplier?
                                const worldMultiplier = w.getWorldIncomeMultiplier(generatorName);
                                if(worldMultiplier !== 1) {
                                    row.append($("<td>").attr("rowspan", numIncomes).html("<span style='color: " + r.WORLD_MULTIPLIER_COLOR + "'>x" + m.beautify(worldMultiplier) + "</span>").addClass(rowStyle));
                                } else {
                                    row.append($("<td>").attr("rowspan", numIncomes).addClass(rowStyle));
                                }
                                // does this income get an artifact multiplier?
                                const artifactMultiplier = w.getArtifactMultiplier(generatorName);
                                if(artifactMultiplier !== 1) {
                                    row.append($("<td>").attr("rowspan", numIncomes).html("<span style='color: " + r.ARTIFACT_MULTIPLIER_COLOR + "'>x" + m.beautify(artifactMultiplier) + "</span>").addClass(rowStyle));
                                } else {
                                    row.append($("<td>").attr("rowspan", numIncomes).addClass(rowStyle));
                                }
                                const resourceAffectMultiplier = r.getResourceGeneratorMultiplier(generatorName);
                                if(resourceAffectMultiplier !== 1) {
                                    row.append($("<td>").attr("rowspan", numIncomes).html("<span style='color: " + r.RESOURCE_AFFECT_MULTIPLIER_COLOR + "'>x" + m.beautify(resourceAffectMultiplier) + "</span>").addClass(rowStyle));
                                } else {
                                    row.append($("<td>").attr("rowspan", numIncomes).addClass(rowStyle));
                                }
                            }

                            row.append($("<td>").attr("id", "income-" + generatorName + "-" + incomeKey)
                                .html("<span style='color: " + r.TOTAL_INCOME_COLOR + "'>" + changeChar + m.beautify(r.getProductAmountFromGeneratorResource(generatorName, incomeKey),false,2) + "/s</span>").addClass(rowStyle));

                            counter++;
                            incomesTable.append(row);
                            row = $("<tr>");
                        }

                    });

                    // throw away dangling values
                    row = null;
                    formatCounter++;
                }
            }
        });

        if(specialMultiplierCol) {
            const rowCount = incomesTable.find("tr").length;
            specialMultiplierCol.attr("rowspan", rowCount);
        }

        return incomesTable;
    },

    createTotalAmountTable: function() {
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        let totalAmountTable = $("#totalAmountTable");
        if(totalAmountTable.length === 0) {
            totalAmountTable = $("<table>").attr("id", "totalAmountTable");
        } else {
            totalAmountTable.empty();
        }

        SharkGame.ResourceMap.forEach(function(v, k, m) {
            if(r.getTotalResource(k) > 0) {
                const row = $("<tr>");

                row.append($("<td>").html(r.getResourceName(k)));
                row.append($("<td>").html(m.beautify(r.getTotalResource(k))).attr("id", "totalAmount-" + k));

                totalAmountTable.append(row);
            }
        });

        return totalAmountTable;
    }




};