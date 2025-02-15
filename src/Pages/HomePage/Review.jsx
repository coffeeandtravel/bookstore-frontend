// // import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Avatar } from "flowbite-react";
// import pfp from '../../assets/Profile-photo.png'
// import { FaStar } from 'react-icons/fa';
// import 'swiper/css';
// import 'swiper/css/pagination';



// // import required modules
// import { Pagination } from 'swiper/modules';

// const Review = () => {
//   return (
//     <div className="my-12 px-4 lg:px-14 ">
//       <h2 className="text-4xl font-bold text-center">Customer Feedback</h2>
//       <div className='my-3'>
//       <Swiper
//         slidesPerView={1}
//         spaceBetween={30}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 3,
//             spaceBetween: 50,
//           },
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//             <div className='space-y-6'>
//                 <div className='flex text-amber-400 gap-1'>
                
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                 </div>
//                 <div className='  '>
//                     <p className='mb-5 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maxime illum assumenda a magnam deleniti iste fugiat laudantium doloremque. Ipsum maiores illum minima sequi, quam sapiente similique est beatae ut.</p>
//                     <div className='flex flex-row text-right'>
//                     <Avatar img={pfp} alt="avatar of Jese" rounded className='w-10 mb-4' />
//                     <h5 className='text-lg font-medium mx-2 mt-1'>{`<Name>`}</h5>
//                     </div>
//                 </div>
//             </div>
//         </SwiperSlide>
        
//       </Swiper>
//       </div>
//     </div>
//   )
// }

// export default Review
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar } from "flowbite-react";
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

const Review = ({ headline }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch comments from JSONPlaceholder
        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=6');
        const comments = await commentsResponse.json();
        
        // Fetch random users from Random User API
        const usersResponse = await fetch('https://randomuser.me/api/?results=6');
        const usersData = await usersResponse.json();
        
        // Combine both APIs' data
        const combinedData = comments.map((comment, index) => ({
          id: comment.id,
          name: usersData.results[index].name.first + ' ' + usersData.results[index].name.last,
          text: comment.body,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1-5
          avatar: usersData.results[index].picture.thumbnail,
          email: comment.email
        }));

        setReviews(combinedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-8">Loading reviews...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="my-12 px-4 lg:px-14 w-11/12">
      <h2 className="text-4xl font-bold text-center mb-8">{headline}</h2>
      <div className='my-3 '>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 50 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className=''>
              <div className='space-y-6 p-6  border rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                <div className='flex text-amber-400 gap-1'>
                  {[...Array(review.rating)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <p className='text-gray-600 italic'>{`"${review.text}"`}</p>
                <div className='flex items-center gap-3'>
                  <Avatar 
                    img={review.avatar}
                    alt={review.name}
                    rounded
                    size="md"
                  />
                  <div>
                    <h5 className='text-lg font-semibold'>{review.name}</h5>
                    <p className='text-gray-500 text-sm'>{review.email}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

Review.propTypes = {
  headline: PropTypes.string.isRequired,
};

export default Review;