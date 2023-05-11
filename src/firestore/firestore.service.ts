import { Injectable } from '@nestjs/common';
import { DocNotFound } from './firestore.errors';
import { firestore } from 'firebase-admin';
import { firestoreDb } from './firebase.config';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, query } from 'firebase/firestore';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';

@Injectable()
export class FirestoreService {
  constructor() {}

  async getCollection(collectionPath: string): Promise<DocumentData[]> {
    const q = query(collection(firestoreDb, collectionPath));
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => doc.data());
  }

  async getDocument(collectionPath: string, documentId: string): Promise<DocumentData> {
    const docRef = doc(firestoreDb, collectionPath, documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) {
      throw new DocNotFound(documentId);
    }
    return docSnap.data()!;
  }

  async createDocument<T extends firestore.DocumentData>(
    collectionPath: string,
    id: string,
    data: T,
  ) {
    await setDoc(doc(firestoreDb, collectionPath, id), instanceToPlain(data))
      .then(() => {
        console.log('Succesful adding doc: ' + data);
      })
      .catch((error) => {
        console.log(`Unsuccessful returned error ${error}`);
        throw error
      });
  }
}
