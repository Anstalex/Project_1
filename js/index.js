'use strict';
let btnStart = document.querySelector('#start');
let btnAddIncome = document.getElementsByTagName('button')[0];
let btnAddExpenses = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
let resultValue = document.querySelectorAll('.result-total[class$=-value]');
let dataTitle = document.querySelectorAll('input[class$=-title]');
let dataAmount = document.querySelectorAll('input[class$=-amount]');
let dataItem = document.querySelectorAll('input[class$=-item]');
let salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let expensesTitle = document.querySelectorAll('input.expenses-title');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');
let incomeAmounts = document.querySelectorAll('input.income-amount');
let dataInput = document.querySelectorAll('.data input');
let btnCancel = document.querySelector('#cancel');

btnStart.setAttribute('disabled', 'disabled');
btnStart.style.pointerEvents = 'none';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function handler(elements, event, callback) {
    for (const element of elements) {
        element.addEventListener(event, callback)
    }
}

function regExpNum() {
    const isValid = this.value.replace(/\D/g, '')
    this.value = isValid;
    if (!isValid) {
        btnStart.setAttribute('disabled', 'disabled');
        btnStart.style.pointerEvents = 'none'
    }
}

function regExpString() {
    this.value = this.value.replace(/[^a-zA-ZА-Яа-яЁё\s.,]+/g, '');
}

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getItem: function (){
        let dataTitle = document.querySelectorAll('input[class$=-title]');
        let dataAmount = document.querySelectorAll('input[class$=-amount]');
        let dataItem = document.querySelectorAll('input[class$=-item]');
        handler(dataTitle, 'keyup', regExpString);
        handler(dataAmount, 'keyup', regExpNum);
        handler(dataItem, 'keyup', regExpString);
    },
    start: function () {
        let dataInput = document.querySelectorAll('.data input');
        incomeAmounts = document.querySelectorAll('input.income-amount');
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getBudget();
        this.showResult();
        blockInput(dataInput);
        this.budgetMonth = +salaryAmount.value;
        this.addExpenses = [];
        this.addIncome = [];
        //  this.getInfoDeposit();
    },
    reset: function () {
        let dataInput = document.querySelectorAll('.data input');
        unlockInput(dataInput)
        dataInput.forEach(function (item) {
            item.value = '';
        })
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.incomeMonth = 0;
        this.income = {};
        this.expenses = {};
        this.expensesMonth = 0;
        resultValue[0].value = '';
        resultValue[1].value = '';
        resultValue[2].value = '';
        resultValue[4].value = '';
        resultValue[3].value = '';
        resultValue[6].value = '';
        resultValue[5].value = '';
        btnStart.setAttribute('disabled', 'disabled');
        btnStart.style.pointerEvents = 'none'
    },
    changeSalaryValue: function () {
        this.budgetMonth = +salaryAmount.value;
    },
    showResult: function () {
        resultValue[0].value = this.budgetMonth;
        resultValue[1].value = this.budgetDay;
        resultValue[2].value = this.expensesMonth;
        resultValue[4].value = this.addExpenses.join(', ');
        resultValue[3].value = this.addIncome.join(',');
        resultValue[6].value = Math.ceil(this.getTargetMonth());
        resultValue[5].value = this.calcSavedMoney();
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        let titleClone = cloneIncomeItem.querySelector('input.income-title');
        let amountClone = cloneIncomeItem.querySelector('input.income-amount');
        amountClone.value = '';
        titleClone.value = '';
        let parentIncome = incomeItems[0].parentNode;
        parentIncome.insertBefore(cloneIncomeItem, btnAddIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnAddIncome.style.display = 'none';
        }
        appData.getItem();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let titleClone = cloneExpensesItem.querySelector('input.expenses-title');
        let amountClone = cloneExpensesItem.querySelector('input.expenses-amount');
        amountClone.value = '';
        titleClone.value = '';
        let parentExpenses = expensesItems[0].parentNode;
        parentExpenses.insertBefore(cloneExpensesItem, btnAddExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnAddExpenses.style.display = 'none';
        }
        appData.getItem();
    },
    getExpenses: function () {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' || cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        })
    },
    getIncome: function () {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' || cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        })
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItems.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })

    },
    //     appData.deposit = confirm('Есть ли у вас депозит в банке?');
    // },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in this.expenses) {
            const value = this.expenses[key];
            sum += +value;
        }
        this.expensesMonth = sum;
    },
    getIncomeMonth: function () {
        let sum = 0;
        for (let key in this.income) {
            const value = this.income[key];
            sum += +value;
        }
        this.incomeMonth = sum + this.budgetMonth;
    },
    getBudget: function () {
        this.budgetMonth = this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;

    },
    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if ((this.budgetDay >= 600) && (this.budgetDay < 1200)) {
            return ('У вас средний уровень дохода');
        } else if ((this.budgetDay > 0) && (this.budgetDay < 600)) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },
    // getInfoDeposit: function () {
    //     if (this.deposit) {
    //         do {
    //             this.percentDeposit = prompt('Какой годовой процент депозита?', '10')
    //         }
    //         while (!isNumber(this.percentDeposit) || this.percentDeposit > 99)
    //         do {
    //             this.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
    //         }
    //         while (!isNumber(this.moneyDeposit))
    //     }
    // },
    calcSavedMoney: function () {
        return (this.budgetMonth * periodSelect.value);
    },
};

function blockInput(items) {
    for (const item of items) {
        item.setAttribute('readonly', 'readonly');
        item.style.backgroundColor = 'rgba(255,127,99,.26)';
    }
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
}

function unlockInput(items) {
    for (const item of items) {
        item.removeAttribute('readonly');
        item.style.backgroundColor = '';
    }
    btnStart.style.display = 'block';
    btnCancel.style.display = 'none';
}

function btnEnable() {
    if (salaryAmount.value === '') {
        salaryAmount.style.borderColor = 'blue';
        salaryAmount.placeholder = 'Поле не должно быть пустым';
        salaryAmount.focus();
        btnStart.setAttribute('disabled', 'disabled');
        btnStart.style.pointerEvents = 'none';
    } else {
        btnStart.removeAttribute('disabled');
        btnStart.style.pointerEvents = ''
    }
}

salaryAmount.addEventListener('input', btnEnable);

function changeValue() {
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.innerText = periodSelect.value
}

function changeValueIncome() {
    resultValue[5].value = appData.calcSavedMoney();
}

salaryAmount.addEventListener('input', appData.changeSalaryValue.bind(appData));

btnStart.addEventListener('click', appData.start.bind(appData));

btnCancel.addEventListener('click', appData.reset.bind(appData));

btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

btnAddIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', changeValue);

periodSelect.addEventListener('input', changeValueIncome);



// dataAmount.addEventListener('keyup',regExp )
// dataTitle.addEventListener('keyup', function(){
//     this.value = this.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// });

//let words = appData.addExpenses;

// function format() {
//     let newWords = '';
//     for (let i = 0; i < words.length; i++) {
//         newWords += words[i].charAt(0).toUpperCase() + words[i].substr(1) + ', ';
//     }
//     console.log(newWords);
// }
// console.log(resultValue)
// format();

// console.log('Ваши расходы за месяц:' + appData.expensesMonth);
//
// if (appData.period > 0) {
//     console.log('Цель будет достигнута через:' + appData.period);
// } else {
//     console.log('Цель не будет достигнута');
// }
// console.log(appData.getStatusIncome());
// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//     console.log(key + ': ' + appData[key]);
// }

