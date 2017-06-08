import './posts.html';
import { Meteor } from 'meteor/meteor';
import { Posts } from '/imports/api/posts/posts.js';
import './insertPost.js';

Template.posts.onCreated(function() {
    Meteor.subscribe('posts.all');
});

Template.posts.helpers({
    posts() {
        return Posts.find({});
    },
    compare(ownerId, user) {
        // Implementing check for showing Remove button to only owner of the post 
        if (user && (ownerId == user._id))
            return true
        return false
    }
});

Template.posts.events({
    'click .removePost' (event) {
        event.preventDefault();
        const postId = event.currentTarget.id;

        Meteor.call('posts.remove', postId, (error, status) => {
            if (error) {
                console.log(":: error - ",error.error);
                sAlert.error('Can not delete this post');
            } else {
                if (status)
                  sAlert.success('Post deleted sucessfuly');
                else
                  sAlert.success('Can not delete this post');
            }
        });
    },
});
