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
  console.log("doSearch:filter", filter);
  console.log("doSearch:cond", cond);

  const filteredData = dummyUsers.filter(
    (user) =>
      (!cond.userId || user.userId.includes(cond.userId)) &&
      (!cond.userName || user.userName.includes(cond.userName)) &&
      (!cond.gender || user.gender === cond.gender) &&
      (!cond.departmentId || user.department === cond.departmentId)
  );

  let filerItems: FilterItem[] = [];

  switch (filter) {
    case "gender":
      // userNameでグルーピングし、その出現回数をカウント
      filerItems = filteredData.reduce((acc, { gender, genderName }) => {
        const item = acc.find((item) => item.filterValue === gender.toString());
        if (item) {
          item.count++;
        } else {
          acc.push({
            filterValue: gender.toString(),
            filterLabel: genderName,
            count: 1,
          });
        }
        return acc;
      }, [] as FilterItem[]);

      break;

    case "departmentId":
      filerItems = filteredData.reduce((acc, { department }) => {
        const item = acc.find(
          (item) =>
            item.filterValue === department?.departmentId?.toString() ?? ""
        );
        if (item) {
          item.count++;
        } else {
          acc.push({
            filterValue: department?.departmentId?.toString() ?? "",
            filterLabel: department?.departmentName,
            count: 1,
          });
        }
        return acc;
      }, [] as FilterItem[]);

      break;

    default:
      break;
  }

  return {
    code: "0000",
    errors: [{}],
    data: filerItems,
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const router = useRouter;
  // console.log("method", req.method);
  // console.log("query", req.query);
  // console.log("body", req.body);
  // console.log("router", router);
  const filter = req.query.filterItem as string;

  switch (req.method) {
    case "GET":
      const cond: {
        userId?: string;
        userName?: string;
        gender?: string;
        departmentId?: string;
        page?: string;
        size?: string;
      } = req.query;

      res.status(200).json(
        doSearach(filter, {
          userId: cond.userId,
          userName: cond.userName,
          gender: cond.gender ? Number.parseInt(cond.gender) : undefined,
          departmentId: cond.departmentId
            ? Number.parseInt(cond.departmentId)
            : undefined,
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
          gender: req.body.gender
            ? Number.parseInt(req.body.gender)
            : undefined,
          departmentId: req.body.departmentId
            ? Number.parseInt(req.body.departmentId)
            : undefined,
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
