'use strict';
let btnStart = document.querySelector('#start');
let btnAddIncome = document.getElementsByTagName('button')[0];
let btnAddExpenses = document.getElementsByTagName('button')[1];
let periodAmount = document.querySelector('.period-amount');
//let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
let resultValue = document.querySelectorAll('.result-total[class$=-value]');
let dataTitle = document.querySelectorAll('input[class$=-title]');
let dataAmount = document.querySelectorAll('input[class$=-amount]');
let dataItem = document.querySelectorAll('input[class$=-item]');
let salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
//let expensesTitle = document.querySelectorAll('input.expenses-title');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');
let incomeAmounts = document.querySelectorAll('input.income-amount');
let dataInput = document.querySelectorAll('.data input');
let btnCancel = document.querySelector('#cancel');


function regExpNum() {
    const isValid = this.value.replace(/\D/g, '')
    this.value = isValid;
    if (!isValid) {
        appData.btnBlock()
    }
}

function regExpString() {
    this.value = this.value.replace(/[^А-Яа-яЁё\s.,]+/g, '');
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
    load: function () {
        appData.btnBlock();
        appData.getItem();
    },
    handler: function (elements, event, callback) {
        for (const element of elements) {
            element.addEventListener(event, callback)
        }
    },
    validation: function () {
        appData.handler(dataTitle, 'keyup', regExpString);
        appData.handler(dataAmount, 'keyup', regExpNum);
        appData.handler(dataItem, 'keyup', regExpString);
    },
    getItem: function () {
        dataTitle = document.querySelectorAll('input[class$=-title]');
        dataAmount = document.querySelectorAll('input[class$=-amount]');
        dataItem = document.querySelectorAll('input[class$=-item]');
        appData.validation()
    },
    start: function () {
        dataInput = document.querySelectorAll('.data input');
        incomeAmounts = document.querySelectorAll('input.income-amount');
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getBudget();
        this.showResult();
        appData.blockInput(dataInput);
        this.budgetMonth = +salaryAmount.value;
        this.addExpenses = [];
        this.addIncome = [];
        periodSelect.addEventListener('input',function (){
            appData.showValue()
        })
    },
    reset: function () {
        let dataInput = document.querySelectorAll('.data input');
        appData.unlockInput(dataInput)
        dataInput.forEach(function (item) {
            item.value = '';
        })
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.incomeMonth = 0;
        this.income = {};
        this.expenses = {};
        this.expensesMonth = 0;
        periodSelect.value = 1;
        periodAmount.innerText = 1;
        resultValue[0].value = '';
        resultValue[1].value = '';
        resultValue[2].value = '';
        resultValue[4].value = '';
        resultValue[3].value = '';
        resultValue[6].value = '';
        resultValue[5].value = '';
        appData.btnHide();
    },
    changeSalaryValue: function () {
        appData.btnEnable()
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
    calcSavedMoney: function () {
        return (this.budgetMonth * periodSelect.value);
    },
    changeValue: function () {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.innerText = periodSelect.value

    },
    showValue: function (){
        resultValue[5].value = appData.calcSavedMoney();
    },
    btnHide: function () {
        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
    },
    btnBlock: function () {
        btnStart.setAttribute('disabled', 'disabled');
        btnStart.style.pointerEvents = 'none'
    },
    btnUnlock: function () {
        btnStart.removeAttribute('disabled');
        btnStart.style.pointerEvents = '';
    },
    btnEnable: function () {
        if (salaryAmount.value === '') {
            salaryAmount.style.borderColor = 'blue';
            salaryAmount.placeholder = 'Поле не должно быть пустым';
            salaryAmount.focus();
            appData.btnBlock()
        } else {
            appData.btnUnlock();
        }
    },
    blockInput: function (items) {
        for (const item of items) {
            item.setAttribute('readonly', 'readonly');
            item.style.backgroundColor = 'rgba(255,127,99,.26)';
        }
        appData.btnHide();
    },
    unlockInput: function (items) {
        for (const item of items) {
            item.removeAttribute('readonly');
            item.style.backgroundColor = '';
        }
        appData.btnHide();
    }
}


document.addEventListener('DOMContentLoaded', appData.load)

salaryAmount.addEventListener('input', appData.changeSalaryValue.bind(appData));

btnStart.addEventListener('click', appData.start.bind(appData));

btnCancel.addEventListener('click', appData.reset.bind(appData));

btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

btnAddIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.changeValue);
