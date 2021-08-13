#!/bin/bash
echo Please enter your podcast XML url:
read PODCASTURL
touch .env
echo "PODCASTURL=$PODCASTURL" > .env
echo Great!