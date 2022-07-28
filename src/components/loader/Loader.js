import React from 'react';
import './Loader.css';

const Loader = ({ className = "", ...rest}) => {
  return <div className={'Loader mx-auto ' + className} {...rest} />;
};

export default Loader;
