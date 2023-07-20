import React from 'react'
import { Categories, PizzaBlock, PizzaLoading, Sort } from '../components';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [label, setLabel] = React.useState("All");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // fetch("https://64b7542edf0839c97e16820e.mockapi.io/pizza")
    //   .then(res => res.json())
    //   .then(res => {
    //     setItems(res);
    //     setIsLoading(prev => prev = !prev);
    //   })

  }, [])


  const handlerLabel = (label) => {
    setLabel(prev => prev = label);
  }

  const renderPizzas = () => {
    return (
      isLoading
        ?
        [...new Array(6)].map((_, index) => <PizzaLoading key={index} />)
        :
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
    <>
      <div className="content__top">
        <Categories onHandlerLabel={handlerLabel} />
        <Sort />
      </div>
      <h2 className="content__title">{label}</h2>
      <div className="content__items">
        {renderPizzas()}
      </div>
    </>
  )
}


export default Home