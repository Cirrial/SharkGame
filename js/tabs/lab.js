SharkGame.Lab = {

    tabId: "lab",
    tabDiscovered: false,
    tabName: "Laboratory",
    tabBg: "img/bg/bg-lab.png",

    sceneImage: "img/events/misc/scene-lab.png",
    sceneDoneImage: "img/events/misc/scene-lab-done.png",

    discoverReq: {
        resource: {
            science: 10
        }
    },

    message: "Sort of just off to the side, the science sharks congregate and discuss things with words you've never heard before.",
    messageDone: "Sort of just off to the side, the science sharks quietly wrap up their badly disguised party and pretend to work.<br/>" +
        "Looks like that's it! No more things to figure out.",



    init: function() {
        var l = SharkGame.Lab;
        // register tab
        SharkGame.Tabs[l.tabId] = {
            id: l.tabId,
            name: l.tabName,
            discovered: l.tabDiscovered,
            discoverReq: l.discoverReq,
            code: l
        };

        // add default purchased state to each upgrade
        $.each(SharkGame.Upgrades, function(k, v) {
            SharkGame.Upgrades[k].purchased = false;
        });
    },

    switchTo: function() {
        var l = SharkGame.Lab;
        var content = $('#content');

        var allResearchDone = l.allResearchDone();
        var message = allResearchDone ? l.messageDone : l.message;
        var imgSrc = allResearchDone ? l.sceneDoneImage : l.sceneImage;
        message = "<img width=400 height=200 src='" + imgSrc + "' id='tabSceneImage'>" + message;
        content.append($('<div>').attr("id", "tabMessage").html(message));
        var buttonListContainer = $('<div>').attr("id", "buttonLeftContainer");
        buttonListContainer.append($('<div>').attr("id", "buttonList").append($("<h3>").html("Available Upgrades")));
        content.append(buttonListContainer);
        content.append($('<div>').attr("id", "upgradeList"));
        content.append($('<div>').addClass("clear-fix"));
        $('#tabMessage').css("background-image", "url('" + l.tabBg + "')");

        l.updateUpgradeList();
        if(allResearchDone) {
            $('#buttonList').append($('<p>').html("All clear here!"));
        }
    },

    update: function() {
        var r = SharkGame.Resources;
        var l = SharkGame.Lab;

        // cache a selector
        var buttonList = $('#buttonList');

        // for each upgrade not yet bought
        $.each(SharkGame.Upgrades, function(key, value) {
            if(value.purchased) {
                return; // skip this upgrade altogether
            }

            // check if a button exists
            var button = $('#' + key);
            if(button.length === 0) {
                // add it if prequisite upgrades have been completed
                var prereqsMet = true; // assume true until proven false

                // check upgrade prerequisites
                if(value.required) {
                    $.each(value.required, function(_, v) {
                        // check previous upgrade research
                        if(SharkGame.Upgrades[v]) {
                            prereqsMet = prereqsMet && SharkGame.Upgrades[v].purchased;
                        } else {
                            prereqsMet = false; // if the required upgrade doesn't exist, we definitely don't have it
                        }

                        // check existence of resource cost
                        $.each(value.cost, function(k, v) {
                            prereqsMet = prereqsMet && SharkGame.World.doesResourceExist(k);
                        });
                    });
                }
                if(prereqsMet) {
                    // add button
                    var effects = SharkGame.Lab.getResearchEffects(value);
                    var buttonSelector = SharkGame.Button.makeButton(key, value.name + "<br/>" + value.desc + "<br/>" + effects, buttonList, l.onLabButton);
                    if(SharkGame.Settings.current.showAnimations) {
                        buttonSelector.hide()
                            .css("opacity", 0)
                            .slideDown(50)
                            .animate({opacity: 1.0}, 50);
                    }
                }
            } else {
                // button exists
                // disable or enable button based on cost being met
                var upgradeCost = SharkGame.Upgrades[key].cost;

                var enableButton;
                if($.isEmptyObject(upgradeCost)) {
                    enableButton = true; // always enable free buttons
                } else {
                    enableButton = r.checkResources(upgradeCost);
                }

                var effects = SharkGame.Lab.getResearchEffects(value, !enableButton);
                var label = value.name + "<br/>" + value.desc + "<br/>" + effects;
                var costText = r.resourceListToString(upgradeCost, !enableButton);
                if(costText != "") {
                    label += "<br/>Cost: " + costText;
                }
                button.prop("disabled", !enableButton).html(label);

                var spritename = "technologies/" + key;
                if(!enableButton) {
                    spritename += "-disabled";
                }
                if(SharkGame.Settings.current.iconPositions !== "off") {
                    var iconDiv = SharkGame.changeSprite(spritename);
                    if(iconDiv) {
                        iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                        button.prepend(iconDiv);
                    }
                }
            }
        });
    },

    onLabButton: function() {
        var r = SharkGame.Resources;
        var l = SharkGame.Lab;
        var u = SharkGame.Upgrades;

        var upgradeId = $(this).attr("id");
        var upgrade = u[upgradeId];
        if(upgrade.purchased) {
            $(this).remove();
            return; // something went wrong don't even pay attention to this function
        }

        var upgradeCost = u[upgradeId].cost;

        if(r.checkResources(upgradeCost)) {
            // kill button
            $(this).remove();
            // take resources
            r.changeManyResources(upgradeCost, true);
            // purchase upgrade
            l.addUpgrade(upgradeId);
            // update upgrade list
            l.updateUpgradeList();

            if(upgrade.researchedMessage) {
                SharkGame.Log.addMessage(upgrade.researchedMessage);
            }
        }
    },

    addUpgrade: function(upgradeId) {
        var l = SharkGame.Lab;
        var r = SharkGame.Resources;
        var u = SharkGame.Upgrades;
        var upgrade = u[upgradeId];
        if(upgrade) {
            upgrade.purchased = true;
            //l.updateResearchList();

            // if the upgrade has effects, do them
            if(upgrade.effect) {
                if(upgrade.effect.multiplier) {
                    $.each(upgrade.effect.multiplier, function(k, v) {
                        var newMultiplier = v * r.getMultiplier(k);
                        r.setMultiplier(k, newMultiplier)
                    });
                }
            }
        }
    },

    allResearchDone: function() {
        var u = SharkGame.Upgrades;
        var allDone = true;
        $.each(u, function(k, v) {
            allDone = allDone && v.purchased;
        });
        return allDone;
    },

    getResearchEffects: function(upgrade, darken) {
        var effects = "<span class='medDesc' class='click-passthrough'>(Effects: ";
        if(upgrade.effect) {
            if(upgrade.effect.multiplier) {
                $.each(upgrade.effect.multiplier, function(k, v) {
                    effects += SharkGame.Resources.getResourceName(k, darken, true) + " power x " + v + ", ";
                });
                // remove trailing suffix
                effects = effects.slice(0, -2);
            }
        } else {
            effects += "???";
        }
        effects += ")</span>";
        return effects;
    },

    updateUpgradeList: function() {
        var u = SharkGame.Upgrades;
        var upgradeList = $('#upgradeList');
        upgradeList.empty();
        upgradeList.append($("<h3>").html("Researched Upgrades"));
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
