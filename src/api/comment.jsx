import client from "./client";
import { UserStore } from '../store/UserStore';

const domain = process.env.REACT_APP_DOMAIN;
const commentUrl = domain+'/comment/save';

export const save = (commentData) => {
    const { token } = UserStore();
    //console.log('userStore: ', UserStore);
    return client.apiPostClient.post(
        commentUrl,
        { ...commentData },
        { 
            headers: { 
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            } 
        }
    );
}

//export default { loginUser, registerUser };
