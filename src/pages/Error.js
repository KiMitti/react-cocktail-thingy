import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section className='error-page section'>
      <div className='error-container'>
        <h1>404 Beverage Not Found</h1>
        <p> Sorry! You've hit a dead end.</p>
        <Link className='btn btn-primary' to='/'>
          back home
        </Link>
      </div>
    </section>
  );
};

export default Error;
