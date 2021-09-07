const User =require('../../models/user');
const jwt=require('jsonwebtoken');


exports.signup =(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json(
            {
                 message: 'Admin already register '
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
            role:'admin',
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
                    message:'Admin successfully created'
            
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
                    if(user.authenticate(req.body.password) && user.role==='admin')
                    {
                        //creating token for user 
                        // creating payload 
                        const token= jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
                        const {_id,firstName,lastName,email,role,fullname}=user;
                        res.status(200).json({
                            token,
                            user: {
                                firstName,lastName,email,role,fullname,_id,role
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

