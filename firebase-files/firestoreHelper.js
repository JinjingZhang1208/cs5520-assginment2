import { collection, addDoc, doc, deleteDoc , setDoc} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data) {
  try {
    const docRef = await addDoc(collection(database, "activities"), data);
    // console.log('Document added with ID: ', docRef.id);
    return docRef.id;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "activities", id));
  } catch (err) {
    console.log(err);
  }
}

export async function updateInDB(activityId, newActivity) {
  await setDoc(doc(database, 'activities', activityId), newActivity); 
}

