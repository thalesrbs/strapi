'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async findProblemsByDepartment(ctx) {

    const { departmentId } = ctx.params;
    const filters = ctx.query;

    const departmentProblems = await strapi.query('department-problems').find({
      department: departmentId,
      ...filters
    });

    return departmentProblems.map(departmentProblem => {
      const { problem } = departmentProblem
      return sanitizeEntity(problem, { model: strapi.models.problem })
    });
  },
};
