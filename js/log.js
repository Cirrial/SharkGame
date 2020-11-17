SharkGame.Log = {

    initialised: false,
    messages: [],

    init: function() {
        const l = SharkGame.Log;
        // create log
        $("#log").append("<button id='clearLog' class='min'></button><h3>Log<h3/><ul id='messageList'></ul>");
        // add clear button
        SharkGame.Button.replaceButton("clearLog", "&nbsp x &nbsp", l.clearMessages);
        l.initialised = true;
    },

    addMessage: function(message) {
        const l = SharkGame.Log;
        const s = SharkGame.Settings.current;
        const showAnims = s.showAnimations;

        if(!l.initialised) {
            l.init();
        }
        const messageList = $("#messageList");

        const messageItem = $("<li>").html(message);
        if(showAnims) {
            messageItem.hide()
                .css("opacity", 0)
                .prependTo("#messageList")
                .slideDown(50)
                .animate({opacity: 1.0}, 100);
        } else {
            messageItem.prependTo("#messageList");
        }
        l.messages.push(messageItem);

        SharkGame.Log.correctLogLength();

        return messageItem;
    },

    addError: function(message) {
        const l = SharkGame.Log;
        const messageItem = l.addMessage("Error: " + message);
        messageItem.addClass("error");
        return messageItem;
    },

    addDiscovery: function(message) {
        const l = SharkGame.Log;
        const messageItem = l.addMessage(message);
        messageItem.addClass("discovery");
        return messageItem;
    },

    correctLogLength: function() {
        const l = SharkGame.Log;
        const showAnims = SharkGame.Settings.current.showAnimations;
        const logMax = SharkGame.Settings.current.logMessageMax;

        if(l.messages.length >= logMax) {
            while(l.messages.length > logMax) {
                // remove oldest message
                if(showAnims) {
                    l.messages[0].animate({opacity: 0.0}, 100, "swing", function() {
                        $(this).remove();
                    });
                } else {
                    l.messages[0].remove();
                }

                // shift array (remove first item)
                l.messages.shift();
            }
        }
    },

    clearMessages: function() {
        const l = SharkGame.Log;
        // remove each element from page
        $.each(l.messages, function(_, v) {
            v.remove();
        });
        // wipe array
        l.messages = [];
    },

    haveAnyMessages: function() {
        return SharkGame.Log.messages.length > 0;
    }
};