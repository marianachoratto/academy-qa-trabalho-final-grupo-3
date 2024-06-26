describe("Testes de Avaliação de Filme", function () {
  
  it("Usuário sem autenticação não deve conseguir fazer review de filme", function () {
    cy.request({
      method: "POST",
      url: "/api/users/review",
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.equal(401);
      expect(resposta.body.error).to.equal("Unauthorized");
      expect(resposta.body.message).to.equal("Access denied.");
    });
  });

  describe("Testes de avaliação de filmes com sucesso", function () {
    let userData;
    let token;
    let movieId;

    beforeEach(function () {
      cy.cadastrarUsuario().then(function (resposta) {
        userData = resposta;
        cy.criarFilmeAdm(userData.email, userData.password).then(function (
          resposta
        ) {
          movieId = resposta.id;
          token = resposta.token;
        });
      });
    });

    afterEach(function () {
      cy.deletarFilme(movieId, token);
      cy.excluirUsuario(userData.id, token);
    });

    it("O usuário logado deve conseguir fazer uma avaliação de filme", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 5,
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
        },
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });

    it("A avaliação de filme deve entrar imediatamente no filme avaliado", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 5,
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
        },
      }).then(function (resposta) {
          expect(resposta.status).to.equal(201);
        }).then(function () {
          cy.request({
            method: "GET",
            url: `/api/movies/${movieId}`,
            auth: {
              bearer: token,
            },
          }).then(function (resposta) {
            expect(resposta.body.id).to.equal(movieId);
            expect(resposta.body.reviews[0].reviewText).to.equal(
              "Filme muito bom. Vale a pena o ingresso!"
            );
            expect(resposta.body.reviews[0].score).to.equal(5);
          });
        });
    });

   
    it("Deve ser possível fazer avaliação de filme sem texto", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 5,
          reviewText: null,
        },
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });

    it("Não deve ser criada uma segunda avaliação de filme se o usuário mudar o comentário", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 5,
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
        },
      }).then(function (resposta) {
          expect(resposta.status).to.equal(201);
        }).then(function () {
          cy.request({
            method: "POST",
            url: "/api/users/review",
            auth: {
              bearer: token,
            },
            body: {
              movieId: movieId,
              score: 2,
              reviewText: "O filme não é muito bom.",
            },
          }).then(function (resposta) {
            expect(resposta.status).to.equal(201);
          }).then(function () {
            cy.request({
              method: "GET",
              url: `/api/movies/${movieId}`,
              auth: {
                bearer: token,
              },
            }).then(function (resposta) {
              expect(resposta.body.id).to.equal(movieId);
              expect(resposta.body.reviews).to.have.length(1);
              expect(resposta.body.reviews[0].reviewText).to.equal("O filme não é muito bom.");
              expect(resposta.body.reviews[0].score).to.equal(2);
              expect(resposta.body.reviews).to.not.contain("Filme muito bom. Vale a pena o ingresso!");
            });
          });
        });
    });

    it("Deve ser possível criar uma review de filmes de até 500 caracteres", function () {
      let review = "";
      for (let index = 0; index <= 499; index++) {
        review += "a";
      }

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 5,
          reviewText: review,
        },
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });
  });

  describe("Testes de avaliação de filmes com falha", function () {
    let userData;
    let token;
    let movieId;

    beforeEach(function () {
      cy.cadastrarUsuario().then(function (resposta) {
        userData = resposta;
        cy.criarFilmeAdm(userData.email, userData.password).then(function (
          resposta
        ) {
          movieId = resposta.id;
          token = resposta.token;
        });
      });
    });

    afterEach(function () {
      cy.excluirUsuario(userData.id, token);
    });

    it("Não deve ser possível criar review com mais de 500 caracteres", function () {
      let review = "";
      for (let index = 0; index <= 500; index++) {
        review += "a";
      }

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 5,
          reviewText: review,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message[0]).to.equal(
          "reviewText must be shorter than or equal to 500 characters"
        );
      });
    });

    it("Não deve ser possível fazer avaliação de filme sem atribuir nota", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message[0]).to.equal(
          "score must be a number conforming to the specified constraints"
        );
        expect(resposta.body.message[1]).to.equal("score should not be empty");
      });
    });

    it("Não deve ser possível fazer avaliação de filme sem id", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
          score: 5,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message[0]).to.equal(
          "movieId must be an integer number"
        );
        expect(resposta.body.message[1]).to.equal(
          "movieId should not be empty"
        );
      });
    });

    it("Não deve ser possível fazer avaliação de filme com espaço no lugar de id", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: " ",
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
          score: 5,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message[0]).to.equal(
          "movieId must be an integer number"
        );
      });
    });

  
    it("Não deve ser possível criar review de filme com notas decimais", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 3.5,
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message[0]).to.equal(
          "reviewText must be shorter than or equal to 500 characters"
        );
      });
    });

    it("Não deve ser possível dar nota maior que 5 para um filme", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 6,
          reviewText: "Filme muito bom. Vale a pena o ingresso!",
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.equal(
          "Score should be between 1 and 5"
        );
      });
    });

    
    it("Não deve ser possível dar nota menor que 1 para um filme", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: {
          movieId: movieId,
          score: 0.5,
          reviewText: "Filme ruim!",
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.equal(
          "Score should be between 1 and 5"
        );
      });
    });
  });
});
