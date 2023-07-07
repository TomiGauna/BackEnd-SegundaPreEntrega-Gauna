import productModel from "../models/product.model.js";

export default class ProductManagerMng{

  constructor(){
    this.productsModel = productModel
  }
  
  async getAllProducts(limit, page, sort, query){
    try {
      const products = await this.productsModel.paginate(
        {query},
        {
          limit: limit || 10,
          page: page || 1,
          sort: sort === 'incr' ? { price: 1 } : sort === 'decr' ? { price: -1 } : undefined
        }
      )
      return products;
    } catch (error) {
      Error('Fail to get collection data')
    }
  }

  async getProdById(id){
    try {
      const foundProd = this.productsModel.findOne({ _id: id });
      if (!foundProd) {
        return Error('The item does not exist')
    }
      return foundProd

    } catch (error) {
      Error('Fail to get product')
    }
  }

  async createProd(prodData){
    try {
      const newProduct = await this.productsModel.create(prodData);
      return newProduct

    } catch (error) {
      Error('Fail to create product')
    }
  }

  async updateProduct(obj, pid) {
    try {
        const changedProd = await this.productsModel.updateOne({_id: pid}, obj)
        return changedProd;
    } catch (error) {
        throw new Error("Error to update product")
    }
  }

  async deleteProduct(id){
    try {
      const prodDeleted = this.productsModel.deleteOne({ _id: id})
      return prodDeleted
    } catch (error) {
      Error('Error to delete product from db')
    }
  }

}
    
        /* updateProduct = async(id, newObject) => {
    
            const prods = await this.getProducts();;
    
            const prodIndex = prods.findIndex(product => product.id === id);
            if (prodIndex === -1) {
                return "Article not found"
            }else{
                const updateProduct = {
                    ...prods[prodIndex],
                    ...newObject
                }
    
                prods[prodIndex] = updateProduct;    
                await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'))
                return
            }    
        } */

