"use strict";

const logout = new LogoutButton();

logout.action = function () {
    ApiConnector.logout(requеst => {
        if (requеst.success) {
            location.reload();
        }
    })
}

ApiConnector.current(requеst => {
    if (requеst.success) {
        ProfileWidget.showProfile(requеst.data);
    }
})

const rates = new RatesBoard();

ApiConnector.getStocks(requеst => {
    if (requеst.success) {
        rates.clearTable();
        rates.fillTable(requеst.data);
    }
})

setInterval(function () {
    ApiConnector.getStocks
}, 60000);

const money = new MoneyManager();

money.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, requеst => {
        if (requеst.success) {
            ProfileWidget.showProfile(requеst.data);
            money.setMessage(requеst.success, request.error || 'Баланс успешно пополнен!')
        // } else {
        //     money.setMessage(requеst.error, 'Произошла ошибка пополнения баланса')
        // }
    }
    })
}

money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, requеst => {
        if (requеst.success) {
            ProfileWidget.showProfile(requеst.data);
            money.setMessage(requеst.success, request.error || 'Конвертация успешно выполнена!')
        // } else {
        //     money.setMessage(requеst.error, 'Произошла ошибка при конвертации валют')
        // }
    }
    })
}

money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, requеst => {
        if (requеst.success) {
            ProfileWidget.showProfile(requеst.data);
            money.setMessage(requеst.success, request.error || 'Перевод валюты выполнен!')
        // } else {
        //     money.setMessage(requеst.error, 'Произошла ошибка при переводе валют')
        // }
    }
    })
}

const favourites = new FavoritesWidget();

ApiConnector.getFavorites(requеst => {
    if (requеst.success) {
        favourites.clearTable();
        favourites.fillTable(requеst.data);
        money.updateUsersList(requеst.data);
    }
})

favourites.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, requеst => {
        if (requеst.success) {
            favourites.clearTable();
            favourites.fillTable(requеst.data);
            money.updateUsersList(requеst.data);
            favourites.setMessage(requеst.success, request.error || 'Пользователь добавлен в адресную книгу.');
        // } else {
        //     favourites.setMessage(requеst.error, 'Ошибка при добавлении пользователя');
        // }
    }
    })
}

favourites.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, requеst => {
        if (requеst.success) {
            favourites.clearTable();
            favourites.fillTable(requеst.data);
            money.updateUsersList(requеst.data);
            favourites.setMessage(requеst.success, request.error || 'Пользователь удален из адресной книги');
        // } else {
        //     favourites.setMessage(requеst.error, 'Ошибка при удалении');
        // }
        }
        
    })
}