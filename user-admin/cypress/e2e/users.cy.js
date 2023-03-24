describe("User CRUD Operations", () => {

    beforeEach(() => {
      cy.task("db:erase");
      cy.visit("http://localhost:3000");
    });

    describe("Listagem de Usuários", () => {
      it("Validar que a mensagem 'No users yet.' é exibido quando não existir nenhum usuário no banco de dados", () => {
        cy.contains("No User yet.");
      });
  
      it("Validar se um usuário está sendo listado", () => {
        cy.task("db:create:user", {
          name: "Mateus Maia",
          email: "mateusmaia@gmail.com",
          password: "123456",
        });
  
        cy.contains("Mateus Maia");
        cy.contains("mateusmaia@gmail.com");
        cy.contains("123456");
      });
    });
    describe("Criar um novo usuário", () => {

      it("Validar a criação de um novo usuário no banco de dados (este cenário deve considerar o preenchimento do formulário de cadastro e depois clicar no botão 'Save')", () => {
        cy.get(".RaCreateButton-root").click();
        cy.get("#name").type("Mateus Felipe da Silva Maia");
        cy.get("#email").type("mateusmaia@gmail.com");
        cy.get("#password").type("654321");
        cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
        cy.get("#password").type("{enter}");
  
        cy.contains("Element created");
        cy.contains("Mateus Felipe da Silva Maia");
        cy.contains("mateusmaia@gmail.com");
        cy.contains("654321");
      });
  
      it("Validar a criação de um novo usuário no banco de dados (este cenário deve considerar o preenchimento do formulário de cadastro e depois apertar 'Enter' para enviar os dados))", () => {
        cy.get(".RaCreateButton-root").click();
        cy.get("#name").type("Mateus Felipe da Silva Maia");
        cy.get("#email").type("mateusmaia@gmail.com");
        cy.get("#password").type("654321");
        cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
        cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();
  
        cy.contains("Element created");
        cy.contains("Mateus Felipe da Silva Maia");
        cy.contains("mateusmaia@gmail.com");
        cy.contains("654321");
      });
    });
    describe("Editar um usuário", () => {

      it("Validar a edição de um usuário existente no banco de dados", () => {
        cy.task("db:create:user", {
          name: "Bille Jow",
          email: "billiejow@gmail.com",
          password: "petisco",
        });
  
        cy.visit("http://localhost:3000");
  
        cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();
  
        cy.get("#name").clear().type("Bille Joe");
        cy.get("#email").clear().type("billejoe@gmail.com");
        cy.get("#password").clear().type("petisco123");
  
        cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();
  
        cy.contains("Element updated");
  
        cy.contains("Bille Joe");
      });
  
      it("Cancelar a edição de um usuário depois de preencher o formulário e clicar no botão 'Save'", () => {

        cy.task("db:create:user", {
          name: "Bille Jow",
          email: "billiejow@gmail.com",
          password: "petisco",
        });
  
        cy.visit("http://localhost:3000");
  
        cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();
  
        cy.get("#name").clear().type("Bille Joe");
        cy.get("#email").clear().type("billejoe@gmail.com");
        cy.get("#password").clear().type("petisco123");
  
        cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();
  
        cy.contains("Element updated");
  
        cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();
  
        cy.contains("Bille Jow");
      });
    });
    describe("Remover um usuário", () => {

      it("Validar a remoção de um usuário no banco de dados", () => {
        cy.task("db:create:user", {
          name: "Mateus Maia",
          email: "mateusmaia@gmail.com",
          password: "123456",
        });
  
        cy.contains("Mateus Maia");
        cy.contains("mateusmaia@gmail.com");
        cy.contains("123456");
  
        cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();
  
        cy.get(".MuiButton-text").click();
  
        cy.contains("Element deleted");
        cy.contains("No User yet.");
      });
  
      it.only("Desfazer a remoção do usuario após deletar", () => {

        cy.task("db:create:user", {
          name: "Mateus Maia",
          email: "mateusmaia@gmail.com",
          password: "123456",
        });
  
        cy.contains("Mateus Maia");
        cy.contains("mateusmaia@gmail.com");
        cy.contains("123456");
  
        cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();
  
        cy.get(".MuiButton-text").click();
  
        cy.contains("Element deleted");
  
        cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();
  
        cy.contains("Mateus Maia");
      });
    });
  });