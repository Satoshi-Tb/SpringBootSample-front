import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useUserDetail } from "@/components/usecase/useUserDetail";
import { useUpdateUser } from "@/components/usecase/useUserMutator";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserListSelectedRowIds } from "@/components/store/useUserListRowSelectionState";
import { PagingModeType } from "@/TypeDef";
import envConfig from "@/utils/envConfig";
import { useFontSizeState } from "@/components/store/useFontSizeState";
import {
  DetailFormData,
  createInvalidSymbolRegex,
  useDetailForm,
} from "./DetailForm";

const replaceSymbols = (input: string) => {
  return input.replace(createInvalidSymbolRegex("g"), "");
};

export const useDetailHooks = () => {
  // URLパラメータ取得
  const router = useRouter();
  const { userId, pagingMode } = router.query;

  // フォントサイズ設定
  const fontSize = useFontSizeState();

  // 選択IDリスト
  const selectedRowIds = useUserListSelectedRowIds();

  // 前のユーザーID
  const [beforeUserId, setBeforeUseId] = useState<string | undefined>(
    undefined
  );
  // 次のユーザーID
  const [nextUserId, setNextUseId] = useState<string | undefined>(undefined);

  // 部署リスト
  const departments = [
    { value: "1", label: "開発部" },
    { value: "2", label: "営業部" },
    { value: "3", label: "システム部" },
  ];

  // ユーザー詳細データ取得
  const {
    userData,
    hasError: hasUserDataError,
    isLoading: isUserDataLoading,
  } = useUserDetail((userId as string) || undefined);

  // 性別コード
  const {
    categoryCodeListData: genderList,
    hasError: hasCategoryError,
    isLoading: isCategoryLoading,
  } = useCategoryCode("gender");

  const isDataLoading =
    isUserDataLoading || isCategoryLoading || !userData || !genderList;
  const hasFetchError = hasUserDataError || hasCategoryError;

  // 更新処理
  const { trigger: updateUser, error, data } = useUpdateUser();

  //再読込
  const { mutate } = useSWRMutator();

  // フォーム定義
  const { handleSubmit, control, errors, register, setValue, reset } =
    useDetailForm();

  // フォーム初期値設定
  useEffect(() => {
    reset();
    if (!userData) return;
    const mode = pagingMode as PagingModeType;
    const user = userData.data.user;
    setValue("userId", user.userId);
    setValue("password", user.password);
    setValue("userName", user.userName);
    setValue("birthday", user.birthday);
    setValue("age", user.age ?? null);
    setValue("gender", user.gender.toString());
    setValue("profile", user.profile);
    setValue("department", user.department?.departmentId?.toString() ?? "");

    // const idx = selectedRowIds.findIndex((val) => {
    //   console.log("val vs userId", val, user.userId);
    //   return val === user.userId;
    // });
    // TODO 課題：ページ切替で選択行状態が解除されるため、うまく前後IDをとれない
    const idx = selectedRowIds.indexOf(user.userId);
    console.log("useEffect@selectedRowIds", selectedRowIds);
    console.log("useEffect@userId", user.userId);
    console.log("useEffect@idx", idx);

    setBeforeUseId(
      mode === "allRows"
        ? userData.data.beforeUserId
        : idx !== -1 && idx > 0
        ? (selectedRowIds[idx - 1] as string)
        : undefined
    );
    setNextUseId(
      mode === "allRows"
        ? userData.data.nextUserId
        : idx !== -1 && idx + 1 < selectedRowIds.length
        ? (selectedRowIds[idx + 1] as string)
        : undefined
    );
  }, [userData, selectedRowIds, pagingMode]);

  // 更新ボタン押下アクション
  const onValid = async (form: DetailFormData) => {
    console.log("submit", form);
    try {
      const replacedProfile = replaceSymbols(form.profile ?? "");
      console.log("submit replace", replacedProfile);
      const result = await updateUser({
        id: form.userId,
        userId: form.userId,
        userName: form.userName,
        password: form.password,
        age: form.age,
        gender: parseInt(form.gender),
        profile: replacedProfile,
        updateMode: "replace",
      });
      console.log("更新結果", result);

      // 更新後データ再読込
      const key = `${envConfig.apiUrl}/api/user/detail/${form.userId}`;
      mutate(key);
      alert("更新!");
    } catch (e) {
      console.log(e);
      alert("エラー!");
    }
  };

  const onInvalid = (errors: any) => {
    console.log("Submit Invalid!", { errors });
  };

  return {
    handleSubmit,
    onValid,
    onInvalid,
    control,
    register,
    errors,
    fontSize,
    userData,
    genderList,
    isDataLoading,
    hasFetchError,
    pagingMode,
    nextUserId,
    beforeUserId,
    departments,
  };
};
