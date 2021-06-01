'use strict';
let money = +prompt('Ваш месячный доход?', '80000'),
    income = "grants",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'Квартплата, проезд'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов?', 'Квартплата'),
    amount1 = +prompt('Во сколько это обойдется?', '10000'),
    expenses2 = prompt('Введите обязательную статью расходов?', 'Проезд'),
    amount2 = +prompt('Во сколько это обойдется?', '5000'),
    mission = 780000,
    period = 12,
    budgetMonth = money - amount1 - amount2,
    budgetDay = budgetMonth / 30;

//alert('Удачи в изучении команд github');
//console.log(`Если вы дадите человеку программу, то займете его на один день.
//Если вы научите человека программировать, то займете его на всю жизнь.`);

console.log(typeof money);

console.log(typeof income);

console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`период равен ${period} месяцев
цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetMonth);

console.log(Math.ceil(mission / budgetMonth))

console.log(Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if ((budgetDay >= 600) && (budgetDay < 1200)) {
    console.log('У вас средний уровень дохода');
} else if ((budgetDay >= 0) && (budgetDay < 600)) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}
