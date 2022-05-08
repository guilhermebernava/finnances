import jwt from "jsonwebtoken";

class JWT {
  static generateJWT(user: any) {
    //gera um token com nossa assinatura
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30m" });
  }

  static verifyToken(token: any) {
    //vai verificar o token que foi passado
    //vendo nosso SECRET se está correto
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
