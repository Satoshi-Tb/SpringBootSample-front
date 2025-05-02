import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import {
  useUserListPageSizeState,
  useUserListSelectedPage,
} from "@/components/store/useUserListPaginationState";
import { ChangeEvent, useState } from "react";

type Props = { setOpen: (isOpen: boolean) => void };

export const useSearchConditionDialog = ({ setOpen }: Props) => {
  // 検索条件
  const condition = useListSearchConditionState();
  const { setListSearchCondition } = useListSearchConditionMutators();

  const userListPageOffset = useUserListSelectedPage();
  const userListRowsPerPage = useUserListPageSizeState();

  // フォームフィールド
  const [userId, setUserId] = useState(condition.userId || "");
  const [userName, setUserName] = useState(condition.userName || "");

  const handleChangeUserId = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUserId(e.target.value);

  const handleChangeUserName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUserName(e.target.value);

  const handleSubmit = () => {
    setListSearchCondition({
      ...condition,
      userId: userId,
      userName: userName,
      page: userListPageOffset,
      size: userListRowsPerPage,
    });
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    setUserId(condition.userId || "");
    setUserName(condition.userName || "");
  };

  const handleReset = () => {
    setUserId("");
    setUserName("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    userId,
    handleChangeUserId,
    userName,
    handleChangeUserName,
    handleSubmit,
    handleCancel,
    handleReset,
    handleClose,
  };
};
