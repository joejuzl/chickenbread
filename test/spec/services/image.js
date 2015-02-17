'use strict';

describe('Service: image', function () {

  // load the service's module
  beforeEach(module('chickenbreadApp'));

  // instantiate service
  var imageUpload;
  beforeEach(inject(function (_imageUpload_) {
    imageUpload = _imageUpload_;
  }));

  it('should do something', function () {
    expect(!!imageUpload).toBe(true);
  });

});
