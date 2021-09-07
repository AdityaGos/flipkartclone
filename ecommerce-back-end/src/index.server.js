const express= require('express');
const env=require('dotenv');
const app=express();
const mongoose =require('mongoose');

//routes
const authRoutes=require('./routes/auth')
const adminRoutes=require('./routes/admin/auth')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')
//environment variable 
env.config();

app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);



// mongodb
//mongodb+srv://adityagoswami:<password>@cluster0.wnlw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wnlw3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
     {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex:true
        }
         ).then(()=>
         {
             console.log('Database connected')
         });

//environment variable or you can say constants

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});


// creating an API
//get is method take parameter lije request response next
// app.get('/',(req,res,next)=>{
//     res.status(200).json(
//         {
//             message: 'Hello from server'
//         }
//     );
// });


// const name='aditya'
// console.log(`hi 
// my name is ${name}`)