export const isEmptyObject = (object : {[key : string] : any}) => !Object.keys(object).length;

export const extractDateFromDateTime = (str : string) => {
    const date = new Date(str);
    
    let hours = date.getUTCHours() + 2;
    let period = hours >= 12 && hours < 24 ? 'PM' : 'AM';
    if(hours > 12) 
        hours %= 12;
    
    let minutes = `${date.getUTCMinutes()}`;
    if(parseInt(minutes) < 10) 
        minutes = `0${minutes}`;

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${hours}:${minutes} ${period}`;
}