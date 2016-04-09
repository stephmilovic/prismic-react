# Prismic React Starter Kit

This is a Prismic + React + Flux starter kit with webpack. It uses Sass variables/mixins, and includes Bourbon Neat.  

## Features

* Compilation with webpack
* React and jsx
* Babel ES6 compilation
* ESLint
* Stylesheets can be CSS, SASS, or mixed
* Development
  * Development Express server
  * Hot Module Replacement (LiveReload for Stylesheets and React components enabled)
  * SourceMaps
* Production
  * Production Express server
  * Uglify javascript
* Webpack loader to automatically npm install and save dependencies.

## Getting Started

These instructions will get you a copy of Prismic React Starter Kit up and running on your local machine.

### Prerequisities

This kit follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), enforced with ESLint. airbnb/javascript is a tool that enforces the best syntax rules for the best coding practices ever, that frees us from messing up with writing our custom rules. Cool! This is good for avoiding common errors while writing code, speeding up the debugging process and maintaining at the same time the best readability of the code, enforcing code style rules, especially when we work in teams. You'll need to:

#### Install eslint globally

```
npm install -g eslint
```

#### Install SublimeLint + Sublime ESLint Plugin

Use package control to install [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter) and [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)

## Get the kit

```
$ git clone git@git.chi.cleverbridge.com:smilovic/clever-react.git && cd prismic-react
```

### Installing

Install all dependencies

```
npm install
```

## Development

Builds the application and starts a webserver with livereload. By default the webserver starts at port 3030. You can define a port in the .env file.

```
npm run server:dev
```

### Linting

SublimeLinter will lint inline for you automatically, but to run a lint test with webpack simply run:

```
npm run lint
```

## Deployment

To deploy, you must build and run the server. The server runs with pm2. You'll want to make sure pm2 is installed globally on the server.

```
npm run build && npm run server:prod  
```

## Authors

* [Steph Milovic](https://github.com/stephmilovic)

See also the [tutorial](http://codestorm.top/we-must-react-ep-01-lets-start-with-webpack-and-babel/) from which this Starter Kit was adapted
