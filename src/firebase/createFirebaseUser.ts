import { createFirebaseAdminApp } from "./firebaseAdmin";


export async function createUser(uid: string, email: string, password: string) {
  try {
    const adminApp = await createFirebaseAdminApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
      privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    });

    const userRecord = await adminApp.auth().createUser({
      uid: uid,
      email: email,
      password: password,
    });


    return userRecord;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error; // Re-throw the error to handle it in the calling code if needed.
  }
}
