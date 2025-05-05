import useSWRMutation from "swr/mutation";
import envConfig from "@/utils/envConfig";

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
  updateMode?: "append" | "replace";
};

export type UserDeleteType = {
  userIdList: string[];
};

// ユーザー情報更新
export const useUpdateUser = () => {
  // フェッチャーの実装
  // 追加の引数は第二引数の `arg` プロパティとして渡されます
  const updateUser = async (url: string, { arg }: { arg: UserPutType }) => {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
  };

  return useSWRMutation(`${envConfig.apiUrl}/api/user/update`, updateUser);
};

// ユーザー情報登録
export const useCreateUser = () => {
  // フェッチャーの実装
  // 追加の引数は第二引数の `arg` プロパティとして渡されます
  const createUser = async (url: string, { arg }: { arg: UserPutType }) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
  };

  return useSWRMutation(`${envConfig.apiUrl}/api/user/signup`, createUser);
};

// ユーザー情報削除
export const useDeleteUser = () => {
  // フェッチャーの実装
  // 追加の引数は第二引数の `arg` プロパティとして渡されます
  const deleteUser = async (url: string, { arg }: { arg: UserDeleteType }) => {
    console.log("useDeleteUser>trigger", arg);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    if (res.status !== 200) {
      throw "useDeleteUser error";
    }

    return res.json();
  };

  return useSWRMutation(`${envConfig.apiUrl}/api/user/delete`, deleteUser);
};
