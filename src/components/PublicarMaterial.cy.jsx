import React from 'react'
import PublicarMaterial from './PublicarMaterial'

describe('<PublicarMaterial />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PublicarMaterial />)
  })
})