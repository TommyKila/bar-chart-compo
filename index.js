const confirmBtn = document.querySelector('.confirm-btn');
const form = document.querySelector('form');
const inputField = document.querySelectorAll('.input-field');
const realtimeText = document.querySelectorAll('.realtime-text');
const completeState = document.querySelector('.complete-state');
const resetBtn = document.querySelector('.reset-btn');
const numberInput = document.getElementById('card-number');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const nameInput = document.getElementById('cardholder-name');
const cvcInput = document.getElementById('cvc');
let count = 0;
let numberPattern = /^(?:[0-9]{4}) (?:[0-9]{4}) (?:[0-9]{4}) (?:[0-9]{4})$/;

const defTextArr = Array.from(realtimeText)

const defValue = defTextArr.reduce(function (acc, text) {
    return acc.concat(text.textContent);
}, []);

resetBtn.addEventListener('click', function () {
    inputField.forEach(function (field) {
        field.value = "";
    });
    realtimeText.forEach(function (text, index) {
        text.textContent = defValue[index];
    });
    form.style.display = "block";
    completeState.classList.remove("complete-message");
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    inputField.forEach(function (field) {
        checkBlank(field);
    });

    if (!numberPattern.test(numberInput.value) && numberInput.value !== "") {
        numberInput.parentElement.classList.add("wrong-format");
    } else {
        numberInput.parentElement.classList.remove("wrong-format");
    }

    if (monthInput.value > 12 || monthInput.value < 1) {
        monthInput.parentElement.classList.add("wrong-month");
    } else {
        monthInput.parentElement.classList.remove("wrong-month");
    }

    if (cvcInput.value.length < 3 && cvcInput.value !== "") {
        cvcInput.parentElement.classList.add("cvc-format");
    } else {
        cvcInput.parentElement.classList.remove("cvc-format");
    }


    inputField.forEach(function (field) {
        const fieldParent = field.parentElement;
        if (!fieldParent.classList.contains("wrong-format") && !fieldParent.classList.contains("blank-alert") &&
            !fieldParent.classList.contains("wrong-month") && !fieldParent.classList.contains("cvc-format")){
            count++;
        }
    });

    if (count === 5) {
        form.style.display = "none";
        completeState.classList.add("complete-message");
    }
    count = 0;
})

function checkBlank(item) {
    if (item.value === "") {
        item.parentElement.classList.add("blank-alert");
    } else {
        item.parentElement.classList.remove("blank-alert");
    }
}

nameInput.addEventListener('input', function (e) { 
    e.target.value = e.target.value.replace(/[^\a-z A-Z]/g, '');
});

numberInput.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
});

monthInput.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').trim();
});

yearInput.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').trim();
});

cvcInput.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').trim();
});


inputField.forEach(function (field) {
    field.addEventListener('input', function (e) {
        const inputId = e.currentTarget.id;
        const fieldValue = e.currentTarget.value;
        realtimeText.forEach(function (value, index) {
            const valueId = value.dataset.id;
            if (valueId == inputId) {
                if (inputId === "month" || inputId === "year") {
                    if (fieldValue < 10 && fieldValue > 0) {
                        value.textContent = `0${fieldValue}`;
                    } else {
                        value.textContent = fieldValue;
                    }
                } else {
                    value.textContent = fieldValue;
                }
            }
            if (value.textContent === "") {
                value.textContent = defValue[index];
            }
        });
    });
});



