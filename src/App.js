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
  const [categories, setCategories] = useState([]);


  // fetch jockes by text search  find in the official documentation
  const fetchJokesByText = (text) => {
    // search size must be 3 and 120
    if (text.length < 3 || text.length > 120) {
      fetchAndSetJokes();
      return alert("Please enter a search ter \n between 3 and 120 characters");
    }
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

  // fetch and set all jokes
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

  // get all the categories
  const fetchCategories = () => {
    setLoading(true);
    fetch(
      `https://api.chucknorris.io/jokes/categories`
    )
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
        setLoading(false);
      }
      )
      .catch((err) => console.log(err));
  }
  // fetch jockes by category
  const fetchRandomJokebyCategory = (category) => {
      setLoading(true);
      fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      )
        .then((res) => res.json())
        .then((res) => {
          setJokes(res);
          // don't slice the array because it will return the same joke
          
          setLoading(false);
        }
        )
        .catch((err) => console.log(err));
    }
  


  // Get current Jock
  const indexOfLastJockes = currentPage * jockePerPage;
  const indexOfFirstJockes = indexOfLastJockes - jockePerPage;
  const currentJockes = jokes.slice(indexOfFirstJockes, indexOfLastJockes);
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //useEffect to fetch jokes
  useEffect(() => {
    fetchAndSetJokes();
    fetchCategories();
  }, []);


  




  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Chuck Norris Jokes</h1>
      <div className='form-group'>
        <label htmlFor='category'>Select a category</label>
        <select className='form-control' id='category' onChange={(e) => fetchRandomJokebyCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

      </div>
      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Search for a joke'
          aria-describedby='basic-addon2'
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className='input-group-append'>
          <button className='btn' type='button'
          onClick={() => fetchJokesByText(search)}
          >
            Search
          </button>
        </div>
      </div>
      

        <JockesCadre jockes={currentJockes} />
      <Pagination postsPerPage={jockePerPage} totalPosts={jokes.length} paginate={paginate} />
    </div>
  
  );
}

export default App;
