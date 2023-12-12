export const host ="http://localhost:4000";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;

export const searchContactRoute = `${host}/api/request/searchcontact`;
export const requestRoute = `${host}/api/request/requestfriend`;
export const getFriendRequest = `${host}/api/request/getfriendrequest`;

export const acceptRoute = `${host}/api/restoreq/accept`;
export const rejectRoute = `${host}/api/restoreq/reject`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;