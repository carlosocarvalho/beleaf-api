import { ACTIONS } from './messages';


export const transActions = (key) => {
    if (ACTIONS.hasOwnProperty(key))
        return ACTIONS[key];


    return key;
}




export * from './pagination'


export function fixPrice(value) {
    // this is element's value selector, you should use your own

    if (value == '') {
        value = 0;
    }
    let newValue: any = parseFloat(value.replace(',', '.')).toFixed(2);
    // if new value is Nan (when input is a string with no integers in it)
    if (isNaN(newValue)) {
        value = 0;
        newValue = parseFloat(value).toFixed(2);
    }
    // apply new value to element
    return newValue
}