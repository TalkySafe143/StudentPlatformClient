import React from 'react'
import Preview from '../Preview.jsx'

describe('<Preview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Preview />)
  })
})