const User = require('../models/user');


// READ USER ID
exports.read = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'This user is not found'
            });
        }
        // THIS IS NOT TO SHOW TO USER HASHED_PASSWORD AND SALT
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

// UPDATE USER INFO
exports.update = (req, res) => {
    const { name, password } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'This user is not found'
            });
        }

        // IF THE THEY ENTER STRING AS NAME
        if (!name) {
            return res.status(400).json({
                error: 'Name Field is required'
            });
        } else {
            user.name = name;
        }

        // PASSWORD VALIDATION
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 chars long.'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });

};