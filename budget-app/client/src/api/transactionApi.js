import axiosClient from "./axiosClient";
const transactionEndpoint ='transaction'

const transactionApi ={
    getAll:() => axiosClient.get(transactionEndpoint),
    getIncome:() => axiosClient.get('/transaction/income'),
    getExpense:() => axiosClient.get('/transaction/expense'),
    create:() => axiosClient.get('/transaction'),
    getOne:(id) => axiosClient.get(`${transactionEndpoint}/${id}`),
    getSummary: () =>axiosClient.get('/transaction/summary'),
    update:(id,params) => axiosClient.get(`${transactionEndpoint}/${id}`,params),
    
}

export default transactionApi