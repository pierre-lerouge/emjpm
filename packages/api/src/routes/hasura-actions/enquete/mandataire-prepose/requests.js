/* eslint-disable no-unused-vars */
const logger = require("../../../../utils/logger");
const {
  graphqlFetch,
  backendAuthHeaders
} = require("../../../../utils/graphql-fetcher");
const { ENQUETE_REPONSE } = require("./queries");
const { INIT_ENQUETE_REPONSE } = require("./mutations");

module.exports = {
  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          mandataireId
        },
        INIT_ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map(error => logger.error(error));
      }

      return data;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
};
