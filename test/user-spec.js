var User = require('../user').User;
var UserDetails = require('../user').UserDetails;
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('User.js tests', function() {

    describe('User object instantiation', function() {
        it('Should return an instance of User', function() {
            var femi = new User();

            assert(femi, Object);
        });
        it('Should return an instance of User', function() {
            var femi = new User();
            femi.createUser('femipixels', 'international')

            assert(femi.users[0], Object);
        });
    });

});

describe('', function(){
    
});
