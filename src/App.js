import React from 'react'
import "./scss/app.scss"
import { Categories, Header, PizzaBlock, Sort } from './components'

const App = () => {
  const [items, setItems] = React.useState([]);
  const [label, setLabel] = React.useState("All")

  React.useEffect(() => {
    fetch("https://64b7542edf0839c97e16820e.mockapi.io/pizza")
      .then(res => res.json())
      .then(res => setItems(res));
  }, [])

  const handlerLabel = (label) => {
    setLabel(prev => prev = label);
  }

  const renderPizzas = () => {
    return (
      items.map(obj => {
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
            <Categories onHandlerLabel={handlerLabel} />
            <Sort />
          </div>
          <h2 className="content__title">{label}</h2>
          <div className="content__items">
            {renderPizzas()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
