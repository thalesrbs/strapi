'use strict';

const ticket = require("../../ticket/models/ticket");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      strapi.users.map((user) => {
        const { socketId, id } = user;
        if (result.ticket && result.ticket.openingUser === id) {
          strapi.io.to(socketId).emit("created:ticket-message",JSON.stringify(result))
        }
      })
    },
  },
};
