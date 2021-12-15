import imageProcess from '../../../routes/utilities/utilities';
import fs from 'fs';

describe('Testing image process from our util file', () => {
  it('Test if image resized have created', () => {
    imageProcess('fjord', '521', '445');
    setInterval(() => {
      expect(fs.existsSync(`./assets/thump/fjord-521_445.jpg`)).toBe(true);
    }, 1000);
  });
});
