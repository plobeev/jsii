import Good from "./Good.js";

export default class GoodInCart extends Good{
    constructor({ title, description, image, _price, id },quantity = 1){
        super({ title, description, image, price: _price });
        this.id  = id;
        this._quantity = quantity;
        this._addHandlerCb = null;
        this._deleteHandlerCb = null;
    }   
    get price() {
        return this._price * this.quanity;
    }
    quanityPlus(){
        this._quantity++;
    }

    getHtml() {
        return `<div class="cart-goods-item" >
            <div class="cart-goods-item-info">
            <h3>${this.title}</h3>
            <p>${this._price} $</p>
            <p>${this._quantity}</p>
            </div>
            <div class="quantityBtns">
            <button class="quantityChangeBtn quantityChangeBtnPlus_${this.id}" data-isAddItemBtn>+</button>
            <button class="quantityChangeBtn quantityChangeBtnMinus_${this.id}">-</button>
            </div>
            
        </div>`;
    }    

    render($container, target = 'beforeend') {
        $container.insertAdjacentHTML(target, this.getHtml());
        if(this._addHandler){
            const plusBtn = $container.querySelector(`.quantityChangeBtnPlus_${this.id}`);
            plusBtn.addEventListener("click" , this._addHandler.bind(this));
        }
        if(this._deleteItemHandler){
            const minusBtn = $container.querySelector(`.quantityChangeBtnMinus_${this.id}`);
            minusBtn.addEventListener("click" , this._deleteItemHandler.bind(this))
        }
    }

    

    _addHandler(){
        this._addHandlerCb(this.id)
    }    
    
    setAddHandler(callback){
        this._addHandlerCb = callback
    }

    _deleteItemHandler(){
        this._deleteHandlerCb(this.id)
    }
    setDeleteItemHandler(callback){
        this._deleteHandlerCb = callback
    }
    quantityMinus(list,$container){
        this._quantity--    
        if(this._quantity == 0){list.remove(this.id)} 
        list.renderCart($container)  
    }
    quantityPlus(list,$container){
        this._quantity++
        list.renderCart($container)
    }
}

