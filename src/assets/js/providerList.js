import router from "@/router";
import request from "@/assets/serves/request/API";

export function providerView(id) {
    router.replace({
        name: 'providerView',
        params: {
            id: id
        }
    }).catch(r => console.log(r))
}

export function updateProvider(id) {
    router.replace({
        name: 'providerUpdate',
        params: {
            id:id
        }
    }).catch(r => console.log(r))
}


export async function getProvider(id) {
    return await request.get(`/api/provider/${id}`)
}

export function goProviderList() {
    router.replace('/p_list').catch(r => console.log(r))
}
