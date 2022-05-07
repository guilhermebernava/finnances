import jwt from "jsonwebtoken";

class JWT {
  static generateJWT(user: any) {
    return jwt.sign(user, process.env.API_KEY, { expiresIn: "2hours" });
  }
}
