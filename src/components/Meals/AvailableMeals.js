import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"
import classes from "./AvailableMeals.module.css"
import { useEffect, useState } from "react"

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(FIREBASE_KEY)

        if (!response.ok) throw new Error("Response Not Ok")

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
        setIsLoading(false)
      } catch (error) {
        setHttpError(error.message)
      }
      setIsLoading(false)
    }

    fetchMeals()
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

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
