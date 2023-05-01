import { CircularProgress } from "@material-ui/core";
const NoPostView = () => {
  return (
    <div className="flex justify-center mt-12 text-black">
      <CircularProgress size={102} thickness={2.0} color="inherit" />
    </div>
  );
};

export default NoPostView;
