'use strict';

(function () {
    var STATUS_OK = 200;
    var SERV_IP = '';
    var PORT = '';

    var getXhr = function (onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if (xhr.status === STATUS_OK) {
                onSuccess(xhr.response);
            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function () {
            onError('Статус ответа: ошибка соединения');
        });

        return xhr;
    }

    var load = function (onSuccess, onError) {
        var xhr = getXhr(onSuccess, onError);

        xhr.open('GET', SERV_IP);
        xhr.send;
    }

    var upload = function (data, onSuccess, onError) {
        var xhr = getXhr(onSuccess, onError);

        xhr.open('POST', SERV_IP);
        xhr.send(data);
    }

    window.backend = {
        load: load,
        upload: upload
    }
})();