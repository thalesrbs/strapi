'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

const validTicket = async ticket => {
  let message = [];

  const {
    department,
    problem,
    description
  } = ticket;

  if (!department) {
    message.push('Departamento é um campo obrigatório!')
  }
  if (!problem) {
    message.push('Problema é um campo obrigatório!');
  }
  if (!description) {
    message.push('Descrição é um campo obrigatório!');
  }

  const hasRelationship = await strapi.query('department-problems').findOne({
    department,
    problem
  });

  if (!hasRelationship) {
    message.push('Departamento e problema não possuem relacionamento!')
  }

  message = message.join("\n")

  return {
    ok: message ? false : true,
    message
  };
}

module.exports = {
  validTicket
};
