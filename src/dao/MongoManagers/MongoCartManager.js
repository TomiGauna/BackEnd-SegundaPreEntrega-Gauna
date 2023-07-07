import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartManager{

    constructor(){
        this.cartsModel = cartModel;
        this.productsModel = productModel
    }

    async getAllCarts(){

        try {
            const allCarts = await this.cartsModel.find();
            return allCarts; 
        } catch (error) {
            Error('Cannot get carts data')
        }
    }

    async getCartById(id){

        try {
            const cartFound = await this.cartsModel.findById({ _id: id })
            if (!cartFound) {
                return Error('Non-existent cart')
            }
            return cartFound

        } catch (error) {
            Error('Cart not found')
        }
        
    }

    async getProdsInCart() {
      try {
        const carts = await this.cartsModel.find().populate("products.productId");
        return carts;
      } catch (error) {
          throw new Error("Could not get carts" + error);
      }
    }

    async createCart(){

        try {
            const newCart = this.cartsModel.create({ products: [] });
            return newCart

        } catch (error) {
            Error('Fail to create a new cart')
        }
    }

    async addProdToCart(cartID, prodID) {
        try {
          const cart = await this.cartsModel.findById(cartID);
          if (!cart) {
            Error("Cart not found");
          }
    
          const relatedProdIndex = cart.products.findIndex((prod) => prod.productId === prodID);
          if (relatedProdIndex !== -1) {
            cart.products[relatedProdIndex].quantity++;
          } else {
            const newProduct = { productId: prodID, quantity: 1 };
            cart.products.push(newProduct);
          }
    
          await cart.save();
          return cart;
        } catch (error) {
          Error("Fail to add product in cart: " + error);
        }
      }

    async updateCart(cartId, updatedProds) {
        try {
          const cart = await this.cartsModel.findById(cartId);
      
          if (!cart) {
            throw new Error("Cart not found");
          }
      
          cart.products = updatedProds;
      
          await cart.save();
          return cart;
        } catch (error) {
          throw new Error("Could not update cart: " + error);
        }
    }
      
    async updQuantity(cId, prodId, alteredQuantity) {
        const cart = await this.cartsModel.findById(cId);
      
        if (!cart) {
          throw new Error("Cart not found");
        }
      
        const product = cart.products.find((prod) => prod.id === prodId);
      
        if (product) {
          product.quantity = alteredQuantity;
          await cart.save();
        } else {
          throw new Error("Product not found");
        }
    }

    async removeProdInCart(cId, prodId) { 
        try {
          const cart = await this.cartsModel.findById(cId);
          console.log(cart)
      
          if (!cart) {
            Error('Cart not found');
          };
        
          const prodIndex = cart.products.findIndex(prod => prod.productId === prodId);
          if (prodIndex === -1) {
            Error('Product not found');
          }
        
          cart.products.splice(prodIndex, 1)
          await cart.save()
        
          return cart
        } catch (error) {
          throw new Error("Could not delete")
        }
    
    }

    async cleanCart(cId) {
        try {
          const cart = await this.cartsModel.findById({_id: cId})
    
          if(cart) {
            cart.products = []
            await cart.save()
            return "Cart has just been cleaned"
          }else {
            throw new Error("Cart not found")
          }
        } catch (error) {
          throw new Error("Could not empty cart")
        }
    }

    async deleteCart(id){
        try {
            const removedCart = this.cartsModel.deleteOne({ _id: id})
            return removedCart
          } catch (error) {
            Error('Error to remove cart from db')
          }
    }
}

export default CartManager


/* async cleanCart(id){
        try {
            const cartInvolved = this.cartsModel.findById(id)
            cartInvolved = { products: [] };
            return cartInvolved
        } catch (error) {
            Error('Cart could not be cleaned')
        }
    } */

/* export class CartManager{
    constructor(path){
        this.id = 0;
        this.cart = [];
        this.path = path; 
    }

    bringFile = async() => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.cart = JSON.parse(data);
            return this.cart
        } else {
            this.cart = [];
        }
        this.id = this.cart[this.cart.length-1] ? (this.cart[this.cart.length-1].id+1) : 1;
    }
     

    saveCart = async() => {
        fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t' ))
        return;
    };

    addCart = async() => {
        await this.bringFile();
        const newCart = { id: this.id++, products: [] }
        this.cart.push(newCart);

        await this.saveCart();
        return newCart
    };

    getCartbyId = async(id) => {
        await this.bringFile();

        const identifiedCart = await this.cart.find(c => c.id === id);
        
        if (!identifiedCart) {
            return Error('Unidentified Cart')
        } else {
            return identifiedCart.products
        }
    };

    addProductCart = async(cartId, productId) =>{
        
        const carts = await this.bringFile();
        let recoveredProd = false;
        let quantity = 1;
        console.log(carts)
        const cartProds = await carts.getCartById(cartId);

        cartProds.map(prod => {
            if(prod.product === productId){
                recoveredProd = true;
                return { ...prod, quantity: ++prod.quantity }
            }
        })
        if(!recoveredProd){
            const prod = { product: productId, quantity: quantity }
            cartProds.push(prod);
        }

        await this.saveCart();
    }

}
 */