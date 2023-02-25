import { NextApiResponse, NextApiRequest } from "next";
import clientPromise from "@server/db/mongo";
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await clientPromise();
  res.status(200).json("");
}
