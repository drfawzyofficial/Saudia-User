/*@ here we include express-framework @*/
const express = require('express');
const app = express();
/*@ here we include express-framework @*/

/*@ Socket Working @*/
const http = require("http").Server(app);
const io = require("socket.io")(http);
const uuid = require('uuid');
app.set("io", io);
/*@ Socket Working @*/

/*@ here we include Helmet  @*/
const helmet = require('helmet')
app.use(helmet())
/*@ here we include Helmet  @*/

/*@ here we include third-party middleware => Morgan @*/
const morgan = require('morgan');
app.use(morgan('tiny'));
/*@ here we include third-party middleware => Morgan @*/

/*@ here we set-up body-parser @*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*@ here we set-up body-parser @*/

/*@ here we include third-party middleware => Cookie-Parser @*/
const cookieParser = require('cookie-parser');
app.use(cookieParser())
/*@ here we include third-party middleware => Cookie-Parser @*/

/*@ here we include third-party middleware => Express-Session @*/
const session = require('express-session');;
app.use(session({
    secret: 'tatxInc',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 157784630000 }
}));
/*@ here we include third-party middleware => Express-Session @*/

/*@ Mount indexRouter before Csrf @*/
let indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

let fetchMessageRouter = require('./routes/fetchMessageRouter');
app.use('/fetchMessages', fetchMessageRouter);
/*@ Mount indexRouter before Csrf @*/

/*@ here we include third-party middleware => Csurf' @*/
var csrf = require('csurf')
app.use(csrf({ cookie: true }))
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    // handle CSRF token errors here
    res.status(403).json({ msg: 'form tampered with' })
})
/*@ here we include third-party middleware => Csurf' @*/

/*@ Environment Variables @*/
require("dotenv").config({ path: __dirname + "/.env" });
/*@ Environment Variables @*/

/*@ Mongoose Connection @*/
require('./Connection/mongoose');
/*@ Mongoose Connection @*/

/*@ Seed JS @*/
// require('./seed')
/*@ Seed JS @*/

/*@ here we include static-files @*/
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
/*@ here we include static-files @*/

/*@ Passport Configuration @*/
// require('./config/passport');
/*@ Passport Configuration @*/

/*@ here we set-up template-engine @*/
app.set('view engine', 'ejs');
/*@ here we set-up template-engine @*/


// falsh 
// const flash = require('connect-flash');
// app.use(flash());

/*@ Passport middleware @*/
// const passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());
/*@ Passport middleware @*/

/*@ Global variables @*/
// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     res.locals.errors = req.flash('errors');
//     res.locals.user = req.user || null
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     next();
// });
/*@ Global variables @*/



/*@ Routes @*/

let appRouter = require('./routes/appRouter');
app.use('/apps', appRouter);

let contactRouter = require('./routes/contactRouter');
app.use('/contact', contactRouter);

let aboutRouter = require('./routes/aboutRouter');
app.use('/about', aboutRouter);

let termsRouter = require('./routes/termsRouter');
app.use('/terms', termsRouter);

let privacyRouter = require('./routes/privacyRouter');
app.use('/privacy', privacyRouter);

let faqRouter = require('./routes/faqRouter');
app.use('/faq', faqRouter);

let partnerRouter = require('./routes/partnerRouter');
app.use('/partner', partnerRouter);

let adminRouter = require('./routes/adminRouter');
app.use('/admin', adminRouter);

let chatRouter = require('./routes/chatRouter');
app.use('/chat', chatRouter);

/*@ Routes @*/

/*@ Handle Error 404 not found @*/
app.use((req, res, next) => {
    res.render('error');
    next();
});
/*@ Handle Error 404 not found @*/

const User = require('./models/User');
const Message = require('./models/Message');

/*@ Socket Connection @*/
io.on('connection', function(socket) {

    var currentRoomID, disconnectionFrom;

    socket.on("joinUser", async (data) => {
        try {
            const user = await User.findOne({ roomID: data.roomID });
            if(user) {
                socket.join(user.roomID);
            } else socket.emit('resetLocalStorage', { roomID: '' })
        }
        catch(err) {
            console.error(err.message);
        }
    });

    socket.on("joinAdmin", (data) => {
        socket.join(data.roomID);
        socket.broadcast.to(data.roomID).emit('adminConnected', { 
            msg: 'Admin is connected with you now'
        });
        disconnectionFrom = 'Admin';
        currentRoomID = data.roomID;
    });



   socket.on("addUser", async (data) => {
        try {
           if(data.fullname.trim()) {
                data.roomID = uuid.v4();
                socket.join(data.roomID);
                socket.emit("roomID", { roomID: data.roomID });
                io.emit('newUser', { roomID: data.roomID, fullname: data.fullname });
                await new User({ roomID: data.roomID, fullname: data.fullname.trim() }).save();
           }
        } catch(err) {
            console.error(err.message);
        }
    });

   socket.on("typing", function(data) {
        socket.broadcast.to(data.roomID).emit("typing", {
            isTyping: data.isTyping,
            person: data.person,
            roomID: data.roomID
        });
    });
    
   socket.on('chatMessage', async (data) => {
    try {   
        if(data.isAdmin) {
            io.to(data.roomID).emit('chatMessage', {
                isAdmin: true,
                from: 'Admin',
                to: 'User',
                message: data.message,
                createdAt: data.createdAt
            })
            await new Message({ roomID: data.roomID, isAdmin: true, from: 'Admin', to: 'User', message: data.message }).save()
        } else {
            const user = await User.findOne({ roomID: data.roomID });
            if(user && data.message.trim()) {
                io.to(data.roomID).emit('chatMessage', {
                    isAdmin: false,
                    from: 'User',
                    to: 'Admin',
                    message: data.message.trim(),
                    createdAt: data.createdAt
                })
                await new Message({ roomID: data.roomID, isAdmin: false, from: 'User', to: 'Admin', message: data.message }).save()
            }
        }
    }
    catch(err) {
        console.error(err.message);
    }
   });

   socket.on('disconnect', function() {
       if(disconnectionFrom === 'User') {
        socket.broadcast.to(currentRoomID).emit('leaving', { leavingFrom: 'User', msg: 'User has been left Room' });
       } else socket.broadcast.to(currentRoomID).emit('leaving', { leavingFrom: 'Admin', msg: 'Admin has been left Room' });
  }); 

});
/*@ Socket Connection @*/


/*@ here include for node-schedule @*/
const schedule = require('node-schedule');
schedule.scheduleJob('* */24 * * *', async () => {
    await User.remove();
    await Message.remove();
});
/*@ here include for node-schedule @*/

/*@ here the server is running on port 3000 @*/
http.listen(process.env.PORT, () => {
    console.log("Running on Port: 3000");
});
/*@ here the server is running on port 3000 @*/