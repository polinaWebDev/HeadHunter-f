import {getUserApi} from "../api/getUser";
import {QueryWrapper} from "../help/QueryWrapper";


export const useGetUser =  new QueryWrapper({
    key: "user",
    reqFn: getUserApi
})