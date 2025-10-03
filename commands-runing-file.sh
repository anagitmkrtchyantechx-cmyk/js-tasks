#This file shows how start DB server, backend server runing
sudo apt install curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash

export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 18
nvm use 18
node -v
npm -v

npm install express body-parser redis cors

node server.js

