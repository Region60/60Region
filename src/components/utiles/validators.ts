export type FieldValidatorType = (value:string)=> string | undefined


export const required: FieldValidatorType = (value)=> {
    if (value) return undefined;
    return "Field is required";
}

export const FieldValidatorType = (maxLength: number):    FieldValidatorType => (value) => {
    if (value.length > maxLength) return `Max lenght is ${maxLength} symbols`;
    return undefined;
}