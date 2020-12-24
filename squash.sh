#!/usr/bin/env bash

if [[ -z "$1" ]]; then
    echo "How many commits do you want to squash?"
    read count
else
    count=$1
fi

echo ""
echo "pick   c25db72  commit 1 <-- will be 1+2+3"
echo "squash bd83434  commit 2"
echo "squash bd83434  commit 3"
echo ""
echo "In case you need to cancel: git rebase --abort"
echo ""
echo "-----------------------------------------------"

git rebase -i HEAD~${count}
