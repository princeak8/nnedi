export const UserStore = () => {
    let user = (localStorage?.user) ? JSON.parse(localStorage.user) : null;
    let token = (localStorage?.token) ? localStorage.token : null;
    let token_expires = (localStorage?.token_expires) ? localStorage.token_expires : null;
    return { user, token, token_expires};
}

//export const User = UserStore();