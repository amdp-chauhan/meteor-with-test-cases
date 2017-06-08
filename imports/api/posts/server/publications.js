// All posts-related publications

import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';

Meteor.publish('posts.all', function() {
    return Posts.find();
});

Posts.allow({
    insert: function(userId, doc) {
    		// So that only site user can perform insertion
        if (userId)
            return true
    },
    remove: function(userId, doc) {
    		// So that only owner can perform deletion
        if (userId == doc.userId)
            return true
    }
})
