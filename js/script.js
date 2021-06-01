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
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = accumulatedMonth / 30;

function getExpensesMonth() {
    return amount1 + amount2;
}

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

function getTargetMonth(){
    return Math.ceil(mission / accumulatedMonth);
}

let showTypeOf = function (data) {
    console.log(data, typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц:' + getExpensesMonth());

console.log('Возможные расходы:' + addExpenses.toLowerCase().split(', '));

console.log('Срок достижения цели в месяцах:'+ getTargetMonth());

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
getStatusIncome();
