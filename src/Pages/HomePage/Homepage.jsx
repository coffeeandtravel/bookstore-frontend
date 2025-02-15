import Banner from "../../Components/Banner";
import BestSellers from "./BestSellers";
import FavoriteBooks from "./FavoriteBooks";
import OtherBooks from "./OtherBooks";
import PromoBanner from "./PromoBanner";
import Review from "./Review";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center">
      <Banner/>
      <BestSellers/>
      <FavoriteBooks/>
      <PromoBanner/>
      <OtherBooks/>
      <Review headline="Customer Tesomonials"  />
    </div>
  );
};

export default Homepage;
