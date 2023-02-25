import router from "@/router";
import request from "@/assets/serves/request/API";

export function userView(id) {
    router.replace({
        name: 'userView',
        params: {
            id: id
        }
    }).catch(r => console.log(r))
}

export function updateUser(id) {
    router.replace({
        name: 'userUpdate',
        params: {
            id:id
        }
    }).catch(r => console.log(r))
}


export async function getUser(id) {
    return await request.get(`/api/user/${id}`)
}

export function goUserList() {
    router.replace('/u_list').catch(r => console.log(r))
}
