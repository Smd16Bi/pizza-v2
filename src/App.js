import React from 'react'
import "./scss/app.scss"
import { Categories, Header, PizzaBlock, Sort } from './components'

const App = () => {
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
            <PizzaBlock title="Mexico" price="500" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
