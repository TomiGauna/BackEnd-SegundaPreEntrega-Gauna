import { Router } from "express";
import ProductManager from "../dao/MongoManagers/MongoProdManager.js";
import CartManager from "../dao/MongoManagers/MongoCartManager.js";

const router = Router();
const prodManager = new ProductManager();
const cartManager = new CartManager();

router.get('/products', async(req, res) => {
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    let sort = req.query.sort;
    let query = req.query.query;

    let products = await prodManager.getAllProducts(limit, page, sort, query);
    let prodsToJSON = products.docs.map(prod => prod.toJSON());
    
    const separation = {
        productslpsq: products,
        prodsDocs: prodsToJSON
    }

    res.render ('prods', { title: 'iTech Store',
                            style: 'home.css',
                            allProds: separation.prodsDocs,
                            workedDocs: separation.productslpsq })
})

router.get("/carts/:cid", async (req, res) => {
    try {
      const cid = req.params.cid;
      const cart = await cartManager.getCartById(cid)
      let prods = cart.products.map((p) => p.toJSON())
      /* console.log(prods) */
  
      if(cart) {
        res.render('cart', {title: 'iTech Store', style: 'cart.css', view: prods})
      }else {
        res.status(404).send('Cart not found')
      }
    } catch (error) {
      res.status(500).send('Error: ' + error)
    }
  })

router.get('/realtimeproducts', async(req, res) => {
    const products = await prodManager.getAllProducts();
    res.render('realTimeProducts', {title: 'iTech Store',
                        style: 'realtime.css', 
                        products})
})

/* router.get('/chat/', (req, res) => {
    res.render('chat', {title: "Application's Chat",
                        /* style: 'css/chat.css' })
}) */

export default router