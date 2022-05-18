# Ginkgo Bioworks' Backend Coding Challenge

Welcome to the repository for **Seqsleuth**, a sequence search application and my submission
for Ginkgo Bioworks' Backend Coding Challenge. The application is comprised of a React frontend
with a Django server to handle submission of searches and querying results.

## Setup

Development setup can be ran completely through docker compose with modern versions of docker.
Clone the repository and run the following command to start the development server at,
http://localhost:8000/.

```
docker compose up -d --build
```

This will build the images, deploy, and then build a test repository of sequences to search.
Building the test repository for the first time can take a minute or so, so please run the
following command to see progress. When you see 'Starting development server...', you are
good to go.

```
docker compose logs app
```

The project can then be torn down (including volumes) with the command.

```
docker compose down -v
```
