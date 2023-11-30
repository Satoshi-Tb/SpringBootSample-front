import { SearchCondition } from "@/TypeDef";
import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const listSearchConditionState = atom<SearchCondition>({
  key: "listSearchConditionState",
  default: { userId: "", userName: "", page: 0, size: 5 },
});

export const useListSearchConditionState = () => {
  return useRecoilValue(listSearchConditionState);
};

export const useListSearchConditionMutators = () => {
  const setState = useSetRecoilState(listSearchConditionState);

  const setListSearchCondition = React.useCallback(
    (condition: SearchCondition) => setState(condition),
    [setState]
  );

  return { setListSearchCondition };
};
