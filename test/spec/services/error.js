'use strict';

describe('Service: error', function () {

  // load the service's module
  beforeEach(module('chickenbreadApp'));

  // instantiate service
  var error;
  beforeEach(inject(function (_error_) {
    error = _error_;
  }));

  it('should do something', function () {
    expect(!!error).toBe(true);
  });

});
