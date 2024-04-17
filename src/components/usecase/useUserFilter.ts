import useSWR from "swr";
import type {
  BasicResponseType,
  FilterItem,
  FilterNameTYpe,
  SearchCondition,
} from "@/TypeDef";
import envConfig from "@/utils/envConfig";

export type FilterItemResponseType = {
  data: FilterItem[];
} & BasicResponseType;

const buildParam = (condition: SearchCondition) => {
  return condition
    ? "?" +
        Object.entries(condition)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
    : "";
};

/**
 * GETによる検索処理
 */
export const useUserFilter = (
  filterItem: FilterNameTYpe,
  condition?: SearchCondition
) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading } = useSWR<FilterItemResponseType>(
    condition
      ? `${envConfig.apiUrl}/api/user/get/filter/${filterItem}${buildParam(
          condition
        )}`
      : null,
    fetcher
  );
  // console.log("fetch data", data);

  return { userFilterData: data, hasError: error, isLoading };
};

// /**
//  * POSTによる検索処理
//  * @param condition
//  * @returns
//  */
// export const useUserListPost = (condition?: SearchCondition) => {
//   // データ取得処理
//   const fetcher = async ([url, condition]: [
//     url: string,
//     condition: SearchCondition
//   ]) => {
//     // 発生したエラーは、useSWRのerror変数にセットされる
//     // throw new Error("error test");
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(condition),
//     });
//     console.log("useUserListPost success");
//     return res.json();
//   };

//   // keyを[url, token1, token2, ...]形式で指定する。キャッシュのkeyは配列要素の組み合わせとなる
//   // tokenに検索条件を指定することで、post処理でも検索条件ごとにキャッシュを有効にできる
//   // fetcher関数にはkeyに指定した配列がそのまま引数として渡る
//   // urlにnullを指定すると、フェッチ処理キャンセル（のはず）
//   // 詳細：https://swr.vercel.app/ja/docs/arguments
//   const { data, error, isLoading, mutate } = useSWR(
//     condition
//       ? [`${envConfig.apiUrl}/api/user/get/list-pager`, condition]
//       : null,
//     fetcher
//     //{ refreshInterval: 5000 }
//   );
//   console.log("useUserListPost>fetch condition", condition);
//   console.log("useUserListPost>fetch data", data);

//   return { userListData: data, hasError: error, isLoading, mutate };
// };
