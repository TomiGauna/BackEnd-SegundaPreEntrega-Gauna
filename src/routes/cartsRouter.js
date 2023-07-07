import { Router } from "express";
import CartManager from "../dao/MongoManagers/MongoCartManager.js";

const router = Router();
const cartManager = new CartManager();

///GetAllCarts
router.get('/', async(req, res) => {
    const allCarts = await cartManager.getAllCarts();
    res.send({ status: 'success', allCarts })
})

///CreateCart
router.post('/', async (req, res) => {
        const newCart = await cartManager.createCart();
        res.status(201).send({status: 'A new cart has just been created', newCart});
})

///GetCartById
router.get('/:cid', async(req, res) => {
    
        const cId = req.params.cid;
        const calledCart = await cartManager.getCartById(cId);
        res.status(200).send(calledCart);
        
})

///////AddProdToCart
router.post('/:cid/products/:pid', async (req, res) => {
   
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartManager.addProdToCart(cartId, productId);
        /* console.log(cart); */
        res.status(201).send({ status: 1, msg: 'Product added to cart successfully', cartResponse: cart });
    } catch (error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
});


///////UpdateCart
router.put("/:cid", async (req, res) => {
    try {
      const cartID = req.params.cid;
      const updatedProducts = req.body.products;
  
      const updateCart = await cartManager.updateCart(cartID, updatedProducts);
  
      if (updateCart) {
        res.status(200).send("Cart updated successfully");
      } else {
        res.status(404).send('Fail to update cart');
      }
    } catch (error) {
      res.status(500).send("Error" + error);
    }
});


//////////UpdQuantity
router.put("/:cid/product/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const prodId = req.params.pid;
      const { quantity } = req.body;
      
      const updateQuantity = await cartManager.updQuantity(cartId, prodId, quantity);
  
      if (updateQuantity) {
        res.status(200).send("Quantity updated successfully");
      } else {
        res.status(404).send("Fail to update product's data");
      }
    } catch (error) {
      res.status(500).send("Error:" + error);
    }
});

/////////RemoveProdInCart
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
      const cId = req.params.cid;
      const pId = req.params.pid;
    
      const deletedProd = await cartManager.removeProdInCart(cId, pId)
      if(deletedProd) {
        res.status(200).send('Product successfully deleted');
      }else{
        res.status(404).send('Product not found');
      }
    } catch (error) {
      res.status(500).send('Error to delete product');
    }
  
})

//////////CleanCart
router.delete("/:cid", async (req, res) => {
    try {
      let cId = req.params.cid;
      let emptyCart = await cartManager.cleanCart(cId)
  
      if(emptyCart) {
        res.status(200).send('Cart has just been cleaned')
      }else{
        res.status(404).send('Cart not found')
      }
    } catch (error) {
      res.status(500).send('Could not delete products in cart' + error);
    }
})

////////DeleteCart
router.delete('/:cid', async(req, res) => {
    const id = req.params.cid;
    const removedCart = await cartManager.deleteCart(id);
    res.send({status: 'Cart deleted successfully', removedCart})
})

export default router