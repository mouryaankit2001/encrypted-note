const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

// Get encryption key from environment variables or use a default for development
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'defaultEncryptionKey32CharactersLng';

// Encrypt data using AES
const encrypt = (text) => {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

// Decrypt data using AES
const decrypt = (cipherText) => {
  if (!cipherText) return '';
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt }; 