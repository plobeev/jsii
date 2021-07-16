import Good from "./Good.js";

export default class GoodList {
    constructor(goods) {
        this.goods = goods.map(item => new Good(item));
        this.filteredGoods = [];
    }

    get() {
        return this.goods;
    }
    getById(id) {
        return this.goods.find(good => good.id === id)
    }   

    add(good) {
        this.goods.push(good);
    }
    

}
    
    
    
    
