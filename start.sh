echo "kill stuff"
sudo pkill -9 mongod &
pkill node
wait
echo "start mongodb"
sudo mongod &
echo "wait a bit"
sleep 3s
echo "start back-end server"
node server.js &
echo "start front-end server"
grunt serve 