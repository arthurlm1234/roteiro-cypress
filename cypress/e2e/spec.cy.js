describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  
  it('Edita uma tarefa existente', () => {
    cy.visit('http://127.0.0.1:7001');
  
    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');
  
    cy.get('.todo-list li')
      .dblclick();
  
    cy.get('.todo-list li.editing .edit')
      .clear()
      .type('TP2 de ES atualizado{enter}');
  
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES atualizado');
  });
  
  
  it('Verifica o contador de tarefas pendentes', () => {
    cy.visit('http://127.0.0.1:7001');
  
    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}')
      .type('Prova de Engenharia de Software{enter}');
  
    cy.get('.todo-count')
      .should('contain', '2 items left');
  
    cy.get('.todo-list li .toggle')
      .first()
      .click();
  
    cy.get('.todo-count')
      .should('contain', '1 item left');
  });
  
  it('Verifica que a lista de tarefas está vazia ao iniciar a aplicação', () => {
    cy.visit('http://127.0.0.1:7001');
  
    cy.get('.todo-list li')
      .should('have.length', 0);
  
    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');
  
    cy.get('.todo-list li')
      .should('have.length', 1);
  });
  
  
});