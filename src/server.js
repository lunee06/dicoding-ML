import "dotenv/config.js";
import Hapi from "@hapi/hapi";
import routes from "./server/routes.js";
import loadModel from "./services/loadModel.js";
import { InputError } from "./exceptions/InputError.js";

(async () => {
  const server = Hapi.server({
    port: process.env.PORT ,
    host: "0.0.0.0" ,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.app.model = await loadModel();
  server.route(routes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response instanceof InputError || response.isBoom) {
      return h.response({
        status: "fail",
        message: response.message + (response instanceof InputError ? " Silakan gunakan foto lain." : ""),
      }).code(response.output.statusCode);
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
