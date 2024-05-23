import { v4 } from "uuid";
import predictClassification from "../services/interfaceService.js";
import { storeData } from "../services/storeData.js";
import { collection } from "../services/collection.js"; 

export const getHistoriesHandler = async (_, h) => {
  const histories = (await collection.get()).docs.map((doc) => doc.data());
  const data = histories.map((item) => ({
    id: item.id,
    history: item,
  }));
  return h.response({ status: "success", data }).code(200);
};

export const postPredictHandler = async (request, h) => {
  const id = v4();
  const { image } = request.payload;
  const { model } = request.server.app;

  const { resultScore, result, suggestion } = await predictClassification(
    model,
    image
  );
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result,
    suggestion,
    createdAt,
  };
  await storeData(id, data);
  return h
    .response({
      status: "success",
      message:
        resultScore > 99
          ? "Model is predicted successfully."
          : "Model is predicted successfully but under threshold. Please use the correct picture",
      data,
    })
    .code(201);
};
