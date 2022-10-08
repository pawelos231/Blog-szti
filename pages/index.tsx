let string: string = "siema" 
import Header from "../components/Header/header";
import AllPosts from "../components/Posts/AllPosts";

export default function Home() {
  return( 
  <div className="flex justify-center w-full flex-col">
    <Header/>
    <AllPosts/>
  </div>);
}
