import { Label, TextInput, Textarea } from "flowbite-react";
import bookcat from '../../assets/BookCategories.json'
import { useState } from "react";
const UploadBook = () => {

  const {categories} = bookcat;

  const [categoryInput, setCategoryInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
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
    setSelectedCategories([...selectedCategories, category]);
    setCategoryInput(""); // Reset input field
    setFilteredCategories([]); // Clear dropdown
  };
  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  };

  //submit button
  const submitButton = (event) =>{
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const buyLink = form.bookURL.value;
    const bookDescription = form.bookDescription.value;
    const category = selectedCategories;
    const bookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, buyLink
    }
    // console.log(bookObj);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/books/upload-book`,{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(bookObj)
    })
    .then(res=>res.json())
    .then(data =>{
      alert("Book Uploaded Successfully!");
      form.reset()
    })
    .catch(error=>{
      console.error(error);
      alert("Error while uploading the book", error)
    }
    )
  }

  return (
    <div className=" max-w-screen lg:w-full h-full ">
      <div className="px-4 lg:max-w-screen md:w-full lg:w-full my-12 flex flex-col lg:items-center">
        <h2 className="mb-4 text-3xl font-bold">Upload a Book</h2>
        <form className="flex w-1/2 flex-col gap-4" onSubmit={submitButton} >
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
              />
            </div>

            {/* Author Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name" />
              </div>
              <TextInput
                id="authorName"
                type="text"
                sizing="md"
                placeholder="Add Author's name here"
              />
            </div>
            {/* Book image URL */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="imageURL" value="Book Image" />
              </div>
              <TextInput
                id="imageURL"
                type="text"
                sizing="md"
                placeholder="Paste image URL here!"
              />
            </div>
            {/* Book URL here: */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bookURL" value="Book URL" />
              </div>
              <TextInput
                id="bookURL"
                type="text"
                sizing="md"
                placeholder="Paste book URL here!"
              />
            </div>
            {/* Book Category */}
            <div>
              <div className="mb-2">
              <Label htmlFor="category" className="" value="Book Categories" />
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
                placeholder="Add book Description"
                rows={4}
              />
            </div>
            <div>
              <button className="bg-green-400 h-10 w-20 rounded-md mb-20 lg:mb-0" onSubmit={submitButton}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
