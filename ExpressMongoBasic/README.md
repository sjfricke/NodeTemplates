# Express Mongo Basic

This template is greate for a simple web application for pulling up a website and having it get data from the MongoDB to the webpage

## How to run

1. Open terminal and `cd` to the directory
2. run `npm install`
3. make sure your `mongod` is up and running or it will crash on startup
4. run `node server.js`

## How to use

* Go to `http://localhost:9000/` for static page
* Go to `http://localhost:9000/color/red` for a red background page
	* You can put any color inplace for `red`, try `color/blue`
* Make a post request to `http://localhost:9000/count/start` to insert a counter into your MongoDB
	* Download the Postman chrome extension!