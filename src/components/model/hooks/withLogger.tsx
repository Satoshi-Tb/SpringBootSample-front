/* eslint-disable react/display-name */
import { ComponentType, useEffect } from "react";

// HOC sample
export const withLogger =
  <P extends {}>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    console.log(`Component ${WrappedComponent.displayName} start.`);
    useEffect(() => {
      console.log(`Component ${WrappedComponent.displayName} is mounted.`);
      return () =>
        console.log(`Component ${WrappedComponent.displayName} will unmount.`);
    }, []);

    return <WrappedComponent {...props} />;
  };
