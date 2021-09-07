const {check,validationResult}=require('express-validator') ;

exports.validateSignupRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('FirstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .notEmpty()
    .withMessage('Email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must abe atleast 6 char long ')
    
    
    

];

exports.validateSigninRequest=[
    
    check('email')
    .notEmpty()
    .withMessage('Email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must abe atleast 6 char long ')
    
    
    

];
//middleware need to forward to signup controller
exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0)
{
    return res.status(400).json({erorrs:errors.array()[0].msg})
}
next();
}