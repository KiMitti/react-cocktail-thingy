import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import { useCallback } from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { loading, setLoading } = useGlobalContext();
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  const getDrink = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      data.drinks[0] ? setCocktail(data.drinks[0]) : setCocktail(null);
      setLoading(false);
    } catch (error) {
      console.log(`Oh no! We've reached an impass ${error}`);
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    getDrink();
  }, [getDrink]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return (
      <section className='section cocktail-section'>
        <h2>No Drink Here</h2>
        <p>Seriously, I'm not even sure how you got here</p>
        <Link to='/' className='btn btn-primary'>
          Go Try Again
        </Link>
      </section>
    );
  }
  //main stuff
  const {
    strDrink: drinkName,
    strAlcoholic: type,
    strGlass: glass,
    strCategory: category,
    strInstructions: instructions,
    strDrinkThumb: img,
  } = cocktail;

  //ingredients & Measurements

  const ingredients = [
    { measure: cocktail.strMeasure1, ingred: cocktail.strIngredient1 },
    { measure: cocktail.strMeasure2, ingred: cocktail.strIngredient2 },
    { measure: cocktail.strMeasure3, ingred: cocktail.strIngredient3 },
    { measure: cocktail.strMeasure4, ingred: cocktail.strIngredient4 },
    { measure: cocktail.strMeasure5, ingred: cocktail.strIngredient5 },
    { measure: cocktail.strMeasure6, ingred: cocktail.strIngredient6 },
    { measure: cocktail.strMeasure7, ingred: cocktail.strIngredient7 },
    { measure: cocktail.strMeasure8, ingred: cocktail.strIngredient8 },
    { measure: cocktail.strMeasure9, ingred: cocktail.strIngredient9 },
    { measure: cocktail.strMeasure10, ingred: cocktail.strIngredient10 },
    { measure: cocktail.strMeasure11, ingred: cocktail.strIngredient11 },
    { measure: cocktail.strMeasure12, ingred: cocktail.strIngredient12 },
    { measure: cocktail.strMeasure13, ingred: cocktail.strIngredient13 },
    { measure: cocktail.strMeasure14, ingred: cocktail.strIngredient14 },
    { measure: cocktail.strMeasure15, ingred: cocktail.strIngredient15 },
  ];

  return (
    <section className='section cocktail-section'>
      <div className='drink'>
        <img src={img} alt='ABC' />
        <div className='drink-info'>
          <h2>{drinkName}</h2>
          <p>
            <span className='drink-data'>category :</span> {category}
          </p>
          <p>
            <span className='drink-data'>info :</span> {type}
          </p>
          <p>
            <span className='drink-data'>glass :</span> {glass}
          </p>
          <p>
            <span className='drink-data'>instructons</span>
            <br />
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients</span>

            <span>
              {ingredients.map((item, index) => {
                if (item.ingred) {
                  return (
                    <span key={index} style={{ display: 'block' }}>
                      {item.measure
                        ? `${item.measure} ${item.ingred}`
                        : `${item.ingred}`}
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </span>
          </p>
        </div>
      </div>
      <Link className='btn btn-primary' to='/'>
        back home
      </Link>
    </section>
  );
};

export default SingleCocktail;
