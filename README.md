# Blogs

Offical repo of Blogs, made by Technobyte.

## Installation

1. clone the repo after forking it

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

2. Install the dependencies

go to the client and server folder and run `npm install`

```bash
cd client # or cd server
npm install
```

OR RUN

```bash
npm run install:all
```

3. Create a `.env` file in the server folder and add the following

```bash
cp .env.example .env
```

And add all required environment variables in the `.env` file

> [!Tip]
> You can get the `MONGODB_URI` from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
> 
> OR
>
> If you have MongoDB installed locally, you can set the `MONGODB_URI` to `mongodb://localhost:27017/<database-name>`
>
> OR
>
> Run `docker compose up -d` to start a MongoDB container and set the `MONGODB_URI` to `mongodb://localhost:27017/<database-name>

4. Run the project

go to the client and server folder and run `npm start`

```bash
cd client # or cd server
npm dev
```

OR RUN

```bash
npm run dev:all
```

## How to contribute?

Visit the [CONTRIBUTING.md](CONTRIBUTING.md) file to know how to contribute to this repository.

## Tech Stack

- React
- Node.js
- Express
- MongoDB

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
