const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/userRouter');
const toursRouter = require('./routes/toursRouter');
const contentRouter = require('./routes/contentRouter');
const commentRouter = require('./routes/commentRouter');
const paymentRouter = require('./routes/paymentRouter');
const orderRouter = require('./routes/orderRouter');
const personalPageRouter = require('./routes/PersonalPageRouter');
const resetRouter = require('./routes/resetRouter');
const newPasswordRouter = require('./routes/newPasswordRouter')
const adminRouter = require('./routes/adminRourer')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const { request } = require('http');
const FileStore = require('session-file-store')(session);

app.use(express.static(path.join(process.cwd(), 'public')));

const sessionConfig = {
  name: 'Cookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

const corsOptions = {
  origin: [`http://localhost:${process.env.CLIENT_PORT}`],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/payment', paymentRouter);
app.use('/comments', commentRouter);
app.use('/content', contentRouter);
app.use('/tours', toursRouter);
app.use('/profile', personalPageRouter);
app.use('/reset', resetRouter)
app.use('/newPassword', newPasswordRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
