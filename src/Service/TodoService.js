import axios from "axios";

const URL = "https://5f1b8c16254cec0016082297.mockapi.io/todo";

export function ambilDataDariServer(){
    return axios.get(URL);
}

export function tambahDataKeserver(newTodo){
    return axios.post(URL, newTodo);
}

export function updateDataDiServer(id, newTodo){
    return axios.put(URL + `/${id}`, newTodo);
}

export function deleteDataDiServer(id){
    console.log(id);
    return axios.delete(URL + `/${id}`);
}