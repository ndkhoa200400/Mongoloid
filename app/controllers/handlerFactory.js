// Factory functions for CRUD


// Factory Function. 
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/apiFeature')
exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        next(new AppError("No document found with ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
   
    if (!doc) {
        next(new AppError("No doc found with ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            doc,
        }
    });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    

    if (!doc) {
        next(new AppError("No doc found with ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            doc
        }
    });
});

exports.getAll = Model => catchAsync(async (req, res) => {
    // To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = {tour: req.params.tourId};
    
    
    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const docs = await features.query;

    res.status("200").json({
        status: "success",
        requestAt: req.requestTime,
        results: docs.length,
        data: {
            docs,
        },
    });
});