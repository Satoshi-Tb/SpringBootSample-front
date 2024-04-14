import { FontSizeType, SearchCondition } from "@/TypeDef";
import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const fontSizeState = atom<FontSizeType>({
  key: "fontSizeState",
  default: "medium",
});

export const useFontSizeState = () => {
  return useRecoilValue(fontSizeState);
};

export const useFontSizeMutators = () => {
  const setState = useSetRecoilState(fontSizeState);

  const setFontSize = React.useCallback(
    (condition: FontSizeType) => setState(condition),
    [setState]
  );

  return { setFontSize };
};
