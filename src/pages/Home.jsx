import React from 'react'
import { Categories, Pagination, PizzaBlock, PizzaLoading, Sort } from '../components';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [label, setLabel] = React.useState("All");
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ id: 0, property: "rating", how: "desc" });

  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    getData()
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  async function getData() {
    const path = new URL(`https://64b7542edf0839c97e16820e.mockapi.io/pizza?page=${currentPage + 1}&limit=4`);
    console.log(path);
    if (categoryId === 0) {
      if (sortType !== 0) {
        path.searchParams.append('search', searchValue);
        path.searchParams.append('sortBy', sortType.property);
        path.searchParams.append('order', sortType.how);
      }
    } else {
      if (searchValue) {
        path.searchParams.append('search', searchValue);
      } else {
        path.searchParams.append('category', categoryId);
      }
      path.searchParams.append('sortBy', sortType.property);
      path.searchParams.append('order', sortType.how);
    }

    const data = await fetch(path);
    const response = await data.json();
    setIsLoading(false);
    setItems(response);
  }

  const searchItems = () => {
    return items.filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase()))
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
        <Pagination setCurrentPage={setCurrentPage} />
      </div>
    </>
  )
}


export default Home