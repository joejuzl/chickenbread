echo "kill stuff"
sudo pkill mongod &
pkill node
wait
echo "start mongodb"
sudo mongod &
echo "wait a bit"
sleep 3s
echo "start back-end server"
nodemon --watch server.js &
echo "start front-end server"
grunt serve 