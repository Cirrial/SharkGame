SharkGame.Log = {

    initialised: false,
    messages: [],

    init() {
        const l = SharkGame.Log;
        // create log
        $("#log").append("<button id='clearLog' class='min'></button><h3>Log<h3/><ul id='messageList'></ul>");
        // add clear button
        SharkGame.Button.replaceButton("clearLog", "&nbsp x &nbsp", l.clearMessages);
        l.initialised = true;
    },

    addMessage(message) {
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

    addError(message) {
        const l = SharkGame.Log;
        const messageItem = l.addMessage("Error: " + message);
        messageItem.addClass("error");
        return messageItem;
    },

    addDiscovery(message) {
        const l = SharkGame.Log;
        const messageItem = l.addMessage(message);
        messageItem.addClass("discovery");
        return messageItem;
    },

    correctLogLength() {
        const l = SharkGame.Log;
        const showAnims = SharkGame.Settings.current.showAnimations;
        const logMax = SharkGame.Settings.current.logMessageMax;

        // Cuts off messages below rendering limit to significantly cut down on jittering
        $("#messageList").css("max-height", logMax * ($(l.messages[0]).innerHeight()) || 100);

        if(l.messages.length >= logMax) {
            while(l.messages.length > logMax) {
                let oldestMessage = l.messages[0]
                // remove oldest message
                if(showAnims) {
                    l.messages[0].animate({opacity: 0}, 100, "swing", function remove() {
                        $(oldestMessage).remove();
                    });
                } else {
                    oldestMessage.remove();
                }

                // shift array (remove first item)
                l.messages.shift();
            }
        }
    },

    clearMessages() {
        const l = SharkGame.Log;
        // remove each element from page
        $.each(l.messages, (_, v) => {
            v.remove();
        });
        // wipe array
        l.messages = [];
    },

    haveAnyMessages() {
        return SharkGame.Log.messages.length > 0;
    }
};
