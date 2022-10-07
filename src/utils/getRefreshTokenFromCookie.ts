const getRefreshTokenFromCookie = (cookie: string) => {
    const cookieValueSplit = cookie.split("=");

    return cookieValueSplit[1];
};

export default getRefreshTokenFromCookie;
