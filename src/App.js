import React from 'react'
import "./scss/app.scss"
import { Categories, Header, PizzaBlock, Sort } from './components'

import pizzas from "./assets/pizza.json"
const App = () => {
  const renderPizzas = () => {
    return (
      pizzas.pizzas.map(obj => {
        return (
          <PizzaBlock
            {...obj}
            key={obj.id}
          />
        )
      })
    )
  }
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizza</h2>
          <div className="content__items">
            {renderPizzas()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
