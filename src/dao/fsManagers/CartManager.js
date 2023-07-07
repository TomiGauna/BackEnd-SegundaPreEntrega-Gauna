import fs from 'fs';

class CartManager{
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

export default CartManager;
