<h1 align="center">Bank-fluffly-backend</h1>

<p align="center">
  <a href="#technologies-">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation-and-run">Installation and run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage-programs">Usage programs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#apirestfull-documentation">ApiRestFull documentation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;

</p>

<br>

## Technologies 🐱‍🏍🎂
- yarn and npm
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [bcryptjs](https://preview.npmjs.com/package/bcryptjs/v/1.0.1)
- [JWT](https://jwt.io/)
- [Eslint](https://eslint.org/)



## 💻 Project

It is a project to practice. A bank can create a user account, deposit, withdraw and make transactions for other accounts
## Installation and run

```yarn 
git clone https://github.com/Colgate13/bank-fluffly-backend.git
yarn 
yarn typeorm migration:run
yarn dev
$ > Server is running in 3131!
```

## Usage programs

For conteiner in DataBase -> install   [Docker](https://www.docker.com/)

For send JSON and request's ->  install  [insomnia](https://insomnia.rest/)

For acess SQLlite(Data base) -> install  [DBeaver](https://dbeaver.io/)


## ApiRestFull documentation 
- **`POST /users`**: A rota deve receber `name`, `email` e `password` dentro do corpo da requisição :
```json
{
	"name": "Gabriel Barros",
	"email": "gabreilbarros13@gmail.com",
	"password": "+5563984678935"
}
```

- **`GET /users/listAll`**: Essa rota deve retornar todos os usuarios cadastrados, ROTA PARA TESTES, NÃO VAI EM PRODUÇÃO!!!, ela deve receber esse json no corpo da requisição para listar 

```json 
{
	"token": "123456789", 
	"password": "84656505",
	"id": "souAdmin"
}
```
- **`POST /sessions`**: A rota deve receber  `email` e `password` dentro do corpo da requisição, Ela retora um Token :

```json
{
	"email": "Gabriel@hotmail.com",
	"password": "84656505"
}
```
- **`POST /acconts/create`**: A rota deve receber  `password`, `interKey` e `keyFree` dentro do corpo da requisição, O keyFree será usado para outros usuarios enviarem dinheiro para essa accont, password vai ser necessario para realizar depositos, retiradas e transações :

```json
{
	"password": "1305", 
	"interKey": "84656505", 
	"keyFree": "84656505"
}
```
- **`GET acconts/listAll`**: Essa rota deve retornar todas as contas abertas, ROTA PARA TESTES, NÃO VAI EM PRODUÇÃO!!!, ela deve receber esse json no corpo da requisição para listar 

```json
{
	"token": "123456789", 
	"password": "84656505",
	"id": "souAdmin"
}
```
- **`POST /acconts/deposity`**: A rota deve receber  `passwordAccont`e `value`, depositando valores na accont, podemos escolher qualquer valor :

```json
{
	"passwordAccont": "1305", 
	"value": 100
}
headers: 
name          value         
Authorization Bearer `token retornada na rota sessions` 
```
- **`POST /acconts/withdraw`**: A rota deve receber  `passwordAccont`e `value`, sacando valores da accont, podemos escolher qualquer valor :

```json
{
	"passwordAccont": "1305", 
	"value": 100
}
headers: 
name          value         
Authorization Bearer `token retornada na rota sessions` 
```
- **`GET /acconts/listAllInternalmovement `**: Essa rota deve retornar todas os depositos e saques, depositos são do tipo `true` e saques do tipo `false`  , ROTA PARA TESTES, NÃO VAI EM PRODUÇÃO!!!, ela deve receber esse json no corpo da requisição para listar 

```json PRECISA SER essa request para listar
{
	"token": "123456789", 
	"password": "84656505",
	"id": "souAdmin"
}
```

- **`POST /acconts/transactions`**: A rota deve receber  `keyFree`,`password`, `value`, `message`  transferido o value para o accont que tiver a KeyFree indicada:

```json
{
 "keyFree": "78910",
	"password": "1305", 
	"value": 100000000,
	"message": "Transferindo O seu salario do mês"
}
headers: 
name          value         
Authorization Bearer `token retornada na rota sessions` 
```

- **`GET /acconts/listAllTransactions  `**: Essa rota deve retornar todas as transações entre as contas, no retorno sender_keyFree é a keyFree que enviou o dinheiro, addressee_keyFree é a keyFree  que recebeu o dinheiro  , ROTA PARA TESTES, NÃO VAI EM PRODUÇÃO!!!, ela deve receber esse json no corpo da requisição para listar 

```json PRECISA SER essa request para listar
{
	"token": "123456789", 
	"password": "84656505",
	"id": "souAdmin"
}
## License

MIT [LICENSE](LICENSE.md)
