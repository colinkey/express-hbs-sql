const fs = require('fs');

const controllerTemplate = require('./templates/controller');
const routeTemplate = require('./templates/route');

function createController(baseName) {
  const root = __dirname.split('/').slice(0, __dirname.split('/').length - 1);
  const path = [...root, 'app', 'controllers', `${baseName}.js`];

  createNewFile(path.join('/'), controllerTemplate(baseName));
}

function createRoute(baseName) {
  const root = __dirname.split('/').slice(0, __dirname.split('/').length - 1);
  const path = [...root, 'router', 'routes', `${baseName}.js`];

  createNewFile(path.join('/'), routeTemplate(baseName));
}

function createNewFile(fileName, file) {
  fs.writeFile(fileName, file, {flag: 'wx+'}, (err) => {
    if (err) {
      console.log('An error occured during file generation');
      console.error(err);
    } else {
      console.log('File created at', fileName);
    }
  });
}

function createResource(baseName) {
  createController(baseName);
  createRoute(baseName);
}


createResource('cat');