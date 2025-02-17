import bookcat from '../../assets/BookCategories.json'
import { Label, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { useLoaderData, useParams } from 'react-router-dom';

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription, buyLink} = useLoaderData()
  const {categories} = bookcat;
 
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(category || []);
  const [filteredCategories, setFilteredCategories] = useState([])
  
  const handleCategoryChange = (event) =>{
    const value = event.target.value
    setCategoryInput(value)
    
    //filters based on input
    if(value){
      const filtered = categories.filter(cat =>
        cat.toLowerCase().startsWith(value.toLowerCase()) && !selectedCategories.includes(cat)
      );
      setFilteredCategories(filtered);
    }
    else{
      setFilteredCategories([]);
    }
  };

  const handleCategorySelect = (category) => {

    if (!selectedCategories.includes(category)) {
    setSelectedCategories([...selectedCategories, category]);
  }

    setCategoryInput(""); // Reset input field
    setFilteredCategories([]); // Clear dropdown

  };
  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  };

  //submit button
  const updateButton = (event) =>{
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const buyLink = form.bookURL.value;
    const bookDescription = form.bookDescription.value;
    const category = selectedCategories;

    const updatedBookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, buyLink
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/books/book/${id}`,
      {
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(updatedBookObj)
      },
    )
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update book');
      }
      return res.json();
    })
    .then(data =>{
      alert("Book Updated Successfully!",data);
    })
    .catch(error=>{
      console.error(error);
      alert("Error while Updating the book", error)
    }
    )
    
  }

  return (
    <div className=" max-w-screen lg:w-full h-full ">
      <div className="px-4 lg:max-w-screen md:w-full lg:w-full my-12 flex flex-col lg:items-center">
        <h2 className="mb-4 text-3xl font-bold">Edit book Details</h2>
        <form className="flex w-1/2 flex-col gap-4" onSubmit={updateButton} >
          <div className="flex flex-col gap-4">
              {/* Book Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Book Title" />
              </div>
              <TextInput
                id="bookTitle"
                type="text"
                sizing="md"
                placeholder="Enter Book Title/ Name here"
                name="bookTitle"  
                defaultValue={bookTitle}
              />
            </div>

            {/* Author Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name" />
              </div>
              <TextInput
                id="authorName"
                name="authorName"
                type="text"
                sizing="md"
                placeholder="Add Author's name here"
                defaultValue={authorName}
              />
            </div>
            {/* Book image URL */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="imageURL" value="Book Image" />
              </div>
              <TextInput
                id="imageURL"
                name="imageURL"
                type="text"
                sizing="md"
                placeholder="Paste image URL here!"
                defaultValue={imageURL}
              />
            </div>
            {/* Book URL here: */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bookURL" value="Book URL" />
              </div>
              <TextInput
                id="bookURL"
                name='bookURL'
                type="text"
                sizing="md"
                placeholder="Paste book URL here!"
                defaultValue={buyLink}
              />
            </div>
            {/* Book Category */}
            <div>
              <div className="mb-2">
              <Label htmlFor="category" className="" value="Book Categories" defaultValue={categories}/>
              </div>
              <div className="mb-2 relative">
                <TextInput
                  id="category"
                  name="category"
                  type="text"
                  sizing="md"
                  placeholder="Start typing a category"
                  value={categoryInput}
                  onChange={handleCategoryChange}
                  
                />
                {/* Dropdown suggestions */}
                {filteredCategories.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
                    {filteredCategories.map((cat, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleCategorySelect(cat)}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Selected categories display */}
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedCategories.map((cat, index) => (
                  <div key={index} className="bg-amber-700 text-white px-3 py-1 rounded flex items-center gap-2">
                    {cat}
                    <button
                      type="button"
                      className="text-sm font-bold"
                      onClick={() => removeCategory(cat)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Book Description */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bookDescription" value="Book Description" />
              </div>
              <Textarea
                id="bookDescription"
                name="bookDescription"
                placeholder="Add book Description"
                rows={4}
                defaultValue={bookDescription}
              />
            </div>
            <div>
              <button className="bg-amber-500 text-white px-3 py-2 rounded-md" type="submit">Edit Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks
