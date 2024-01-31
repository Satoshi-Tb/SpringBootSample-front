/* eslint-disable react/display-name */
import { useSampleAuthMutators } from "@/components/store/useSampleAuthState";
import { ComponentType, useEffect } from "react";

// HOC sample
export const withSampleAuth =
  <P extends {}>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    const { setSampleAuth } = useSampleAuthMutators();
    console.log("withSampleAuth: start.");
    useEffect(() => {
      console.log("withSampleAuth: Component is mounted.");
      setSampleAuth("sampleAuth");
    }, []);

    return <WrappedComponent {...props} />;
  };
