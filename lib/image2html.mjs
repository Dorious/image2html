#!/usr/bin/env node --experimental-modules --no-warnings

import process from 'process';
import pkg from '../package.json';
import program from 'commander';
import fs from 'fs';
import colors from 'colors';
import path from 'path';
import getPixels from 'get-pixels';
 
program
  .version(pkg.version, '-v, --version', 'Output version number')
  .option('-s, --scale', 'Output pixel scale', '1')
  .option('-j, --jsx', 'Use JSX formatting', false)
  .option('-e, --element [element]', 'HTML/React element to use', 'div')
  .option('-o, --output', 'Output file', 'stdout')
  .parse(process.argv);

if(!program.args.length) {
  process.stdout.write(colors.red('No file(s) selected!\n'));
  program.help(txt => colors.red(txt));
}

// Check selected files existance and format before proceeding
let errors = 0;
let files = [];
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

// Read the file
let imageArrays = {};
files.forEach(file => {
  process.stdout.write(imageArray);
});