[![Build Status](https://travis-ci.com/FormidableLabs/spectacle-renderer.svg?token=eGjDqfypeqevtBUpJGYD&branch=master)](https://travis-ci.com/FormidableLabs/spectacle-renderer)


<h1 align="center">spectacle-renderer</h1>


<h4 align="center">
  Render Spectacle presentations to PDF from your CLI
</h4>

This is a simple CLI tool that uses headless Chrome to export a PDF version of [Spectacle](https://github.com/FormidableLabs/spectacle) presentations.


### Install

```
npm install -g spectacle-renderer
```

## Usage

```sh
spectacle-renderer [options]
```

## API

Option  	| 	Type		|	  Description
:-----------------------|:--------------|:--------------------------------
`-u --url` |   `String` |  The URL spectacle is running at (default: http://localhost:3000)
`-o --output` | `String` | The output filename (default: presentation.pdf)
`-p --print` | `Boolean` | Enable print mode (black/white) (defaut: false)
`-d --delay` | `Boolean` | Delay time to let page render (default: 2000)
`-c --chromium` | `String` | Path to Chromium download
