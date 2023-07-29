import {selector} from 'recoil'
import { userState } from '../atoms/userAtom'

export const getUserEmail = selector({
    key: "getUserEmail",
    get: ({get}) => {
        const user = get(userState);
        return user?.email;
    }
});

export const getUserDescription = selector({
    key: "getUserDescription",
    get: ({get}) => {
        const user = get(userState);
        return user?.userDescription;
    }
});

export const getUserName = selector({
    key: "getUserName",
    get: ({get}) => {
        const user = get(userState);
        return user?.userName;
    }
});


