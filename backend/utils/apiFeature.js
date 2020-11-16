class APIFeatures{
    constructor(query, queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }

    filter()
    {
        const queryObj = {...this.queryString};
        const excludedFilres = ['page', 'sort', 'limit', 'fields'];
        excludedFilres.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, match =>{
            `$${match}`;
        })

        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    sort()
    {
        if (this.queryString.sort)
        {
            const sortBy = this.queryString.sort.split(',').join(' ');
            
            // sort theo danh mục
            // vd: sort=price là sort theo giá tăng dần
            // sort=-price là giảm dần
            this.query =  this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('-createdAt');
        }
        
        return this;
    }

    limitFields()
    {
        if (this.queryString.field)
        {
            const fields = this.queryString.field.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else{
            this.query = this.query.select('-__v'); // Exclude __v created by MongoDB
        }
       
        return this;
    }

    paginate()
    {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) *limit;
        this.query = this.query.skip(skip).limit(limit);
       
        return this;
    }
}

module.exports = APIFeatures;