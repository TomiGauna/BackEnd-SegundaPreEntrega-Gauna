import fs from 'fs'

class Product {

    static id = 1
    static status = true

    constructor({title, description, price, thumbnails, code, stock, status}){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnails = thumbnails;
        this.code = code;
        this.stock = stock;
        this.status = status;
        }
    }


export default class ProductManager { 
    constructor (path){
        this.path = path;
        this.products = [];
        this.id= 1;
    }

    
    getProducts = async() => {
        if (fs.existsSync(this.path)) {
            const info = await fs.promises.readFile(this.path,'utf-8');
            const prod = JSON.parse(info);
            return prod;
            
        } else {
            return [];
        }
    };

  addProduct = async ( title, description, price, status, thumbnails, code, category, stock) => {

   const products = await this.getProducts()

        if (title && description && price && status && thumbnails && code && category && stock) {
          let codexist = await products.some((product) => {
            return product.code === code;
          });
          if (codexist){
            throw new error("Repeated code")
          } else {
            let id = (products.length + 1);
            const newProd= {
              id,
              title: String(title),
              description: String(description),
              price: Number(price),
              status: Boolean(status),
              thumbnails: String(thumbnails),
              code: Number(code),
              category: String(category),
              stock: String(stock)
            }
           await products.push(newProd)
          }
        } else {
          throw new Error("You must complete all fields");
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      }

    deleteProduct = async(id) => {
        const prods = await this.getProducts();
        const removedItem = prods.find(prod => prod.id === parseInt(id));
        prods.splice(prods.indexOf(removedItem), 1);

        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));
        return prods

    }; 

    getProductbyId = async(id) => {

        const prods = await this.getProducts()
        const selectedProd = prods.find((prod) => prod.id === id)
        
        
        if (!selectedProd) {
            return Error('The item does not exist')
        } else {
            return selectedProd
        }
        
    };

    updateProduct = async(id, newObject) => {

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
    }
}



///////TESTING AREA///////////////////////////////////////////////////////////////



 export const prodManager = new ProductManager('./products.json');

/* const checkingMethods = async() => { */

        /* try {
            await prodManager.addProduct({title: 'Motorola G42', 
            description: 'Smartphone made by Motorola', 
            price: 93000,
            thumbnail: 'none',
            code: 111,
            stock: 45});

            await prodManager.addProduct({title: 'Samsung Galaxy Tab S6 Lite ', 
            description: 'Smartphone fabricated and distributed by Samsung', 
            price: 194000,
            thumbnail: 'none',
            code: 112,
            stock: 39});

            await prodManager.addProduct({title: 'TCL Smartphone 408', 
            description: 'Built and shaped by TCL', 
            price: 53000,
            thumbnail: 'none',
            code: 113,
            stock: 62});

            await prodManager.addProduct({title: 'ZTE Blade V40 Vita', 
            description: 'Provided by ZTE', 
            price: 58500,
            thumbnail: 'none',
            code: 114,
            stock: 28})

            await prodManager.addProduct({title: 'JBL Headphones Vibe 200 TWS', 
            description: 'In-Ear Headphones supplied by JBL', 
            price: 160000,
            thumbnail: 'none',
            code: 115,
            stock: 55})

            console.log(await 'Products saved successfully');
            
        } catch (error) {
            console.log('Test: ', error.message)
        } */


        /* console.log(await prodManager.getProducts()) */
        /* console.log (await prodManager.deleteProduct(2)); */
        /* console.log(await prodManager.getProductbyId(3)); */
        /* console.log(await prodManager.updateProduct(1, {title: 'Apple iPhone 14', 
                                    description: 'Built and designed by Apple', 
                                    price: 315000,
                                    thumbnail: 'image.png',
                                    code: 121, 
                                    stock: 7})) 

    }*/

/* checkingMethods(); */ 
