import './App.css';
import { useState, useEffect } from 'react';
import Axios from "axios";

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(()=>{
    Axios.get("http://localhost:3001/review")
      .then((res)=>{
        console.log("reviews",res.data)
        if(res.data.success){
          setMovieReviewList(res.data.data.items)
        }
      })
      .catch((err)=>{
        console.log("Soemthing went wrong")
      })
  },[]);

  const submitReview = () => {
    Axios.post("http://localhost:3001/review", {movie_name : movieName, review : review})
      .then((res)=>{
        if(res.data.success){
          // setMovieName("");
          // setReview("");
          setMovieReviewList([
            ...movieReviewList, {
              "movie_name" : movieName,
              "review" : review
            },
          ]);
        }else{
        }
      })
      .catch((err)=>{
        console.log("Soemthing went wrong")
        alert("Something went wrong with backend.")
      })
  }

  const deleteReview = (movie_name) =>{
    console.log("dleete review ", movie_name)
    Axios.delete(`http://localhost:3001/review/${movie_name}`)
      .then((res) => {
        console.log("deleete response",res)
        if(res.data.success){
          alert("you have deleted the review for this movie")
        }else{
          alert("Could not delete the review for the movie")
        }
      })
      .catch((err)=>{
        console.log("deleete err", err)
      })
  }

  const updateReview = (movie_name) => {
    Axios.post("http://localhost:3001/review/update", {movie_name : movie_name, review : newReview})
      .then((res)=>{
        if(res.data.success){
          alert("You have successfully updated review for this movie")
        }else{
          alert("Something went wrong with backend.")
        }
      })
      .catch((err)=>{
        console.log("Soemthing went wrong")
        alert("Something went wrong with backend.")
      })
  }

  return (
    <div className="App">
      <h1>My Movie Reviews</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName"
          onChange={(e)=>{
            setMovieName(e.target.value)
          }}/>
        <label>Review</label>
        <input type="text" name="review"
          onChange={(e)=>{
            setReview(e.target.value)
          }}
        />

        <button disabled={!movieName || !review}  onClick={submitReview}>Submit</button>

        {movieReviewList.map((item)=>{
          return (
            <div className="card">
              <h1>{item.movie_name} </h1>
              <p>{item.review}</p>

              <button onClick={ () => {deleteReview(item.movie_name)}} >Delete</button>
              <input type="text" id="updateInput" onChange={(e)=>{
                setNewReview(e.target.value);
              }}/>
              <button onClick={ () => {updateReview(item.movie_name)}}>Update</button>
            </div>
          ) 
        })}
      </div>
    </div>
  );
}

export default App;
