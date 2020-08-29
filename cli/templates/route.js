module.exports = (name) => {
  const capName = name[0].toUpperCase() + name.slice(1);
  return`const Controllers = require('../../app/controllers/index');

module.exports = {
  '/${name}s/': {
    controller: Controllers.${capName},
    methods: {
      get: 'index',
    },
  },
  '/${name}/': {
    controller: Controllers.${capName},
    methods: {
      post: 'create',
    },
  },
  '/${name}/:id': {
    controller: Controllers.${capName},
    methods: {
      get: 'get',
      patch: 'update',
      delete: 'delete',
    },
  },
};`;
};