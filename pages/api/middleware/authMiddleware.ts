import { verify } from "@server/helpers/validateToken";
import { NextApiResponse, NextApiRequest } from "next";
import { NOTAUTH } from "@constants/auth";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

type HandlerFunc = (req: AuthenticatedRequest, res: NextApiResponse<any>) => Promise<any>;

export const authMiddleware = (handler: HandlerFunc): HandlerFunc => async (req, res) => {
  const token: string = String(req.headers["authorization"]);

  if (!token) {
    return res.status(401).json({ text: NOTAUTH });
  }

  try {
    const user = await verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ text: NOTAUTH });
  }
};
