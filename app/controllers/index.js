const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const Controllers = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const controllerName = file[0].toUpperCase() + file.slice(1, file.indexOf('.'));
    const fileController = require(path.join(__dirname, file));
    Object.assign(Controllers, { [controllerName]: fileController});
  });

module.exports = Controllers;