var User = require('../user').User;
var UserDetails = require('../user').UserDetails;
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('@class User', function() {
    
    it('Should return an instance of User', function() {
        var newUser = new User();
        assert.isObject(newUser);
    });

    describe('Method createUser', function() {
        it('Should return an error message if a user is not succesfully created', function() {
            var newUser = new User();
            assert.equal(newUser.createUser(),
                'A username and password is required');
        });

        it('Should return a success message if user is succesfully created', function() {
            var newUser = new User();
            assert.equal(newUser.createUser('femipixels', '1234567890'),
                'New user successfully created!');
        });

        it('Should return a newUser object', function() {
            var newUser = new User();
            newUser.createUser('femipixels', '1234567890');
            assert.isObject(newUser.users[0]);
        });
    });

    describe('Method searchUser', function(){
        it('Should return error message if username is undefined or a number', function(){
            var newUser = new User();
            newUser.createUser('femipixels', '1234567890');
            assert.equal(newUser.searchUser(), 'Invalid username');
            assert.equal(newUser.searchUser(12345), 'Invalid username');
        });

        it('Return user does not exist if user not present in database', function(){
            var newUser = new User();
            assert.equal(newUser.searchUser('femipixels'), 'User does not exist');
        });

        it('Should return a user object if user exists', function(){
            var newUser = new User();
            newUser.createUser('femipixels', 'password');
            assert.isObject(newUser.searchUser('femipixels'));
        });

    });

    describe('Method authUser', function(){
        it('Should return error message if username or password is undefined or not string', function(){
            var newUser = new User();
            newUser.createUser('femipixels', 'password');
            assert.equal(newUser.authUser('femipixels'), 'Please enter a username and password');
            assert.equal(newUser.authUser('password'), 'Please enter a username and password');
        });

        it('Should return error message if user details dont\'t match db record', function(){
            var newUser = new User();
            newUser.createUser('femipixels', 'password');
            assert.equal(newUser.authUser('femipixels', 'notpassword'), 'Invalid login details');
            assert.equal(newUser.authUser('notfemipixels', 'password'), 'Invalid login details');
        });        

        it('Should return welcome message if user details match db record', function(){
            var newUser = new User();
            newUser.createUser('femipixels', 'password');
            assert.equal(newUser.authUser('femipixels', 'password'), 'Welcome, femipixels!');
        });

    });

    describe('Method userExists', function(){
        it('Should return error message if username is not a string or undefined', function(){
            var newUser = new User();
            assert.equal(newUser.userExists(), 'Invalid username');
        });

        it('Should return index of user if user exists', function(){
            var newUser = new User();
            newUser.createUser('femipixels', 'password');
            assert.equal(newUser.userExists('femipixels'), 0);
        });

        it('Should return false if user does not exist', function(){
            var newUser = new User();
            assert.isFalse(newUser.userExists('unknown'));
        });        
    });
});

describe('@class UserDetails', function(){
    it('Should return false if details for new user are not valid', function(){
        var newDetails = new UserDetails();
        assert.isUndefined(newDetails.username);
        assert.isUndefined(newDetails.password);
    });

    it('Instance of UserDetails() should be an object', function(){
        var newDetails = new UserDetails('femipixels', '1234567890');
        assert.isObject(newDetails);
    });

    it('Details of a new user must exist', function() {
        var newDetails = new UserDetails('femipixels', '1234567890');
        assert.isDefined(newDetails.username);
        assert.isDefined(newDetails.password);
        assert.isDefined(newDetails.userid);
    });
});
