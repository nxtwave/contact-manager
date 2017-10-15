#!/usr/bin/env bash
mongoimport --db contacts --collection $2 --drop --file $1.json
