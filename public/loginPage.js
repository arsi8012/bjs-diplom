"use strict";

const singInForm = new UserForm();

singInForm.loginFormCallback = function (data) {
    ApiConnector.login(data, request => {
        console.log(request);
        if (request.success) {
            location.reload();
        } else {
            singInForm.setLoginErrorMessageBox('Неверный логин или пароль');
        }
    })
}

singInForm.registerFormCallback = function (data) {
    ApiConnector.register(data, request => {
        console.log(request);
        if (request.success) {
            location.reload();
        } else {
            singInForm.setRegisterErrorMessageBox('Ошибка ввода данных в поля формы регистрации');
        }
    })
}