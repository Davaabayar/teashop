const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
let db;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const teasRouter = require('./routes/teaRoute');
const shopRoute = require('./routes/shopRoute');
const blogRouter = require('./routes/blogRoute');
const uploadRouter = require('./routes/uploadRoute');

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
					db.collection("shops").createIndex({location:'2dsphere'});
				});
		}
		req.db = db;
		next();
	} catch (e) {
		next(e);
	}
});

function tokenCheck(req, res, next) {
	let bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ");
		req.token = bearer[1];
		let token = bearer[1];
		jwt.verify(token, process.env.privateKey, function (err, decoded) {
			if (err) res.status(400).send(err);
			else {
				req.decoded = decoded;
				return next();
			}
		});
	} else {
		res.send(403);
	}
}
app.use('/', indexRouter);
app.use('/api/teas', teasRouter);
app.use('/users', usersRouter);
app.use('/api/shop', shopRoute);
app.use('/api/blog', blogRouter);
app.use('/user', usersRouter);
app.use('/api/upload', uploadRouter);
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
