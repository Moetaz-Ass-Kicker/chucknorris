import React from 'react';

const JockesCadre = ({ jockes, likeJoke, unlikeJoke  }) => {



  return (
    // make the jockes list inside a table
    <div className="jockes-cadre">
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">date</th>
          <th scope="col">Joke</th>
          <th scope="col">Likes/dislike</th>
        </tr>
      </thead>
      <tbody>
        {jockes.map((joke, index) => (
          <tr key={index}>
            <th scope="row">{joke.created_at}</th>
            <td>{joke.value}</td>
            <td> 
            <button
              variant='contained'
              color='primary'
              onClick={() => likeJoke(joke.id)}
              >
              Like
            </button>
            <button
              variant='contained'
              color='default'
              onClick={() => unlikeJoke(joke.id)}
            >
              Unlike
            </button>  
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default JockesCadre;
