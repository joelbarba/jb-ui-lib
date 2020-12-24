#!/usr/bin/env bash

# Check git status
if output=$(git status --porcelain) && [[ -z "$output" ]]; then
    echo "Git repository clean"
else
    echo ""
    git status
    echo ""
    echo "ALERT!!! The repository is not clean. You should commit your last changes to set a label. Proceed anyway?"
    read x
fi


echo ""
echo "What is the name for the new component? (camelCase):"
read ccName;                                             # ccName = jbLabel
CcName=`echo "$ccName" | sed -e "s/\b\(.\)/\u\1/g"`      # CcName = JbLabel     -> Camel Case starting with Uppercase
vName=`echo $ccName | sed -e 's/\([A-Z]\)/-\L\1/g'`      # vName  = jb-label    -> Hypens all lowercase
wName=`echo $ccName"Demo"`                               # wName  = jbLabelDemo -> Camel case sufixed (wrapper comp)

echo ""
echo "Creating component ------> $ccName / <$vName> ?"
echo ""
read x

echo ""
ng generate component $ccName --project=jb-ui-lib --module=jb-ui-lib

# Injects component export from lib module: @NgModule({ exports: [ NewComp, ... ]
libModFile="projects/jb-ui-lib/src/lib/jb-ui-lib.module.ts"
echo ""
echo "Export new component from lib modile ($libModFile):"
awk -v compName="$CcName" '{ print $0 } { if ($1 == "exports:") { print "    " compName "Component,  // <--- New component" } }' $libModFile > temp.tmp 
mv temp.tmp $libModFile
# cat $libModFile
# echo ""

# Export the new component from public_api.ts
echo ""
echo "Adding export in public_api.ts"
apiExportFile="projects/jb-ui-lib/src/public_api.ts"
cat $apiExportFile > temp.tmp
echo "export * from './lib/"$vName"/"$vName".component';" >> temp.tmp
mv temp.tmp $apiExportFile



 # ------ Demo Wrapper into Sandbox: ------------

ng generate component $wName --project=jb-ui-lib-sandbox

# Add template to the HTML demo wrapper of the sandbox (-demo.component.html)
wViewFile="projects/jb-ui-lib-sandbox/src/app/"$vName"-demo/"$vName"-demo.component.html"
echo ""
echo "Templating sandbox instance to test the component ---> $wViewFile"
sed "s/\[\[COMPONENT_NAME\]\]/$vName/g" demo-comp.html.template > $wViewFile

# Add template to the TS demo wrapper  of the sandbox (-demo.component.html)
wTsFile="projects/jb-ui-lib-sandbox/src/app/"$vName"-demo/"$vName"-demo.component.ts"
echo ""
echo "Templating sandbox instance to test the component ---> $wTsFile"
sed "s/\[\[COMPONENT_NAME\]\]/$vName/g" demo-comp.ts.template > $wTsFile
sed -i "s/\[\[COMPONENT_NAME_CAMEL\]\]/$CcName/g" $wTsFile


# Add the new component to lib-register.service
echo ""
echo "Adding the new component to the list of lib-register"
libServiceFile="projects/jb-ui-lib-sandbox/src/app/lib-register.service.ts"
awk -v CcName="$CcName" -v vName="$vName" -v q="'" '{ 
    if (NR == 1) { print "import { " CcName "Doc } from " q "./" vName "-demo/" vName "-demo.component" q ";" }
    { print $0 }
    { if ($1 == "export" && $3 == "compList") { print "  " CcName "Doc," } }
  }' $libServiceFile > temp.tmp
mv temp.tmp $libServiceFile




echo ""
echo ""
echo "----- Done -----"
echo ""
