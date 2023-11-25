describe("Att_itog", () => {
  it("test sign in", () => {
    cy.visit("http://localhost:3000/")
    cy.get('#login_ex').type("login")
    cy.get('#password_ex').type("login")
    cy.contains("Вход").click()
    cy.contains("Вы успешно авторизованы на сервисе!")
    cy.contains("Выход").click()
    cy.contains("Войдите в свою учетную запись")
  })
})

