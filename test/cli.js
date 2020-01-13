import Cli from '../lib/cli';
import assert from 'assert';

describe('Command line tool', () => {

  it('Should initiate without problems', () => {
    let cli = new Cli();
    assert.ok(cli instanceof Cli);
  });
  
});