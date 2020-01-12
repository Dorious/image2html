import getPixels from 'get-pixels';

/** Library for image to html transformation */
export default class image2html {
  /**
   * Default renderer.
   */
  static defaultRenderer = 'html'
  
  /**
   * Currently selected renderer.
   */
  renderer = image2html.defaultRenderer

  /**
   * List of available renderers.
   * 
   * Add here to make it visible. Look for renderer files in ./renderers folder.
   */
  static renderers = [
    'html',
    'jsx', 
    'dom',
    'react', 
    'svghtml', 
    'svgdom'
  ];

  /**
   * List of filenames.
   */
  filenames = []

  /** 
   * Current options object.
   */
  options = {}

  /**
   * Generated pixels from images.
   */
  pixels = {};

  /**
   * Library constructor.
   * @param {array} filenames Array of 
   */
  constructor(filenames, options) {
    this.filenames = filenames;
    this.options = typeof(options) === 'object' || {};
  }

  /**
   * Gets current renderer string value.
   * @return {string}
   */
  getRenderer = () => this.renderer

  /**
   * Sets current renderer string value.
   * @param {string} renderer - Renderer string
   */
  setRenderer = (renderer) => {
    let renderers = image2html.renderers;

    if(renderers.indexOf(renderer) === -1) {
      throw(`Renderer "${renderer}" is not listed on renderers list: ${renderers.join(', ')}.`);
      return
    }

    this.renderer = renderer
  }

  /**
   * Resets pixels information.
   */
  resetPixels = () => this.pixels = {}

  /**
   * Use `get-pixels` to get images bit by bit array.
   * @param {string} filename - Pathname to the file.
   * @param {function} cb - Callback function triggered after success.
   * @param {function} cbErr - Error classback function triggered after error.
   */
  getPixelsFromFile(filename, cb, cbErr) {
    return new Promise((resolve, reject) => {
      getPixels(filename, (err, pixels) => {
        if(err) {
          reject(err);
          if(typeof(cbErr) === 'function') {
            cbErr(err);
          }
        }

        resolve(pixels);
        
        if(typeof(cb) === 'function')
          cb(pixels)
      })
    });
  }

  /**
   * Read pixels from files.
   */
  async readPixels() {
    for(let i in this.filenames) {
      let pixels = await this.getPixelsFromFile(this.filenames[i]);
      this.pixels[this.filenames[i]] = pixels;
    }
  }

  /**
   * Get generates pixel values
   * @return {array}
   */
  getPixels = () => this.pixels

  /**
   * Generates render output.
   * @param {Object} pixels - Result of this.readPixels method.
   */
  async generate(pixels) {
    pixels = pixels || this.pixels;
    let output;
    let rendererModule = `./renderer/${this.getRenderer()}.mjs`;

    await import(rendererModule).then(renderer => {
      let r = new renderer.default(pixels);
      output = r.render();
    }).catch(err => {
      throw(err);
    });

    return output;
  }

  /**
   * Rendering images into html
   * @return {string || ReactNode}
   */
  async render() {
    await this.readPixels();
    return await this.generate();
  }
}