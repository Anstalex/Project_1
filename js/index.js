'use strict';
const btnStart = document.querySelector('#start');
const btnAddIncome = document.getElementsByTagName('button')[0];
const btnAddExpenses = document.getElementsByTagName('button')[1];
const periodAmount = document.querySelector('.period-amount');
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const addIncomeItems = document.querySelectorAll('.additional_income-item');
const resultValue = document.querySelectorAll('.result-total[class$=-value]');
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
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }

    calcSavedMoney = () => {
        const MonthDeposit = this.moneyDeposit * (this.percentDeposit / 100)
        this.budgetMonth = this.incomeMonth - this.expensesMonth + MonthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return (this.budgetMonth * periodSelect.value);
    }

    showValue = () => {
        resultValue[5].value = this.calcSavedMoney();
    }

    regExpString() {
        this.value = this.value.replace(/[^А-Яа-яЁё\s.,]+/g, '');
    }

    regExpNum() {
        this.value = this.value.replace(/\D/g, '');
    }

    load = () => {
        this.btnBlock();
        this.getItem();
    }

    handler = (elements, event, callback) => {
        for (const element of elements) {
            element.addEventListener(event, callback)
        }
    }

    getItem = () => {
        salaryAmount = document.querySelector('.salary-amount');
        dataTitle = document.querySelectorAll('input[class$=-title]');
        dataAmount = document.querySelectorAll('input[class$=-amount]');
        dataItem = document.querySelectorAll('input[class$=-item]');
        this.handler(dataTitle, 'keyup', this.regExpString);
        this.handler(dataAmount, 'keyup', this.regExpNum);
        this.handler(dataItem, 'keyup', this.regExpString);
    }

    start = () => {
        dataInput = document.querySelectorAll('.data input');
        incomeAmounts = document.querySelectorAll('input.income-amount');
        depositBank.style.pointerEvents = 'none'
        depositBank.style.backgroundColor = '#C9D4D4';
        this.getInfoDeposit()
        this.getExpInc();
        this.getAddItem(addIncomeItems, this.addIncome)
        this.getAddItem(addExpensesItem, this.addExpenses)
        this.getExpIncMonth()
        this.calcSavedMoney()
        this.showResult();
        periodSelect.addEventListener('input', () => {
            this.showValue();
        })
        this.blockInput(dataInput);
        this.budgetMonth = +salaryAmount.value;
        this.addExpenses = [];
        this.addIncome = [];

    }

    removeInput = (item, btn) => {
        item.forEach((elem, index) => {
            if (index === 0) return null;
            elem.remove()
        })
        if (btn.style.display === 'none') {
            btn.style.display = '';
        }
    }

    reset = () => {
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
        depositCheck.checked = false;
        depositPercent.style.display = 'none'
        depositBank.style.pointerEvents = ''
        depositBank.style.backgroundColor = '';
        this.depositHandler()
        this.btnShow();
        this.btnBlock();
    }

    btnStatus = () => {
        if ((this.btnEnable(depositPercent)) && (this.btnEnable(salaryAmount))) {
            this.btnUnlock()
        } else {
            this.btnBlock()
        }
    }

    showResult = () => {
        resultValue[0].value = this.budgetMonth;
        resultValue[1].value = this.budgetDay;
        resultValue[2].value = this.expensesMonth;
        resultValue[4].value = this.addExpenses.join(', ');
        resultValue[3].value = this.addIncome.join(',');
        resultValue[6].value = Math.ceil(this.getTargetMonth());
        resultValue[5].value = Math.ceil(this.calcSavedMoney());
    }

    addBlock = (item, btn) => {
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

    getExpInc = () => {
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

    getAddItem = (item, property) => {
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

    getExpIncMonth = () => {
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

    getTargetMonth = () => {
        return targetAmount.value / this.budgetMonth;

    }

    changeValue = () => {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.innerText = periodSelect.value
        resultValue[5].value = Math.ceil(this.calcSavedMoney());

    }

    btnHide = () => {
        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
    }

    btnShow = () => {
        btnStart.style.display = 'block';
        btnCancel.style.display = 'none';
    }

    btnBlock = () => {
        btnStart.setAttribute('disabled', 'disabled');
        btnStart.style.pointerEvents = 'none'
    }

    btnUnlock = () => {
        btnStart.removeAttribute('disabled');
        btnStart.style.pointerEvents = '';
    }

    btnEnable = (input) => {
        const isValid = input.value.replace(/\D/g, '')
        input.value = isValid;
        if (getComputedStyle(input).display !== 'none') {
            if (input.value === '') {
                input.style.borderColor = 'blue';
                input.placeholder = 'Поле не должно быть пустым';
                return false
            } else if (input.value === isValid) {
                if (input.style.display === 'inline-block') {
                    if (input.value.length > 2) {
                        input.value = ''
                        input.placeholder = 'Введите число от 1 до 99'
                        return false
                    } else {
                        input.style.borderColor = '';
                        return true
                    }
                } else {
                    return true
                }
            }
        } else {
            return true
        }
    }



    blockInput = (items) => {
        for (const item of items) {
            item.setAttribute('readonly', 'readonly');
            item.style.backgroundColor = '#C9D4D4';
        }
        this.btnHide();
    }

    unlockInput = (items) => {
        for (const item of items) {
            item.removeAttribute('readonly');
            item.style.backgroundColor = '';
        }
        this.btnHide();
    }

    changePercent = () => {
        const valueSelect = depositBank.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            this.btnStatus()
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';

        }
    }

    getInfoDeposit = () => {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    depositHandler = () => {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block'
            depositAmount.style.display = 'inline-block'
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none'
            depositAmount.style.display = 'none'
            depositAmount.value = '';
            depositBank.value = '';
            this.deposit = false;
            depositPercent.style.display = 'none'
            depositBank.removeEventListener('change', this.changePercent);


        }
    }

    eventListeners = () => {

        document.addEventListener('DOMContentLoaded', this.load)

        salaryAmount.addEventListener('input', this.btnStatus);

        btnStart.addEventListener('click', this.start);

        btnCancel.addEventListener('click', this.reset);

        btnAddExpenses.addEventListener('click', () => {
            this.addBlock(expensesItems, btnAddExpenses)
        })

        btnAddIncome.addEventListener('click', () => {
            this.addBlock(incomeItems, btnAddIncome)
        });

        periodSelect.addEventListener('input', this.changeValue);

        depositCheck.addEventListener('change', this.depositHandler)
        depositPercent.addEventListener('input', this.btnStatus)
        depositBank.addEventListener('change', this.changePercent)
        depositPercent.addEventListener('input', () => {
            this.btnEnable(depositPercent)
        })
    }
}


const appData = new AppData();
appData.eventListeners();



