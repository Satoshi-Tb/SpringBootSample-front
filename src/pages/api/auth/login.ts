import { UserType } from "@/components/usecase/useUserList";
import { NextApiRequest, NextApiResponse } from "next";

const dummyUsers: UserType[] = [
  {
    id: "1",
    userId: "user01",
    password: "password01",
    userName: "User One",
    birthday: "1990-01-01",
    age: 30,
    gender: 1,
    genderName: "男性",
    profile: "Profile of User One",
    department: {
      departmentId: 1,
      departmentName: "Development",
    },
  },
  {
    id: "2",
    userId: "user02",
    password: "password01",
    userName: "User Two",
    birthday: "1990-01-01",
    age: 30,
    gender: 2,
    genderName: "女性",
    profile: "Profile of User One",
    department: {
      departmentId: 1,
      departmentName: "Development",
    },
  },
  {
    id: "3",
    userId: "system03",
    password: "password01",
    userName: "User 3",
    birthday: "1990-01-01",
    age: 30,
    gender: 1,
    genderName: "男性",
    profile: "Profile of User One",
    department: {
      departmentId: 1,
      departmentName: "Development",
    },
  },
  {
    id: "4",
    userId: "user04",
    password: "password01",
    userName: "User 4",
    birthday: "1990-01-01",
    age: 30,
    gender: 1,
    genderName: "男性",
    profile: "Profile of User One",
    department: {
      departmentId: 1,
      departmentName: "Development",
    },
  },
  {
    id: "5",
    userId: "user05",
    password: "password01",
    userName: "User 5",
    birthday: "1990-01-01",
    age: 30,
    gender: 1,
    genderName: "男性",
    profile: "Profile of User One",
    department: {
      departmentId: 1,
      departmentName: "Development",
    },
  },
  {
    id: "6",
    userId: "system06",
    password: "password01",
    userName: "User 6",
    birthday: "1990-01-01",
    age: 30,
    gender: 3,
    genderName: "その他",
    profile: "Profile of User One",
    department: {
      departmentId: 1,
      departmentName: "Development",
    },
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("method", req.method);
  console.log("query", req.query);
  console.log("body", req.body);

  switch (req.method) {
    case "GET":
      const cond: {
        userId?: string;
        userName?: string;
        page?: string;
        size?: string;
      } = req.query;

      res.status(200).json(dummyUsers[0]);
      break;

    case "POST":
      res.status(200).json(dummyUsers[0]);
      break;

    default:
      res.status(500);
      break;
  }
}
