'use strict';

let money;
let itemIncome;
let cashIncome;
let wordKeys;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function () {
    do {
        money = +prompt('Ваш месячный доход?', '90000');
    }
    while (!isNumber(money) || money === 0)
};

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let arr = prompt('Перечислите возможные расходы через запятую', 'сад, проезд, интернет');
        let newArr = arr.toLowerCase().split(',').map(function (el) {
            return el.trim();
        });
        function format() {
            let newWords = '';
            for (let i = 0; i < newArr.length; i++) {
                newWords += newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1) + ', ';
            }
            appData.addExpenses = newWords;
            console.log(newWords);
        }
        format();
        for (let i = 0; i < 2; i++) {
            do {
                wordKeys = prompt('Введите обязательную статью расходов?', 'Проезд');
            }
            while (isNumber(wordKeys) || wordKeys === 0)
            do {
                appData.expenses[wordKeys] = +prompt('Во сколько это обойдется', '3000');
            }
            while (!isNumber(appData.expenses[wordKeys]) || appData.expenses[wordKeys] === 0)
        }
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок', 'стипендия')
            }
            while (isNumber(itemIncome))

            do {
                cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', '10000')
            }
            while (!isNumber(cashIncome) || cashIncome === 0);
            appData.income[itemIncome] = cashIncome;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент депозита?', '10')
            }
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit > 99)
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
            }
            while (!isNumber(appData.moneyDeposit)|| appData.moneyDeposit === 0)
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    },
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.calcSavedMoney();
console.log('Ваши расходы за месяц:' + appData.expensesMonth);

if (appData.period > 0) {
    console.log('Цель будет достигнута через:' + appData.period);
} else {
    console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}

