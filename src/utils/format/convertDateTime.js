export const convertDateTime = (string) => {
    const s = string.split(/\D+/);
    return new Date(+s[0], --s[1], +s[2], +s[3], +s[4], +s[5]||0, +s[6]||0)
};
