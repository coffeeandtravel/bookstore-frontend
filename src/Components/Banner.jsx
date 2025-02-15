import BannerCard from "../Pages/HomePage/BannerCard";

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-purple-100 flex mt-16 lg:items-center">
      <div className="flex flex-col  lg:flex-row justify-between items-center gap-12 py-40">
        <div className="space-y-8 md:w-1/2 pl-2 lg:pl-0 h-full">
            <h2 className="text-2xl lg:text-5xl font-bold leading-snug text-black ">Buy and Sell your books <span className="text-purple-900">for the best prices.</span></h2>
            <p className="md:w-4/5">Get the book for free on our platform. We are continuosly adding more and more books to our library!</p>
            <div className="hidden">
                <input type="text" name="" id="" placeholder="Search Books" className="py-2 px-2 rounded outline-none" />
                <button className="bg-purple-600 px-6 py-2 font-medium hover:bg-black transition-all ease-in duration-200 text-white ml-2 rounded">Search</button>
            </div>
        </div>
        <div> <BannerCard/></div>
      </div>
    </div>
  );
};

export default Banner;
