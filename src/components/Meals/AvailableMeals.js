import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {

    const [isLoading, setIsLoading] =useState(false)
    const [meals,setMeals] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await fetch("https://react-http-3ba5b-default-rtdb.firebaseio.com/meals.json")
            const responseData = await response.json()
            const mealsData = []
            for (const key in responseData) {
                mealsData.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
            })
            }
            setMeals(mealsData) 
            setIsLoading(false)      
        }
        fetchData()
    }, [])
    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));
    

    return (
        <section className={classes.meals}>
            <Card>
                {!isLoading ? <ul>{mealsList}</ul>:<h1>Loading the List of Meals. Please Wait...!</h1>}
            </Card>
        </section>
    );
};

export default AvailableMeals;
