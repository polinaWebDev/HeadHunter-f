import {QueryWrapper} from "../help/QueryWrapper";
import {getProfileApi} from "../api/profile/profile";

export const useGetProfile = new QueryWrapper({
    key: "userProfile",
    reqFn: getProfileApi,
})