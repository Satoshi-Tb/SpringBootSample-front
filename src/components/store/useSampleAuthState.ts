import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const sampleAuthState = atom<string>({
  key: "sampleAuthState",
  default: "",
});

export const useSampleAuthState = () => {
  return useRecoilValue(sampleAuthState);
};

export const useSampleAuthMutators = () => {
  const setState = useSetRecoilState(sampleAuthState);

  const setSampleAuth = React.useCallback(
    (auth: string) => setState(auth),
    [setState]
  );

  return { setSampleAuth };
};
