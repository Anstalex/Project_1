'use strict';
const btnStart = document.querySelector('#start');
const btnAddIncome = document.getElementsByTagName('button')[0];
const btnAddExpenses = document.getElementsByTagName('button')[1];
const periodAmount = document.querySelector('.period-amount');
//const depositCheck = document.querySelector('#deposit-check');
const addIncomeItems = document.querySelectorAll('.additional_income-item');
const resultValue = document.querySelectorAll('.result-total[class$=-value]');
//const expensesTitle = document.querySelectorAll('input.expenses-title');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const addExpensesItem = document.querySelectorAll('.additional_expenses-item');
const btnCancel = document.querySelector('#cancel');
let incomeAmounts = document.querySelectorAll('input.income-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let dataInput = document.querySelectorAll('.data input');
let salaryAmount = document.querySelector('.salary-amount');
let dataTitle = document.querySelectorAll('input[class$=-title]');
let dataAmount = document.querySelectorAll('input[class$=-amount]');
let dataItem = document.querySelectorAll('input[class$=-item]');


class AppData {
    constructor() {
        this.income = {};
        this.expenses = {};
        this.addExpenses = [];
        this.addIncome = [];
        // this.deposit = false;
        // this.percentDeposit = 0;
        // this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }

    calcSavedMoney() {
        return (this.budgetMonth * periodSelect.value);
    }

    showValue() {
        resultValue[5].value = this.calcSavedMoney();
    }

    regExpString() {
        this.value = this.value.replace(/[^А-Яа-яЁё\s.,]+/g, '');
    }

    regExpNum() {
        this.value = this.value.replace(/\D/g, '');
    }

    regExpNumSalary() {
        let salaryAmountValue = salaryAmount.value
        const isValid = salaryAmount.value.replace(/\D/g, '')
        if (salaryAmountValue !== isValid) {
            this.btnBlock()
        } else if (salaryAmountValue === isValid) {
            this.btnUnlock()
        }
        salaryAmount.value = isValid;
    }

    load() {
        this.btnBlock();
        this.getItem();
    }

    handler(elements, event, callback) {
        for (const element of elements) {
            element.addEventListener(event, callback)
        }
    }

    getItem() {
        salaryAmount = document.querySelector('.salary-amount');
        dataTitle = document.querySelectorAll('input[class$=-title]');
        dataAmount = document.querySelectorAll('input[class$=-amount]');
        dataItem = document.querySelectorAll('input[class$=-item]');
        this.handler(dataTitle, 'keyup', this.regExpString);
        this.handler(dataAmount, 'keyup', this.regExpNum);
        this.handler(dataItem, 'keyup', this.regExpString);
    }

    start() {
        dataInput = document.querySelectorAll('.data input');
        incomeAmounts = document.querySelectorAll('input.income-amount');
        this.getExpInc();
        this.getAddItem(addIncomeItems, this.addIncome)
        this.getAddItem(addExpensesItem, this.addExpenses)
        this.getExpIncMonth()
        this.getBudget();
        this.showResult();
        periodSelect.addEventListener('input', () => {
            this.showValue();
        })
        this.blockInput(dataInput);
        this.budgetMonth = +salaryAmount.value;
        this.addExpenses = [];
        this.addIncome = [];

    }

    removeInput(item, btn) {
        item.forEach((elem, index) => {
            if (index === 0) return null;
            elem.remove()
        })
        if (btn.style.display === 'none') {
            btn.style.display = '';
        }
    }

    reset() {
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');

        let dataInput = document.querySelectorAll('.data input');
        this.unlockInput(dataInput)
        dataInput.forEach((item) => {
            item.value = '';
        })
        this.removeInput(incomeItems, btnAddIncome);
        this.removeInput(expensesItems, btnAddExpenses);
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.incomeMonth = 0;
        this.income = {};
        this.expenses = {};
        this.expensesMonth = 0;
        periodSelect.value = 1;
        periodAmount.innerText = 1;
        resultValue.forEach((item) => {
            item.value = '';
        })
        this.btnShow();
        this.btnBlock();
    }

    changeSalaryValue() {
        this.btnEnable()
        this.budgetMonth = +salaryAmount.value;
    }

    showResult() {
        resultValue[0].value = this.budgetMonth;
        resultValue[1].value = this.budgetDay;
        resultValue[2].value = this.expensesMonth;
        resultValue[4].value = this.addExpenses.join(', ');
        resultValue[3].value = this.addIncome.join(',');
        resultValue[6].value = Math.ceil(this.getTargetMonth());
        resultValue[5].value = this.calcSavedMoney();
    }

    addBlock(item, btn) {
        const className = item[0].className.split('-')[0];
        const cloneItem = item[0].cloneNode(true);
        const titleClone = cloneItem.querySelector(`input.${className}-title`);
        const amountClone = cloneItem.querySelector(`input.${className}-amount`);
        amountClone.value = '';
        titleClone.value = '';
        const parentItem = item[0].parentNode;
        const arr = document.querySelectorAll(`input.${className}-title`)
        parentItem.insertBefore(cloneItem, btn);
        if (arr.length === 2) {
            btn.style.display = 'none';
        }
        this.getItem();
    }

    getExpInc() {
        const run = (item, variable) => {
            const className = item[0].className.split('-')[0];
            let items = document.querySelectorAll(`.${className}-items`);
            items.forEach((elem) => {
                const itemTitle = elem.querySelector(`.${className}-title`).value;
                const itemCash = elem.querySelector(`.${className}-amount`).value;
                if (itemTitle !== '' || itemCash !== '') {
                    variable[itemTitle] = +itemCash;
                }
            })
        }
        run(expensesItems, this.expenses);
        run(incomeItems, this.income);
    }

    getAddItem(item, property) {
        if (item.length === 0) {
            item.value.split(',');
        }
        item.forEach((elem) => {
            let itemValue = elem.value.trim();
            if (itemValue !== '') {
                property.push(itemValue);
            }
        })
    }

    getExpIncMonth() {
        const run = (item) => {
            let sum = 0;
            for (const key in item) {
                const value = item[key];
                sum += +value;
            }
            return sum
        }
        this.expensesMonth = run(this.expenses);
        this.incomeMonth = run(this.income) + +salaryAmount.value;
    }

    getBudget() {
        this.budgetMonth = this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;

    }

    changeValue() {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.innerText = periodSelect.value
    }

    btnHide() {
        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
    }

    btnShow() {
        btnStart.style.display = 'block';
        btnCancel.style.display = 'none';
    }

    btnBlock() {
        btnStart.setAttribute('disabled', 'disabled');
        btnStart.style.pointerEvents = 'none'
    }

    btnUnlock() {
        btnStart.removeAttribute('disabled');
        btnStart.style.pointerEvents = '';
    }

    btnEnable() {
        this.regExpNumSalary()
        if (salaryAmount.value === '') {
            salaryAmount.style.borderColor = 'blue';
            salaryAmount.placeholder = 'Поле не должно быть пустым';
            salaryAmount.focus();
            this.btnBlock()
        } else {
            salaryAmount.style.borderColor = '';
            this.btnUnlock();
        }
    }

    blockInput(items) {
        for (const item of items) {
            item.setAttribute('readonly', 'readonly');
            item.style.backgroundColor = 'rgba(255,127,99,.26)';
        }
        this.btnHide();
    }

    unlockInput(items) {
        for (const item of items) {
            item.removeAttribute('readonly');
            item.style.backgroundColor = '';
        }
        this.btnHide();
    }

    eventListeners() {

        document.addEventListener('DOMContentLoaded', this.load.bind(this))

        salaryAmount.addEventListener('input', this.changeSalaryValue.bind(this));

        btnStart.addEventListener('click', this.start.bind(this));

        btnCancel.addEventListener('click', this.reset.bind(this));


        btnAddExpenses.addEventListener('click', this.addBlock.bind(this, expensesItems, btnAddExpenses))

        btnAddIncome.addEventListener('click', this.addBlock.bind(this, incomeItems, btnAddIncome));

        periodSelect.addEventListener('input', this.changeValue.bind(this));
    }
}


const appData = new AppData();
appData.eventListeners();



