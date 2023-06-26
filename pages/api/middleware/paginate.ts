import { NextApiResponse, NextApiRequest } from "next";
import { NOTAUTH } from "@constants/auth";

export interface IPaginate extends NextApiRequest {
  PAGE_SIZE: string;
  skipValue: string;
}

type HandlerFunc<T extends IPaginate> = (
  req: T,
  res: NextApiResponse<any>
) => Promise<any>;

export const paginateMiddleware =
  <T extends IPaginate>(handler: HandlerFunc<T>): HandlerFunc<T> =>
  async (req, res) => {
    const skipValue = req.headers["skipvalue"] as string;
    const PAGE_SIZE = req.headers["page_size"] as string;

    if (!PAGE_SIZE || !skipValue) {
      console.warn("the PAGE_SIZE and skipValue were not provided");
      return res.status(401).json({ text: NOTAUTH });
    }

    try {
      req.skipValue = skipValue;
      req.PAGE_SIZE = PAGE_SIZE;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ text: NOTAUTH });
    }
  };
