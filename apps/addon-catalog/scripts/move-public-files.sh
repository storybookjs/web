#!/bin/bash

if [[ -n $NEXT_PUBLIC_BASE_PATH ]]; then
  DIRECTORY=${NEXT_PUBLIC_BASE_PATH/\//''}
  cd public
  mkdir $DIRECTORY
  mv * $DIRECTORY || echo "move public files to /$DIRECTORY";
  # mv $DIRECTORY/_headers .
  # mv $DIRECTORY/_redirects .
  # mv $DIRECTORY/robots.txt .
  # mv $DIRECTORY/404.html .
fi