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
  const LoaderWrapper: React.FC<P> = (props) => {
    if (loading) return <LoadingComponent />;
    return <WrappedComponent {...props} />;
  };

  return LoaderWrapper;
};

export default withDataLoading;
