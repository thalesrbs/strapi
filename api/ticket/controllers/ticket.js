'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {

    const {
      department,
      problem,
      description
    } = ctx.request.body;

    const { id: openingUser } = ctx.state.user;

    const entry = {
      department,
      problem,
      description,
      openingUser,
      status: 'opened'
    }

    const { ok, message } = await strapi.config.functions.ticket.validTicket(entry)
    if (!ok) {
      ctx.response.status = 403
      return { message }
    }

    const entity = await strapi.services.ticket.create(entry);

    return sanitizeEntity(entity, { model: strapi.models.ticket });

  },

  async findByUser(ctx) {
    const filters = ctx.query;
    const { id: openingUser } = ctx.state.user;

    const filteredTickets = await strapi.query('ticket').find({
      openingUser,
      ...filters
    })

    return filteredTickets.map(ticket => {
      return sanitizeEntity(ticket, { model: strapi.models.ticket })
    });
  }
};
