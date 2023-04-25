import { verify } from "@server/helpers/validateToken";
import { NextApiResponse, NextApiRequest } from "next";
import { tcWrapper } from "@helpers/tcWrapper";

export const authMiddleware = <F extends Function>(handler: F) => async (req, res: NextApiResponse) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

