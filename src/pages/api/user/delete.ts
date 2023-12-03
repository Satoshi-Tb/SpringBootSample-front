import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("method", req.method);
  console.log("body", req.body);

  switch (req.method) {
    case "DELETE":
      res.status(200);
      break;

    default:
      res.status(500);
      break;
  }
}
