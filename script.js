"use strict"


function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}




//let isLoggedIn = false;
const userName = document.getElementById('userName');
const userPin = document.getElementById('userPin');
const logInButton = document.getElementById('logInButton');
logInButton.addEventListener('click', checkLogIn);
let currentAccount;




    const account1 = {
        owner: 'Jonas Schmedtmann',
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
        interestRate: 1.2, // %
        pin: 1111,
    };

    const account2 = {
        owner: 'Jessica Davis',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        interestRate: 1.5,
        pin: 2222,
    };

    const account3 = {
        owner: 'Steven Thomas Williams',
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
        interestRate: 0.7,
        pin: 3333,
    };

    const account4 = {
        owner: 'Sarah Smith',
        movements: [430, 1000, 700, 50, 90],
        interestRate: 1,
        pin: 4444,
    };

    const accounts = [account1, account2, account3, account4];
    let Dates = new Date();

    const elContainer = document.querySelector('.money-movement-container');
    const transferMoneyBtn = document.querySelector('.transfer-money-button');
    const requestLoanBtn = document.querySelector('.request-loan-button');
    const containerApp = document.querySelector('.main-container');
    document.querySelector('.current-time').textContent = `As of ${Dates.getDay()}/${Dates.getMonth()}/${Dates.getFullYear()}, ${Dates.toLocaleTimeString()}`
    const sortElements = document.querySelector('.sort');
    const closeAccountBtn = document.querySelector('.close-account-button');




    transferMoneyBtn.addEventListener('click', transferMoney, false);
    requestLoanBtn.addEventListener('click', requestLoan, false);
    sortElements.addEventListener('click', sort, false);
    closeAccountBtn.addEventListener('click', closeAccount, false);




    function checkLogIn()
    {
        currentAccount = accounts.find(
            acc => acc.username === userName.value
        );
        //console.log(currentAccount);
        if (currentAccount?.pin === Number(userPin.value)) {
            // Display UI and message
            document.querySelector('.login-name').textContent = `Welcome back, ${
                currentAccount.owner.split(' ')[0]
            }`;
            containerApp.classList. remove('hidden');

            // Clear input fields
            userName.value = userPin.value = '';
            userPin.blur();

            // Update UI
            updateUI(currentAccount);
        }
    }

    function transferMoney(event) {

        event.preventDefault();
        let transferUsername = document.querySelector('.transfer-input-name').value;
        let transferInput = document.querySelector('.transfer-input').value;

        const amount = Number(transferInput);
        const recciverAccount = accounts.find(
            acc => acc.username === transferUsername
        );
        transferUsername = transferInput = '';

        if (
            amount > 0 &&
            recciverAccount &&
            currentAccount.balance >= amount &&
            recciverAccount?.username !== currentAccount.username
        ) {
            // Doing the transfer
            currentAccount.movements.push(-amount);
            recciverAccount.movements.push(amount);

            // Update UI
            updateUI(currentAccount);
        }

        console.log(  currentAccount.balance  );





    }

    function closeAccount(event)
    {
        event.preventDefault();

        const closeInputUsername = document.querySelector('.close-input-user');
        const closeInputPin = document.querySelector('.close-input-pin');

        if(closeInputUsername.value === currentAccount.username &&
            Number(closeInputPin.value) === currentAccount.pin){
            const index = accounts.findIndex( function (acc) {
                   return  acc.username === currentAccount.username
                    //console.log(acc);
            }

            );
            console.log(index);
            accounts.splice(index, 1)

            containerApp.classList. add('hidden');

        }


        //console.log( Number(closeInputPin.value) === currentAccount.pin);
    }

    function sort() {
        currentAccount.movements.sort();
        displayMovements(currentAccount.movements);
        console.log(currentAccount.movements);
    }

    const calcDisplayBalance = function (acc) {
        let labelBalance = document.querySelector('.account-balance');
        acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
        labelBalance.textContent = `${acc.balance}€`;
    };



    function requestLoan(event) {

        let interestIn = document.querySelector('.interest-in').textContent;
        let requestInput = document.querySelector('.request-input').value;


        event.preventDefault();

        const amount = Number(requestInput);

        if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
            // Add movement
            currentAccount.movements.push(amount);

            // Update UI
            updateUI(currentAccount);
        }
        requestInput = '';
    }


    function displayMovements(array) {

        if (Array.isArray(array)) {
            const elements = document.querySelectorAll('.deposit-withdraw-container');
            elements.forEach(function (element, index, array) {
                element.remove();
            });
        }

        array.forEach(function (element, index, array) {
            let elSwitch = element >= 0 ? 'deposit' : 'withdraw';
            const el = document.createElement('div');
            //console.log(element);
            el.classList.add('deposit-withdraw-container');
            el.innerHTML += `<a class="left ${elSwitch}-notice"> ${elSwitch}</a>`;
            el.innerHTML += `<a class="left"> ${index +1 }</a>`;
            el.innerHTML += `<a class="right"> ${element}</a>`;
            elContainer.appendChild(el);
        });

    }

    //displayMovements(account2.movements);


    function calculateDisplaySummary(array) {

        let depositSum = 0;
        let WithdrawSum = 0;
        array.movements.forEach(function (element, index, array) {
            if (element >= 0 ) {

                depositSum = depositSum + element;
                //console.log(element.amount);
            } else {

                    WithdrawSum = WithdrawSum + element;
            }
        });
        //console.log(array.movements);
        const interest = array.movements
            .filter(mov => mov > 0)
            .map(deposit => (deposit * array.interestRate) / 100)
            .filter((int, i, arr) => {
                // console.log(arr);
                return int >= 1;
            })
            .reduce((acc, int) => acc + int, 0);
        //console.log(array);
        //console.log(interest);

        let calcWithdrawSum = Math.abs(Math.round(WithdrawSum * 100) / 100).toFixed(2);
        //console.log(calcWithdrawSum);
        document.querySelector('.deposit-in').textContent = depositSum - calcWithdrawSum;
        document.querySelector('.withdraw-in').textContent = calcWithdrawSum;
        document.querySelector('.account-balance').textContent = depositSum - calcWithdrawSum;
        document.querySelector('.interest-in').textContent = interest;


    }




    const createUsernames = function (accs) {
        accs.forEach(function (acc) {
            acc.username = acc.owner
                .toLowerCase()
                .split(' ')
                .map(name => name[0])
                .join('');
        });
    };
    createUsernames(accounts);

    const updateUI = function (array) {
        // Display movements
        displayMovements(array.movements);

        // Display balance
        calcDisplayBalance(array);

        // Display summary
        calculateDisplaySummary(array);
    };

    function countdownTimer() {
        // Set the date we're counting down to
        var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
        //add 30 minutes to date
        var minutesToAdd = 10;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

// Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time

            //console.log(futureDate);
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = futureDate - now;

            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.querySelector(".timestamp").innerHTML = "You will be logged out in " + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                containerApp.classList. add('hidden');
            }
        }, 10);
    }

    countdownTimer()

