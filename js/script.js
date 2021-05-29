let money = 80000;
   let income = "grants";
   let addExpenses = 'Taxi, Child, Products, Clothes';
    let deposit = true;
    let mission = 780000;
    let  period = 12;
    let budgetDay = money/30;

//alert('Удачи в изучении команд github');

console.log(`Если вы дадите человеку программу, то займете его на один день. 
Если вы научите человека программировать, то займете его на всю жизнь.`);

console.log(typeof money);

console.log(typeof income);

console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`период равен ${period} месяцев
цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay.toFixed(2));
