var postToApi = require('../../src/js/post-api-data')
var sinon = require('sinon')
var Model = require('../../src/js/models/JoinStreetSupportModel')
var endpoints = require('../../src/js/api')
var browser = require('../../src/js/browser')

describe('Join Street Support Model', function () {
  var model
  var browserLoadingStub
  var browserLoadedStub
  var browserRedirectStub
  var browserTrackEventStub
  var postToApiStub

  describe('API returns 5xx error', function() {
    beforeEach(function () {
      postToApiStub = sinon.stub(postToApi, 'post')
      postToApiStub.returns({
        then: function(success, error) {
          error(new Error('borked'))
        }
      })

      browserLoadingStub = sinon.stub(browser, 'loading')
      browserLoadedStub = sinon.stub(browser, 'loaded')
      browserRedirectStub = sinon.stub(browser, 'redirect')
      browserTrackEventStub = sinon.stub(browser, 'trackEvent')

      model = new Model()

      model.formModel().name('name')
      model.formModel().email('test@test.com')
        model.formModel().location('location')
      model.formModel().reason('reason')
      model.formModel().isOptedIn(true)

      model.submit()
    })

    afterEach(function () {
      browser.loading.restore()
      browser.loaded.restore()
      browser.redirect.restore()
      browser.trackEvent.restore()
      postToApi.post.restore()
    })

    it('should redirect to 500.html', function () {
      expect(browserRedirectStub.withArgs('500.html').calledOnce).toBeTruthy()
    })
  })
})