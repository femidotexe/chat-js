console.log('Creating group messages istance-----------------------------');
var gmsg = new ChatMessage('I\'m posting on the group', 1);
var gmsg2 = new ChatMessage('Another post', 1);
var chatapp = new Chat();
chatapp.postAMessage(gmsg);
chatapp.postAMessage(gmsg2);

console.log('\n LIsting the messages in the group -------------------------');
console.log(chatapp.getGroupChats());
chatapp.editGroupMessage(2, 'An edited post from the same person');

console.log('\n Edited the last message in the group -------------------------');
console.log(chatapp.getGroupChats());
chatapp.postAMessage(new ChatMessage('I am learning javascript', 2));

console.log('\n LIsting the messages in the group -------------------------');
console.log(chatapp.getGroupChats());

console.log('\n Editing a group message that does not exist -------------------------');
console.log(chatapp.editGroupMessage(4, 'this should not work'));

console.log('\n Private chat section-------------------------');

console.log('\n Message posting process ------------------------')
privatemsg = new ChatMessage('This is a private message', 1, 2);
console.log(chatapp.postAMessage(privatemsg));
pmsg = new ChatMessage('It wont allow me to message myself', 1, 1);
console.log(chatapp.postAMessage(pmsg));
pmsg2 = new ChatMessage('A reply from 2 to 1', 2, 1);
chatapp.postAMessage(pmsg2);

console.log('\n List private chats between user 1 and 2---------------------------');
console.log(chatapp.getPrivateChats(1, 2));

console.log('\n Listing private messages between user 2 and 3------------------');
console.log(chatapp.getPrivateChats(3, 2));