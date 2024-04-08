import type { NextApiRequest, NextApiResponse } from "next";
import {
  UserListResponseType,
  UserType,
} from "@/components/usecase/useUserList";
import { SearchCondition } from "@/TypeDef";
import { dummyUsers } from "@/utils/dummy/userdata";

const doSearach = (cond: SearchCondition): UserListResponseType => {
  console.log("doSearch", cond);
  const filteredData = dummyUsers.filter(
    (user) =>
      (!cond.userId || user.userId.includes(cond.userId)) &&
      (!cond.userName || user.userName.includes(cond.userName)) &&
      (!cond.gender || user.gender === cond.gender) &&
      (!cond.departmentId ||
        user.department?.departmentId === cond.departmentId)
  );

  const pageData = filteredData.slice(
    cond.page * cond.size,
    (cond.page + 1) * cond.size
  );

  return {
    code: "0000",
    errors: [{}],
    data: {
      userList: pageData,
      resultNum: filteredData.length,
    },
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("method", req.method);
  console.log("query", req.query);
  console.log("body", req.body);

  switch (req.method) {
    case "GET":
      const cond: {
        userId?: string;
        userName?: string;
        gender?: number;
        departmentId?: number;
        page?: string;
        size?: string;
      } = req.query;

      res.status(200).json(
        doSearach({
          userId: cond.userId,
          userName: cond.userName,
          gender: cond.gender,
          departmentId: cond.departmentId,
          page: cond.page ? Number.parseInt(cond.page) : 0,
          size: cond.size ? Number.parseInt(cond.size) : 0,
        })
      );
      break;

    case "POST":
      res.status(200).json(
        doSearach({
          userId: req.body.userId,
          userName: req.body.userName,
          gender: req.body.gender,
          departmentId: req.body.departmentId,
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
