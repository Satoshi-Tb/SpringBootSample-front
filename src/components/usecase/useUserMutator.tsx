import useSWRMutation from "swr/mutation";

export type UserPutType = {
  id: string | number;
  userId: string;
  password: string;
  userName: string;
  birthday?: string;
  age?: number | null;
  gender: number;
  profile?: string;
  departmentId?: number;
  updateMode: "append" | "replace";
};

export const useUpdateUser = () => {
  // フェッチャーの実装
  // 追加の引数は第二引数の `arg` プロパティとして渡されます
  const updateUser = async (url: string, { arg }: { arg: UserPutType }) => {
    console.log("updateUser", arg);
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
  };

  return useSWRMutation(`http://localhost:8080/api/user/update`, updateUser);
};
