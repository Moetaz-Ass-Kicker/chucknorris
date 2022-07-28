import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import JockesCadre from "./components/JockesCadre";
import './App.css';
import Loader from "./components/loader/Loader";

function App() {
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jockePerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [jockesToShow, setJockesToShow] = useState([]);


  // fetch jockes by text search  find in the official documentation
  const fetchJokesByText = async (text) => {
    // search size must be 3 and 120
    if (text.length < 3 || text.length > 120) {
      fetchAndSetJokes();
      return alert("Please enter a search ter \n between 3 and 120 characters");
    }
    setLoading(true);
    await fetch(
      `https://api.chucknorris.io/jokes/search?query=${text}`
    )
      .then((res) => res.json())
      .then((res) => {
        setJockesToShow(res.result);
        setLoading(false);
      }
      )
      .catch((err) => console.log(err));
  }

  // fetch and set all jokes
  const fetchAndSetJokes = async () => {
    setLoading(true);
    await fetch(
      `https://api.chucknorris.io/jokes/search?query=all`
    )
      .then((res) => res.json())
      .then((res) => {
        setJokes(res.result);
        setJockesToShow(res.result);
        setLoading(false);

      })
      .catch((err) => console.log(err));
  };

  // get all the categories
  const fetchCategories = async () => {
    setLoading(true);
    await fetch(
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
  const fetchRandomJokebyCategory = async (category) => {
      console.log(jokes);
      setLoading(true);
      const categoryMatch = jokes.filter((joke) => joke.categories.includes(category));
      setJockesToShow(categoryMatch);
      setLoading(false);
      console.log(categoryMatch);
    }
  

  

  // Get current Jock
  const indexOfLastJockes = currentPage * jockePerPage;
  const indexOfFirstJockes = indexOfLastJockes - jockePerPage;
  const currentJockes = jockesToShow.slice(indexOfFirstJockes, indexOfLastJockes);
  
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
      {loading && (
        <div className="flex items-center   w-36 absolute bottom-0 right-0 m-4">
          <Loader />
        </div>
      )}

    </div>
    
  
  );
}

export default App;
