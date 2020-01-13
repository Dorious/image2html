
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import pkg from '../package.json';
import program from 'commander';
import Image2Html from './image2html.mjs';

/**
 * Command line interface class
 * @class
 */
export default class CLI {
  /**
   * Contains commander instance.
   */
  program = null

  /**
   * Create instance
   * @param {object Command} overrideProgram - commander instance
   */
  constructor(overrideProgram) {
    this.program = overrideProgram;
  }

  /** 
   * Create program instance.
  */
  createProgram = () => {
    let renderers = Image2Html.renderers;

    program
      .version(pkg.version, '-v, --version', 'Output version number')
      .option('-s, --scale', 'Output pixel scale', '1')
      .option('-r, --render <type>', `Select renderer: ${renderers.join(', ')}`, 'html')
      .option('-e, --html-element [element]', 'HTML/React element to use', 'div')
      .option('-o, --output', 'Output file', 'STDOUT')
      .parse(process.argv);

    return program;
  }

  /**
   * Get current program instance, make one if not there.
   * @return {object Command}
   */
  getProgram = () => this.program || (this.program = this.createProgram())

  /**
   * Check are any files selected.
   */
  hasFilesSelected = () => {
    if(!this.getProgram().args.length) {
      process.stdout.write(colors.red('No file(s) selected!\n'));
      return this.getProgram().help(txt => colors.red(txt));
    } else {
      return true;
    }
  }

  /** 
   * Check selected files existance and format before proceeding.
   */
  checkFiles = () => {
    let errors = 0;
    let files = [];

    // Check for files existence
    program.args.forEach(filename => {
      let filepath = path.resolve(filename);
      if(!fs.existsSync(filepath)) {
        process.stdout.write(colors.red(`${filename} doesn't exist!\n`));
        errors++;
      } else {
        files.push(filepath);
      }
    });

    if(errors) return process.exit(1);
    return files;
  }

  /**
   * Generate outpput
   * @param {array} files - array of absolute file paths
   */
  runImage2Html = (files) => {
    let i2h = new Image2Html(files);

    // Setup renderer
    try {
      i2h.setRenderer(program.render);
    } catch(e) {
      process.stdout.write(`${colors.yellow(e)}\n`);
      process.exit(1);
    }

    // Do it!
    i2h.render().then((output) => {
      return process.stdout.write(output);
    });
  }

  /**
   * Runs all the app
   */
  run = () => {
    this.hasFilesSelected();
    let files = this.checkFiles();
    this.runImage2Html(files);
  }
}