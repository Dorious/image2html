#!/usr/bin/env node --no-warnings --experimental-json-modules --experimental-modules

import process from 'process';
import pkg from './package.json';
import program from 'commander';
import fs from 'fs';
import colors from 'colors';
import path from 'path';
import image2html from './lib/image2html.mjs';
 
let renderers = image2html.renderers;

program
  .version(pkg.version, '-v, --version', 'Output version number')
  .option('-s, --scale', 'Output pixel scale', '1')
  .option('-r, --render <type>', `Select renderer: ${renderers.join(', ')}`, 'html')
  .option('-e, --html-element [element]', 'HTML/React element to use', 'div')
  .option('-o, --output', 'Output file', 'STDOUT')
  .parse(process.argv);

if(!program.args.length) {
  process.stdout.write(colors.red('No file(s) selected!\n'));
  program.help(txt => colors.red(txt));
}

// Check selected files existance and format before proceeding
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

if(errors)
  process.exit(1);

let i2h = new image2html(files);

// Setup renderer
try {
  i2h.setRenderer(program.render);
} catch(e) {
  process.stdout.write(`${colors.yellow(e)}\n`);
  process.exit(1);
}

// Do it!
i2h.render().then((output) => {
  process.stdout.write(output);
});