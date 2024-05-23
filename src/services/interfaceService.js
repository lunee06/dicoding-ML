import tf from '@tensorflow/tfjs-node';
import { InputError } from '../exceptions/InputError.js';

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const resultScore = Math.max(...score) * 100
    const result = resultScore > 50 ? 'Cancer' : 'Non-cancer';

    let suggestion

    if (result === 'Cancer') suggestion = 'Segera periksa ke dokter!';
    else suggestion = 'Kamu tidak terindikasi kanker';

    return { resultScore, result, suggestion }
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

export default predictClassification;