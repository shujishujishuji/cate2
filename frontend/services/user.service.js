import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers/index';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    signin
};

const baseUrl = `${apiUrl}/user`;

function getAll() {
    return fetchWrapper.get(`${apiUrl}/users`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function signin(params) {
    return fetchWrapper.post(`${apiUrl}/signin`, params);
}
