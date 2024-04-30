import { Button, ListGroup } from "react-bootstrap";

const SingleComment = ({ comment }) => {
  const deleteComment = asin => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGNiNjdmMzA0NjAwMWFlNTlmNTIiLCJpYXQiOjE3MTQ0NzQyMjksImV4cCI6MTcxNTY4MzgyOX0.Hj2xJHcYi6QkrldkIqAaQJ5d4qmAbHpnDVutf6lbPdQ",
      },
    })
      .then(response => {
        if (response.ok) {
          alert("La recensione è stata eliminata!");
        } else {
          throw new Error("La recensione non è stata eliminata!");
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  );
};

export default SingleComment;
