describe("Att_itog", () => {
    it("test get_pol_city", () => {
      cy.visit("http://localhost:3000/")
      cy.contains("Запрос данных о загрязнении").click()
      cy.get('#InputCity').type("Москва")
      cy.contains("Получить данные").click()
      cy.contains('th', 'Дата')
      cy.contains('th', 'Время')
      cy.contains('th', 'PM10')
      cy.contains('th', 'PM2_5')
      cy.contains("Построить график").click()
      cy.get('#Graphics')
    })
  })
  
  