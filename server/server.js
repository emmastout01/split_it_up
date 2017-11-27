var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var houseRouter = require('./routes/house.router');
var memberRouter = require('./routes/member.router');
var userHouseRouter = require('./routes/userHouse.router');
var transactionRouter = require('./routes/transaction.router');
var currentHouseRouter = require('./routes/currentHouse.router');
var categoryRouter = require('./routes/category.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/house', houseRouter);
app.use('/member', memberRouter);
app.use('/userHouse', userHouseRouter);
app.use('/transaction', transactionRouter);
app.use('/currentHouse', currentHouseRouter);
app.use('/category', categoryRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
