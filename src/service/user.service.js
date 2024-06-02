import { db } from "helpers/Firebase";

const collectionName = "users";

export const getUsers = async () => {
  const query = db.collection(collectionName).orderBy("createdAt", "desc");
  const querySnapshot = await query.get();
  const users = querySnapshot.docs.map((doc) => {
    const user = doc.data();
    return {
      id: doc.id,
      ...user,
    };
  });

  return users;
};

export const getUserByDocumentNumber = async (documentNumber) => {
  try {
    const querySnapshot = await db
      .collection(collectionName)
      .where("documentNumber", "==", documentNumber)
      .get();

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const elem = doc.data();
      return {
        id: doc.id,
        ...elem,
      };
    }

    return null;
  } catch (error) {
    throw error.message;
  }
};

export const createUser = async (data) => {
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
