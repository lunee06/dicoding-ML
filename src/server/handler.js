import { v4 } from "uuid";
import predictClassification from "../services/interfaceService.js";
import { storeData } from "../services/storeData.js";
import { collection } from "../services/collection.js";

export const getHistoriesHandler = async (_, h) => {
  try {
    const histories = (await collection.get()).docs.map((doc) => doc.data());
    const data = histories.map((item) => ({
      id: item.id,
      history: item,
    }));
    return h.response({ status: "success", data }).code(200);
  } catch (error) {
    console.error("Error fetching histories:", error);
    return h.response({ status: "error", message: "Terjadi kesalahan dalam mengambil data riwayat." }).code(500);
  }
};

export const postPredictHandler = async (request, h) => {
  const id = v4();
  const { image } = request.payload;
  const { model } = request.server.app;

  if (!image) {
    return h.response({
      status: "fail",
      message: "Gambar diperlukan untuk prediksi."
    }).code(400);
  }

  try {
    const { resultScore, result, suggestion } = await predictClassification(model, image);
    const createdAt = new Date().toISOString();

    const data = {
      id,
      result,
      suggestion,
      createdAt,
    };

    await storeData(id, data);

    const message = resultScore > 99
      ? "Model berhasil diprediksi."
      : "Model berhasil diprediksi tetapi di bawah ambang batas. Silakan gunakan gambar yang lebih sesuai.";

    return h.response({
      status: "success",
      message,
      data,
    }).code(201);
  } catch (error) {
    console.error("Prediction error:", error);
    return h.response({
      status: "error",
      message: "Terjadi kesalahan dalam melakukan prediksi."
    }).code(500);
  }
};
