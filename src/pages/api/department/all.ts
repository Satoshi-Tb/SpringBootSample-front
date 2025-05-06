import { DepartmentType } from "@/components/usecase/useDepartmentList";
import { NextApiRequest, NextApiResponse } from "next";
// 部署リスト
const departments: DepartmentType[] = [
  { departmentId: 1, departmentName: "開発部" },
  { departmentId: 2, departmentName: "営業部" },
  { departmentId: 3, departmentName: "システム部" },
  { departmentId: 9, departmentName: "外注" },
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        code: "0000",
        errors: [{}],
        data: departments,
      });
      break;

    default:
      res.status(500);
      break;
  }
}
