import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const userListPageOffset = atom<number>({
  key: "userListPageOffset",
  default: 0,
});

export const useListPageOffsetState = () => {
  return useRecoilValue(userListPageOffset);
};

export const useListPageOffsetMutators = () => {
  const setState = useSetRecoilState(userListPageOffset);

  const setUserListPageOffset = React.useCallback(
    (condition: number) => setState(condition),
    [setState]
  );

  return { setUserListPageOffset };
};

const userListRowsPerPage = atom<number>({
  key: "userListRowsPerPage",
  default: 5,
});

export const useListRowsPerPageState = () => {
  return useRecoilValue(userListRowsPerPage);
};

export const useListRowsPerPageMutators = () => {
  const setState = useSetRecoilState(userListRowsPerPage);

  const setUserListRowsPerPage = React.useCallback(
    (condition: number) => setState(condition),
    [setState]
  );

  return { setUserListRowsPerPage };
};
