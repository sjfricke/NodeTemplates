# Mongo Basic

This is designed for someone who needs a simple backend API to take HTTP request and interact with MongoDB

## How to run

1. Open terminal and `cd` to the directory
2. run `npm install`
3. make sure your `mongod` is up and running or it will crash on startup
4. run `node server.js`

## How to use

If you have an application you just need to point it to the URL of this machine and add the port.

> Example: http://localhost:9000

[Postman](https://www.getpostman.com/) is a tool used to call HTTP Request and see the response. This will be used to test that our server is correctly handling all various HTTP Request.

### Demo

Run these HTTP request to see the API work

- First add some books
	- `POST http://localhost:9000/api/book/  {"title" : "Book 1", "author" : "Allen", "rating" : 3.2}`
	- `POST http://localhost:9000/api/book/  {"title" : "Book 2", "author" : "Bob", "rating" : 2.0}`
	- `POST http://localhost:9000/api/book/  {"title" : "Book 3", "author" : "Carl", "rating" : 4.6}`
- Search for all authors in database
	 `GET http://localhost:9000/api/book/authors/all`
- Search for books with ratings better then 4.0
	- `GET http://localhost:9000/api/book/rating/4`
- Update the rating of Book 1
    - `POST http://localhost:9000/api/book/  {"id" : < insert book 1 _id here >, "rating" : 4.2}`
- Search for books with ratings better then 4.0 again now
	- `GET http://localhost:9000/api/book/rating/4`
- Delete Carls book
    - `DELETE http://localhost:9000/api/book/<insert book 3 _id here >`