const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose');

const dburl = "mongodb+srv://user3:user3@cluster0-fetd1.mongodb.net/tshot";
// let db;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const teasRouter = require('./routes/teaRoute');
const shopRoute = require('./routes/shopRoute');
const blogRouter = require('./routes/blogRoute');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

app.use(async (req, res, next) => {
	const dburl = "mongodb+srv://" + process.env.dbname + ":" + process.env.dbpass + "@cluster0-fetd1.mongodb.net/tshot";
	try {
		if (!db) {
			await MongoClient.connect(dburl, { promiseLibrary: Promise })
				.catch(err => {
					console.error(err.stack);
					return next(err);
				})
				.then(client => {
					console.log("Db connection successful");
					db = client.db();
				});
		}
		req.db = db;
		next();
	} catch (e) {
		next(e);
	}
});

// mongoose.connect("mongodb+srv://user3:user3@cluster0-fetd1.mongodb.net/tshot")
// 	.then(()=>{
// 		console.log('Database successfully connected.');
// 	})
// 	.catch((err)=>{
// 		console.log('Database connection failed.');
// 		console.log(err);
// 	});

app.use('/', indexRouter);
app.use('/api/teas', teasRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRoute);
app.use('/blog', blogRouter)
app.use('/user', usersRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	console.error(err);
	res.send(err);
});

module.exports = app;
