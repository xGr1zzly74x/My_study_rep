describe("HomeWork_11", () => {
  it("test XYZ BANK", () => {
    cy.visit("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login")
    cy.contains("Customer Login").click()
    cy.get("Select").select("Harry Potter")
    cy.contains("Login").click()
    cy.contains("Deposit").click()
    cy.get('input').type('100')
    cy.get('button[class*="btn-default"]').click()
    cy.contains("Deposit Successful")
    cy.contains("Logout").click()
  })
})
