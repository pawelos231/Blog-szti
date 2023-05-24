import CreatedComments from "@components/userDetailsPages/CreatedComments/CreatedComments";
const CreatedComms = () => {
  return (
    <div className="absolute top-36">
      <h1 className="mb-8 text-center">Sworzone przez ciebie komentarze</h1>
      <CreatedComments />
    </div>
  );
};

export default CreatedComms;
