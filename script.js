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




let isLoggedIn = false;
const userName = document.getElementById('userName');
const userPin = document.getElementById('userPin');
const logInButton = document.getElementById('logInButton');
logInButton.addEventListener('click', checkLogIn);

function checkLogIn()
{
    if( userName.value === 'js' || userPin.value === 1111 )
    {
        isLoggedIn = true;
        document.querySelector('.main-container').classList.remove('hidden')
    }

}


    let transactions = [
        {transactionType : 'deposit',
            date : '12/03/2020',
            amount : 1300
        },
        {transactionType : 'deposit',
            date : '08/03/2020',
            amount : 79.97
        },
        {transactionType : 'withdraw',
            date : '12/23/2019',
            amount : -133.90
        },
        {transactionType : 'withdraw',
            date : '11/18/2019',
            amount : -642.21
        },
        {transactionType : 'deposit',
            date : '12/07/2019' ,
            amount : 25000
        },
        {transactionType : 'withdraw',
            date : '05/27/2019',
            amount : -306.50
        },
        {transactionType : 'deposit',
            date : '01/04/2019',
            amount : 455.23
        },
        {transactionType : 'deposit',
            date : '01/28/2019',
            amount : 200
        }


    ];

    let Dates = new Date();

    const elContainer = document.querySelector('.money-movement-container');
    const transferMoneyBtn = document.querySelector('.transfer-money-button');
    const requestLoanBtn = document.querySelector('.request-loan-button');
    document.querySelector('.current-time').textContent = `As of ${Dates.getDay()}/${Dates.getMonth()}/${Dates.getFullYear()}, ${Dates.toLocaleTimeString()}`
    const sortElements = document.querySelector('.sort')




    transferMoneyBtn.addEventListener('click', transferMoney, false);
    requestLoanBtn.addEventListener('click', requestLoan, false);
    sortElements.addEventListener('click', sort, false);

    function sort() {
        transactions.sort(compareValues('transactionType', 'desc'));
        displayMovements(transactions);
        console.log('test');
    }

    function transferMoney(event) {

        const accountBalance = document.querySelector('.account-balance').textContent;
        const transferInput = document.querySelector('.transfer-input').value;
        const depositWithdrawContainer = document.querySelectorAll('.money-movement-container');
        let Dates = new Date();

        transactions.push({
            transactionType: 'withdraw',
            date: `${Dates.getDay()}/${Dates.getMonth()}/${Dates.getFullYear()}`,
            amount: Number(-transferInput)
        });
        displayMovements({
            transactionType: 'withdraw',
            date: `${Dates.getDay()}/${Dates.getMonth()}/${Dates.getFullYear()}`,
            amount: Number(-transferInput)
        });
        calculateDisplaySummary();

        event.preventDefault();


    }

    function requestLoan(event) {

        let interestIn = document.querySelector('.interest-in').textContent;
        const requestInput = document.querySelector('.request-input').value;
        //const interestIn = document.querySelector('.interest-in');
        let Dates = new Date();
        let calcLoan = parseInt(interestIn) + (Number(requestInput) * 10 / 100);
        document.querySelector('.interest-in').textContent = calcLoan;
        console.log(parseInt(interestIn));
        transactions.push({
            transactionType: 'deposit',
            date: `${Dates.getDay()}/${Dates.getMonth()}/${Dates.getFullYear()}`,
            amount: Number(requestInput)
        });
        displayMovements({
            transactionType: 'deposit',
            date: `${Dates.getDay()}/${Dates.getMonth()}/${Dates.getFullYear()}`,
            amount: Number(requestInput)
        });
        calculateDisplaySummary();

        event.preventDefault();


    }


    function displayMovements(array) {
        if (Array.isArray(array)) {
            const elements = document.querySelectorAll('.deposit-withdraw-container');
            elements.forEach(function (element, index, array) {
                element.remove();
            });
        }

        if (Array.isArray(array)) {
            array.forEach(function (element, index, array) {
                //if(element.amount !== transferInput) {
                let elSwitch = element.transactionType === 'deposit' ? 'deposit' : 'withdraw';

                const el = document.createElement('div');
                el.classList.add('deposit-withdraw-container');
                el.innerHTML += `<a class="left ${elSwitch}-notice"> ${elSwitch}</a>`;
                el.innerHTML += `<a class="left"> ${element.date}</a>`;
                el.innerHTML += `<a class="right"> ${element.amount}</a>`;
                elContainer.appendChild(el);
                //}

            });
        } else {
            let elSwitch = array.transactionType === 'deposit' ? 'deposit' : 'withdraw';
            const el = document.createElement('div');

            el.classList.add('deposit-withdraw-container');
            el.innerHTML += `<a class="left ${elSwitch}-notice"> ${elSwitch}</a>`;
            el.innerHTML += `<a class="left"> ${array.date}</a>`;
            el.innerHTML += `<a class="right"> ${array.amount}</a>`;
            elContainer.appendChild(el);
        }
    }

    displayMovements(transactions);




    function calculateDisplaySummary() {

        let depositSum = 0;
        let WithdrawSum = 0;
        transactions.forEach(function (element, index, array) {
            if (element.transactionType === 'deposit') {

                depositSum = depositSum + element.amount;
                //console.log(element.amount);
            }
        });

        transactions.forEach(function (element, index, array) {
            if (element.transactionType === 'withdraw') {

                WithdrawSum = WithdrawSum + element.amount;
                //console.log(element.amount)
            }

        });
        let calcWithdrawSum = Math.abs(Math.round(WithdrawSum * 100) / 100).toFixed(2);
        //console.log(calcWithdrawSum);
        document.querySelector('.deposit-in').textContent = depositSum;
        document.querySelector('.withdraw-in').textContent = calcWithdrawSum;
        document.querySelector('.account-balance').textContent = depositSum - calcWithdrawSum;


    }

    calculateDisplaySummary();

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
                document.querySelector(".timestamp").innerHTML = "EXPIRED";
            }
        }, 10);
    }

    countdownTimer()

