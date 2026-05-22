import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 

const firebaseConfig = {
  apiKey: "AIzaSyAAN7y0hg6BgDKYxIveWaKtjDrYukDXZG8",
  authDomain: "gemcv-57b97.firebaseapp.com",
  projectId: "gemcv-57b97",
  storageBucket: "gemcv-57b97.firebasestorage.app",
  messagingSenderId: "694852482128",
  appId: "1:694852482128:web:3c498ec322ea3a0104cd55",
};

const app = initializeApp(firebaseConfig);

// ✅ Auth export
export const auth = getAuth(app);