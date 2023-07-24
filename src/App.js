import React from 'react'
import "./scss/app.scss"

import { Header } from './components'
import { Cart, Home, Notfound } from './pages'

import { Route, Routes } from 'react-router-dom';

export const SearchContext = React.createContext("");


const App = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/pizza-v2" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}
export default App
