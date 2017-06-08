// Methods related to posts

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from './posts.js';

Meteor.methods({
  'posts.remove'(postId){
  	return Posts.remove(postId);
  }
});
