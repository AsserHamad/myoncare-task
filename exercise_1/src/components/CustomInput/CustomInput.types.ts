export interface CustomInputPropsI {
    title : string
    onChange : (name : string, value : string) => any
    image? : string
    placeholder? : string
    validation? : string
    error? : string
    type? : string
    name : string
}