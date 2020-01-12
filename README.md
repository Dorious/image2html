<h1><center><img src="https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png" /><br>image2html</center></h1>

`image2html` is a NodeJS library and console tool that helps you generate `html` from `png`, `jpg` and `gif` files.<br>
You can either generate html string, html dom elements, jsx string, svg or react node elements.

## Installation
    npm install -g image2html
or install as module...

    npm install -S image2html

## Use as module

    import image2html from "image2html";
    let files = ['/path/to/file.png'];
    let i2h = new image2html(files);
    i2h.render().then(output => {
        console.log(output);
    });

## CLI Usage

    $ image2html -h
    Usage: image2html [options]

    Options:
    -v, --version                 Output version number
    -s, --scale                   Output pixel scale
    -r, --render <type>           Select renderer: html, jsx, dom, react, svghtml, svgdom (default: "html")
    -e, --html-element [element]  HTML/React element to use (default: "div")
    -o, --output                  Output file
    -h, --help                    output usage information`
