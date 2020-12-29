#!/usr/bin/env bash

# Use "sh publish.sh Y" to accept all defaults and run the script without stops
allYes=$1
if [[ "$allYes" != "y" ]]; then
    echo "#########################################################"
    echo "#       Running with no stops - Yes All mode            #"
    echo "#########################################################"
fi

# Check git status
if output=$(git status --porcelain) && [[ -z "$output" ]]; then
    echo " --> GIT: Working directory clean. Ok"
else
    echo ""
    git status
    echo ""
    echo "ALERT!!! The repository is not clean. You should commit your last changes to set a label. Proceed anyway?"
    read x
fi

# Version-ing
prevPkgVer=`cat projects/jb-ui-lib/package.json | grep version | cut -d"\"" -f 4`
echo "Increment version:"
npm run version_up
currPkgVer=`cat projects/jb-ui-lib/package.json | grep version | cut -d"\"" -f 4`
echo ""
echo "Going from version $prevPkgVer --- to ---> $currPkgVer ?"
echo "Is that ok? If not, type the version (it will update projects/jb-ui-lib/package.json)"
if [[ "$allYes" != "y" ]]; then read x; else x=""; fi
if [[ "$x" != "" ]]; then
    cd projects/jb-ui-lib/
    npm version ${x}
    cd ../..
fi

lastCommitHash=`git log -1 --pretty=%h`
lastCommitMsg=`git log -1 --pretty=%s`
#echo ""
#echo "Do you want to squash the version change in 'package.json' into the last commit before you publish:"
#echo ""
#echo "     #$lastCommitHash : $lastCommitMsg"
#echo ""
#echo "(Enter=Yes, anything else=No)"
#if [[ "$allYes" != "y" ]]; then read x; else x=""; fi
#if [[ "$x" = "" ]]; then
#    git add -A
#    git commit --fixup ${lastCommitHash}
#    export GIT_EDITOR=true
#    git rebase --autosquash -i HEAD~2
#    export GIT_EDITOR=false
#    echo "-- Version change squashed into last commit --"
#    git log -1
#fi


# Packing
echo ""
echo "Generate library:"
npm run pack_all


# Publishing
echo ""
echo "Login into NPM register"
echo "(Enter=Use Joel's credentials, anything else=Your own NPM user)"
if [[ "$allYes" != "y" ]]; then read x; else x=""; fi
if [[ "$x" = "" ]]; then
    npmPass=`cat .npm_credentials.txt`
    npm-cli-login -u joel.barba -p ${npmPass} -e joel.barba.vidal@gmail.com  # You need:  npm install -g npm-cli-login
    npm whoami
else
    npm login
fi


pkgVer=`cat dist/jb-ui-lib/package.json | grep version | cut -d"\"" -f 4`
pkgTar="./dist/jb-ui-lib/jb-ui-lib-$pkgVer.tgz"
echo ""
echo "Publish the library (version $pkgVer) Tar File: $pkgTar"
npm publish ${pkgTar}

echo ""
echo "Do you want to commit the package.json ---> $pkgVer (Enter=Yes, anything else=No)"
echo ""
if [[ "$allYes" != "y" ]]; then read x; else x=""; fi
if [[ "$x" = "" ]]; then
    git add -A
    git commit -m "Publish $pkgVer"
    git log -1
fi

echo ""
echo "Do you want to deploy the doc reference? (Enter=Yes, anything else=No)"
echo ""
if [[ "$allYes" != "y" ]]; then read x; else x=""; fi
if [[ "$x" = "" ]]; then
    sh update_doc.sh
fi
