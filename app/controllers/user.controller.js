const AppError = require('../utils/appError');
const User = require('./../model/user.model');
const Shop = require('./../model/shop.model');
const catchAsync = require("./../utils/catchAsync");
const factory = require('./handlerFactory')

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error'
    })
}
// Do not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

const filterObj = (obj, ...allowedFields) => {
    // Remove some inappropriate fields 
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (!allowedFields.includes(el))
            newObj[el] = obj[el];
    })

    return newObj;
}

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id; // From protect middleware
    next(); // pass to getUser function
}

exports.updateMe = catchAsync(async (req, res, next) => {
    // Update authenticated-current user
    // 1) Create error if user POSTs password data

    if (req.body.password || req.body.passwordConfirm)
        return next(new AppError('This route is not for password update'), 400)

    // 2) Filter fiels to remove some resticted fiels
    const filteredBody = filterObj(req.body, 'username', 'email');

    // 3) Update user document
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

    await user.save();

    res.status(200).send(`
        <script> 
            alert("Cập nhật thông tin thành công");
            window.location.replace("/customer/${user.email}")
        </script>
      
    `)
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});


exports.beSeller = catchAsync(async (req, res, next) => {

    try {
        const shop = Shop.create({
            sellerID: req.user.id, name: req.body.shopName,
            description: req.body.shopDescription, logo: req.body.shopLogo,
            email: req.body.shopEmail, phoneContact: req.body.shopContact
        })
        let user = User.findByIdAndUpdate(req.user.id, { role: 'seller' }, { new: true, runValidators: true });
        await shop;
        user = await user;
        await user.save();
        res.send(`
            <script> 
                    alert('Mở shop thành công!');
                    window.location.replace('/');
            </script>
            
        `)
    } catch (error) {

        res.send(`
            <script> 
                    alert('${error.message}');
                    window.location.replace('/become-seller');
            </script>
            
        `)

    }


})