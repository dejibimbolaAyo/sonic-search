const logger = require("../config/logger");
const Sonic = require("../services/sonic");
const User = require("../services/user");
const { HTTP_STATUS } = require("../constants/httpStatus");

let { error, success } = require("../constants/response");
let response = require("../common/responseWriter");

exports.ingestData = async (req, res) => {
  const users = await User.findAll();

  if (!users) {
    error.message = "Collection empty"
    return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
  }

  const ingest = await Sonic.ingest(users, '');
  if (ingest.status) {
    success.message = ingest.message
    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
  }

  error.message = ingest.message;
  return response.writeJson(res, error, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE);
}

exports.queryData = async (req, res) => {
  const { collection, query } = req.params;

  if (!query || query == '') {
    error.message = "Please provide a query for search";
    return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
  }

  if (!collection || collection == '') {
    error.message = "Please provide a collection to query against";
    return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
  }

  const search = await Sonic.query(collection, query);
  if (search.status) {
    success.message = search.message;

    search.result = [];
    switch (collection) {
      case 'users':
        // Query Users
        for (let index = 0; index < search.data.length; index++) {
          const result = await User.findOneById(search.data[index]);
          search.result.push(result);
        }
        success.data = search.result;
        break;

      default:
        success.data = [];
        break;
    }

    return response.writeJson(res, success, HTTP_STATUS.OK.CODE);
  }

  error.message = search.message;
  return response.writeJson(res, error, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE);
}