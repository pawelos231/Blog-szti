import React from "react";

const DefaultLoader = () => {
  console.log("default loader");
  return <div>Niestety nic tu nie ma :( </div>;
};

type LoadingComponentProps = {};

type WrappedComponentProps = {
  data: any; // Replace `any` with the appropriate type for your data
};

const withDataLoading = <P extends object>(
  loading: boolean,
  WrappedComponent: React.ComponentType<P>,
  LoadingComponent: React.ComponentType<LoadingComponentProps> = DefaultLoader
) => {
  const LoaderWrapper: React.ForwardRefRenderFunction<P, P> = (props, ref) => {
    if (loading) return <LoadingComponent />;
    return <WrappedComponent {...props} ref={ref} />;
  };

  const forwardRefWrapper = React.forwardRef<P, P>(LoaderWrapper);

  return forwardRefWrapper;
};

export default withDataLoading;
