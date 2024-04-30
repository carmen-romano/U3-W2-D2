import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect } from "react";

const CommentArea = props => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGNiNjdmMzA0NjAwMWFlNTlmNTIiLCJpYXQiOjE3MTQ0NzQyMjksImV4cCI6MTcxNTY4MzgyOX0.Hj2xJHcYi6QkrldkIqAaQJ5d4qmAbHpnDVutf6lbPdQ",
      },
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante il recupero dei commenti");
        }
      })
      .then(comments => {
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    if (props.asin) {
      fetchData();
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
