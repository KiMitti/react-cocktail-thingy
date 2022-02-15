import React from 'react';
import Cocktail from './Cocktail';
import Loading from './Loading';
import { useGlobalContext } from '../context';

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (cocktails.length < 1) {
    return (
      <section className='section'>
        <h2 className='section-title'>
          Sorry! Your search returned no cocktails
        </h2>
      </section>
    );
  }
  return (
    <section className='section'>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((single) => {
          return <Cocktail {...single} key={single.id} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
