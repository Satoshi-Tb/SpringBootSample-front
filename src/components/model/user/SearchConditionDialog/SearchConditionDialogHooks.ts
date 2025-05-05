import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import {
  useUserListPageSizeState,
  useUserListSelectedPage,
} from "@/components/store/useUserListPaginationState";
import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Props = { setOpen: (isOpen: boolean) => void };

export const useSearchConditionDialog = ({ setOpen }: Props) => {
  // 検索条件
  const condition = useListSearchConditionState();
  const { setListSearchCondition } = useListSearchConditionMutators();

  const userListPageOffset = useUserListSelectedPage();
  const userListRowsPerPage = useUserListPageSizeState();

  // 性別コード
  const {
    categoryCodeListData,
    hasError: hasCategoryError,
    isLoading: isCategoryLoading,
  } = useCategoryCode("gender");
  const genderList = useMemo(
    () => [
      { category: "gender", code: "", name: "未選択" },
      ...(categoryCodeListData ? categoryCodeListData.data : []),
    ],
    [categoryCodeListData]
  );

  console.log("useSearchConditionDialog 初期化", { condition });

  // フォームフィールド
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");

  const handleChangeUserId = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUserId(e.target.value);

  const handleChangeUserName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUserName(e.target.value);

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const handleSubmit = () => {
    setListSearchCondition({
      ...condition,
      userId: userId,
      userName: userName,
      gender: gender,
      page: userListPageOffset,
      size: userListRowsPerPage,
    });
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    setUserId(condition.userId || "");
    setUserName(condition.userName || "");
    setGender(condition.gender || "");
  };

  const handleReset = () => {
    setUserId("");
    setUserName("");
    setGender("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // フォームフィールド初期化
  useEffect(() => {
    setUserId(condition.userId || "");
    setUserName(condition.userName || "");
    setGender(condition.gender || "");
  }, [condition]);

  return {
    userId,
    handleChangeUserId,
    userName,
    handleChangeUserName,
    gender,
    handleChangeGender,
    handleSubmit,
    handleCancel,
    handleReset,
    handleClose,
    genderList,
  };
};
