import { dummyUsers } from "@/utils/dummy/userdata";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  const filteredData = dummyUsers.find((user) => user.userId === userId);

  //   console.log("method", req.method);
  //   console.log("query", req.query);
  //   console.log("body", req.body);

  switch (req.method) {
    case "GET":
      res.status(200).json({
        code: "0000",
        errors: [{}],
        data: { user: filteredData },
      });
      break;

    case "POST":
      res.status(200).json({
        code: "0000",
        errors: [{}],
        data: { user: filteredData },
      });
      break;

    default:
      res.status(500);
      break;
  }
}
