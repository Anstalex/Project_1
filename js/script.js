'use strict';

let money,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход?');
        }
        while (!isNumber(money) || money === 0)
    };

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            const wordKeys = prompt('Введите обязательную статью расходов?');
            appData.expenses[wordKeys] = +prompt('Во сколько это обойдется');
        }
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            const value = appData.expenses[key];
            sum += value;
        }
        appData.expensesMonth = sum;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        if (money === appData.expensesMonth) {
            appData.period = 0;
        } else {
            appData.period = Math.ceil(appData.mission / appData.budgetMonth)
        }
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) {
            return ('У вас средний уровень дохода');
        } else if ((appData.budgetDay > 0) && (appData.budgetDay < 600)) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Ваши расходы за месяц:' + appData.expensesMonth);

if (appData.period > 0) {
    console.log('Цель будет достигнута через:' + appData.period);
} else {
    console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(appData[key]);
}

