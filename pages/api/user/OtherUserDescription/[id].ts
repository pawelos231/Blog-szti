import { getUserDataByEmail } from "@server/db/user";

export default async function Handler(req, res) {
  const { id } = req.query;
  const { result, error } = await getUserDataByEmail(id);
  let temp = "";
  if (!!!result.ProfileDescription.length) {
    temp = "BRAK OPISU";
    return res.status(200).json(temp);
  }
  if (error) {
    console.log(error);
    return;
  }

  res.status(200).json(result.ProfileDescription.replaceAll('"', ""));
}
