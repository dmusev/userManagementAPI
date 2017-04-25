let UserModel = require('./../models/User').User
let encryption = require('./../utilities/encryption')

// Returns all available users
let getUsers = (req, res) => {
    UserModel.find((err, users) => {
        if (err) res.send(err)

        res.json(users)
    })
}

// Generatges new user
let createUser = (req, res) => {
    let User = req.body
    let userExists;
    // Check for existing user
    UserModel.findOne({ emailAddress: req.body.emailAddress }, function(err, user) {
        if (user) {
            res.status(409).send({
                message: 'User exists!'
            });
        } else if (User.password && User.emailAddress) {
            User.salt = encryption.generateSalt();
            User.hashedPwd = encryption.generateHashedPassword(User.salt, User.password);
            UserModel
                .create(User)
                .then(currUser => {
                    req.logIn(currUser, (err, user) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Cannot log in current user!'
                            });
                            return;
                        }
                        // res.redirect('/');
                        res.status(200).send({
                            success: true,
                            user: currUser
                        })
                    })
                })
        } else {
            res.status(400).send({
                message: 'Not a proper request!'
            });
        }
    })
}

// User removal function
let removeUser = (req, res) => {
    let msgOnSuccess = 'User removed !';

    UserModel.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
            // Handle any possible database errors
            res.status(500).send(err);
        } else if (user) {
            // Create a simple object to send back with a message and the id of the document that was removed
            var response = {
                success: true,
                message: msgOnSuccess,
                id: user._id
            };
            res.send(response);
        }
    });
}

// User update function
let updateUser = (req, res) => {
    let updatedUser = req.body;
    let msgOnSuccess = 'User updated !';

    UserModel.findById(req.params.id, function(err, currUser) {
        if (err) {
            // Handle any possible database errors
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            UserModel.findOne({ emailAddress: req.body.emailAddress }, function(err, user) {
                if (user &&
                    updatedUser.emailAddress.toLowerCase() !== currUser.emailAddress.toLowerCase() &&
                    updatedUser.emailAddress.toLowerCase() === user.emailAddress.toLowerCase()) {
                    res.status(409).send({
                        message: 'User exists!'
                    });
                } else if (err) {
                    res.status(500).send({
                        message: 'Cannot update user right now!'
                    });
                } else {
                    currUser.emailAddress = updatedUser.emailAddress || currUser.emailAddress;
                    currUser.forename = updatedUser.forename || currUser.forename;
                    currUser.surname = updatedUser.surname || currUser.surname;

                    // Save the updated document back to the database
                    currUser.save(function(err, user) {
                        if (err) {
                            res.status(500).send(err)
                            return;
                        }
                        res.status(200).send({
                            success: true,
                            msg: msgOnSuccess,
                            user: user
                        })
                    })
                }
            })
        }
    })
}

// Authenticating function
let authenticate = (req, res) => {
    let userCred = req.body
    UserModel
        .findOne({ emailAddress: userCred.emailAddress }, function(err, currUser) {
            if (!currUser || currUser === 'undefined' || !currUser.authenticate(userCred.password)) {
                res.status(404).send({
                    message: 'Non-existing user!'
                });
                return;
            } else {
                req.logIn(currUser, (err, user) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Cannot log in current user!'
                        });
                        return;
                    }
                    // res.redirect('/');
                    res.status(200).send({
                        success: true,
                        user: currUser
                    })
                })
            }
        })
}

// Logout function
let logout = (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
}

// User controller exposed functions
module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser,
    authenticate: authenticate,
    logout: logout
}