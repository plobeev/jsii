import GoodList from "./GoodList.js";

export default class Cart extends GoodList{
    constructor(goodsData){
        super(goodsData);
    }
    getPrice(){
        return this.goods.reduce((acc,good) => acc + good.price , 0)
    };

    add(newGood){
        const oldGood = this.goods.find(good => good.id === newGood.id)
        if(oldGood){
            oldGood.quanityPlus()
        } else {
            this.goods.push(newGood)
        }
    }
    displaySum(){
        document.querySelector(".sum").innerHTML = `На сумму: ${this.getSum()}$`;
    }
    displayTotalQuantity(){
        document.querySelector(".quantity").innerHTML = `Товаров в корзине: ${this.getTotalQuantity()}`;
    }
    getSum(){
        return this.goods.reduce((acc, good) => acc + good._price * good._quantity , 0)
    }
    getTotalQuantity() {
        return this.goods.reduce((acc, good) => acc + good._quantity , 0)
    }
remove(id) {
        const index = this.goods.findIndex(good => good.id === id);
        this.goods.splice(index, 1);
    }
    
    
}
