var Chat = function() {
    this.groupChats = [];
    this.privateChats = [];
    this.privateid = 1;
    this.groupid = 1;

    this.numberoOfMessages = function(typeofchat) {
        if(typeofchat === 'groupchat') {
            return this.groupChats.length;
        }else {
            return this.privateChats.length;
        }
    };

    this.postAMessage = function(message) {
        if(message instanceof PrivateChat) {
            if(message.from === message.to){
                return 'You can\'t post a message to yourself';
            }
            message.id = this.privateid;
            this.privateid++;
            this.privateChats.push(message);
        } else if(message instanceof GroupChat){
            message.id = this.groupid;
            this.groupid++;
            this.groupChats.push(message);
        } else {
            return 'Invalid message posted';
        }
    };

    this.getGroupChats = function() {
        if(this.numberoOfMessages('groupchat') === 0){
            return 'No group messages yet';
        }
        return this.groupChats;
    };

    this.getPrivateChats = function(from, to){
        var privatemessages = [];
        if(this.numberoOfMessages('privatechat') === 0) {
            return 'No private messages between these users';
        } else {
            for(var i = 0; i < this.privateChats.length; i++) {
                if((this.privateChats[i].from === from && this.privateChats[i].to === to)
                || (this.privateChats[i].from === to && this.privateChats[i].to === from)) {
                    privatemessages.push(this.privateChats[i]);
                }
            }
        }
        if(privatemessages.length === 0){
            return 'No private messages between these users';
        }
        return privatemessages;
    };

    this.editPrivateMessage = function(id, message) {
        var messageIndex = this.getAMessageIndex('privatechat', id);
        if(isNaN(messageIndex)){
            return messageIndex;
        }
        this.privateChats[messageIndex].message = message;
        return;
    };

    this.editGroupMessage = function(id, message){
        var messageIndex = this.getAMessageIndex('groupchat', id);
        if(isNaN(messageIndex)){
            return messageIndex;
        }
        this.groupChats[messageIndex].message = message;
    };

    this.getAPrivateMessage = function(id) {
        var messageIndex = this.getAMessageIndex('privatechat', id);
        if(isNaN(messageIndex)){
            return messageIndex;
        }
        return this.privateChats[messageIndex];
    };

    this.getAGroupMessage = function(id){
        var messageIndex = this.getAMessageIndex('groupchat', id);
        if(isNaN(messageIndex)){
            return messageIndex;
        }
        return this.groupChats[messageIndex];
    };

    this.getAMessageIndex = function(typeofchat, id) {
        if(id <= 0 || parseInt(id) != id) {
            return 'Invalid id';
        }
        var i;
        if(typeofchat === 'groupchat') {
            for(i = 0; i < this.groupChats.length; i++) {
                if(this.groupChats[i].id === id){
                    return i;
                }
            }
            return 'Message does not exist';
        } else if(typeofchat === 'privatechat') {
            for(i = 0; i < this.privateChats.length; i++) {
                if(this.privateChats[i].id === id){
                    return i;
                }
            }
            return 'Message does not exist';
        }
    };

    this.deleteAGroupMessage = function(id) {
        var msgindex = this.getAMessageIndex('groupchat', id);
        if(isNaN(msgindex)) {
            return msgindex;
        }else {
            this.groupChats.splice(msgindex, 1);
        }
    }

    this.deleteAPrivate = function(id) {
        var msgindex = this.getAMessageIndex('privatechat', id);
        if(isNaN(msgindex)) {
            return msgindex;
        }else {
            this.privateChats.splice(msgindex, 1);
        }
    }
};

var ChatMessage = function(message, from, to) {
    var eachchat;
    if(message !== undefined && from !== undefined && to !== undefined) {
        eachchat = new PrivateChat(message, from, to);
    } else if(message !== undefined && from !== undefined) {
        eachchat = new GroupChat(message, from);
    } else {
        eachchat = undefined;
    }
    return eachchat;
};

var PrivateChat = function(message, from, to) {
    this.message = message;
    this.from = from;
    this.to = to;
    this.id = 0;
};

var GroupChat = function(message, from){
    this.message = message;
    this.from = from;
    this.id = 0;
};



module.exports = {'chatmessage':ChatMessage, 'chat':Chat, 'privateChat':PrivateChat, 'groupChat':GroupChat};