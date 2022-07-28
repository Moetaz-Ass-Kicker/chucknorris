import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import JockesCadre from "./components/JockesCadre";

function App() {
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jockePerPage] = useState(10);



  const fetchAndSetJokes = () => {
    setLoading(true);
    fetch(
      `https://api.chucknorris.io/jokes/search?query=all`
    )
      .then((res) => res.json())
      .then((res) => {
        setJokes(res.result);
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


  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Chuck Norris Jokes</h1>

        <JockesCadre jockes={currentPosts} />
      <Pagination postsPerPage={jockePerPage} totalPosts={jokes.length} paginate={paginate} />
    </div>
  
  );
}

export default App;
