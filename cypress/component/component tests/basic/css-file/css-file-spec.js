/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'

describe('cssFile', () => {
  it('is loaded', () => {
    const Component = () => <button className="green">Green button</button>
    mount(<Component />, {
      cssFiles: 'cypress/component/component tests/basic/css-file/index.css',
    })

    cy.get('button')
      .should('have.class', 'green')
      .and('have.css', 'background-color', 'rgb(0, 255, 0)')
  })

  it('allows loading several CSS files', () => {
    const Component = () => (
      <button className="green">Large green button</button>
    )
    mount(<Component />, {
      cssFiles: [
        'cypress/component/component tests/basic/css-file/base.css',
        'cypress/component/component tests/basic/css-file/index.css',
      ],
    })

    // check the style from the first css file
    cy.get('button')
      .should('have.class', 'green')
      .invoke('css', 'height')
      .should(value => {
        // round the height, since in real browser it is never exactly 50
        expect(parseFloat(value), 'height is 50px').to.be.closeTo(50, 1)
      })

    // and should have style from the second css file
    cy.get('button').and('have.css', 'background-color', 'rgb(0, 255, 0)')
  })
})
