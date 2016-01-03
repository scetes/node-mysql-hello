apt-get update
apt-get install -y nodejs npm git git-core

rm -rf node-mysql-hello; true

#comment the following if pulling from local fs instead of github
git clone git://github.com/scetes/node-mysql-hello

# install node modules  as defined in package.json
cd node-mysql-hello ;npm install
