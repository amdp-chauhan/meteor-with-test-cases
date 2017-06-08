// Tests for the behavior of the posts collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Posts } from './posts.js';

if (Meteor.isServer) {
  describe('posts collection', function () {
    it('insert posts correctly', function () {
      const postId = Posts.insert({
        post: 'meteor homepage',
        createdAt: new Date(),
        userId: Random.id()
      });
      const added = Posts.find({ _id: postId });
      const collectionName = added._getCollectionName();
      const count = added.count();
      
      assert.equal(collectionName, 'posts');
      assert.equal(count, 1);
    });
  });
}
