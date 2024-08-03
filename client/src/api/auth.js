import instanceAxios from "./axios";


export const registerRequest = (user) => instanceAxios.post(`/register`, user);

export const loginRequest = (data) => instanceAxios.post(`/login`, data);

export const logoutRequest = () => instanceAxios.post(`/logout`);

export const getProfileRequest = () => instanceAxios.get('/profile');

export const updateProfileRequest = (data) => instanceAxios.put(`/profile`, data);

export const verifyTokenRequest = () => instanceAxios.get('/verify-token');
