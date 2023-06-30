import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"
import classes from "./AvailableMeals.module.css"
import { useEffect, useState, useCallback } from "react"

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])

  const fetchMeals = useCallback(async () => {
    const response = await fetch(FIREBASE_KEY)
    const responseData = await response.json()

    const loadedMeals = []

    for (const meal in responseData) {
      loadedMeals.push({
        id: meal,
        name: responseData[meal].name,
        description: responseData[meal].description,
        price: responseData[meal].price,
      })
    }

    setMeals(loadedMeals)
  }, [])

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals])

  console.log(meals)

  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
