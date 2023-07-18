set -e

npm run build

cd dist

git init
git checkout -b MAIN
git add -A
git commit -M "deploy"

git push -f git@github.com:fran804/react-note-app.git main:gh-pages