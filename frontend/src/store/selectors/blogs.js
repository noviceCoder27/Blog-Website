import { selector } from "recoil";
import { blogState } from './../atoms/blogAtom';

export const getBlogTitle = selector({
    key: "getBlogTitle",
    get: ({get}) => {
        const state = get(blogState);
        return state?.title;
    }
});

export const getBlogContent = selector({
    key: "getBlogContent",
    get: ({get}) => {
        const state = get(blogState);
        return state?.content;
    }
});

export const getBlogCategory = selector({
    key: "getBlogCategory",
    get: ({get}) => {
        const state = get(blogState);
        return state?.category;
    }
});

export const getBlogCreatedAt = selector({
    key: "getBlogCreatedAt",
    get: ({get}) => {
        const state = get(blogState);
        return state?.createdAt;
    }
});

export const getBlogId = selector({
    key: "getBlogId",
    get: ({get}) => {
        const state = get(blogState);
        return state?._id;
    }
});
