#!/bin/bash

# It loops the current directory (or the one provided as first parameter)
# and checks one by one all files starting with "bf-". If enter, it renames the file with "jb-"
# There is an alias on .bashrc, so it can be used when into a directory with just: prefix


prefixIn="bf-"
prefixOut="jb-"

cRed="\033[1;31m"
cGreen="\033[1;32m"
cYellow="\033[1;33m"
cBlue="\033[1;34m"
cMagenta="\033[1;35m"
cCyan="\033[1;36m"
cRes="\033[0m"


if [[ -z "$1" ]]; then
  dir=`pwd`
else
  dir=$1
fi


rename_files () {
  cd $1
  echo -e "Into folder: $1"
  echo ""
  for f in * ; do
    if [[ "$f" == bf-* ]]; then
      tmp=${f#"$prefixIn"}
      d="$prefixOut${tmp}"
      echo -e "$cYellow $f $cRes ---> rename?"
      read x
      if [[ "$x" != "n" ]]; then
        mv $f $d
        f=$d
        echo -e "✓ Renamed ---> $cGreen $d $cRes"
        echo ""
        echo ""
      fi
    fi
    if [[ -d $f ]]; then
      echo -e "$cBlue $f $cRes is a folder. Get in?"
      read x
      if [[ "$x" != "n" ]]; then
        rename_files "$1/$f"
        cd $1
        echo -e "Back to folder: $1"
        echo -e ""
      fi
    fi
  done
}

echo -e "Start scanning $cMagenta $dir $cRes"
echo ""
read x

rename_files $dir

echo "--- END ---"

