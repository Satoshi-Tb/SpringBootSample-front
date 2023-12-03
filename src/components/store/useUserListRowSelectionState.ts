import { GridRowSelectionModel } from "@mui/x-data-grid";
import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const userListSelectedRowIds = atom<GridRowSelectionModel>({
  key: "useUserListRowSelectionState",
  default: [],
});

export const useUserListSelectedRowIds = () => {
  return useRecoilValue(userListSelectedRowIds);
};

export const useUserListSelectedRowIdsMutator = () => {
  const setState = useSetRecoilState(userListSelectedRowIds);

  const setUserListSelectedRowIds = React.useCallback(
    (selectedRowIds: GridRowSelectionModel) => setState(selectedRowIds),
    [setState]
  );

  return { setUserListSelectedRowIds };
};
