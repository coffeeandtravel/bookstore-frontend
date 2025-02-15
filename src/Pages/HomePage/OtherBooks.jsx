import { useEffect, useState } from "react"
import BookCard from "../../Components/BookCard";


const OtherBooks = () => {
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BACKEND_URL}/books/get-books`).then(res=>res.json()).then(data=>setBooks(data.slice(7,15)))
    },[])
  return (
    <div className="w-11/12">
      <BookCard books={books} headline="Other Books" />
    </div>
    
  )
}

export default OtherBooks
