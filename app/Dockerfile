########################
# Stage 0: React Build #
########################

FROM node:18-alpine as react-build

# set working directory
WORKDIR /app/frontend

# install dependencies
COPY ./frontend/package.json .
RUN npm install

# copy project and build
COPY ./frontend/ .
RUN npm run build

#########################
# Stage 1: Django Build #
#########################

FROM python:3.9.6-alpine

# set working directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev g++ python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN chmod +x /usr/src/app/entrypoint.sh

# copy project
COPY . .

# copy compiled react app
COPY --from=react-build /app/frontend/static/frontend/main.js ./frontend/static/frontend/

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
