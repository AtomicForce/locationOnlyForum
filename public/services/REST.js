import $ from 'jquery';

let request = function(method, url, data) {
    return $.ajax({
        beforeSend: (xhr, settings) => {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/json');

            // if (method !== 'GET') {
            //     xhr.setRequestHeader('X-Auth-Token', authToken);
            //     xhr.setRequestHeader('X-CSRF-TOKEN', localStorage.getItem('X-CSRF-TOKEN'));
            // }

            if (data && method !== 'GET' && method !== 'DELETE') {
                settings.data = JSON.stringify(data);
            }
        },
        url: url,
        method: method,
        success: (data, status, xhr) => {
            console.log('Request done');
        },
        error: (err) => {
            console.log('Request failed');
        }
    });
};

class REST {

    get(url) {
        return request('GET', url, null);
    }

    post(url, data) {
        return request('POST', url, data);
    }

    put(url, data) {
        return request('PUT', url, data);
    }

    delete(url) {
        return request('DELETE', url, null);
    }

}

export default new REST();
