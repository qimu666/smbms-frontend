import router from "@/router";
import request from "@/assets/serves/request/API";

export function billView(row) {
    router.replace({
        name: 'billView',
        params: {
            id: row.id
        }
    }).then(r => console.log(r))
}

export function updateBill(row) {
    router.replace({
        name: 'billUpdate',
        params: {
            id: row.id
        }
    }).then(r => console.log(r))
}


export async function getBill(id) {
    return await request.get(`/api/bill/${id}`)
}

export function goBillList() {
    router.replace('/b_list').then(r => console.log(r))
}
