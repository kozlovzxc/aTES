#!/bin/bash

docker-compose -f "apps/$1/docker-compose.yml" -f "apps/$1/docker-compose.dev.yml" up --build