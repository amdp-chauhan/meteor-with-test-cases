import { Meteor } from 'meteor/meteor';
import { Posts } from '/imports/api/posts/posts.js';
import './insertPost.html';

Template.insertPost.onCreated(function() {});

Template.insertPost.helpers({});

Template.insertPost.events({
    'submit #postsForm' (event) {
        event.preventDefault();

        const target = event.target;
        const post = target.post;
        if (!post.value) {
            sAlert.error('Post can not be left blank');
            return
        }

        let status = Posts.insert({
            post: post.value,
            userId: Meteor.userId(),
            createdAt: new Date()
        });
        // clearing value from post text field
        post.value = "";

        if(status){
          sAlert.success('Post inserted sucessfuly');
        }else
          sAlert.error('Can not insert this post');
    },
});
