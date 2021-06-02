'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = "grants",
    expenses = [],
    addExpenses = prompt('Перечислите возможные расходы через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 780000,
    period = 12;

let start = function () {
    do {
        money = +prompt('Ваш месячный доход?');
    }
    while (!isNumber(money) || money === 0)
};

start();

let expensesAmount = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(),
    targetMonth = getTargetMonth(),
    budgetDay = accumulatedMonth / 30;

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            sum += +prompt('Во сколько это обойдется?');
        }
        while (!isNumber(sum) || sum === 0);

    }
    return sum;
}

function getAccumulatedMonth() {
    return money - expensesAmount;
}

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}

let showTypeOf = function (data) {
    console.log(data, typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц:' + expensesAmount);

console.log('Возможные расходы:' + addExpenses.toLowerCase().split(', '));

if (targetMonth > 0){
    console.log('Цель будет достигнута:' + targetMonth);
} else {
    console.log('Цель не будет достигнута');
}

console.log('Бюджет на день:' + Math.floor(budgetDay));

let getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if ((budgetDay >= 600) && (budgetDay < 1200)) {
        return ('У вас средний уровень дохода');
    } else if ((budgetDay > 0) && (budgetDay < 600)) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
}
console.log(getStatusIncome());
