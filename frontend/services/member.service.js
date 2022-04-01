import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers/index';

export const memberService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByGroupId,
    getByUserId
};

const baseUrl = `${apiUrl}/member`;

function getAll() {
    return fetchWrapper.get(`${apiUrl}/members`);
}

function getById(gid, uid) {
    return fetchWrapper.get(`${baseUrl}/${gid}/${uid}`);
}

//ユーザが所属しているグループ一覧を取得
function getByUserId(uid) {
    return fetchWrapper.get(`${baseUrl}/${uid}`);
}

//グループに所属しているメンバー一覧を取得
function getByGroupId(gid) {
    return fetchWrapper.get(`${apiUrl}/members/${gid}`);
}

function create(gid, params) {
    return fetchWrapper.post(`${baseUrl}/${gid}`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(gid, uid) {
    return fetchWrapper.delete(`${baseUrl}/${gid}/${uid}`);
}
