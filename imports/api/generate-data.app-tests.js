// This file will be auto-imported in the app-test context, ensuring the method is always available

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';
import { Posts } from './posts/posts.js';
import { denodeify } from '../utils/denodeify';

const createList = (userId) => {
    const post = Factory.create('post', Posts, {
        name: 'some post test content',
        userId: userId,
        createdAt: new Date()
    });
    return post;
};

Meteor.methods({
    generateFixtures() {
        resetDatabase();

        // create 3 private lists
        _.times(5, () => createList(Random.id()));
        console.log(":: Factory = > ",Factory.find({}));
    },
});

if (Meteor.isClient) {
    // Create a second connection to the server to use to call test data methods
    // We do this so there's no contention w/ the currently tested user's connection
    const testConnection = Meteor.connect(Meteor.absoluteUrl());

    const generateData = denodeify((cb) => {
        testConnection.call('generateFixtures', cb);
    });

    export { generateData };
}
