'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  process.nextTick(() =>{
    let users = [];
    var io = require('socket.io')(strapi.server);

    io.on('connection', (socket) => {

      socket.on('signid', (userId) => {
        users.push({
          socketId: socket.id,
          id: userId
        })
        socket.emit('loggedin', socket.id)
        strapi.users = users;
        console.log(users)
      });

      socket.on('disconnect', () => {
        users = users.filter(user => user.socketId != socket.id);
        strapi.users = users;
      });

    });
    strapi.io = io;
  })
};
