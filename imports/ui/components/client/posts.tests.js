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
import '../posts/posts.js';
import { Posts } from '/imports/api/posts/posts.js';

describe('posts', function() {
    beforeEach(function() {
        Template.registerHelper('_', key => key);
        let userId = Random.id();
    });

    afterEach(function() {
        Template.deregisterHelper('_');
    });

    it('Success: posts listing', function() {
        const data = {};
        withRenderedTemplate('posts', data, (el) => {
            /** In testing, we have inserted one record from method test, Which was from some random userid,
             * So for testing, here we should get pos-list( classes name for <tr>) length to 1
             **/
            chai.assert.equal($(el).find('.post-list').length, 1);
        });
    });
    it('Success: only owner can delete his post', function() {
        const data = {};
        withRenderedTemplate('posts', data, (el) => {
            /** In testing, we have inserted one record from method test, Which was from some random userid,
             * And read-only() length to one as well, because user cant perform delete action for others post
             **/
            chai.assert.equal($(el).find('.read-only').length, 1);
        });
    });
});
