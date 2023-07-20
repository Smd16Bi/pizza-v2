import React from 'react'
import "./scss/app.scss"

import { Header } from './components'
import { Cart, Home, Notfound } from './pages'


import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/pizza-v2" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default App
