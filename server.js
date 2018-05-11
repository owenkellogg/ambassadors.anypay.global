'use strict';

var Hapi = require('hapi');
var Boom = require('boom');
var models = require('./models');
require('dotenv').config();

// Create a server with a host and port

const validate = async (request, uid, password, h) => {

  let ambassador = await models.Ambassador.findOne({ where: {uid}})

  if (!ambassador) {
    return { credentials: null, isValid: false };
  }

  const credentials = {
    id: ambassador.id,
    name: ambassador.name,
    email: ambassador.email
  };

  request.ambassador = ambassador;

  return { isValid, credentials };
};

async function genServer() {
  const server=Hapi.server({
      host:'0.0.0.0',
      port: process.env.PORT || 8000
  });

  await server.register(require('hapi-auth-basic'));
  await server.register(require('hapi-ratelimit'));
  server.auth.strategy('simple', 'basic', { validate });

  // Add the route
  // Route to activative a new Dash wallet by
  // sending it X amount of Dash
  server.route({
      method:'POST',
      path:'/activations',
      validate: {
        address: Joi.string().required()
      },
      options: {
        auth: 'simple'
      },
      handler:function(request,h) {
        console.log('ambassador', request.ambassador);
        return request.ambassador;
      }
  });

  server.route({
    method: 'GET',
    path: '/ambassadors/:id',
    handler: async function(request, h) { 

      let ambassador = await Ambassador.findById(request.params.id);

      if (ambassador) {
        return { ambassador }
      } else {
        return Boom.badRequest(`ambassador not found with id ${request.params.id}`);
      }
    }
  })

  server.route({
      method:'POST',
      path:'/ambassadors/:id/tokens',
      handler:function(request,h) {

          return'hello world';
      },
      configs: {
        plugins: {
          "hapi-ratelimit": {
            limit: 2,
            duration: 60 // limit two per minute
          }
        }
      }
  });

  return server;
};

// Start the server
async function start() {
    var server = await genServer();

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();

