SharkGame.Stats = {

    tabId: "stats",
    tabDiscovered: false,
    tabName: "Grotto",

    recreateIncomeTable: true,

    discoverReq: {
        upgrade: [
            "statsDiscovery"
        ]
    },

    message: "The grotto is a place to keep a better track of resources.</br></br>You can also dispose of those you don't need anymore.",

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
        content.append($('<div>').attr("id", "incomeData"));
        content.append($('<div>').attr("id", "disposeResource"));
        content.append($('<div>').attr("id", "upgradeList"));
        content.append($('<div>').addClass("clear-fix"));
        $('#tabMessage').html(s.message);

        var table = s.createIncomeTable();
        var incomeDataSel = $('#incomeData');
        incomeDataSel.append($('<h3>').html("Income Details"));
        incomeDataSel.append($('<p>').html("(Listed below are resources, the income each resource gives you, and the total income you're getting from each thing.)").addClass("medDesc"));
        incomeDataSel.append(table);

        s.createUpgradeList();
    },

    update: function() {
        var s = SharkGame.Stats;

        if(s.recreateIncomeTable) {
            s.createIncomeTable();
            s.recreateIncomeTable = false;
        }
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

        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0 && SharkGame.ResourceTable[k].income) {
                var income = SharkGame.ResourceTable[k].income;
                var body = $("<tbody>");
                var row = $("<tr>");
                var numIncomes = _.size(income);
                var counter = 0;
                row.append($("<td>").html(r.getResourceName(k)).attr("rowspan", numIncomes));

                $.each(income, function(incomeKey, incomeValue) {
                    var changeChar = incomeValue > 0 ? "+" : "";
                    row.append($("<td>").html(r.getResourceName(incomeKey)));
                    row.append($("<td>").html("<span style='color: " + r.INCOME_COLOR + "'>" + changeChar + m.beautify(incomeValue) + "/s</span>"));
                    if(counter === 0) {
                        row.append($("<td>").attr("rowspan", numIncomes).html("<span style='color: " + r.MULTIPLIER_COLOR + "'>x" + r.getMultiplier(k) + "</span>"));
                    }
                    row.append($("<td>").attr("id", "income-" + k + "-" + incomeKey)
                        .html("<span style='color: " + r.TOTAL_INCOME_COLOR + "'>" + changeChar + m.beautify(r.getIncomeFromResource(k, incomeKey)) + "/s</span>"));

                    counter++;
                    body.append(row);
                    row = $("<tr>");
                });

                // throw away dangling values
                row = null;
                incomesTable.append(body);
            }
        });
        return incomesTable;
    },

    createUpgradeList: function() {
        var u = SharkGame.Upgrades;
        var upgradeList = $('#upgradeList');
        upgradeList.append($("<h3>").html("Upgrades"));
        var list = $('<ul>');
        $.each(u, function(k, v) {
            if(v.purchased) {
                list.append($("<li>")
                        .html(v.name + "<br/><span class='medDesc'>" + v.effectDesc + "</span>")
                );
            }
        });
        upgradeList.append(list);
    }


};