import { HighlightSetting } from "@/TypeDef";
import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const highlightSettingsState = atom<HighlightSetting[]>({
  key: "useHighlightSettingsState",
  default: [{ keyword: "user", color: "yellow" }],
});

export const useHighlightSettingsState = () => {
  return useRecoilValue(highlightSettingsState);
};

export const useHighlightSettingsMutators = () => {
  const setState = useSetRecoilState(highlightSettingsState);

  const setHighlightSettings = React.useCallback(
    (condition: HighlightSetting[]) => setState(condition),
    [setState]
  );

  return { setHighlightSettings };
};
