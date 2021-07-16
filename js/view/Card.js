export default class Card {
    constructor(good) {
        this._data = good;
        this._addHandlerCb = null;
    }

    getHtml() {
        return `<div class="goods-item" id="card-${this._data.id}">
            <h3>${this._data.title}</h3>
            <p>${this._data.price} $</p>
            <p class="item-description">${this._data.description}</p>
            <div class="goods-list-img"></div>
            <button class="addToCartBtn">В корзину</button>
        </div>`;
    }
    

    render($container, target = 'beforeend') {
        $container.insertAdjacentHTML(target, this.getHtml());
        if(this._addHandler){
            const addBtn = $container.querySelector(`#card-${this._data.id} > .addToCartBtn`);
            addBtn.addEventListener("click" , this._addHandler.bind(this))
        }
    }

    _addHandler(){
        this._addHandlerCb(this._data.id)
    }
    
    setAddHandler(callback){
        this._addHandlerCb = callback
    }
    
    filterGoods(value,$container) {
        const regexp = new RegExp(value, 'i');    
        if(value !=="" && regexp.test(this._data.title)){
            this.render($container); 
        }  
    }
}