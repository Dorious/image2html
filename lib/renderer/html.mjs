import Renderer from './renderer.mjs';

export default class HtmlRenderer extends Renderer {
  /**
   * Renders a specific line.
   * 
   * @param {array} line - Array of 
   */
  renderLine = line => {
    if(!line.length) return '';

    let element = this.getHtmlElement();
    let output = `  <${element} style="display: flex; height: 100%; align-items: stretch;">\n`;

    line.forEach(p => {
      let op = Math.round(p[3] / 255 * 10) / 10;

      output += `    <${element} style="width: 100%; height: 100%; margin: auto; background: rgba(${p[0]}, ${p[1]}, ${p[2]}, ${op})"></${element}>\n`;
    });

    return `${output}\n  </${element}>\n`;
  }

  render() {
    let element = this.getHtmlElement();
    let pixels = this.getPixels();
    let output = ''; 
    
    Object.keys(pixels).forEach(file => {
      let image = pixels[file];
      let width = image.shape[0];
      let height = image.shape[1];
      let stride = image.stride[0];

      output += `<${element} style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; align-items: stretch;">\n`;

      let lines = [];
      for(let i = 0; i <= (image.data.length-1) / stride; i++) {
        let line = Math.floor(i / width);
        let arr = image.data.slice(i*4, i*4+4);
        if(!lines[line]) lines[line] = [];
        lines[line].push(arr);
      }

      lines.forEach((line, index) => {
        output += this.renderLine(line);
      });

      output += `</${element}>\n`;
    });

    
    return output;
  }
}