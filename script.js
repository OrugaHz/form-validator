const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup')
const closeBtn = document.querySelector('.close')


const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
};

const clearForm = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
};


const checkForm = input => {
    input.forEach(el => {
        if (el.value === "") {
            showError(el, el.placeholder);
        } else {
            clearForm(el)
        }
    })
};


const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} powinno składać się z ${min} elementów.`)
    }
}

const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'Hasła nie pasują do siebie!')
    }
};

const checkEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.value)) {
        checkForm(email)
    } else {
        showError(email, "Email jest niepoprawny!")
    }
}

const showPopup = () => {

    const allInputs = document.querySelectorAll('.form-box');
    let errorCounts = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCounts++;
        }
    });
    if (errorCounts === 0) {
        popup.classList.add('show-popup');
    }

    console.log(errorCounts);
};


sendBtn.addEventListener('click', e => {
    e.preventDefault();
    checkForm([username, pass, pass2, email]);
    checkLength(username, 3);
    checkLength(pass, 8);
    checkPassword(pass, pass2);
    checkEmail(email);
    showPopup();
})

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();

    [username, pass, pass2, email].forEach(el => {
        el.value = "";
        clearForm(el)
    });

})