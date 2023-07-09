import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const App = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=10`
      );
      setComments(response.data);
      setTotalPages(Math.ceil(response.headers["x-total-count"] / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // //handle edit on user edit
  // const handleEditComment = (commentId, title, comment) => {
  //   setEditCommentId(commentId);
  //   setEditedTitle(title);
  //   setEditedComment(comment);
  // };

  // const handleUpdateComment = () => {
  //   // Perform validation or API call to update the comment
  //   // Update the comments state with the edited comment
  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       comment.id === editCommentId
  //         ? { ...comment, title: editedTitle, body: editedComment } // Update 'comment' to 'body'
  //         : comment
  //     )
  //   );
  //   // Clear the edit state
  //   setEditCommentId(null);
  //   setEditedTitle("");
  //   setEditedComment("");
  // };

  // const handleCancelEdit = () => {
  //   // Clear the edit state
  //   setEditCommentId(null);
  //   setEditedTitle("");
  //   setEditedComment("");
  // };
  
  //handle delete on user delte
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );
      // Update the comments state by removing the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
      <div key={comment.id} style={{ border: "1px solid", borderRadius: "3px" }}>
        <p>Email: {comment.email}</p>
        <p>Body: {comment.body}</p>
        <button onClick={() => handleDelete(comment.id)}>Delete</button>
      </div>
    ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default App;
