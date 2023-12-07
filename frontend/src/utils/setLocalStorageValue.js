export const setLocalStorageValue = (key,value) => {
    const jwtPayload = JSON.parse(window.atob(value.split('.')[1]));
    const item = {
        token: value,
        expiry: new Date(jwtPayload.exp*1000)
    }
    localStorage.setItem(key,JSON.stringify(item))
}