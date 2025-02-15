import { useEffect, useState } from "react"
import BookCard from "../../Components/BookCard";
 

const BestSellers = () => {
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BACKEND_URL}/books/get-books`).then(res=>res.json()).then(data=>setBooks(data.slice(0,7)))
    },[])
  return (
    <div className="w-11/12 ">
      <div>
      <BookCard books={books} headline="Best Sellers" />
      </div>
    </div>
    
  )
}

export default BestSellers
