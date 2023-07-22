import React from 'react'
import "./scss/app.scss"

import { Header } from './components'
import { Cart, Home, Notfound } from './pages'


import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/pizza-v2" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
