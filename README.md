# Projeto Final Raro Academy

## 🎯 Sobre o Projeto
O projeto consiste no desenvolvimento de testes em API, Web e Mobile para o sistema Raromdb. O trabalho foi desenvolvido em grupo com o objetivo de aprimorar as soft skills relacionadas ao trabalho em equipe.

## 🎯 Integrantes do Grupo

| Alana Barbosa | Gabriel Peluzio | Grasiela Mary | Ítalo Renan | Mariana Choratto |
|---|---|---|---|---|
| <img src="img/grasy.jpg" height="100" width="100"> | <img src="img/adriana.jpg" height="100" width="100"> | <img src="img/mariana.jpg" height="100" width="100"> | <img src="img/erika.jpg" height="100" width="100"> | <img src="img/raissa.jpeg" height="100" width="100"> |

### ⚙️ Sites e aplicativos utilizados:
* [Raromdb](https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/)
* [Swagger](https://raromdb-3c39614e42d4.herokuapp.com/swagger)
* Aplicação Mobile: propriedade Raro Academy
* [Trello do grupo 3](https://trello.com/b/eOAQazgq/projeto-final-grupo-03)

## ⚙️ Ferramentas Utilizadas
* Cypress
* Cypress com Cucumber
* Robot Framework
* Allure

## ⚙️ Bibliotecas Utilizadas
* Faker
* Requests Library
* Appium Library
* Collections

## ⚙️ Metodologia
Utilizamos BDD (Behavior Driven Development) com Gherkin para a implementação dos testes front-end. Além disso, os códigos foram escritos seguindo a metodologia de Clean Code.

---

## 📊 Comandos Úteis para Membros do Projeto

1. Para iniciar o trabalho, puxe todas as alterações da branch `main` para sua pasta:
    ```bash
    git pull origin main
    ```

2. **Sempre** verifique em qual branch você está trabalhando.

    ![Branch Check](https://github.com/marianachoratto/academy-qa-trabalho-final-grupo-3/assets/146736051/d619e969-5deb-495e-bdc3-745bd88036b6)

3. Após puxar as atualizações para sua branch, é necessário instalar o Cypress nas pastas web e API. Lembre-se de trocar para o diretório correto no terminal ao fazer a instalação.
    - Para trocar de pasta:
        ```bash
        cd nomeDaPasta
        ```
    - Para voltar à pasta anterior:
        ```bash
        cd ../
        ```

4. Sempre que terminar um teste ou o dia de trabalho, faça um commit com um nome descritivo.

5. Para o Cypress funcionar, é necessário digitar no terminal `npx cypress open` na pasta onde ele está instalado. Certifique-se de estar no diretório correto.
    - Nota: Temos dois Cypress diferentes rodando no mesmo projeto.

6. Durante as dailys, realizaremos os merges.

7. O cartão da tarefa só deve ser movido para "Finalizado" após a revisão de dois colegas.

8. Na revisão, o colega indicará as alterações necessárias e colocará o cartão na seção "Impedimento" no Trello.

9. Nos testes mobile, instale as bibliotecas necessárias com:
    ```bash
    pip install -r requirements.txt
    ```
    - Instale as bibliotecas adicionais:
        ```bash
        pip install robotframework-requests
        pip install setuptools
        pip install robotframework-faker
        ```
