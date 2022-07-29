import axios from 'axios';
import { toast } from 'react-toastify';

const getWithPagination = (url, body, handleItemsLoad, handleTotalPagesLoad) => {
    axios.post(url,body)
    .then(function (response) {
        if (response.status === 200) {
            handleItemsLoad(response.data.contents);
            handleTotalPagesLoad(response.data.totalCount);
        }
    })
    .catch(function (error) {
        toast.error(error?.response?.data?.message);
    });
}

const add = () => {

}

const update = () => {

}

const inactivate = () => {

}

const activate = () => {

}

export {getWithPagination, add, update, inactivate, activate}