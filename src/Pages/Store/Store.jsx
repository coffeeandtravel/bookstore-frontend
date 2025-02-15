import { useEffect, useState } from "react"
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

function Store() {
  const [books, setBooks] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/books/get-books').then(res=>res.json()).then(data=>setBooks(data));
  },[])
  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-3xl lg:text-5xl font-bold text-center">All books available on store</h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols- grid-cols-1 mx-2 my-12 gap-8 mt-10">
        {
          books.map(book => <Card
            className="max-w-sm h-100"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={book.imageURL}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal max-h-28 overflow-auto no-scrollbar text-gray-700 dark:text-gray-400">
              {book.bookDescription}
            </p>
            <Link to={`/book/${book._id}`} className="bg-blue-500 rounded-sm text-center text-white py-2">Get</Link>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Store
