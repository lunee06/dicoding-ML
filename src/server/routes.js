import { postPredictHandler, getHistoriesHandler } from "./handler.js";

const routes = [
  {
    path: "/predict/histories",
    method: "GET",
    handler: getHistoriesHandler,
  },
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
];

export default routes;