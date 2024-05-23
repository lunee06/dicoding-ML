import { collection } from './collection.js';

export async function storeData(id, data) {
  return collection.doc(id).set(data);
}