// import React from 'react'
import {Link} from 'react-router-dom'
import favbook from '../../assets/favoritebook.jpg'
const FavoriteBooks = () => {
  return (
    <div className="px-4 lg:px-24 my-20 flex flex-col sm:flex-row justify-between items-center bg-purple-100 ">
        <div className="md:w-1/2 ">
            <img src={favbook} className="rounded-sm w-10/12 h-full" alt="" />        
        </div>
        <div className="md:w-1/2 space-y-6 ">
            <h2 className="text-5xl font-bold my-5 md:w-3/4 leading-snug ">Find Your Favourite <span className="text-purple-700" >Books Here!</span></h2>
            <p className="mb-10 text-lg md:w-5/6 ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio expedita facere incidunt ratione mollitia consequatur nesciunt numquam. Sit reiciendis iusto, inventore ducimus perferendis soluta adipisci nulla officia voluptates distinctio minus.</p>
            <div className="flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14">
                <div>
                    <h3 className="text-3xl font-bold">800+</h3>
                    <p className="text-base">Book listings</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold">200+</h3>
                    <p className="text-base">Registed Books</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold">800+</h3>
                    <p className="text-base">book listing</p>
                </div>
            </div>
            <Link to="/store" className='mt-8 block' ><button className='bg-purple-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 mb-20 lg:mb-0'>Explore More</button></Link>
        </div>
    </div>
  )
}

export default FavoriteBooks
