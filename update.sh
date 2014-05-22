#!/bin/bash
pushd "$(dirname "$0")"
git pull
npm install
grunt
popd
