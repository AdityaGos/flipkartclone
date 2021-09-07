//Using models schema data
const User =require('../models/user');
const jwt=require('jsonwebtoken');

exports.signup =(req,res)=>{
    
   
   
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json(
            {
                 message: 'User already register '
            }
        );
        const{
            firstName,
            lastName,
            email,
            password
        }=req.body;

        const _user=new User({
            firstName,
            lastName,
            email,
            password,
            username:Math.random().toString ()

        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json(
                    {
                        message:`Something went wrong `
                    });
            }
            if(data)
            {
                return res.status(201).json(
                    {
                    message:'User successfully created'
            
                    }
                );
            }
        });
            
    });
}


exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
                    if(user.authenticate(req.body.password) && user.role==='user' )
                    {
                        //creating token for user 
                        const token= jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'4h'})
                        const {_id,firstName,lastName,email,role,fullname}=user;
                        res.status(200).json({
                            token,
                            user: {
                                firstName,lastName,email,role,fullname,_id
                            }
                        });
                        }
                        else{
                            return res.status(400).json({
                                message:'invalid password'
                            });
                        }
                    }
        else{
            return res.status(400).json({message:'something went wrong'});

        }

    });
}

exports.getUsers=(req,res)=>{
    User.find({role:'admin'})
    .exec((error,users)=>{
        if(error) return res.status(200).json({error});

        if(users) 
        {
            if(users){
                return res.status(400).json({users});
            }
            else return res.status(404).json({message:'user not found'});
        }
        

    });
}

