const path = window.location.origin+"/public/api/"

export const API = {
    GET_TOKEN: window.location.origin + "/api/tokens/create", 
    
    GET_MEMBERS: path + "members",
    POST_MEMBER: path + "members"
}