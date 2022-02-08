import { ChangeEvent, FC, useState } from 'react'
import './App.css'

const Calculator: FC = () => {
  const [cartValue, setCartValue] = useState<number>(0)
  const [cartSurcharge, setCartSurcharge] = useState<number>(0)
  const [distanceSurcharge, setDistanceSurcharge] = useState<number>(0)
  const [itemSurcharge, setItemSurcharge] = useState<number>(0)
  const [dateDay, setDateDay] = useState<string>('')
  const [dateHour, setDateHour] = useState<number>(0)
  const [result, setResult] = useState<number>()
  const [error, setError] = useState<string>('')

  const inputCartValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const cartValue = Number(e.target.value)
    setCartValue(Number(e.target.value))
    cartValue < 10 
    ? setCartSurcharge(10 - cartValue) 
    : setCartSurcharge(0)
  }
  const inputDistance = (e: ChangeEvent<HTMLInputElement>): void => {
    const distance = Number(e.target.value)
    const remainder = Number(distance) % 500
    const integerValue = Math.floor(Number(distance) / 500)
    setDistanceSurcharge(integerValue)
    remainder > 0
      ? setDistanceSurcharge(integerValue + 1)
      : setDistanceSurcharge(integerValue)
  }
  const inputItems = (e: ChangeEvent<HTMLInputElement>): void => {
    const itemsvalue = e.target.value
    Number(itemsvalue) > 4
      ? setItemSurcharge((Number(itemsvalue) - 4) * 0.5)
      : setItemSurcharge(0)
  }
  const inputDateTime = (e: ChangeEvent<HTMLInputElement>): void => {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const a = new Date(e.target.value)
    const day = weekday[a.getDay()]
    setDateDay(day)
    let hour = a.getHours()
    setDateHour(hour)
  }
  const submitHandle = (e: any) => {
    e.preventDefault()
    const finalSurcharge = cartSurcharge + itemSurcharge + distanceSurcharge
    if (!cartValue || !distanceSurcharge || !itemSurcharge || !dateDay) {
      setError('Please fill in all the inputs')
    } else if (cartValue >= 100) {
      setResult(0)
      setError('')
    } else if (finalSurcharge > 15) {
      setResult(15)
      setError('')
    } else if (
      Number(dateHour) >= 15 &&
      Number(dateHour) <= 19 &&
      dateDay === 'Friday'
    ) {
      const dateTimeSurcharge = finalSurcharge * 1.1
      setResult(Number(dateTimeSurcharge.toFixed(2)))
      setError('')
    } else {
      setResult(finalSurcharge)
      setError('')
    }
  }
  return (
    <div className="container">
      <h1>Delivery Fee Calculator</h1>
      {<h4 style={{ color: 'red' }}>{error} </h4>}
      <form className="formFields" onSubmit={submitHandle}>
        <div className="elements">
          <label>Cart value (€)</label>
          <input
            type="number"
            placeholder="Enter the cart value"
            name="cartvalue"
            inputMode="numeric"
            onChange={inputCartValue}
          />
        </div>
        <div className="elements">
          <label>Delivery distance (m)</label>
          <input
            type="number"
            placeholder="Enter the distance"
            name="deliverydistance"
            onChange={inputDistance}
          />
        </div>
        <div className="elements">
          <label>Amount of items</label>
          <input
            type="number"
            placeholder="Enter the amount of items"
            name="amountofitems"
            onChange={inputItems}
          />
        </div>
        <div className="elements">
          <label>Time</label>
          <input
            type="datetime-local"
            className="dateTime"
            name="datetime"
            onChange={inputDateTime}
          />
        </div>
        <div className="buttonContainer">
          <button type="submit" name='submit'>CALCULATE DELIVERY PRICE</button>
        </div>
      </form>
      <div className="result">
        Delivery price:<div className="finalResult">€{result}</div>
      </div>
    </div>
  )
}
export default Calculator
