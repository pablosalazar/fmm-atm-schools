import { db } from "helpers/Firebase";

const collectionName = "activities";

export const registerActivity = async (data) => {
  try {
    const docRef = await db
      .collection(collectionName)

      .add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return docRef.id;
  } catch (error) {
    throw error.message;
  }
};
