const path = window.location.origin+"/public/api/"

export const API = {
    GET_TOKEN: window.location.origin + "/api/tokens/create", 
    
    GET_MEMBERS: path + "members",
    CREATE_MEMBER: path + "members/create",
    UPDATE_MEMBER: path + "members/update"
}