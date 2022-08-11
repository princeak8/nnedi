import client from "./client";
import { UserStore } from '../store/UserStore';

const domain = process.env.REACT_APP_DOMAIN;
const { token } = UserStore();
const post = async (url, data) => {
    //console.log('userStore: ', UserStore);
    // const { token } = UserStore();
    let postUrl = domain+url;
    return client.apiPostClient.post(
        postUrl,
        { ...data },
        { 
            headers: { 
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            } 
        }
    );
}

const get = async (url) => {
    //const { token } = UserStore();
    let getUrl = domain+url;
    console.log('getUrl: ', getUrl);
    return client.apiPostClient.get(getUrl, {});
}

const handleError = (response, statusCode) => {
    let errorMsg = [];
    let msg = '';
    console.log('handle error', statusCode);
    switch(statusCode) {
        case 422 : 
            //console.log('error: ', response.data.errors);
            for(const key in response.data.errors) response.data.errors[key].map(error => errorMsg.push(error) );
            break;
        case 401 :
            errorMsg.push(response.data.error);
            break;
        case 404 :
                errorMsg.push('Not found');
                break;
        case 500 :
            msg = (response.data?.data?.message) ? response.data.data.message : "An error occured";
            if(msg=="An error occured") msg = (response.data?.error) ? response.data.error : "An error occured";
            if(msg=="An error occured") msg = (response.data?.message) ? response.data.message : "An error occured";
            errorMsg.push(msg);
            break;
        default :
            msg = (response.data?.data?.message) ? response.data.data.message : "An error occured";
            if(msg=="An error occured") msg = (response.data?.error) ? response.data.error : "An error occured";
            if(msg=="An error occured") msg = (response.data?.message) ? response.data.message : "An error occured";
            errorMsg.push(msg);
            break;
    }
    //console.log('error look', response);
    return {status: statusCode, message: errorMsg};
} 

export const request = async (requestType, url, data={}) => {
    let res = {};
    switch(requestType) {
        case 'GET' : res = await get(url); break;
        case 'POST' : res = await post(url, data); break;
    }
    console.log('res: ', res);
    if(res.status == 200 || res.status == 201) {
        return {status: res.status, data: res.data.data, message: res.data?.message};
    }else{
        return handleError(res, res.status);
    }
}


//export default { loginUser, registerUser };
