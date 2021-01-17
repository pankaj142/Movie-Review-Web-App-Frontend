import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Movie Reviews</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName"/>
        <label>Review</label>
        <input type="text" name="review"/>
      </div>
    </div>
  );
}

export default App;
