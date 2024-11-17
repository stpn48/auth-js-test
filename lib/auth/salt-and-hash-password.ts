import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error("Password is required.");
  }

  // Define the salt rounds (default: 10)
  const saltRounds = 10;

  // Generate a salt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
