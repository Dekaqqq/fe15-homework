'use strict';

// Задание №1 



const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message = prompt('Enter password');

if (message === null) {
    message = 'Отменено пользователем!';
} else if (message === ADMIN_PASSWORD) {
    message = 'Добро пожаловать!';
} else {
    message = 'Доступ запрещен, неверный пароль!'
} 

alert(message);




// Задание №2




const credits = 23580;
const pricePerDroid = 3000;
const valueDroid = prompt('How many droids do you want to buy?');


if (valueDroid === null) {
    console.log(`Отменено пользователем!`);
} else {
    const totalPrice = Number(valueDroid) * pricePerDroid;
    if (credits < totalPrice) {
        console.log(`Недостаточно средств на счету!`);
    } else {
        const accountBalance = credits - totalPrice;
        console.log(`Вы купили ${valueDroid} дроидов, на счету осталось ${accountBalance} кредитов.`);
    }
}






// Задание №3



const userCountry = prompt('What country are you from?');
let price;

if (userCountry === null) {
    console.log('Write country, please');
} else {
    const userCountryLower = userCountry.toLowerCase();
    
    switch(userCountryLower) {
        case 'китай':
        price = 100;
        console.log(`Доставка в ${userCountryLower} будет стоить ${price} кредитов.`);
        break;
        case 'южная америка':
        price = 250;
        console.log(`Доставка в ${userCountryLower} будет стоить ${price} кредитов.`);
        break;
        case 'австралия':
        price = 170;
        console.log(`Доставка в ${userCountryLower} будет стоить ${price} кредитов.`);
        break;
        case 'индия':
        price = 80;
        console.log(`Доставка в ${userCountryLower} будет стоить ${price} кредитов.`);
        break;
        case 'ямайка':
        price = 120;
        console.log(`Доставка в ${userCountryLower} будет стоить ${price} кредитов.`);
        break;
        default:
        console.log('В вашей стране доставка не доступна');
    }
}
