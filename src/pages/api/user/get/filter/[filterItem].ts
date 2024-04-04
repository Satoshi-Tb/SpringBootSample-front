import type { NextApiRequest, NextApiResponse } from "next";
import { BasicResponseType, SearchCondition } from "@/TypeDef";
import { dummyUsers } from "@/utils/dummy/userdata";
import { useRouter } from "next/router";
import {
  FilterItem,
  FilterItemResponseType,
} from "@/components/usecase/useUserFilter";

const doSearach = (
  filter: string,
  cond: SearchCondition
): FilterItemResponseType => {
  console.log("doSearch", cond);
  const filteredData = dummyUsers.filter(
    (user) =>
      (!cond.userId || user.userId.includes(cond.userId)) &&
      (!cond.userName || user.userName.includes(cond.userName))
  );

  // userNameでグルーピングし、その出現回数をカウント
  const filerItems = filteredData.reduce((acc, { genderName }) => {
    const item = acc.find((item) => item.filterName === genderName);
    if (item) {
      item.count++;
    } else {
      acc.push({ filterName: genderName ?? "", count: 1 });
    }
    return acc;
  }, [] as FilterItem[]);

  return {
    code: "0000",
    errors: [{}],
    data: filerItems,
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const router = useRouter;
  console.log("method", req.method);
  console.log("query", req.query);
  console.log("body", req.body);
  console.log("router", router);
  const filter = "test";

  switch (req.method) {
    case "GET":
      const cond: {
        userId?: string;
        userName?: string;
        page?: string;
        size?: string;
      } = req.query;

      res.status(200).json(
        doSearach(filter, {
          userId: cond.userId,
          userName: cond.userName,
          page: cond.page ? Number.parseInt(cond.page) : 0,
          size: cond.size ? Number.parseInt(cond.size) : 0,
        })
      );
      break;

    case "POST":
      res.status(200).json(
        doSearach(filter, {
          userId: req.body.userId,
          userName: req.body.userName,
          page: req.body.page ? req.body.page : 0,
          size: req.body.size ? req.body.size : 0,
        })
      );
      break;

    default:
      res.status(500);
      break;
  }
}
