import CryptoJS from "crypto-js";

// Function to hash a password
async function hashPassword(password) {
  const salt = await CryptoJS.lib.WordArray.random(16); // Generate random salt
  const hashedPassword = await CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000
  });
  return {
    salt: salt.toString(CryptoJS.enc.Base64),
    hash: hashedPassword.toString(CryptoJS.enc.Base64)
  };
}

// Function to verify password
async function verifyPassword(password, hashedPassword, salt) {
  const hashToVerify = await CryptoJS.PBKDF2(password, CryptoJS.enc.Base64.parse(salt), {
    keySize: 512 / 32,
    iterations: 1000
  }).toString(CryptoJS.enc.Base64);
  return hashToVerify === hashedPassword;
}

export {hashPassword, verifyPassword};