import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((drink) => {
          const {
            idDrink: id,
            strDrink: drinkName,
            strDrinkThumb: image,
            strAlcoholic: type,
            strGlass: glass,
          } = drink;
          return { id, drinkName, image, type, glass };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Bad day! No drinks :( Your Error ${error}`);
    }
  }, [searchTerm]);

  useEffect(() => {
    getDrinks();
  }, [searchTerm, getDrinks]);

  return (
    <AppContext.Provider
      value={{
        data: 'hello',
        loading,
        searchTerm,
        cocktails,
        setSearchTerm,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
