const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const dburl = "mongodb://localhost:27017/users";
let db;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blogRoute');

const app = express();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogRouter)

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
