import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, set , get ,ref  ,child} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDE95lAhd_Z2XxKPOWXCvmHOvS4BttzGr4",
  authDomain: "ctshirts-ca5b6.firebaseapp.com",
  projectId: "ctshirts-ca5b6",
  storageBucket: "ctshirts-ca5b6.appspot.com",
  messagingSenderId: "440648740153",
  appId: "1:440648740153:web:8aa3e322450f6a9a564ce8",
  measurementId: "G-7S5BRJQJDT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
export async function writeUserData(username, newUser) {
    await set(ref(db, 'users/' + username), newUser);
};

export async function readUserData(name) {

  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users/${name}`));

  if (snapshot.exists()) {
      return await snapshot.val();
  } else {
      return '';
  }
};