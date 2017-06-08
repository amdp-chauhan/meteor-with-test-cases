// Tests for posts methods
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Posts } from './posts.js';
import './methods.js';

if (Meteor.isServer) {
    describe('posts methods', () => {
        const userId = Random.id();
        let postId;

        beforeEach(() => {
            Posts.remove({});
            postId = Posts.insert({
                name: 'some post test content',
                userId: userId,
                createdAt: new Date()
            });
        });

        it('user can remove his own post', () => {
            // Find the internal implementation of the post method so we can
            // test it in isolation
            const deletePost = Meteor.server.method_handlers['posts.remove'];
            // Set up a fake method invocation that looks like what the method expects
            const invocation = { userId };
            // Run the method with `this` set to the fake invocation
            deletePost.apply(invocation, [postId]);
            // Verify that the method does what we expected
            assert.equal(Posts.find().count(), 0);
        });

    });
}
