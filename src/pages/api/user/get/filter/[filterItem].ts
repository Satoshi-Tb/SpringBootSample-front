import type { NextApiRequest, NextApiResponse } from "next";
import { BasicResponseType, FilterItem, SearchCondition } from "@/TypeDef";
import { dummyUsers } from "@/utils/dummy/userdata";
import { useRouter } from "next/router";
import { FilterItemResponseType } from "@/components/usecase/useUserFilter";

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
      (!cond.gender || user.gender === Number.parseInt(cond.gender)) &&
      (!cond.departmentId ||
        user.department?.departmentId === Number.parseInt(cond.departmentId)) &&
      (!cond.ageFrom ||
        !cond.ageTo ||
        !user.age ||
        (user.age >= cond.ageFrom && user.age <= cond.ageTo))
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

    case "userName":
      filerItems = filteredData.reduce((acc, { userName }) => {
        const item = acc.find((item) => item.filterValue === userName ?? "");
        if (item) {
          item.count++;
        } else {
          acc.push({
            filterValue: userName,
            filterLabel: userName,
            count: 1,
          });
        }
        return acc;
      }, [] as FilterItem[]);

      break;

    case "age":
      const ageList = filteredData
        .filter((user) => !!user.age)
        .map((user) => user.age!);
      const max = ageList.reduce(
        (prev, curr) => Math.max(prev, curr),
        ageList[0]
      );
      const min = ageList.reduce(
        (prev, curr) => Math.min(prev, curr),
        ageList[0]
      );

      const filerWork: FilterItem[] = [];
      const start = Math.floor(min / 10) * 10;
      const end = Math.floor(max / 10) * 10 + 10;
      console.log("min, max", min, max);
      console.log("start, end", start, end);
      for (let i = start; i < end; i += 10) {
        filerWork.push({
          count: 0,
          filterRangeValue: { from: i, to: i + 9 },
          filterLabel: `${i}-${i + 9}`,
        });
      }

      filteredData.forEach((user) => {
        filerWork.forEach((r) => {
          if (!user.age) return;
          if (
            user.age >= r.filterRangeValue!.from &&
            user.age <= r.filterRangeValue!.to
          ) {
            r.count++;
          }
        });
      });

      filerItems = filerWork.filter((item) => item.count > 0);

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
  console.log("query", req.query);
  console.log("body", req.body);

  const filter = req.query.filterItem as string;

  switch (req.method) {
    case "GET":
      const cond: {
        userId?: string;
        userName?: string;
        gender?: string;
        departmentId?: string;
        ageFrom?: string;
        ageTo?: string;
        page?: string;
        size?: string;
      } = req.query;

      res.status(200).json(
        doSearach(filter, {
          userId: cond.userId,
          userName: cond.userName,
          gender: cond.gender,
          departmentId: cond.departmentId,
          ageFrom: cond.ageFrom ? Number.parseInt(cond.ageFrom) : undefined,
          ageTo: cond.ageTo ? Number.parseInt(cond.ageTo) : undefined,
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
          gender: req.body.gender,
          departmentId: req.body.departmentId,
          ageFrom: req.body.ageFrom,
          ageTo: req.body.ageTo,
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
