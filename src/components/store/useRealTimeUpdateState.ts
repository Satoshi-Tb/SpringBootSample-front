import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const realTimeUpdateState = atom<boolean>({
  key: "useRealTimeUpdateState",
  default: true,
});

export const useRealTimeUpdateState = () => {
  return useRecoilValue(realTimeUpdateState);
};

export const useRealTimeUpdateMutators = () => {
  const setState = useSetRecoilState(realTimeUpdateState);

  const setRealTimeUpdate = useCallback(
    (condition: boolean) => setState(condition),
    [setState]
  );

  return { setRealTimeUpdate };
};
