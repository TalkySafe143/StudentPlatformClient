import React from 'react'
import Materiales from '../Materiales.jsx'

describe('<Materiales />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Materiales />)
  })
})