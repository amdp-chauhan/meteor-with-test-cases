/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Random } from 'meteor/random';
import { withRenderedTemplate } from '../../test-helpers.js';
import '../posts/insertPost.js';
import { Posts } from '/imports/api/posts/posts.js';

describe('insert post', function() {
    beforeEach(function() {
        Template.registerHelper('_', key => key);
    });

    afterEach(function() {
        Template.deregisterHelper('_');
    });

    it('posts insertion from client', function() {
        let userId = Random.id();

        withRenderedTemplate('insertPost', {}, function(el) {
            $(el).find('#post').val("testings post");
            $(el).find('#submit').click();
            // it means that our insertion is working fine
            chai.assert.equal(Posts.find({}).fetch().length, 1);
        });
    });

});
