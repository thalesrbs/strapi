'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async bulk(ctx) {
    const { messages } = ctx.request.body;
    const { id: userRead } = ctx.state;
    const created = [];
    await Promise.all(messages.map(async message => {
      const { ticketMessage } = message;

      let messageRead = await strapi.query('ticket-message-read').findOne({
        userRead,
        ticketMessage
      });

      if (!messageRead) {
        messageRead = await strapi.services['ticket-message-read'].create({
          userRead,
          ticketMessage
        })
      }

      created.push(
        sanitizeEntity(messageRead, { model: strapi.models['ticket-message-read'] })
      )
    }))

    return created
  }
};
