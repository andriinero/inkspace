<a id="readme-top"></a>

<div align="center">
  <a href="https://github.com/andriinero/inkspace">
    <img src="frontend/public/inkspace-white.png" alt="InkSpace logo" height="180">
  </a>

  <h1>InkSpace</h1>

  <p>
    A full-stack publishing platform built with React, TypeScript, and Spring Boot.
    <br>
    <a href="https://inkspace-an.vercel.app"><strong>View demo</strong></a>
    ·
    <a href="https://github.com/andriinero/inkspace/issues/new">Report a bug</a>
    ·
    <a href="https://github.com/andriinero/inkspace/issues/new">Request a feature</a>
  </p>
</div>

<details>
  <summary>Table of contents</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#built-with">Built with</a></li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#configuration">Configuration</a></li>
    <li><a href="#available-commands">Available commands</a></li>
    <li><a href="#project-structure">Project structure</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About the project

InkSpace is a social publishing application where people can discover and write posts, join discussions, bookmark content, and connect with other authors. This repository contains both parts of the application:

- `frontend/` — the React single-page application
- `backend/` — the Spring Boot REST API and PostgreSQL persistence layer

### Built with

[![TypeScript][typescript-badge]][typescript-url]
[![React][react-badge]][react-url]
[![Redux][redux-badge]][redux-url]
[![Styled Components][styled-components-badge]][styled-components-url]
[![Tailwind CSS][tailwind-badge]][tailwind-url]
[![Vite][vite-badge]][vite-url]
[![Java][java-badge]][java-url]
[![Spring Boot][spring-boot-badge]][spring-boot-url]
[![PostgreSQL][postgresql-badge]][postgresql-url]
[![Gradle][gradle-badge]][gradle-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting started

The frontend and backend run as separate development processes. PostgreSQL can be started with the Compose file included in the backend directory.

### Prerequisites

Install the following tools before continuing:

- [Git](https://git-scm.com/)
- [Node.js 20 or newer](https://nodejs.org/)
- [Java 17](https://adoptium.net/temurin/releases/?version=17)
- [Docker with Docker Compose](https://docs.docker.com/compose/install/)

Gradle does not need to be installed globally because the repository includes the Gradle wrapper.

### Installation

1. Clone the repository and enter the project directory:

   ```sh
   git clone https://github.com/andriinero/inkspace.git
   cd inkspace
   ```

2. Start PostgreSQL:

   ```sh
   cd backend
   docker compose up -d
   docker compose exec db createdb -U user inkspace
   ```

   The `createdb` command is only required the first time the database volume is created.

3. Start the backend from the `backend/` directory:

   ```sh
   ./gradlew bootRun
   ```

   On Windows, run `gradlew.bat bootRun` instead. The API starts at `http://localhost:8080` by default.

4. In another terminal, configure and start the frontend:

   ```sh
   cd frontend
   npm install
   ```

   Create a `.env.local` file in `frontend/` with the local API URL:

   ```dotenv
   VITE_RESTAPI_SERVER_URL=http://localhost:8080
   ```

   Then start the Vite development server:

   ```sh
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Configuration

### Frontend

| Variable                  | Description                    | Default                 |
| ------------------------- | ------------------------------ | ----------------------- |
| `VITE_RESTAPI_SERVER_URL` | Base URL used for API requests | `http://localhost:3000` |

Use `http://localhost:8080` when running the backend included in this repository.

### Backend

| Variable            | Description                 | Default    |
| ------------------- | --------------------------- | ---------- |
| `PORT`              | HTTP server port            | `8080`     |
| `POSTGRES_PORT`     | PostgreSQL port on the host | `5332`     |
| `POSTGRES_USER`     | PostgreSQL username         | `user`     |
| `POSTGRES_PASSWORD` | PostgreSQL password         | `password` |

The development database name is `inkspace`. The default credentials are intended for local development only.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Available commands

Run frontend commands from `frontend/`:

| Command              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start the Vite development server        |
| `npm run build`      | Type-check and create a production build |
| `npm test`           | Run the Vitest suite once                |
| `npm run lint`       | Check the code with ESLint               |
| `npm run type-check` | Run TypeScript without emitting files    |
| `npm run preview`    | Preview the production build locally     |

Run backend commands from `backend/`:

| Command                | Purpose                                |
| ---------------------- | -------------------------------------- |
| `./gradlew bootRun`    | Start the Spring Boot API              |
| `./gradlew test`       | Run the backend test suite             |
| `./gradlew build`      | Compile, test, and package the backend |
| `docker compose up -d` | Start PostgreSQL in the background     |
| `docker compose down`  | Stop the PostgreSQL container          |

## Project structure

```text
inkspace/
├── frontend/               # React and TypeScript client
│   ├── public/             # Static assets
│   └── src/                # Pages, features, components, and application state
├── backend/                # Spring Boot API
│   ├── src/main/java/      # Application source code
│   ├── src/main/resources/ # Runtime configuration
│   └── src/test/           # Backend tests
└── README.md
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "Add an amazing feature"`).
4. Push the branch (`git push origin feature/amazing-feature`).
5. Open a pull request.

For bugs and feature ideas, please use the repository's [issue tracker](https://github.com/andriinero/inkspace/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[react-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://react.dev/
[redux-badge]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux-toolkit.js.org/
[styled-components-badge]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[styled-components-url]: https://styled-components.com/
[tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vite.dev/
[java-badge]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[java-url]: https://www.java.com/
[spring-boot-badge]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[spring-boot-url]: https://spring.io/projects/spring-boot
[postgresql-badge]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[gradle-badge]: https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white
[gradle-url]: https://gradle.org/
