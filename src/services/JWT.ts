import jwt from "jsonwebtoken";

class JWT {
  static generateJWT(user: any) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "2hours" });
  }
}

export default JWT;
