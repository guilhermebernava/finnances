import jwt from "jsonwebtoken";

class JWT {
  static generateJWT(user: any) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30m" });
  }

  static verifyToken(token: any) {
    const tokenVerified = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any) => {
        console.log(err);

        if (err && err.name === "TokenExpiredError") return null;

        if (err) return null;

        return token;
      }
    );
    return tokenVerified;
  }
}

export default JWT;
