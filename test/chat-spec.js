'use strict'

var chai = require('chai');
var assert = chai.assert;

var allChats = require('../chat.js');
var ChatMessage = allChats.chatmessage;
var PrivateChat = allChats.privateChat;
var GroupChat = allChats.groupChat;
var ChatApp = allChats.chat;

describe('Testing the chat message instantiation', function() {
    it('should return an instance of privatechat if the parameters supplied are message, from and to',
        function() {
        var newMessage = new ChatMessage('Start of the chat', 1, 3);
        assert.instanceOf(newMessage, PrivateChat);
    });

    it('should return an instance of group chat if the parameters supplied are message and from',
     function() {
        var newMessage = new ChatMessage('This is a group message', 1);
        assert.instanceOf(newMessage, GroupChat);
    });

    it('should not create a message without either message or from',
        function() {
        var newMessage = new ChatMessage('intentionally leaving out the from param');
        assert.isUndefined(newMessage.message);
        var anotherMessage = new ChatMessage();
        assert.isUndefined(newMessage.message);
    });
});

describe('Testing the number of messages function', function() {
    it('should return an empty array of group chats when no message has been pushed',
     function() {
        var chatApp = new ChatApp();
        assert.equal(chatApp.numberoOfMessages('groupchat'), 0);
    });

    it('should return an empty array of private chats when no message has been pushed',
     function() {
        var chatApp = new ChatApp();
        assert.equal(chatApp.numberoOfMessages('privatechat'), 0);
    });
});

describe('Testing the postAMessage function', function() {
    it('should add 1 to the number of Group messages if i post a group message',
     function() {
        var chatApp = new ChatApp();
        var newMessage = new ChatMessage('This is a group message', 1);
        chatApp.postAMessage(newMessage);
        assert.equal(chatApp.numberoOfMessages('groupchat'), 1);
    });

    it('should add 1 to the number of privates messages if i post a private message',
     function() {
        var chatApp = new ChatApp();
        var newMessage = new ChatMessage('This is a private message', 1, 2);
        chatApp.postAMessage(newMessage);
        assert.equal(chatApp.numberoOfMessages('privatechat'), 1);
    });

    it('should give an error message that you can\'t send a private message to yourself',
     function() {
        var chatApp = new ChatApp();
        var newMessage = new ChatMessage('This is a private message', 1, 1);
        assert(chatApp.postAMessage(newMessage) == 'You can\'t post a message to yourself');
    });

    it('should give an error message when you are trying to post a message that is not private or group message',
     function() {
        var chatApp = new ChatApp();
        assert(chatApp.postAMessage('false message') === 'Invalid message posted');
    });
});

describe('Testing the function getGroupChats function', function() {
    it('should return a string "No group messages yet"', function() {
        var chatApp = new ChatApp();
        assert(chatApp.getGroupChats() === 'No group messages yet');
    });

    it('should return an array of 1 element at this point', function() {
        var chatApp = new ChatApp();
        var newMessage = new ChatMessage('Had to post something', 1);
        chatApp.postAMessage(newMessage);
        var messages = chatApp.getGroupChats();
        assert.isArray(messages);
        assert.equal(messages.length, 1);
    });
});

describe('Testing getPrivateChat method', function() {
    it('should return a string "No private messages between these users"', function() {
        var chatApp = new ChatApp();
        assert(chatApp.getPrivateChats(1, 2), 'No private messages between these users');
    });

    it('should return a string "No private messages between these users"', function() {
        var testPrivateMsg = new ChatMessage('sdkfjs', 5, 8);
        var chatApp = new ChatApp();
        chatApp.postAMessage(testPrivateMsg);
        assert(chatApp.getPrivateChats(1, 2), 'No private messages between these users');
    })

    it('should return an array of length 1', function() {
        var chatApp = new ChatApp();
        var aprivatemsg = new ChatMessage('This is a private message', 1, 2);
        chatApp.postAMessage(aprivatemsg);
        assert.isArray(chatApp.getPrivateChats(1, 2));
    });
});

describe('Testing the editPrivateMessage method', function() {
    it('should return an "Invalid id when"', function() {
        var chatApp = new ChatApp();
        assert(chatApp.editPrivateMessage(-1, 'Edited Message') === 'Invalid id');
        assert(chatApp.editPrivateMessage(5.6, 'Edited Message') === 'Invalid id');
    });

    it('should return "message has been deleted" if the id sent is greater than 0 and it does not exist',
     function() {
        var chatApp = new ChatApp();
        assert(chatApp.editPrivateMessage(1, 'Editing a Message') === 'Message does not exist');
    });

    it('should get the new editedmessage when the .message property is used', function() {
        var chatApp = new ChatApp();
        var aprivatemsg = new ChatMessage('This is a private message', 1, 2);
        chatApp.postAMessage(aprivatemsg);
        chatApp.editPrivateMessage(1, 'Edited Message');
        assert(chatApp.getAPrivateMessage(1).message === 'Edited Message');
    });
});

describe('Testing the editGroupMessage method', function() {
    it('should return an "Invalid id when"', function() {
        var chatApp = new ChatApp();
        assert(chatApp.editGroupMessage(-1, 'Edited Message') === 'Invalid id');
        assert(chatApp.editGroupMessage(5.6, 'Edited Message') === 'Invalid id');
    });

    it('should return "message has been deleted" if the id sent is greater than 0 and it does not exist',
     function() {
        var chatApp = new ChatApp();
        chatApp.editGroupMessage(1, 'Editing a Message')
        assert(chatApp.editGroupMessage(1, 'Editing a Message') === 'Message does not exist');
    });

    it('should get the new editedmessage when the .message property is used', function() {
        var chatApp = new ChatApp();
        var groupMsg = new ChatMessage('this is for group', 1);
        chatApp.postAMessage(groupMsg);
        chatApp.editGroupMessage(1, 'Edited Message');
        assert(chatApp.getAGroupMessage(1).message === 'Edited Message');
    });
});

describe('Testing the getAPrivateMessage function', function() {
    it('should return invalid id when i pass a fake id', function() {
        var chatApp = new ChatApp();
        var newMsg = new ChatMessage('This is message', 1, 2);
        chatApp.postAMessage(newMsg);
        assert(chatApp.getAPrivateMessage(-1) === 'Invalid id');
        assert(chatApp.getAPrivateMessage(4.3) === 'Invalid id');
    })

    it('should return an object of chatmessage', function() {
        var chatApp = new ChatApp();
        var newMsg = new ChatMessage('This is message', 1, 2);
        chatApp.postAMessage(newMsg);
        assert.instanceOf(chatApp.getAPrivateMessage(1), PrivateChat);
    });
});

describe('Testing the getAGroupMessage function', function() {
    it('should return invalid id when i pass a fake id', function() {
        var chatApp = new ChatApp();
        var newMsg = new ChatMessage('This is message', 1);
        chatApp.postAMessage(newMsg);
        assert(chatApp.getAGroupMessage(-1) === 'Invalid id');
        assert(chatApp.getAGroupMessage(4.3) === 'Invalid id');
    })

    it('should return an object of chatmessage', function() {
        var chatApp = new ChatApp();
        var newMsg = new ChatMessage('This is message', 1);
        chatApp.postAMessage(newMsg);
        assert.instanceOf(chatApp.getAGroupMessage(1), GroupChat);
    });
})

