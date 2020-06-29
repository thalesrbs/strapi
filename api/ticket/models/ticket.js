'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      strapi.users.map((user) => {
        const { socketId, id } = user;
        if (result.openingUser && result.openingUser.id === id) {
          strapi.io.to(socketId).emit("created:ticket",JSON.stringify(result))
        }
      })
    },

    async afterUpdate(result) {
      strapi.users.map((user) => {
        const { socketId, id } = user;
        if (result.openingUser && result.openingUser.id === id) {
          strapi.io.to(socketId).emit("updated:ticket",JSON.stringify(result))
        }
      })
    },
  },
};
