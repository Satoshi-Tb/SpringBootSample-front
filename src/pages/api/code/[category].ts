import { categoryGender } from "@/utils/dummy/categoryData";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const category = req.query.category as string;

  //   console.log("method", req.method);
  //   console.log("query", req.query);
  //   console.log("body", req.body);

  switch (req.method) {
    case "GET":
      res.status(200).json({
        code: "0000",
        errors: [{}],
        data: categoryGender,
      });
      break;

    default:
      res.status(500);
      break;
  }
}
