import React from 'react'
import Navegacion from '../Navegacion.jsx'

describe('<Navegacion />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Navegacion />)
  })
})