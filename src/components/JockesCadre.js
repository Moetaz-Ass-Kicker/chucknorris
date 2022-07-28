import React from 'react';

const JockesCadre = ({ jockes }) => {


  return (
    <ul className='list-group mb-4'>
      {jockes.map(jock => (
        <li key={jock.id} className='list-group-item'>
          {jock.value}
        </li>
      ))}
    </ul>
  );
};

export default JockesCadre;
