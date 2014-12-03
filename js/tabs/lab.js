SharkGame.Lab = {

    tabId: "lab",
    tabDiscovered: false,
    tabName: "Laboratory",
    tabBg: "img/bg/bg-lab.png",

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

        var message = l.allResearchDone() ? l.messageDone : l.message;
        message = "<img width=400 height=200 src='http://placekitten.com/g/400/200' id='tabSceneImage'>" + message;
        content.append($('<div>').attr("id", "tabMessage").html(message));
        content.append($('<div>').attr("id", "buttonList"));
        $('#tabMessage').css("background-image", "url('" + l.tabBg + "')");
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
                        if(SharkGame.Upgrades[v]) {
                            prereqsMet = prereqsMet && SharkGame.Upgrades[v].purchased;
                        } else {
                            prereqsMet = false; // if the required upgrade doesn't exist, we definitely don't have it
                        }
                    });
                }
                if(prereqsMet) {
                    // add button
                    var effects = SharkGame.Lab.getResearchEffects(value);
                    var buttonSelector = SharkGame.Button.makeButton(key, value.name + "<br/>" + value.desc + "<br/>" + effects, buttonList, l.onLabButton);
                    buttonSelector.prepend(SharkGame.getImageIconHTML(value.image, 80, 80));
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
                label = SharkGame.getImageIconHTML(value.image, 80, 80) + label;
                button.prop("disabled", !enableButton).html(label);
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

//    updateResearchList: function () {
//        var u = SharkGame.Upgrades;
//        var researchDiv = $('#researchDiv');
//
//        // check if research list has to be added
//        if ( !(researchDiv.length) ) {
//
//            researchDiv = $('<div>')
//                .attr("id", "researchDiv")
//                .append($('<h3>')
//                    .html("Upgrades"))
//                .append($('<ul>')
//                    .attr("id", "researchList")
//            );
//            // append after resource table
//            var rTable = $('#resourceTable');
//            if ( rTable.length <= 0 ) {
//                return;
//            } else {
//                rTable.after(researchDiv);
//            }
//        }
//
//        var researchList = $('#researchList');
//        researchList.empty();
//        // add researched upgrades to list
//        $.each(u, function (k, v) {
//            if ( v.purchased ) {
//                researchList.append($('<li>').html(v.name));
//            }
//        });
//    },

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
    }
};

