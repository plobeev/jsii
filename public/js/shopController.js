import eventEmmiter from "./helpers/eventEmmiter.js"
import Cart from "./model/Cart.js"
import Showcase from "./model/Showcase.js"
import PurchasedGood from "./model/PurchasedGood.js"
import CardView from "./view/CardView.js"
import CartBtnView from "./view/CartBtnView.js"

export default {
    _eventEmiter: eventEmmiter,
    _showcaseModel: new Showcase(),
    _cartModel: new Cart(),

    init() {
        this._eventEmiter.addListener('added', this._renderCart.bind(this))
        this._eventEmiter.addListener('removed', this._renderCart.bind(this))
        this._eventEmiter.addListener('loaded', this._renderCart.bind(this))
        this._eventEmiter.addListener('loaded', this._renderShowcase.bind(this))

        this._cartModel.load();
        this._showcaseModel.load();
    },

    _addToCart(id) {
        const good = new PurchasedGood(this._showcaseModel.get(id));
        this._cartModel.add(good);
    },

    _removeFromCart(id) {
        this._cartModel.remove(id);
    },

    _renderCart() {
    
        const $header = document.querySelector('header');
        document.querySelector('.cart-info').remove()
        new CartBtnView(this._cartModel.getCount(),this._cartModel.getSum()).render($header, 'beforeend')
    },

    _renderShowcase() {
        const $product = document.querySelector('.goods-list');
        $product.textContent = '';

        this._showcaseModel.getAll().forEach(
            good => {
                const card = new CardView(good)
                card.render($product, 'beforeend');
                card.setAddHandler(this._addToCart.bind(this))
            }
        )
    }
}