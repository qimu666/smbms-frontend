import router from "@/router";
import request from "@/assets/serves/request/API";

export function billView(row) {
    router.push({
        name: 'billView',
        params: {
            id: row.id
        }
    })
}

export function updateBill(row) {
    router.push({
        name: 'billUpdate',
        params: {
            id: row.id
        }
    })
}


export async function getBill(id) {
    return await request.get(`/api/bill/${id}`)
}

export function goBillList() {
    router.push('/b_list')
}
