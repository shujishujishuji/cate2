import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers/index';

export const eventService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByGroupId
};

const baseUrl = `${apiUrl}/event`;

function getAll() {
    return fetchWrapper.get(`${apiUrl}/events`);
}

function getById(gid, uid) {
    return fetchWrapper.get(`${baseUrl}/${gid}/${uid}`);
}

//グループに所属しているメンバー一覧を取得
function getByGroupId(gid) {
    return fetchWrapper.get(`${apiUrl}/events/${gid}`);
}

function create(gid, params) {
    return fetchWrapper.post(`${baseUrl}/${gid}`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(gid, eid) {
    return fetchWrapper.delete(`${baseUrl}/${gid}/${eid}`);
}

