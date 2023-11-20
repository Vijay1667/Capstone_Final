# Capstone_Final![Untitled-2023-10-17-1655](https://github.com/Vijay1667/Capstone_Final/assets/95224492/092b965c-e557-4e9c-9d2b-ab5ce54a8577)
# Project Setup
```
> mongod --port 27011 --dbpath "your 1st db path" --bind_ip 127.0.0.1 --replSet myReplSet
> mongod --port 27012 --dbpath "your 2nd db path" --bind_ip 127.0.0.1 --replSet myReplSet
```
Configure replication in mongodb
```
> mongosh --port 27012
> rs.initiate({_id: "myReplSet", members: [ { id: 0, host: "localhost:27012" }, { id: 1, host: "localhost:27011"}] } )
```

#### Setting up Flask ML Model

```
> cd servers
> waitress-serve --host 127.0.0.1 model4:app
```
#### Setting up express.js servers
```
> npm run mongo1
> npm run mongo2
> npm run mongo3
> npm run mongo4
```
### Setup nginx config (use the conf file uploaded)
```
> navigate to nginx folder
> start nginx
```
### Start frondend
```
> cd frontend
> npm start
```
