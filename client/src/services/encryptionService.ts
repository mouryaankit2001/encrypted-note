import CryptoJS from 'crypto-js';

const STORAGE_KEY = '1111111233333333345676754321hfd34';

// Get user's encryption key from local storage or derive it from password
const getEncryptionKey = (): string => {
  let key = localStorage.getItem(STORAGE_KEY);
  
  // If no key exists yet, create one (in a real app, this would be derived from user password)
  if (!key) {
    // In a real implementation, this should be derived from the user's password
    // This is a simplified version for demonstration
    key = CryptoJS.lib.WordArray.random(32).toString();
    localStorage.setItem(STORAGE_KEY, key);
  }
  
  return key;
};

// Encrypt data on the client side
export const encryptData = (text: string): string => {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, getEncryptionKey()).toString();
};

// Decrypt data on the client side
export const decryptData = (cipherText: string): string => {
  if (!cipherText) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, getEncryptionKey());
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return ''; // Return empty string if decryption fails
  }
};

// Generate a new key when user logs in
export const initializeEncryptionKey = (password: string, email: string): void => {
  // In a real implementation, derive a key from password + salt (email could be used)
  // This is a simplified version
  const key = CryptoJS.PBKDF2(password, email, { keySize: 8, iterations: 1000 }).toString();
  localStorage.setItem(STORAGE_KEY, key);
};

// Clear encryption key on logout
export const clearEncryptionKey = (): void => {
  localStorage.removeItem(STORAGE_KEY);
}; 