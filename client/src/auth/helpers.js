import cookie from "js-cookie";


// SETTING IN COOKIES
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

// REMOVE FROM COOKIE
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// GET FROM COOKIE SUCH AS STORED TOKEN
// THIS WILL BE USEFUL WHEN WE NEED TO MAKE REQUEST TO SERVER WITH TOKEN
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    };
};

// SET TOKEN IN LOCALSTORAGE
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// REMOVE FROM THE LOCALSTORAGE
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// AUTHENTICATE USER BY PASSING DATA TO COOKIE AND LOCALSTORAGE DURING SIGNIN PROCESS
export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// ACCESS USER INFO FROM THE LOCALSTORAGE
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

// SIGNOUT FUNCTIOM
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

// UPDATE USER DATA IN LOCALSTOEAGE
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS METHOD', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
}

