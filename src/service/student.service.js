import { db } from "helpers/Firebase";

const collectionName = "students";

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
