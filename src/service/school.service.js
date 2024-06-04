import { db } from "helpers/Firebase";

const collectionName = "schools";

export const getSchoolByCode = async (code) => {
  const query = db.collection(collectionName).where("code", "==", code);
  const querySnapshot = await query.get();
  const school = querySnapshot.docs.map((doc) => {
    const school = doc.data();
    return {
      id: doc.id,
      ...school,
    };
  });

  if (school.length) {
    return school[0];
  }

  return null;
};

export const getSchools = async () => {
  const query = db.collection(collectionName).orderBy("createdAt", "desc");
  const querySnapshot = await query.get();
  const schools = querySnapshot.docs.map((doc) => {
    const school = doc.data();
    return {
      id: doc.id,
      ...school,
    };
  });

  return schools;
};

export const createSchool = async (data) => {
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

export const updateSchool = async (id, data) => {
  try {
    await db.collection(collectionName).doc(id).update(data);
  } catch (error) {
    throw error.message;
  }
};

export const deleteSchool = async (id) => {
  try {
    await db.collection(collectionName).doc(id).delete();
  } catch (error) {
    throw error.message;
  }
};
