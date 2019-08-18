'use strict';

var COUTN_DISHES = 8;
var COOCING = ['meat', 'chiken', 'rice', 'patatos', 'kebab'];
var DATA_PRODUCT = {
    errorcode: 0,
    errorstring: '',
    params: ''
}
var NAME = ['Вася', 'Коля', 'Миша', 'Алексей', 'Иван', 'Григорий', 'Андрей'];
var SURNAME = ['Пупкин', 'Иванович', 'Никифоров', 'Тимофеев'];

var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var DishObject = function () {
    return {
        id: 1000,
        grp_id: 2000,
        name: COOCING[getRandom(0, COOCING.length - 1)],
        color: 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')',
        font_color: 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')',
        type: 'dish',
        includedinsections: '',
        includedinmenu: true,
        img: 1010100101,
        deleted: false,
        price: 10.0,
        fat: 0,
        fiber: 1.1,
        carbs: 0.1,
        energy: 1.1,
        weight: 120,
        capacity: 0.6,
        allergen: 'atention',
        alkopercent: 0.01,
        stop_list: 0,
        category: 2222,
        description: 'it\'s delition',
        fullname: 'soup',
        fullnameenglish: 'soup',
        descriptionenglish: 'it\'s delitions',
        kitchenname: 'bla',
        inquickmenu: false,
        qrow: '',
        qcolumn: '',
        qpage: '',
        natsenka: 0,
        cost: 120,
        costperc: 0,
        dish_discounts:[0, 5, 10]
    }
}

var CustomerObject = function (id) {
    return {
        whenCreated: new Date(), 
        registeredDate: new Date(),
        lastVisitDate: new Date(),
        firstOrderDate: new Date(),
        anonymized: false,
        birthday: new Date(getRandom(1970, 2000), getRandom(1, 12), getRandom(1, 28)),
        comment: '',
        email: '',
        id: id,
        isDeleted: false,
        middleName: '',
        name: NAME[getRandom(0, NAME.length - 1)],
        phone: '',
        surname: SURNAME[getRandom(0, SURNAME.length - 1)]
    }
}

var getDish = function () {
    var arrDishes = new Array;

    for (var i = 0; i < COUTN_DISHES; i++) {
        var tempObj = DishObject();
        tempObj.id = tempObj.id + i;
        tempObj.grp_id = tempObj.grp_id + i;
        arrDishes.push(tempObj);
    }

    return arrDishes;
}

var dishes = getDish();
DATA_PRODUCT.dishes = dishes;

var getOption = function (item, template) {
    var element = template.cloneNode(true);
    element.value = item.id;
    element.text = ('surname' in item) ? (item.name + ' ' + item.surname) : item.name;

    return element;
}

var renderData = function (data, list, isDel, template) {
    var fragment = document.createDocumentFragment();

    data.forEach(element => {
        if (!element[isDel])
        fragment.appendChild(getOption(element, template));
    });

    list.appendChild(fragment);
}

var dataCustomers = new Array();
var countCustomers = NAME.length + SURNAME.length;
for (var i = 0; i < countCustomers; i++) {
    dataCustomers.push(CustomerObject(400 + i));
}

var getCost = function (id) {
    var item = dishes.find(element => {
        if (element.id === id) {
            return element.cost;
        }
    });

    return item === undefined ? 0 : item.cost;
}

var removeProducts = function (evn) {
    evn.preventDefault();

    var sum = parseInt(sumStr.textContent, 10);
    var selectedItems = Array.prototype.slice.call(productsList.selectedOptions);
    selectedItems.forEach(element => {
        sum += getCost(parseInt(element.value, 10));
        resultList.appendChild(element);
    });

    sumStr.textContent = sum;
}

var orderForm = document.querySelector('.orderForm');
var customersList = orderForm.querySelector('.lists__custumers');
var productsList = orderForm.querySelector('.lists__products');
var resultList = orderForm.querySelector('.orderForm__result-list');
var removeBtn = orderForm.querySelector('.orderForm__btn-remove');
var sendBtn = orderForm.querySelector('.orderForm__submit');
var sumStr = orderForm.querySelector('.ordreForm__sum');

var templateOption = document.querySelector('#temp-item').content.querySelector('option');

renderData(dataCustomers, customersList, 'isDeleted',  templateOption);
renderData(DATA_PRODUCT.dishes, productsList, 'deleted', templateOption);

removeBtn.addEventListener('click', removeProducts);