import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const userListSelectedPage = atom<number>({
  key: "userListSelectedPage",
  default: 0,
});

export const useUserListSelectedPage = () => {
  return useRecoilValue(userListSelectedPage);
};

export const useUserListSelectedPageMutators = () => {
  const setState = useSetRecoilState(userListSelectedPage);

  const setUserListSelectedPage = React.useCallback(
    (condition: number) => setState(condition),
    [setState]
  );

  return { setUserListSelectedPage };
};

const userListPageSize = atom<number>({
  key: "userListPageSize",
  default: 5,
});

export const useUserListPageSizeState = () => {
  return useRecoilValue(userListPageSize);
};

export const useUserListPageSizeMutators = () => {
  const setState = useSetRecoilState(userListPageSize);

  const setUserListPageSize = React.useCallback(
    (condition: number) => setState(condition),
    [setState]
  );

  return { setUserListPageSize };
};
