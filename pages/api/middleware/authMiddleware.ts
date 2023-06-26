import { verify } from "@server/helpers/validateToken";
import { NextApiResponse, NextApiRequest } from "next";
import { NOTAUTH } from "@constants/auth";

export interface IAuthRes extends NextApiRequest {
  user: {
    Email: string;
    Name: string;
  };
}

type HandlerFunc<T extends IAuthRes> = (
  req: T,
  res: NextApiResponse<any>
) => Promise<any>;

export const authMiddleware =
  <T extends IAuthRes>(handler: HandlerFunc<T>): HandlerFunc<T> =>
  async (req, res) => {
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
