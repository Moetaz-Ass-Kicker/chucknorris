import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import JockesCadre from "./components/JockesCadre";
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jockePerPage] = useState(10);
  const [search, setSearch] = useState("");




  const fetchAndSetJokes = () => {
    setLoading(true);
    fetch(
      `https://api.chucknorris.io/jokes/search?query=all`
    )
      .then((res) => res.json())
      .then((res) => {
        setJokes(res.result);
        // map all the dta inside the res.result and set the category to the state
      
        setLoading(false);

      })
      .catch((err) => console.log(err));
  };

  // Get current posts
  const indexOfLastPost = currentPage * jockePerPage;
  const indexOfFirstPost = indexOfLastPost - jockePerPage;
  const currentPosts = jokes.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //useEffect to fetch jokes
  useEffect(() => {
    fetchAndSetJokes();
  }, []);

  // fetch jockes by text search  find in the official documentation
  const fetchJokesByText = (text) => {
    setLoading(true);
    fetch(
      `https://api.chucknorris.io/jokes/search?query=${text}`
    )
      .then((res) => res.json())
      .then((res) => {
        setJokes(res.result);
        setLoading(false);
      }
      )
      .catch((err) => console.log(err));
  }



  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Chuck Norris Jokes</h1>
      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Search for a joke'
          aria-describedby='basic-addon2'
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' type='button'
          onClick={() => fetchJokesByText(search)}
          >
            Search
          </button>
        </div>
      </div>
      

        <JockesCadre jockes={currentPosts} />
      <Pagination postsPerPage={jockePerPage} totalPosts={jokes.length} paginate={paginate} />
    </div>
  
  );
}

export default App;
