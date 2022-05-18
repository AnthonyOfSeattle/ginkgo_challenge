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
## Overview

If you would like to learn about how this application was implemented, please read below for
brief overviews of inidividual components.

### 1) React Frontend

The frontend application for Seqsleuth is implemented entirely as a React application which
is webpacked and served to the user. The SearchApp is comprised of two components, the SearchInput
and the SearchHistory. Users interact directly with the SearchInput, which validates DNA sequences
and POSTs to the backend server. The SearchHistory is continuously updated to query job statuses and
results as they become available. Currently, sequence input is limited to well formated DNA sequences
less than or equal to 200 characters long, the latter parameter being specified via the `props`.

While searches in the development setup are much to fast to see the job tracking features,
the SearchApp does allow as many searches to be inputed as the user desires before any of
them are finished. The SearchHistory will monitor these searches and inform the user whether
they have started and how long they have been running.

### 2) Django Backend

The backend functionality of Seqsleuth is entirely handled through REST endpoints under the `/searches/`
resource. When a user POSTs a sequence to `/searches/`, a new search is created and associated with the
user session, and then a celery task is started to handle the search. Search information is returned to
the user while the search runs. A GET request to `/searches/` returns all searches associated with the
user session, along with any results.

The actual searching is handled by the `genomes` module. A GenomeBank class allows querying a string through
every cDNA sequence in its cache. The cache is seeded by issuing the following management command.

```
python manage.py buildgenomebank
```

Currently, the class looks for the environment variable `GENOME_LIST` to know which genomes to download.
This variable is specified in the `.env.*` files.
