const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:  [true, 'A product must have a name'],
        trim: true,
        maxlength: [40, 'A product name must have less or equal 40 characters'],
        minlength: [5, 'A product name must have more or equal 5 characters'],
    },
    slug: String,
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    images: [String],
    description: String,
    amount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    shopID:{
        type: String,
        required: [true, 'A product has to belong to a shop']
    },
    category:{
        type: String,
        required: [true, 'Please provide category of product'],
        enum: ['hat', 'shirt', 'pants', 'backpack', 'none'],
        default: 'none'
    },
    createdAt:
    {
        type: Date,
        default: Date.now(),
        select: false
    }
})
// runs before .save() and .create(), not affect .insertMany() and .findAndUpdate()
productSchemaSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
});
productSchemaSchema.post("findOneAndUpdate", async function () {
    // Sau khi cap nhat thi sua ten slug
    const updatedDoc = await this.model.findOne(this.getQuery());
    await this.model.updateOne(this.getQuery(), {
      slug: slugify(updatedDoc.name, { lower: true }),
      
    });
  });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;