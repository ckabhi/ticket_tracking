import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer/rootReducer";
// import { userLogin } from "../action/account/account.action";
import { myMiddleware } from "../../core/middleware/http.middleware";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SecureStorage = {
  setRefreshToken: (token: string) => {
    const encodedToken = window.btoa(token);
    localStorage.setItem("refreshToken", encodedToken);

    // localStorage.setItem("refreshToken", JSON.stringify(encoder.encode(token)));
  },
  getRefreshToken: () => {
    let encryptedToken = localStorage.getItem("refreshToken");
    if (encryptedToken === null) return encryptedToken;
    const token = window.atob(encryptedToken);
    return token;

    // let tn = new Uint8Array(JSON.parse(token));
    // console.log("Get Refresh Token", decoder.decode(tn));
    // return decoder.decode(tn);
  },
  setAccessToken: (token: string) => {
    const encodedToken = window.btoa(token);
    localStorage.setItem("accessToken", encodedToken);
    UserActivity.setRecentActivity();

    // localStorage.setItem("accessToken", JSON.stringify(encoder.encode(token)));
  },
  getAccessToken: () => {
    let encryptedToken = localStorage.getItem("accessToken");
    if (encryptedToken === null) return encryptedToken;
    return window.atob(encryptedToken);

    // let tn = new Uint8Array(JSON.parse(token));
    // return decoder.decode(tn);
  },
  removeToken: () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  },
};

/*
* Encryption for token
const stringToArrayBuffer = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const arrayBufferToString = (buffer: any) => {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
};

const encryptData = async (token: string) => {
  try {
    const encodedToken = stringToArrayBuffer(token);

    // Generate a random initialization vector (IV)
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // Define the encryption key (ensure to handle keys securely)
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Encrypt the token using AES-GCM algorithm
    const encryptedToken = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedToken
    );

    // Store the encrypted IV in localStorage
    console.log("Encrypted Token:", arrayBufferToString(encryptedToken));
    localStorage.setItem("iv", arrayBufferToString(iv));
    return arrayBufferToString(encryptedToken);
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};

const decryptData = async (encryptedToken: string) => {
  try {
    // Retrieve the IV from localStorage
    // const encryptedToken = localStorage.getItem('encryptedToken');
    const iv = localStorage.getItem("iv");

    if (encryptedToken && iv) {
      const ivArrayBuffer = stringToArrayBuffer(iv);
      const encryptedTokenArrayBuffer = stringToArrayBuffer(encryptedToken);

      // Import the encryption key (from the previous example)
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      // Decrypt the token using AES-GCM algorithm
      const decryptedToken = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: ivArrayBuffer,
        },
        key,
        encryptedTokenArrayBuffer
      );

      console.log("Decrypted Token:", arrayBufferToString(decryptedToken));
      return arrayBufferToString(decryptedToken);
    } else {
      console.log("No encrypted token found in local storage.");
      return "";
    }
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
*/

export const UserActivity = {
  setRecentActivity: () => {
    localStorage.setItem("lastActivity", Date.now().toString());
  },
  getLastActivity: () => {
    const lastActive = localStorage.getItem("lastActivity");
    if (lastActive) {
      return new Date(parseInt(lastActive));
    }
    return null;
  },
};

const configureAppStore = (initialState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [myMiddleware, ...getDefaultMiddleware()],
  });

  return store;
};

const storeInstance = configureAppStore();
storeInstance.subscribe(() => {
  console.log("Store Data", storeInstance.getState());
});

export default storeInstance;
