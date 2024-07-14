import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [a, setA] = useState(1)
  const [vat, setVat] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  function addA() {
    setA(prevA => {
      const newA = prevA + 1
      console.log(newA)
      return newA
    })
  }

  function handlePrice(e) {
    let p = parseFloat(e.target.value)
    setPrice(p)
    updateVat(p, discount)
  }

  function handleDiscount(e) {
    let d = parseFloat(e.target.value)
    setDiscount(d)
    updateVat(price, d)
  }

  function updateVat(price, discount) {
    let discountedPrice = price - discount
    let v = discountedPrice * 0.07
    setVat(v.toFixed(2))
    calculateTotalPrice(price, v, discount)
  }

  function calculateTotalPrice(price, vat, discount) {
    let total = price - discount + parseFloat(vat)
    setTotalPrice(total.toFixed(2))
  }

  return (
    <>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" /> 
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" /> 
      </a>
    </div>
    <h1>Vite + React</h1>
      <h2>Price</h2>
      <input type="number" 
        onChange={handlePrice}
        style={{ fontSize: '20pt' }} />
      
      <h2>Discount Price</h2>
      <input type="number" 
        onChange={handleDiscount}
        style={{ fontSize: '20pt' }} />
      
      <p>Discount = {discount}</p>
      <p>VAT = {vat}</p>
      <p>Total Price = {totalPrice}</p>

      <p>A = {a}</p>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <br />
        <button onClick={addA}>Add A</button>
      </div>
    </>
  )
}

export default App



