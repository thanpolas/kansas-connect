/**
 * @fileOverview Token manage delete tests.
 */
var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;

var tokenAssert = require('../lib/token-assertions');
// var Web = require('../lib/web');
var boot = require('../lib/bootstrap');

describe('Manage Delete', function() {
  var bt;
  var req;

  describe('Delete', function () {
    boot.setup(function(store) {
      store.kConnect.setup({
        provide: function(/* req, res */) {
          return Promise.resolve({
            userId: 'hip',
            policyName: 'free',
          });
        }
      });
      store.kConnect.manage(store.app);
    }, function(res) {
      bt = res;
      req = bt.req;
    });

    it('Will return 204 when delete a token', function(done) {
      req.del('/token/' + bt.fix.token)
        .set('Content-Type', 'application/json')
        .expect(204, done);
    });

    it('verify token is deleted', function(done) {
      req.del('/token/' + bt.fix.token)
        .set('Content-Type', 'application/json')
        .expect(204)
        .end(function(err) {
          if (err) {return done(err);}

          bt.api.get(bt.fix.token).then(function(res) {
            expect(res).to.be.null;
          });
        });
    });
  });
});