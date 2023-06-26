/* eslint-disable no-useless-escape */
const vniLower ='ăâđêôơưáàạảéèẹẻóòọỏíìịỉýỳỷỵùúụủểệềếấầậẩắằẳặứừựửốồộổớờởợãễỹĩõẽũỡỗữẵẫ'
const vniUpper = 'ĂÂĐÊÔƠƯÁÀẠẢÉÈẸẺÓÒỌỎÍÌỊỈÝỲỶỴÙÚỤỦỂỆỀẾẤẦẬẨẮẰẲẶỨỪỰỬỐỒỘỔỚỜỞỢÃỄỸĨÕẼŨỠỖỮẴẪ'

const regex = {
        firstName:`^[a-zA-Z${vniLower}${vniUpper}]+[ ]?[a-zA-Z${vniLower}${vniUpper}]*[ ]?[a-zA-Z${vniLower}${vniUpper}]+$`,
        lastName:`^[a-zA-Z${vniLower}${vniUpper}]+[ ]?[a-zA-Z${vniLower}${vniUpper}]*[ ]?[a-zA-Z${vniLower}${vniUpper}]+$`,
        email:`^[\\w._+-]{3,}@[\\w]{2,}\\.[a-zA-Z]{2,}$`,
        password: `^[a-zA-Z0-9.+-_@#!$%^&*=)(]{6,}$`,
        comfirmPassword: [],
        phone: `^[0-9]+$`,
        name: `^[a-zA-Z${vniLower}${vniUpper}]+[ ]?[a-zA-Z${vniLower}${vniUpper}]*[ ]?[a-zA-Z${vniLower}${vniUpper}]+$`,
        identityCard: `^[0-9]+$`,
        birthYear: [/19[0-9][1-9]|19[1-9][0-9]|[2-9][0-9]{3,3}/,1900,/19[0-9][0-9]|20[0-2][0-2]/,2023],
        nationality:[],
        city:[],
        district:[],
        wards:[],
        address:[],

};
export default regex;