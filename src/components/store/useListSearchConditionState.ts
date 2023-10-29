import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const listSearchConditionState = atom<string>({
  key: "listSearchConditionState",
  default: "",
});

export const useListSearchConditionState = () => {
  return useRecoilValue(listSearchConditionState);
};

export const useListSearchConditionMutators = () => {
  const setState = useSetRecoilState(listSearchConditionState);

  const setListSearchCondition = React.useCallback(
    (condition: string) => setState(condition),
    [setState]
  );

  return { setListSearchCondition };
};
