import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("method", req.method);
  console.log("body", req.body);

  switch (req.method) {
    case "PUT":
      res
        .status(200)
        .json({ code: "0000", errors: [{}], data: { ...req.body } });
      break;

    default:
      res.status(500);
      break;
  }
}
