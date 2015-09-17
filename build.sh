#!/bin/bash

SSH_KEY=${1:-/root/.ssh/id_rsa}

[[ ${NPM_TOKEN:-} = '' ]] && { echo "NPM_TOKEN empty"; exit 1; }
[[ ${SAUCE_ACCESS_KEY:-} = '' ]] && { echo "SAUCE_ACCESS_KEY empty"; exit 2; }

docker pull sublimino/node4-base

exec docker run \
    -v "${SSH_KEY}":/root/.ssh/id_rsa \
    -v $(pwd):/code \
    sublimino/node4-base \
    /bin/sh -cx "\
        trap 'chmod 777 node_modules -R' EXIT && \
        cd /code && \
        umask 000 && \
        printf \"@economist:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n\" > ~/.npmrc && \
        npm i && \
        echo SAUCE_USER=sublimino SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} npm t && \
        { git config --global user.email 'ecprod@economist.com'; git config --global user.name 'GoCD'; true; } && \
        { [ \"$(git rev-parse --abbrev-ref HEAD)\" != \"master\" ] || npm run pages; } ; \
        RETURN_CODE=\$?; \
        echo \"Build finished with status \${RETURN_CODE}\"; \
        exit \${RETURN_CODE}
    ";


