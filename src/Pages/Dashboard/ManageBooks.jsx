import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/books/get-books")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
      });
  }, []);


  const handleDelete = (id) => {
    // setOpenModal(false);
    console.log(id);
    setBookToDelete(null);

    fetch(`http://localhost:3000/books/book/${id}`,{
      method:"DELETE"})
      .then(res=>res.json())
      .then(data=> {
        console.log("API's response",data)
        setDeleteModal(true);

        if(Array.isArray(data)){
          setAllBooks(data);
        }
        else{
          fetch(`${import.meta.env.VITE_BACKEND_URL}/books/get-books`)
        .then(res => res.json())
        .then(updatedBooks => setAllBooks(updatedBooks));
    }})
    .catch(error=>console.log("Error while fetching data", error))
  };

  return (
    <div className=" sm:max-w-screen flex flex-row ">
      <div className="px-4 sm:max-w-screen md:w-full lg:w-full my-12 flex flex-col lg:items-center">
        <h2 className="mb-4 text-3xl font-bold">Manage Books</h2>
        <div className="overflow-x-auto">
          <Table className="lg:w-[1120px] " hoverable>
            <Table.Head>
              <Table.HeadCell>No.</Table.HeadCell>
              <Table.HeadCell>Book Title</Table.HeadCell>
              <Table.HeadCell>Author Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Edit or delete</Table.HeadCell>
            </Table.Head>
            {Array.isArray(allBooks) && allBooks.length > 0 ? (
              allBooks.map((book, index) => (
                <Table.Body className="divide-y" key={book._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{book.bookTitle}</Table.Cell>
                    <Table.Cell>{book.authorName}</Table.Cell>
                    <Table.Cell>{book.category.join(", ")}</Table.Cell>

                    <Table.Cell className="flex lg:flex-row flex-col justify-center">
                      <Link
                        to={`/admin/dashboard/edit/${book._id}`}
                        className="font-medium text-teal-500 hover:underline align-middle rounded-md py-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-600 text-bold ml-4 rounded-md text-white px-4 py-2"
                        onClick={() => setBookToDelete(book._id)}
                      >
                        Delete
                      </button>
                      {bookToDelete && (
                        <Modal
                          show={!!bookToDelete}
                          onClose={() => setBookToDelete(null)}
                          className="bg-black/10"
                        >
                          <Modal.Header className="bg-red-600 text-white">
                            Warning
                          </Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-red-700 dark:text-gray-400">
                                This will delete the book.
                              </p>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              color="red"
                              onClick={() => handleDelete(bookToDelete)}
                            >
                              Delete
                            </Button>
                            <Button
                              color="green"
                              onClick={() => setBookToDelete(null)}
                            >
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      )}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan="5" className="text-center">
                    No books available.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
            {deleteModal && (
              <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
                <Modal.Header>Book Deleted</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-green-600 dark:text-gray-400">
                      Book Deleted Successfully!
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setDeleteModal(false)}>Exit</Button>
                </Modal.Footer>
              </Modal>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
