import { NextApiResponse, NextApiRequest } from "next";
import { NOTAUTH } from "@constants/auth";

export interface AuthenticatedPaginatedRequest extends NextApiRequest {
  user?: any;
  PAGE_SIZE: string
  skipValue: string
}

export interface PaginatedRequest extends NextApiRequest {
    PAGE_SIZE: string
    skipValue: string
}

type Request = PaginatedRequest & AuthenticatedPaginatedRequest

type handlerFunc =  (req: Request, res: NextApiResponse<any>) => Promise<any>



export const paginateMiddleware = (handler: handlerFunc): handlerFunc => async (req, res): Promise<any> => {

  const skipValue = req.headers["skipvalue"] as string
  const PAGE_SIZE = req.headers["page_size"] as string

  if(!PAGE_SIZE || !skipValue) {
    return res.status(401).json({ text: NOTAUTH });
  }

  try {

    req.skipValue = skipValue
    req.PAGE_SIZE = PAGE_SIZE;
    
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ text: NOTAUTH });
  }
};