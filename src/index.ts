import * as fs from 'fs'
const fastify = require('fastify')()
fastify.register(require('@fastify/websocket'))
fastify.register(require('@fastify/cors'))
fastify.register(async function (fastify) {
  fastify.get('/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', message => {
      connection.socket.send(`${message}`)
    });
  })
})

fastify.get('/websocket', (req, res) => {
  const fileContent = fs.readFileSync(__dirname + '/index.html');
  res.type('text/html').send(fileContent);
})

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})