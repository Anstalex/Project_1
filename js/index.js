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


const AppData = function () {
    this.income = {};
    this.incomeMonth = [];
    this.expenses = {};
    this.addExpenses = [];
    this.addIncome = [];
    // this.deposit = false;
    // this.percentDeposit = 0;
    // this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.calcSavedMoney = function (){
        return (this.budgetMonth * periodSelect.value);
    };
    this.showValue = function () {
        resultValue[5].value = this.calcSavedMoney();
    };
 }

 AppData.prototype.regExpString = function () {
    this.value = this.value.replace(/[^А-Яа-яЁё\s.,]+/g, '');
};

// AppData.prototype.regExpNum = function () {
//     this.value = this.value.replace(/\D/g, '');
// };
AppData.prototype.regExpNum = function () {
    this.value= this.value.replace(/\D/g, '');
}
AppData.prototype.regExpNumSalary = function () {
    let salaryAmountValue = salaryAmount.value
    const isValid = salaryAmount.value.replace(/\D/g, '')
    if (salaryAmountValue !== isValid) {
        AppData.prototype.btnBlock()
    }
    else if (salaryAmountValue === isValid) {
        AppData.prototype.btnEnable()
    }
        salaryAmount.value = isValid;
    }

AppData.prototype.load = function () {
    AppData.prototype.btnBlock();
    AppData.prototype.getItem();
}
AppData.prototype.handler = function (elements, event, callback) {
    for (const element of elements) {
        element.addEventListener(event, callback)
    }
};

AppData.prototype.getItem = function () {
    salaryAmount = document.querySelector('.salary-amount');
    dataTitle = document.querySelectorAll('input[class$=-title]');
    dataAmount = document.querySelectorAll('input[class$=-amount]');
    dataItem = document.querySelectorAll('input[class$=-item]');
     this.handler(dataTitle, 'keyup', this.regExpString);
    this.handler(dataAmount, 'keyup', this.regExpNum);
     this.handler(dataItem, 'keyup', this.regExpString);
};
AppData.prototype.start = function () {
    const self = this;
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
    periodSelect.addEventListener('input', function () {
        self.showValue();
    })
    this.blockInput(dataInput);
    this.budgetMonth = +salaryAmount.value;
    this.addExpenses = [];
    this.addIncome = [];

};
AppData.prototype.reset = function () {
    let dataInput = document.querySelectorAll('.data input');
    AppData.prototype.unlockInput(dataInput)
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
    AppData.prototype.btnShow();
    AppData.prototype.btnBlock();
};
AppData.prototype.changeSalaryValue = function () {
    this.regExpNumSalary();
    this.budgetMonth = +salaryAmount.value;
};
AppData.prototype.showResult = function () {
    resultValue[0].value = this.budgetMonth;
    resultValue[1].value = this.budgetDay;
    resultValue[2].value = this.expensesMonth;
    resultValue[4].value = this.addExpenses.join(', ');
    resultValue[3].value = this.addIncome.join(',');
    resultValue[6].value = Math.ceil(this.getTargetMonth());
    resultValue[5].value = this.calcSavedMoney();
};
AppData.prototype.addIncomeBlock = function () {
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
    AppData.prototype.getItem();
};
AppData.prototype.addExpensesBlock = function () {
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
    AppData.prototype.getItem();
};
AppData.prototype.getExpenses = function () {
    expensesItems = document.querySelectorAll('.expenses-items');
    const self = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' || cashExpenses !== '') {
            self.expenses[itemExpenses] = +cashExpenses;
        }
    })
};
AppData.prototype.getIncome = function () {
    incomeItems = document.querySelectorAll('.income-items');
    const self = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' || cashIncome !== '') {
            self.income[itemIncome] = +cashIncome;
        }
    })
};
AppData.prototype.getAddExpenses = function () {
    const self = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            self.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    const self = this;
    additionalIncomeItems.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            self.addIncome.push(itemValue);
        }
    })

};
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    for (let key in this.expenses) {
        const value = this.expenses[key];
        sum += +value;
    }
    this.expensesMonth = sum;
};
AppData.prototype.getIncomeMonth = function () {
    let sum = 0;
    for (let key in this.income) {
        const value = this.income[key];
        sum += +value;
    }
    this.incomeMonth = sum + this.budgetMonth;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;

};

AppData.prototype.changeValue = function () {
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.innerText = periodSelect.value

};

AppData.prototype.btnHide = function () {
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
};
AppData.prototype.btnShow = function () {
    btnStart.style.display = 'block';
    btnCancel.style.display = 'none';
};
AppData.prototype.btnBlock = function () {
    btnStart.setAttribute('disabled', 'disabled');
    btnStart.style.pointerEvents = 'none'
};
AppData.prototype.btnUnlock = function () {
    btnStart.removeAttribute('disabled');
    btnStart.style.pointerEvents = '';
};
AppData.prototype.btnEnable = function () {
    console.log(this);
    if (salaryAmount.value === '') {
        salaryAmount.style.borderColor = 'blue';
        salaryAmount.placeholder = 'Поле не должно быть пустым';
        salaryAmount.focus();
        console.log(this)
        AppData.prototype.btnBlock()
    } else {
        AppData.prototype.btnUnlock();
    }
};
AppData.prototype.blockInput = function (items) {
    for (const item of items) {
        item.setAttribute('readonly', 'readonly');
        item.style.backgroundColor = 'rgba(255,127,99,.26)';
    }
    AppData.prototype.btnHide();
};
AppData.prototype.unlockInput = function (items) {
    for (const item of items) {
        item.removeAttribute('readonly');
        item.style.backgroundColor = '';
    }
    AppData.prototype.btnHide();
}
AppData.prototype.EventListeners = function (){

    document.addEventListener('DOMContentLoaded', this.load)

    salaryAmount.addEventListener('input', this.changeSalaryValue.bind(this));

    btnStart.addEventListener('click', this.start.bind(this));

    btnCancel.addEventListener('click', this.reset.bind(this));

    btnAddExpenses.addEventListener('click', this.addExpensesBlock);

    btnAddIncome.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', this.changeValue);
}



const appData = new AppData();
appData.EventListeners();



