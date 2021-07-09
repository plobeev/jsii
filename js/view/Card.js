export default class Card {
    constructor(good) {
        this._data = good;
    }

    getHtml() {
        return `<div class="goods-item"><h3>${this._data.title}</h3><p>${this._data.getPrice()}</p><p class="item-description">${this._data.description}</p><div class="goods-list-img"></div></div>`;
    }

    render($container, target = 'beforeend') {
        $container.insertAdjacentHTML(target, this.getHtml());
    }
    
}