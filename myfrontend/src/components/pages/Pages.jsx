import React from "react"
import { Header } from "../common/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "../home/Home"
import { Footer } from "../common/Footer"
import  PaymentComponent  from "../home/PaymentComponent"

export const Pages = ({ cartItems }) => {
  return (
    <>
      <Router>
        <Header cartItems={cartItems} />
        <Switch>
          <Route exact path='/'>
            <Home cartItems={cartItems} />
          </Route>
          <Route exact path="/payment">
            <PaymentComponent />
          </Route>

        </Switch>
        <Footer />
      </Router>
    </>
  )
}
