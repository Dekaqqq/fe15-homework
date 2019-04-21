'use strict';

// TASK №1

const numbers = [];
let total = 0;

while (true) {
    const input = prompt('Enter number');
    if (input === null) break; 
    else if (isNaN(input) || input === '') {
        alert('Было введено не число, попробуйте еще раз');
    } else {
        numbers.push(Number(input));
    }
}

if (numbers.length > 0) {
    for (let i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
    }
}

console.log(numbers);
console.log(`Общая сумма чисел равна ${total}`);


// TASK 2

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;


while (true) {
    const userInput = prompt('Enter password');
    if (userInput === null) break;
    if (userInput === '') {
        alert('Enter something');
    }
    if (passwords.includes(userInput)) {
        alert('Добро пожаловать!');
        break;
    } else if (!passwords.includes(userInput) && userInput !== '') {
        attemptsLeft -= 1;
        if (attemptsLeft === 0) {
            alert('У вас закончились попытки, аккаунт заблокирован!');
            break;
        } else {
            alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток`);
        }
    }
}








