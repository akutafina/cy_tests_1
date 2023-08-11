describe('Dynamic Table Specs', () => {

    const processName = 'Chrome'

  beforeEach(() => {
    cy.viewport('macbook-13')
    cy.visit('/dynamictable')
  })

    //toodo: add throttling speed https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-throttle-network-speeds-using-Cypress
    //todo: paraller run (?)

      //https://www.w3.org/WAI/ARIA/apg/patterns/table/
      //https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#enter_wai-aria
      // Web Accessibility Initiative - Accessible Rich Internet Applications
      // https://www.w3.org/TR/wai-aria-1.1/#state_prop_def

    //If the label text is available in the DOM (i.e. typically visible text content), authors SHOULD use aria-labelledby and SHOULD NOT use aria-label. There may be instances where the name of an element cannot be determined programmatically from the DOM, and there are cases where referencing DOM content is not the desired user experience. Most host languages provide an attribute that could be used to name the element (e.g., the title attribute in [HTML]), yet this could present a browser tooltip. In the cases where DOM content or a tooltip is undesirable, authors MAY set the accessible name of the element using aria-label. As required by the accessible name and description computation, user agents give precedence to aria-labelledby over aria-label when computing the accessible name property.
    //todo: change naming
    // should be checked in the component tests (?)

  it(processName + ' CPU Load table value equals one in the yellow label', () => {
    //todo: change Chrome to a var
    //https://glebbahmutov.com/cypress-examples/recipes/get-text-list.html#filter-items-by-text
    //https://glebbahmutov.com/cypress-examples/recipes/table-cell-by-column-heading.html#find-a-specific-cell

    cy.contains('[role="columnheader"]', 'CPU')
        .invoke('index')
        .should('be.a', 'number')
        .then((columnIndex) => {
          cy.contains('[role="row"]', processName)
              .find('[role="cell"]')
              .eq(columnIndex)
              .invoke('text')
              .should('match', /^\d+(\.\d+)?%$/)
              .then(parseFloat)
              .as('cpuValInTable')
        })

    cy.get('.bg-warning')
        .invoke('text')
        //todo: what's diff of ' and ` ?
        .invoke('match', / CPU: (?<cpuLoadInWarn>\d+(\.\d+)?)\%$/)
        //todo: add processNameinto the equation
        // .invoke('match', /^${processName} CPU: (?<cpuLoadInWarn>\d+(\.\d+)?)\%$/)
        // .invoke('match', new RegExp('^' + processName + ' CPU: (?<cpuLoadInWarn>\d+(\.\d+)?)\%$'))
        // .then((element) => {
        //     const regex = new RegExp('^' + processName + ' CPU: \\d') //' CPU: \d+(\.\d+)?\%' #todo
        //     cy.contains(regex)
        // })
        // .invoke('match', /^(?<cpuLoadInWarn>\d+(\.\d+)?)\%$/)
        .should('be.an', 'array')
        .its('groups.cpuLoadInWarn')
        .should('be.a', 'string')
        .then((cpuValInWarn) => {
          cy.get('@cpuValInTable').should('be.eq', parseFloat(cpuValInWarn))
        })
  })

})