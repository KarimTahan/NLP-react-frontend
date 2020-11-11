#!/bin/bash

docker build -t ui .
docker run -p 3000:3000 -it -d --rm ui
