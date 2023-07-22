import React from 'react'
import { Categories, PizzaBlock, PizzaLoading, Sort } from '../components';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [label, setLabel] = React.useState("All");
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ id: 0, property: "rating", how: "desc" });

  React.useEffect(() => {
    setIsLoading(true);
    getData()
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  async function getData() {
    let path = new URL('https://64b7542edf0839c97e16820e.mockapi.io/pizza');
    if (categoryId === 0) {
      if (sortType !== 0) {
        path.searchParams.append('sortBy', sortType.property);
        path.searchParams.append('order', sortType.how);
      }
    } else {
      path.searchParams.append('sortBy', sortType.property);
      path.searchParams.append('order', sortType.how);
      path.searchParams.append('category', categoryId);
    }

    const data = await fetch(path);
    const response = await data.json();
    setIsLoading(false);
    setItems(response);
  }


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
      <div className="container">
        <div className="content__top">
          <Categories onHandlerLabel={handlerLabel} categoryId={categoryId} onCategory={setCategoryId} />
          <Sort sort={sortType.id} onSort={setSortType} />
        </div>
        <h2 className="content__title">{label}</h2>
        <div className="content__items">
          {renderPizzas()}
        </div>
      </div>
    </>
  )
}


export default Home