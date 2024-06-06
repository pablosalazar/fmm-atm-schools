import { db } from "helpers/Firebase";

const collectionName = "students";

export const getStudents = async () => {
  try {
    const snapshot = await db
      .collection(collectionName)
      .orderBy("createdAt", "desc")
      .get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return items;
  } catch (error) {
    throw error.message;
  }
};

export const createStudent = async (data) => {
  try {
    const docRef = await db
      .collection(collectionName)

      .add({
        ...data,
        createdAt: new Date(),
      });

    return docRef.id;
  } catch (error) {
    throw error.message;
  }
};
