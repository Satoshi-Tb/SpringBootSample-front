import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useUserDetail } from "@/components/usecase/useUserDetail";
import {
  useCreateUser,
  UserPutType,
  useUpdateUser,
} from "@/components/usecase/useUserMutator";
import { useRouter } from "next/router";
import { use, useEffect, useMemo, useState } from "react";
import { useUserListSelectedRowIds } from "@/components/store/useUserListRowSelectionState";
import { PagingModeType } from "@/TypeDef";
import envConfig from "@/utils/envConfig";
import { useFontSizeState } from "@/components/store/useFontSizeState";
import {
  DetailFormData,
  createInvalidSymbolRegex,
  useDetailForm,
} from "./DetailForm";
import dayjs from "dayjs";
import { calculateAge } from "@/utils/utility";
import { SelectChangeEvent } from "@mui/material";
import { UserEditeModeType } from "./Detail";
import {
  DepartmentType,
  useDepartmentList,
} from "@/components/usecase/useDepartmentList";

const replaceSymbols = (input: string) => {
  return input.replace(createInvalidSymbolRegex("g"), "");
};

type Props = {
  editMode: UserEditeModeType;
};

type QueryType = {
  userId?: string;
  pagingMode?: "next" | "prev";
};

export type Department2Type = { someValue: string } & DepartmentType;

export const useDetailHooks = ({ editMode }: Props) => {
  // URLパラメータ取得
  const router = useRouter();
  const { userId, pagingMode } = router.query as QueryType;

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

  // 更新ボタンの活性制御
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);

  // パスワード表示制御
  const [showPassword, setShowPassword] = useState(false);

  // ユーザー詳細データ取得
  const {
    userData,
    hasError: hasUserDataError,
    isLoading: isUserDataLoading,
  } = useUserDetail(editMode === "create" ? undefined : userId);

  // フォーム定義
  const { handleSubmit, control, errors, register, setValue, reset, watch } =
    useDetailForm();

  // ユーザー詳細データローディング中
  const userDataLoading = useMemo(() => {
    if (editMode === "create") return false;
    if (isUserDataLoading || userData === undefined) return true;
    return false;
  }, [isUserDataLoading, userData, editMode]);

  const user = useMemo(() => userData?.data.user, [userData]);

  // 性別コード
  const {
    categoryCodeListData,
    hasError: hasCategoryError,
    isLoading: isCategoryLoading,
  } = useCategoryCode("gender");

  // 性別コードローディング中
  const genderListLoading = useMemo(() => {
    if (isCategoryLoading || categoryCodeListData === undefined) return true;
    return false;
  }, [categoryCodeListData, isCategoryLoading]);

  const genderList = useMemo(
    () => categoryCodeListData?.data ?? [],
    [categoryCodeListData]
  );

  // 部署コード
  const {
    departmentListData,
    isLoading: isDepartmentLoding,
    hasError: hasDepartmentError,
  } = useDepartmentList();
  // 部署コードローディング中
  const departmentListLoading = useMemo(() => {
    if (isDepartmentLoding || departmentListData === undefined) return true;
    return false;
  }, [departmentListData, isDepartmentLoding]);

  const departmentList = useMemo<DepartmentType[]>(() => {
    return (
      departmentListData?.data.map((item) => ({
        departmentId: item.departmentId,
        departmentName: item.departmentName,
      })) ?? []
    );
  }, [departmentListData]);

  // テスト用 ダミーデータ
  const departmentList2 = useMemo<Department2Type[]>(
    () =>
      departmentList.map((d, idx) => ({
        ...d,
        someValue: `${idx + 1}:${d.departmentName}`,
      })),
    [departmentList]
  );

  // 選択状態
  const watchDepartment2 = watch("department2");
  const selectedDeptSomeVal = useMemo(
    () =>
      departmentList2.find((d) => d.departmentId === watchDepartment2)
        ?.someValue || "",
    [departmentList2, watchDepartment2]
  );

  // 更新処理
  const { trigger: updateUser, error, isMutating } = useUpdateUser();

  // 登録処理
  const { trigger: createUser, isMutating: isCreating } = useCreateUser();

  //再読込
  const { mutate } = useSWRMutator();

  // 初期表示
  useEffect(() => {
    reset();
    if (!userData) return;
    // フォーム初期値設定
    const mode = pagingMode as PagingModeType;
    const user = userData.data.user;

    if (editMode === "update") {
      setValue("userId", user.userId);
      setValue("password", user.password);
      setValue("userName", user.userName);
      setValue("birthday", dayjs(user.birthday).toDate());
      setValue("gender", user.gender.toString());
      setValue("profile", user.profile ?? "");
      setValue("department", user.department?.departmentId?.toString() ?? "");
    }

    setUpdateButtonEnabled(user.department?.departmentId !== 9);

    // const idx = selectedRowIds.findIndex((val) => {
    //   console.log("val vs userId", val, user.userId);
    //   return val === user.userId;
    // });
    // TODO 課題：ページ切替で選択行状態が解除されるため、うまく前後IDをとれない
    const idx = selectedRowIds.indexOf(user.userId);
    // console.log("useEffect@selectedRowIds", selectedRowIds);
    // console.log("useEffect@userId", user.userId);
    // console.log("useEffect@idx", idx);

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
  }, [userData, selectedRowIds, pagingMode, reset, setValue, editMode]);

  // 更新ボタン押下アクション
  const onValid = async (form: DetailFormData) => {
    console.log("submit", { editMode, form });
    try {
      const replacedProfile = replaceSymbols(form.profile ?? "");

      const payload: UserPutType = {
        id: form.userId,
        userId: form.userId,
        userName: form.userName,
        password: form.password,
        birthday: dayjs(form.birthday).format("YYYY-MM-DD"),
        age: calculateAge(form.birthday),
        departmentId: Number(form.department),
        gender: parseInt(form.gender),
        profile: replacedProfile,
        updateMode: "replace",
      };
      console.log("更新データ", { payload });

      if (editMode === "create") {
        // ユーザー新規登録処理
        await createUser(payload);

        // 一覧画面へ
        router.push("/user/list");
      } else {
        // ユーザー更新処理
        await updateUser(payload);

        // 更新後データ再読込
        const key = `${envConfig.apiUrl}/api/user/detail/${form.userId}`;
        mutate(key);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onInvalid = (errors: any) => {
    console.log("Submit Invalid!", { errors });
  };

  // 部署選択変更イベント
  const handleChangeDivision = (event: SelectChangeEvent<string>) => {
    if (event.target.value === "9") {
      setUpdateButtonEnabled(false);
    } else {
      setUpdateButtonEnabled(true);
    }
  };

  // パスワード表示切り替えハンドラ
  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return {
    handleSubmit,
    onValid,
    onInvalid,
    control,
    register,
    errors,
    fontSize,
    user,
    genderList,
    isDataLoading:
      userDataLoading || genderListLoading || departmentListLoading,
    hasFetchError: hasUserDataError || hasCategoryError || hasDepartmentError,
    pagingMode,
    nextUserId,
    beforeUserId,
    departmentList,
    watchBirthday: watch("birthday"),
    watchDepartment2,
    updateButtonEnabled,
    handleChangeDivision,
    showPassword,
    handleClickShowPassword,
    departmentList2,
    selectedDeptSomeVal,
  };
};
