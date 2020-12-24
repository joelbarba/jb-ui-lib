#!/usr/bin/env bash

ng build jb-ui-lib-sandbox

ver=$(node -p -e "require('./projects/jb-ui-lib/package.json').version")
echo "Deploying document reference. version = $ver"
cp -r dist/jb-ui-lib-sandbox/* ../doc-jb-ui-lib
cd ../doc-jb-ui-lib
git add -A
git commit -m "jb-ui-lib: $ver"
git push
cd ../jb-ui-lib
