import { getShopingCart } from "../utilities/fakedb";

export const loadProductsAndStoreCard = async()=>{

    // Get product 
    const productsData = await fetch('products.json');
    const products = await productsData.json();

   
    // get store cart 
    const storeCard = getShopingCart();
    const previousCard =[];
    for(const id in storeCard){
        const selectedProduct = products.find(product => id===product.id);
        const quantity = storeCard[id];
        selectedProduct.quantity=quantity;
        previousCard.push(selectedProduct);
    }

    return {products:products,initialCard:previousCard};
}