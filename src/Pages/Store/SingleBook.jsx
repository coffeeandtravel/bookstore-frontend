import { useLoaderData } from "react-router";

const SingleBook = () => {
  const {  bookTitle, authorName, imageURL, category, bookDescription, buyLink } =
    useLoaderData();

  return (
    <div className="min-h-screen min-w-full  flex flex-col items-center">
      <div className="mt-16  w-11/12  ">
        <div className="flex flex-col md:flex-row items-center h-auto lg:h-[600px] gap-28 bg-purple-200 rounded-md mb-2 lg:pl-0 pl-2">
          <div className=" lg:w-[700px]">
            <img src={imageURL} className="ml-0 mt-10 md:mt-0 rounded-lg lg:ml-20" alt="" />
          </div>
          <div className="  w-full h-full flex flex-col p-0 lg:pl-2">
            <div>
              <h1 className="text-5xl pt-10 font-bold">{bookTitle}</h1>{" "}
              <h2 className="text-2xl">{authorName}</h2>{" "}
              <h3 className="text-lg mt-10 font-semibold text-purple-500">
                {category.join(", ")}
              </h3>
            </div>
            <div className="mt-10">
              <p className="sm:w-fit  lg:w-[800px]">
                <span className="text-wrap">{bookDescription}</span>
              </p>
              <div className="mt-10 mb-10 lg:mt-14 flex items-center justify-center lg:justify-start lg:items-start">
                <a href={buyLink} className="px-5 py-2 rounded bg-purple-600 text-white">Get the book</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
