import React, { useEffect, useState } from 'react';
import Spin from "react-cssfx-loading/lib/Spin";
import MealItem from './MenuItem/MealItem';
import '../UI/Card.css';
import classes from './AvailableMeals.module.css';

function AvailableMeals() {

  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAfriKitchenMeal = async () => {
      setIsLoading(true);
      const response = await fetch('https://afrikitchen-bc387-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok) {
        throw new Error('Fail to fetch');
      }

      const responseMealsData = await response.json();

      const availableMealsData = [];

      for(let key in responseMealsData) {
        availableMealsData.push({
          id: key,
          name: responseMealsData[key].name,
          description: responseMealsData[key].description,
          price: responseMealsData[key].price,
        })
      }

      setAvailableMeals(availableMealsData);
      setIsLoading(false);
    }

 
      // Function has no error
      fetchAfriKitchenMeal().catch(error => {
        // Function has error
        setIsLoading(false);
        setError(error.message);                
      });

  }, []);

  if(isLoading) {
    return (
    <section className={classes.loading}>
      <div>
        <Spin color="#8a2b06" width="70px" height="70px" duration="3s" />
      </div>
    </section>
    );
  }

  if(error) {
    return (
    <section className={classes.error}>
      <p>
        {error}
      </p>
    </section>
    );
  }

  return (
    <section className={classes.meals}>
      <ul className="card">
        {availableMeals.map((meal) => (
          <MealItem 
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          />
        ))}
      </ul>
    </section>
  )
}

export default AvailableMeals