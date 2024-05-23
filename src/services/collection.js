import { Firestore } from '@google-cloud/firestore'

const db = new Firestore();

export const collection = db.collection('predictions')