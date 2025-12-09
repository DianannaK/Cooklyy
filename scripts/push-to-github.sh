#!/bin/bash
git remote add origin https://github.com/DianannaK/Cookly.git || git remote set-url origin https://github.com/DianannaK/Cookly.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
