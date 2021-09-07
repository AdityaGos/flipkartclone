const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String,
            required: true,
            trim: true
             },

        slug: { 
            type: String,
            required: true,
            unique: true 
            },
        price: {
             type: Number,
             required: true 
            },

        description: {
             type: String,
              required: true,
               trim: true 
            },
        offer: {
             type: Number 
            },
        quantity:{ type: Number, required: true},
        productPicture: [{ img: { type: String } }],

        //linking
        //the person reviewing must have created account and must be logged in
        review: [
            {
                userId: {type:mongoose.Schema.Types.ObjectId },
                ref: "user",
                type: String,
            },
        ],
        category:{ type: mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
        createdBy:{ type:mongoose.Schema.Types.ObjectId,ref:'User' ,required:true},
        updatedAt:Date,
    },

    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
