#!/usr/bin/env bash

Platform="unknown";
case "$OSTYPE" in
  cygwin*|msys*)    Platform="WIN" ;;
  linux*)   Platform="LINUX" ;;
  darwin*)  Platform="MAC" ;;
  *)        echo  "unknown: $OSTYPE" ;;
esac

export $(grep -v '^#' .env | xargs)

if [[ $Platform == "WIN" ]]; then
./config/Mongod.bat $DB_Start $DB_Connect $DB_path

elif [[ $Platform == "LINUX" ]]; then
echo "LINUX: Start MongoDB."
echo "Connect to MongoDB."

fi




