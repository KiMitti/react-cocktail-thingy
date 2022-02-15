import React from 'react';
import { Link } from 'react-router-dom';

const Cocktail = (single) => {
  const { id, drinkName, image, type, glass } = single;
  return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={image} alt={drinkName} />
      </div>
      <div className='cocktail-footer'>
        <h3>{drinkName}</h3>
        <h4>{glass}</h4>
        <p>{type}</p>
        <Link className='btn btn-primary btn-details' to={`/cocktail/${id}`}>
          Details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
