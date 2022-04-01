import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers/index';

export const roomService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByGroupId
};

const baseUrl = `${apiUrl}/room`;

function getAll() {
    return fetchWrapper.get(`${apiUrl}/rooms`);
}

function getById(rid) {
    return fetchWrapper.get(`${baseUrl}/${rid}`);
}

//グループに所属しているメンバー一覧を取得
function getByGroupId(gid) {
    return fetchWrapper.get(`${apiUrl}/rooms/${gid}`);
}

function create(gid, params) {
    return fetchWrapper.post(`${baseUrl}/${gid}`, params);
}

function update(rid, params) {
    return fetchWrapper.put(`${baseUrl}/${rid}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(rid) {
    return fetchWrapper.delete(`${baseUrl}/${rid}`);
}

