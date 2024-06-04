import { db } from "helpers/Firebase";

const collectionName = "student_activities";

export const registerActivity = async (data) => {
  try {
    const docRef = await db.collection(collectionName).add({
      ...data,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    throw error.message;
  }
};
