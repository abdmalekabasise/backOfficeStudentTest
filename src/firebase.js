import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1YrMkJnpbxzjXcLVt_2WGOHyRTS5PkZY",
  authDomain: "test2-aacf6.firebaseapp.com",
  projectId: "test2-aacf6",
  storageBucket: "test2-aacf6.appspot.com",
  messagingSenderId: "966219458834",
  appId: "1:966219458834:web:ec4603e1c3791d2eacabcb",
  measurementId: "G-C9BW558774"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
