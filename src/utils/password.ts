// utils/password.js

import bcrypt from 'bcrypt';

const saltRounds = 10;

export const saltAndHashPassword = async (password:string) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error salting and hashing password:", error);
    throw new Error("Failed to salt and hash password.");
  }
};
