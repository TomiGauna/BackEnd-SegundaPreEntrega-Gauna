import { Router } from "express";
import ProductManagerMng from "../dao/MongoManagers/MongoProdManager.js";
/* import { socketServer } from "../app.js"; */


const router = Router();
const prodManager = new ProductManagerMng()



router.get('/', async(req, res) => {
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
    res.render({status: 'success', payload: separation.prodsDocs})
})


router.get('/:pid', async(req, res) => {
    /* const prods = await prodManager.getAllProducts(); */

    let pid = req.params.pid;
    const prod = await prodManager.getProdById(pid);

    if (!prod) {
        return res.status(404).send({status:'Error', Error: 'Article Not Found'})
    } else {
        res.send({status: 'success', prod});
    }

})

router.post('/', async (req, res) => {
    
    const productData = req.body;
    const createdProd = await prodManager.createProd(productData)

    if (!createdProd) {
        res.send('Invalid data')
    }
    
    res.send({ status: "Product created successfully!", newProd: createdProd })
})


router.put("/:pid", async (req, res) => {
    try {
      const prodId = req.params.pid;
      const body = req.body;
      const modifiedProd = await prodManager.updateProduct(body, prodId);
  
      if (modifiedProd) {
        res.status(200).send('Product data changed successfully');
      } else {
        res.status(404).send('Wrong ID number');
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

router.delete('/:pid', async(req, res) => {
    const pId = req.params.pid
    const deletedProd = await prodManager.deleteProduct(pId);
    /* const prods = await prodManager.getAllProducts(); */
    /* socketServer.emit('addingProds', prods) */
    res.send({status: 'Article deleted successfully', deletedProd})
   
})

export default router