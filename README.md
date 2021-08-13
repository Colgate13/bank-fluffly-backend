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
- **`POST /users`**: A rota deve receber `name`, `email`, `password`  e `keyFree` O keyFree será usado para outros usuarios enviarem dinheiro para essa accont, dentro do corpo da requisição :
```json
{
	"name": "Gabriel Barros",
	"email": "gabreilbarros13@gmail.com",
	"password": "+5563984678935",
  "keyFree": "181818"
}
```

- **`POST /sessions`**: A rota deve receber  `email` e `password` dentro do corpo da requisição, Ela retora um Token :

```json
{
	"email": "Gabriel@hotmail.com",
	"password": "84656505"
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
Authorization Bearer `token retornado na rota sessions` 
```
- **`POST /acconts/withdraw`**: A rota deve receber  `passwordAccont`e `value`, sacando valores da accont, podemos escolher qualquer valor :

```json
{
	"passwordAccont": "1305", 
	"value": 100
}
headers: 
name          value         
Authorization Bearer `token retornado na rota sessions` 
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
Authorization Bearer `token retornado na rota sessions` 
```


## License

MIT [LICENSE](LICENSE.md)
