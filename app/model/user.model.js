const mongoose = require('mongoose');

const crypto = require('crypto')
const validator = require('validator');
const bcrypt = require('bcrypt');   // for hashing password

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        require: [true, 'Username không được để trống'],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email không được để trống'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email không hợp lệ']
    },
    phone: {
        type: String,
        unique: true,
        validate: [validator.isNumeric, 'Số điện thoại không hợp lệ']
    },
    address: String,
    role: {
        type: String,
        enum: ['customer', 'seller', 'admin'],
        default: 'customer'
    },
    password: {
        type: String,
        required: [true, 'Password không được để trống'],
        minlength: [6, 'Password phải trên 6 ký tự'],
        select: false   // Remove it from display 
    },
    passwordConfirm: {
        type: String,
        select: false,
        required: [true, 'Xác thực password không được để trống'],
        validate: {
            // This only works on SAVE and CREATE methods
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
    }
}
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
})
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    // When user reset password, change this attribute to the time user reset
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }

    // password hasn't been changed
    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

userSchema.pre(/^find/, function (next) {
    // query middleware
    // this points to current query

    // Only find user who is active
    this.find({ active: { $ne: false } });
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;