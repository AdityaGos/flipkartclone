const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            //if cart already exists then update cart by quantity
            const product = req.body.cartItems.product;
            //checking itme exist in the cart or not 
            const item = cart.cartItems.find(c => c.product == product);

            if(item){
                //if exist select that item  and update the quantity of it
                //doing quantity ++
                //...
                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product }, {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                })
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({ error });
                    if(_cart){
                        return res.status(201).json({ cart: _cart });
                    }
                })

            }else{
                //finding the user associated with user and adding itme
                //pushing record in subcollection
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({ error });
                    if(_cart){
                        return res.status(201).json({ cart: _cart });
                    }
                })
            }



            //res.status(200).json({ message: cart });
        }else{
            //if cart not exist then create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart){
                    return res.status(201).json({ cart });
                }
            });
        } 
    });



};