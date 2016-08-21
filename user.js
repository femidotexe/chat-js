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
        
        if (typeof(newUser.username) === 'undefined') {
            return 'A username and password is required';
        }
        
        newUser.userid = this.currentUserId;
        this.currentUserId++;
        this.users.push(newUser);
        
        return 'New user successfully created!';
    };

    this.searchUser = function(username) {
        var userExists = this.userExists(username);
        
        if (userExists === 'Invalid username') {
            return 'Invalid username';
        } else if (userExists === false) {
            return 'User does not exist';
        } else return this.users[userExists];
    };

    this.authUser = function(username, password) {
        var userExists = this.userExists(username)
        var users = this.users;

        if (typeof(username) !== 'string' || typeof(password) !== 'string') {
            return 'Please enter a username and password';
        } else if (userExists === false) {
            return 'Invalid login details';
        } else {
            if (users[userExists].username === username
                && users[userExists].password === password) {
                return 'Welcome, ' + username + '!';
            }    
        }

        return 'Invalid login details';
    };

    this.userExists = function(username, password) {
        if (typeof(username) !== 'string') return 'Invalid username';

        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                return i;
            }
        }

        return false;
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
    if (typeof(username) === 'undefined' || typeof(password) === 'undefined') {
        return false;
    } else {
        this.username = username.toString();
        this.password = password.toString();
        this.userid = 0;    
    }
};

module.exports = { 'User' : User, 'UserDetails' : UserDetails };