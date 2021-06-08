'use strict';
let btnStart = document.getElementById('start'),
    btnAddIncome = document.getElementsByTagName('button')[0],
    btnAddExpenses = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    incomeItem = document.querySelectorAll('.additional_income-item'),
    resultValue = document.querySelectorAll('.result-total[class$=-value]'),
    amount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

//Временно заккоментировала код, чтобы дать странице загружаться без prompt


/*let money,
    itemIncome,
    cashIncome,
    wordKeys,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход?', '90000');
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
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 50000,
        period: 3,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function () {
            let addExpenses = prompt('Перечислите возможные расходы через запятую', 'такси, детский сад, интернет');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');

            for (let i = 0; i < 2; i++) {
                do {
                    wordKeys = prompt('Введите обязательную статью расходов?', 'такси');
                }
                while (isNumber(wordKeys))
                do {
                    appData.expenses[wordKeys] = +prompt('Во сколько это обойдется', '5000');
                }
                while (!isNumber(appData.expenses[wordKeys]))
            }
            if (confirm('Есть ли у вас дополнительный источник заработка?')) {
                do {
                    itemIncome = prompt('Какой у вас дополнительный заработок', 'стипендия')
                }
                while (isNumber(itemIncome))

                do {
                    cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', '12000')
                }
                while (!isNumber(cashIncome));
                appData.income[itemIncome] = cashIncome;
            }
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        }
        ,
        getExpensesMonth:
            function () {
                let sum = 0;
                for (let key in appData.expenses) {
                    const value = appData.expenses[key];
                    sum += value;
                }
                appData.expensesMonth = sum;
            }

        ,

        getBudget: function () {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = appData.budgetMonth / 30;
        }
        ,
        getTargetMonth: function () {
            if (money === appData.expensesMonth) {
                appData.period = 0;
            } else {
                appData.period = Math.ceil(appData.mission / appData.budgetMonth)
            }
        }
        ,
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
        ,
        getInfoDeposit: function () {
            if (appData.deposit) {
                do {
                    appData.percentDeposit = prompt('Какой годовой процент депозита?', '10')
                }
                while (!isNumber(appData.percentDeposit) || appData.percentDeposit > 99)
                do {
                    appData.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
                }
                while (!isNumber(appData.moneyDeposit))
            }
        }
        ,
        calcSavedMoney: function () {
            return appData.budgetMonth * appData.period;
        }
        ,
    }
;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.calcSavedMoney();

let words = appData.addExpenses;

function format() {
    let newWords = '';
    for (let i = 0; i < words.length; i++) {
        newWords += words[i].charAt(0).toUpperCase() + words[i].substr(1) + ', ';
    }
    console.log(newWords);
}

format();

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

*/
