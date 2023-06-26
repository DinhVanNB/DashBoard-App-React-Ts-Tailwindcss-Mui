import regex from "./regex";

const validateSchema = {
        birthYear:["required","moreThan?1900","lessThan?2023","length?4"],
        firstName:["required", "minLength?2", "maxLength?10", `regex?${regex.firstName}`],
        lastName:["required", "minLength?2", "maxLength?10", `regex?${regex.lastName}`],
        email:["required", `regex?${regex.email}`, "maxLength?30" ],
        password:["required", "minLength?6", "maxLength?20", `regex?${regex.password}`],
        comfirmPassword: ["confirm?password"],
        phone: ["required",`regex?${regex.phone}`, "minLength?10", "maxLength?12"],
        name:["required","minLength?2",`regex?${regex.name}`],
        identityCard:["required",`regex?${regex.identityCard}`, "length?12" ],
        nationality:["required"],
        city:["required"],
        district:["required"],
        wards:["required"],
        address:["required"],
        title:["required"],
        content:["required"]
};

export default validateSchema;