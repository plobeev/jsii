import API from "./API.js";
import GoodList from "./model/GoodList.js";
import Card from "./view/Card.js";
import Cart from "./model/Cart.js";
import GoodInCart from "./model/GoodinCart.js";

function addToCart(id){
    const good = goodList.getById(id);
    cart.add(new GoodInCart(good));
    renderCart(cart,$productCart)
}

function renderCart(itemList,$container){
    itemList.displayTotalQuantity()
    itemList.displaySum()
    $container.innerHTML = "";
    itemList.goods.forEach(card => {
        card.render($container);        
        card.setDeleteItemHandler(quantityMinus)
        card.setAddHandler(quantityPlus)
    });
}

function quantityMinus(){
    this._quantity--    
    if(this._quantity == 0){cart.remove(this.id)}    
    renderCart(cart,$productCart)
}

function quantityPlus(){
    this._quantity++
    renderCart(cart,$productCart)
}

const goodList = new GoodList(API.fetch());
const cart = new Cart([]);
const $productFiltered = document.querySelector('.goods-list-filtered');
const $product = document.querySelector('.goods-list');
const $productCart = document.querySelector('.cart-goods-list');
const cards = goodList.get().map(good => new Card(good));
const filteredGoods = goodList.get().map(good => new Card(good));
console.log(filteredGoods)
cards.forEach(card => {
    card.render($product);
    card.setAddHandler(addToCart);
});

let searchButton = document.querySelector(".search-button")
let searchInput = document.querySelector("#searchBarInput")
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value; 
    $productFiltered.innerHTML = "";
    filteredGoods.forEach(card => {
        card.setAddHandler(addToCart);
        card.filterGoods(value,$productFiltered);
    });
    
});