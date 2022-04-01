import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers/index';

export const messageService = {
    getByRoomId,
    create,
    update,
    delete: _delete,
};

const baseUrl = `${apiUrl}/message`;

function getByRoomId(rid) {
    return fetchWrapper.get(`${baseUrl}/${rid}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}`, params);
}

function update(rid, mid, params) {
    return fetchWrapper.put(`${baseUrl}/${rid}/${mid}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(mid) {
    return fetchWrapper.delete(`${baseUrl}/${mid}`);
}

