# Capstone Project
# AI Scrutiny
![software_arch](https://github.com/Vijay1667/Capstone_Final/assets/95224492/caadaa9e-83cc-4c93-8b8a-a87efe3e61b4)

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
## Demo



https://github.com/Vijay1667/Capstone_Final/assets/95224492/1b5b0891-8ec9-4277-9055-10909cf4f489

