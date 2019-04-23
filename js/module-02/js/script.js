'use strict';

// TASK №1

const numbers = [];
let total = 0;

while (true) {
    const input = prompt('Enter number');
    if (input === null) break; 
    else if (Number.isNaN(Number(input))) {
        alert('Было введено не число, попробуйте еще раз');
    } else {
        numbers.push(Number(input));
    }
}

if (numbers.length !== 0) {
    for (const number of numbers) {
        total += number;
    }
    console.log(`Общая сумма чисел равна ${total}`);
}


// TASK 2

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;


while (attemptsLeft) {
    const userInput = prompt('Enter password');
    if (userInput === null) break;
    if (passwords.includes(userInput)) {
        alert('Добро пожаловать!');
        break;
    } else {
        attemptsLeft -= 1;
         if (attemptsLeft === 0){
         alert(`У вас закончились попытки, аккаунт заблокирован!`);
         break;
        }
        alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток`)
    }
}





