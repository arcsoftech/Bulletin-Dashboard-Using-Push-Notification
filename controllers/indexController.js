const jwt = require('jsonwebtoken');

module.exports = (Messages, Subscriptions) => {
    const push = require('../events/push')(Subscriptions);
    return {
        GET: {
            indexHandler: (req, res, next) => {
                Messages.find({
                    attributes: ['message', 'type'],
                    order: [
                        ['id', 'DESC'],
                    ],
                    raw: true,
                }).then(function (result) {
                    console.log(result);
                    res.render('index', {
                        page_title: '',
                        message: result.message,
                        type: result.type
                    });
                }).error(function (err) {
                    console.log("Error:" + err);
                });
            },
            logoutHandler: (req, res) => {
                res.clearCookie('token', {
                    path: '/'
                });
                req.logout();
                res.redirect('login');
            },
            loginHandler: (req, res, next) => {
                res.render('login', {
                    page_title: 'Login'
                });
            },
            registerHandler: (req, res, next) => {
                res.render('register', {
                    page_title: 'Register2',
                    Error: req.flash('error')
                });
            },
            dashboardHandler: (req, res, next) => {
                res.render('dashboard', {
                    page_title: 'Dashboard',
                    message: req.flash('success')
                });
            },
        },
        POST: {
            loginHandler: (req, res) => {
                let user = req.user;
                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    options = {
                        httpOnly: true, // The cookie only accessible by the web server
                        expires: new Date(Date.now() + 60 * 60 * 1000), // expires after 1 hour
                        ephemeral: true
                    };
                    token = jwt.sign(user, "voice", {
                        expiresIn: "1d" // expires in 24 hours
                    })
                    res.cookie('token', token, options);
                    return res.redirect('dashboard')
                });
            },
            fileUploadHandler: (req, res) => {
                let data = {
                    type: 'bulletin_pdf',
                };
                Messages.create(data)
                    .then((messageRow, created) => {
                        push.emit('fileUpload', 'bulletin_pdf');
                        req.flash('success', 'PDF uploaded successfully.');
                        res.redirect('dashboard');
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
            registerHandler: (req, res) => {
                console.log("HELLO WORLD");
                res.send('success');
            },
            pushMessageHandler: (req, res) => {
                //Checking connection status
                let data = {
                    type: 'bulletin_alert',
                    message: req.body.message
                };
                Messages.create(data)
                    .then((messageRow, created) => {
                        console.log(messageRow);
                        push.emit('msg', messageRow.get({
                            plain: true
                        }), 'bulletin_alert');
                        req.flash('success', 'Push message successful');
                        res.redirect('dashboard');
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    }
}
