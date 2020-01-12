/**
 * Abstract renderer class
 * @class
 */
export default class Renderer {
  /**
   * Array of bitmaps to render
   */
  pixels = [];

  /**
   * Which html element should be rendered
   */
  htmlElement = 'div';

  /** 
   * Construct render
   * @param pixels - Array of bitmaps to render
   */
  constructor(pixels) {
    this.pixels = pixels;
  }

  getPixels = () => this.pixels

  getHtmlElement = element => this.htmlElement
  setHtmlElement(element) {
    this.htmlElement = element;
  }

  render() {
    return 'test';
  }
}