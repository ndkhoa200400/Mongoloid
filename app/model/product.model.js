const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên không được bỏ trống'],
        trim: true
    },
    slug: String,
    price: {
        type: Number,
        required: [true, 'Giá tiền không được để trống'],
        min: [1, 'Giá tiền không hợp lệ']
    },
    images: [String],
    description: String,
    amount: {
        type: Number,
        min: [1, 'Số lượng sản phẩm không hợp lệ']
    },
    rating: [{
        stars: {
            type: Number,
            default: 3
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }],
    shopID: {
        type: mongoose.Types.ObjectId,
        ref: 'Shop'
    },
    category: {
        type: String,
        required: [true, 'Danh mục không được để trống'],
        enum: ['Nón', 'Áo', 'Quần', 'Ba lô']
    },
    createdAt:
    {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    }
})
// runs before .save() and .create(), not affect .insertMany() and .findAndUpdate()
productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
productSchema.post("findOneAndUpdate", async function () {
    // Sau khi cap nhat thi sua ten slug
    const updatedDoc = await this.model.findOne(this.getQuery());
    await this.model.updateOne(this.getQuery(), {
        slug: slugify(updatedDoc.name, { lower: true }),

    });
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;