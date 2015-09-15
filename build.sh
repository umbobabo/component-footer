#!/bin/bash

SSH_KEY=${1:-/root/.ssh/id_rsa_deploy}

exec docker run \
    -v "${SSH_KEY}":/root/.ssh/id_rsa \
    -v $(pwd):/code \
    mhart/alpine-node \
    /bin/sh -c "\
        cd /code && \
        NPM_TOKEN=${NPM_TOKEN} npm i --unsafe-perm && \
        SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} npm t && \
        { [[ \"$(git rev-parse --abbrev-ref HEAD)\" == \"master\" ]] && npm run pages; } \
    ";

