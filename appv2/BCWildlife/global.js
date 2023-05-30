let accessToken = '';
let refreshToken = '';
let usernameG='';
let telemetryStr='';


export const setTelemetryStr = (str) => {
  telemetryStr = str;
}

export const getTelemetryStr = () => {
  return telemetryStr;
}



export const setUsernameG = (name) => {
  usernameG = name;
}

export const getUsernameG = () => {
  return usernameG;
}


export const setAccessToken = (token) => {
  accessToken = token;
}

export const setRefreshToken = (token) => {
    refreshToken = token;
}

export const getRefreshToken = () => {
    return refreshToken;
}


export const getAccessToken = () => {
  return accessToken;
}
