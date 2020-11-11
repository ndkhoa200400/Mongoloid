// Error handling to asycn functions

module.exports =  fn =>{
    return (req, res, next) => { 
        fn(req, res, next).catch(next);
    }
}