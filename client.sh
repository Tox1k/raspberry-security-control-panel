rm server/public/*
cd server/public
touch .gitkeep
git clone https://github.com/Tox1k/rscp-client.git
cd rscp-client
npm i
npm run build
mv dist/* ../
cd ..
rm -Rf rscp-client
