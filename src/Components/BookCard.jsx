// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaShoppingCart } from "react-icons/fa";
// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const BookCard = ({headline, books}) => {
  return (
    <div className="my-16 px-4 lg:px-24" >
      <h2 className="text-5xl text-center font-bold text-black my-5"> {headline} </h2>
      <div className='flex justify-center'>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
        
        books.map(book=><SwiperSlide key={book._id}>
            <Link to={`/book/${book._id}`} >
            <div className='relative h-72 w-30'>
                <img className='rounded-md h-72' src={book.imageURL} alt={book.bookTitle} />
                <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'><FaShoppingCart className='w-4 h-4 text-white ' /></div>
            </div>
            <div>
                <div>
                <h3>{book.bookTitle}</h3>
                <p>{book.authorName}</p>
                </div>
            </div>
            </Link>
        </SwiperSlide>)
        }
      </Swiper>
      </div>
    </div>
  )
}
BookCard.propTypes = {
    headline: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
export default BookCard
