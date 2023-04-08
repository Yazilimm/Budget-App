import axiosClient from "./axiosClient";

const userEndpoint ='user'

const userApi ={
    getAll:() => axiosClient.get(userEndpoint),
    getIncome:() => axiosClient.get(userEndpoint),
    getExpense:() => axiosClient.get(userEndpoint),
    create:() => axiosClient.get(userEndpoint),
    getOne:(id) => axiosClient.get(`${userEndpoint}/${id}`),
    getSummary: () =>axiosClient.get('/user/summary'),
    update:(id,params) => axiosClient.get(`${userEndpoint}/${id}`,params),
    
}

export default userApi