// create user
// search user (username)
// validate user (username, password)
var User = function() {
    this.users = [];
    this.currentUserId = 1;

    /**
     * this method creates new user from
     * the UserDetails class
     *
     */
    this.createUser = function(username, password) {
        
        var newUser = new UserDetails(username, password);
        newUser.userid = this.currentUserId;
        this.currentUserId++;
        this.users.push(newUser);
    };



};

/**
 * UserDetails class creates a new user object
 * 
 * @param {string} username
 * @param {string} password
 *
 */
var UserDetails = function(username, password) {
    
    if (username === undefined || password === undefined) {
        return 'User Details incomplete';
    } else {
        this.username = username;
        this.password = password;
        this.userid = 0;    
    }

};

module.exports = { 'User' : User, 'UserDetails' : UserDetails };