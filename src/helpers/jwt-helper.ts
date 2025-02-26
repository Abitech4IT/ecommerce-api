import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User from "@models/user.model";

interface JwtPayload {
  userId: string;
}

/**
 * Generates a JWT token for a user
 * @param user The user object from the database
 * @returns JWT token string
 * @throws Error if JWT secret is not configured or token generation fails
 */
export const getJwtToken = (user: User): string => {
  const payload: JwtPayload = {
    userId: user.id,
  };

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_USER_ACCESS_SECRET is not defined");
  }

  try {
    const options: SignOptions = {
      expiresIn:
        (process.env.JWT_EXPIRATION as SignOptions["expiresIn"]) || "7d",
    };

    const jwtToken = jwt.sign(payload, jwtSecret as Secret, options);

    return jwtToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate JWT token: ${error.message}`);
    }
    throw new Error("Failed to generate JWT token");
  }
};