SharkGame.Upgrades = {
    crystalBite: {
        name: "Crystal Bite-Gear",
        desc: "Bite the crystals we have into something to help biting!",
        researchedMessage: "Weird teeth-wear has been developed, and sharks can now catch fish better as a result.",
        effectDesc: "Sharks are twice as effective with their new biting gear.",
        cost: {
            science: 50
        },
        effect: {
            multiplier: {
                shark: 2
            }
        }
    },

    crystalSpade: {
        name: "Crystal Spades",
        desc: "Fashion strange harness-tools for the rays.",
        researchedMessage: "The rays can now bother the sand more effectively, and dig up more sand now!",
        effectDesc: "Rays are twice as effective with their specially adapted digging tools.",
        cost: {
            science: 50
        },
        effect: {
            multiplier: {
                ray: 2
            }
        }
    },

    crystalContainer: {
        name: "Crystal Containers",
        desc: "Make weird bottle globe things from the crystals we have. Maybe useful??",
        researchedMessage: "Well, things can go into these containers that aren't water. This makes science easier!",
        effectDesc: "Science sharks are twice as effective at making with the science.",
        cost: {
            science: 100,
            crystal: 50
        },
        effect: {
            multiplier: {
                scientist: 2
            }
        }
    },

    statsDiscovery: {
        name: "Storage Caverns",
        desc: "It's about time to start moving the stores we have to a better place. We've found one but it needs setting up.",
        researchedMessage: "All the goods we've acquired are now being stored and itemised in a mostly flooded cavern system. No more stray currents washing it all away!",
        effectDesc: "By storing things in a centralised location, we now finally have an idea of what we're doing. Sort of.",
        cost: {
            science: 150
        },
        required: [
            "crystalContainer"
        ]
    },

    underwaterChemistry: {
        name: "Underwater Chemistry",
        desc: "With the weird bottles, we can now put things and other things into them and see what happens.",
        researchedMessage: "Well, nothing useful was determined, but if we keep on doing it we make tremendous leaps for science!",
        effectDesc: "Science sharks are twice as effective with their new chemical insights.",
        cost: {
            science: 200
        },
        required: [
            "crystalContainer"
        ],
        effect: {
            multiplier: {
                scientist: 2
            }
        }
    },

    seabedGeology: {
        name: "Seabed Geology",
        desc: "Study the bottom of the ocean to determine the rich, deep, juicy secrets it contains.",
        researchedMessage: "Not only did we find a whole bunch of weird things, the rays found that there was more sand!",
        effectDesc: "Rays are twice as effective with their understanding of the seabed and its varieties of sediment.",
        cost: {
            science: 250
        },
        required: [
            "crystalContainer"
        ],
        effect: {
            multiplier: {
                ray: 2
            }
        }
    },

    thermalVents: {
        name: "Thermal Vents",
        desc: "Investigate the boiling vents that just seem to keep on heating things up.",
        researchedMessage: "This is a wondrous, unending source of heat! Something good must come from this.",
        effectDesc: "A power source for future technologies has been discovered.",
        cost: {
            science: 300
        },
        required: [
            "seabedGeology"
        ]
    },

    laserRays: {
        name: "Laser Rays",
        desc: "Using arcane shark mystery science, capture the heat of the vents for use by rays.",
        researchedMessage: "The rays can now be granted gear that will let them fuse sand into crystal! Future!",
        effectDesc: "Laser rays can now be geared up to burn the very sand to glassy crystal.",
        cost: {
            science: 100
        },
        required: [
            "thermalVents"
        ]
    },

    automation: {
        name: "Automation",
        desc: "Using sharkonium, we can make things to do things so we don't have to do the things!",
        researchedMessage: "Now we don't have to do all the work, machines can do it for us! Future!!",
        effectDesc: "Machines can be built to supplement population duties. This is efficient.",
        cost: {
            science: 1000,
            sharkonium: 100
        },
        required: [
            "thermalVents",
            "transmutation"
        ]
    },

    engineering: {
        name: "Engineering",
        desc: "The machines sort of suck. Let's make them better by learning how!",
        researchedMessage: "The machines are twice as good now! And... restless. Ceaseless. Awesome! Fuuutuuure!!",
        effectDesc: "Machines are twice as effective. This is good. This is necessary. This is optimal.",
        cost: {
            science: 2000,
            sharkonium: 2000
        },
        required: [
            "automation"
        ],
        effect: {
            multiplier: {
                crystalMiner: 2,
                autoTransmuter: 2,
                fishMachine: 2,
                sandDigger: 2
            }
        }
    },

    recyclerDiscovery: {
        name: "Recycler",
        desc: "Devise a system of pulverising unwanted resources into a component paste, and reusing them as something else.",
        researchedMessage: "Well this thing is frankly terrifying. I wouldn't swim anywhere near the input holes if I were you. Maybe it'll help though!",
        effectDesc: "Allows recycling of materials by virtue of a horrifying mechanical maw that consumes all that ventures near it. Future?",
        cost: {
            science: 3000
        },
        required: [
            "automation"
        ]
    },

    kelpHorticulture: {
        name: "Kelp Horticulture",
        desc: "Determine what it takes to plant kelp all over the seabed. Maybe this is useful.",
        researchedMessage: "Crab-specific gear has been invented to allow for kelp farming! This is possibly useful.",
        effectDesc: "Crabs can become kelp farmers and grow a living carpet across the bottom of the sea.",
        cost: {
            science: 500,
            sand: 2000
        },
        required: [
            "seabedGeology"
        ]
    },

    xenobiology: {
        name: "Xenobiology",
        desc: "Determine what is with these weird twitching organisms that keep appearing in the kelp fields.",
        researchedMessage: "Results inconclusive! Further research required. It could be such a benefit for science!",
        effectDesc: "Kelp produces sea apples twice as fast. We finally almost sort of understand what a sea apple is. It isn't a fruit.",
        cost: {
            science: 300,
            seaApple: 300
        },
        required: [
            "kelpHorticulture"
        ],
        effect: {
            multiplier: {
                kelp: 2
            }
        }
    },

    biology: {
        name: "Biology",
        desc: "We probably should have done this BEFORE poking at weird things.",
        researchedMessage: "With a new understanding of their own biology, sharks can now specialise in the manufacture of new sharks.",
        effectDesc: "Sharks are twice as effective. Did you know shark eggs don't actually form just because a shark wills them to exist?",
        cost: {
            science: 400
        },
        required: [
            "xenobiology"
        ],
        effect: {
            multiplier: {
                shark: 2
            }
        }
    },

    rayBiology: {
        name: "Ray Biology",
        desc: "Though kindred to the sharks, we know so little about the rays. If only we could fix this. We need to bait a sand trap.",
        researchedMessage: "Apparently we could have just asked. We learned how rays make more rays. It's kinda similar to sharks, really, but rays.",
        effectDesc: "Rays and laser rays are twice as effective. We may never repair the shark-ray relations to their former state after how awkward this whole affair was.",
        cost: {
            science: 700,
            sand: 600
        },
        required: [
            "biology",
            "laserRays"
        ],
        effect: {
            multiplier: {
                ray: 2,
                laser: 2
            }
        }
    },

    crabBiology: {
        name: "Crab Biology",
        desc: "Crabs are a mystery. They keep to themselves and dig up crystals or put down plants. What is even up with that? What ARE crabs??",
        researchedMessage: "It turns out crabs are friendly crustaceans that have revealed to the sharks the secrets of crab generation. It involves eggs, or something. Squirmy eggs.",
        effectDesc: "Crabs and planter crabs are twice as effective. Crabs are alright but they are also sort of terrifying and weird. Good job they're on our side!",
        cost: {
            science: 500,
            kelp: 1000
        },
        required: [
            "biology",
            "sunObservation"
        ],
        effect: {
            multiplier: {
                crab: 4,
                planter: 2
            }
        }
    },

    sunObservation: {
        name: "Sun Observation",
        desc: "We must determine what is with the weird glare on the surface of the water.",
        researchedMessage: "Shark science has discovered the sun! It has also discovered that looking directly into the sun hurts.",
        effectDesc: "Planter crabs are twice as effective. Is a suns worth many fish? We can see a sun, but where is it really? And by what is it made of?",
        cost: {
            science: 5000
        },
        required: [
            "kelpHorticulture"
        ],
        effect: {
            multiplier: {
                planter: 2
            }
        }
    },

    transmutation: {
        name: "Transmutation",
        desc: "By heating things up and doing science things to them, maybe new things can be made!",
        researchedMessage: "A new form of material has been discovered! It has been named after its discoverer, Dr. Sharkonium.",
        effectDesc: "Enables transmutation of some random junk we have lying around into sharkonium, material of the future.",
        cost: {
            science: 1000,
            crystal: 2000
        },
        required: [
            "thermalVents",
            "underwaterChemistry"
        ]
    },

    exploration: {
        name: "Exploration",
        desc: "Swim beyond the home seas to see what can be found!",
        researchedMessage: "Found lots of schools of fish! So many different schools! And such untapped sand reserves!",
        effectDesc: "Sharks and rays are twice as effective. Did you know oceans are big? Fascinating!",
        cost: {
            science: 5000,
            fish: 5000
        },
        required: [
            "seabedGeology",
            "sunObservation"
        ],
        effect: {
            multiplier: {
                shark: 2,
                ray: 2
            }
        }
    },

    farExploration: {
        name: "Far Explorations",
        desc: "Explore the vast reaches beyond the home ocean.",
        researchedMessage: "Crystal-rich deposits were found, as well as strange, deep chasms.",
        effectDesc: "Crabs are four times as effective. Did you know oceans are actually even bigger than big? Remarkable!",
        cost: {
            science: 8000,
            fish: 15000
        },
        required: [
            "exploration"
        ],
        effect: {
            multiplier: {
                crab: 4
            }
        }
    },

    gateDiscovery: {
        name: "Chasm Exploration",
        desc: "A campaign of risky, foolhardy expeditions to the deeps, to find whatever can be found.",
        researchedMessage: "A strange structure was found from clues within the chasms. The cost was great, but the discovery is greater!",
        effectDesc: "Something ancient lurked in the depths.",
        cost: {
            science: 1E8,
            shark: 50000,
            ray: 50000,
            crab: 50000
        },
        required: [
            "farExploration"
        ]
    }

};
