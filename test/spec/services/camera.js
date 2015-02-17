'use strict';

describe('Service: camera', function () {

  // load the service's module
  beforeEach(module('chickenbreadApp'));

  // instantiate service
  var camera;
  beforeEach(inject(function (_camera_) {
    camera = _camera_;
  }));

  it('should do something', function () {
    expect(!!camera).toBe(true);
  });

});
