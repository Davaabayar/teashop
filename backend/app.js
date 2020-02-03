const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
// const dburl = "mongodb://mongodb+srv://user3:user3@cluster0-fetd1.mongodb.net/test";
const dburl = "mongodb+srv://user3:user3@cluster0-fetd1.mongodb.net/tshot";
// const dburl = "mongodb://localhost/lab14";
let db;

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const teasRouter = require('./routes/teaRoute');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(async (req, res, next) => {
	try {
		if (!db) {
			await MongoClient.connect(dburl, {promiseLibrary: Promise})
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
});*/

mongoose.connect("mongodb+srv://user3:user3@cluster0-fetd1.mongodb.net/tshot")
	.then(()=>{
		console.log('Database successfully connected.');
	})
	.catch((err)=>{
		console.log('Database connection failed.');
		console.log(err);
	});

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/teas',teasRouter);

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
