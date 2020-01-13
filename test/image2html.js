import Image2Html from '../lib/image2html';
import assert from 'assert';

describe('Image2Html', function() {
  it('Should initiate without problems', () => {
    let i2h = new Image2Html();
    assert.ok(i2h instanceof Image2Html);
  });
});