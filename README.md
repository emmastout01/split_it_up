# Split it Up! Cost Sharing Made Simple

Split it Up! is a cost-sharing application that aims to provide housemates with an easy way to track and split up communal house expenses. It allows users to join a house or create an existing house and view a cost dashboard (including a "who still owes what?" table) for their house, as well as a table of all transactions for the month. Users can add, edite, and delete transactions. 


## Built With

AngularJS
Express
Node.js
PostgreSQL
Angular Material
Passport
Moment.js
FileStack API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);

CREATE TABLE "houses" (
	"id" serial primary key,
	"houseName" varchar(80) not null UNIQUE,
	"houseCode" varchar(4), 
	"totalRent" INTEGER,
	"closeOutDate" INTEGER	
);


CREATE TABLE "members" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "users",
	"house_id" integer REFERENCES "houses"	
);
	
CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"categoryName" varchar(60)	
);

CREATE TABLE "transactions" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "users",
	"house_id" integer REFERENCES "houses",
	"date" DATE,
	"amount" INTEGER,
	"category_id" INTEGER REFERENCES "categories",
	"notes" varchar(200),
	"viewReceipt" varchar(80)	
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Emma Stout


## Acknowledgments

* Hat tip to anyone who's code was used
# split_it_up
