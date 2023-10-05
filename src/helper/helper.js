import { v4 as uuidv4 } from 'uuid';

export function getName(firstName, middleName, lastName) {
    return  (firstName && lastName) ? `${firstName} ${middleName} ${lastName}`: '';
  }

export function getDate(date) {
    return new Date(date * 1000).toDateString();
  }

export function getDateNow(){
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  return date
}

export function getDateTime(createdTs){
  var date = new Date(createdTs * 1000);
  return date.toLocaleDateString("en-US")+" "+date.toLocaleTimeString("en-US")
}

export function getStringToDate(date){
  let convert = new Date(date) 
  return convert.toDateString()
}

export function emailPatternValidation(){
  // eslint-disable-next-line no-useless-escape
  return "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})?$"
}

export function createGUID(){
  return uuidv4();
}

export function phonePatternValidation(){
  // return "^(\\+639)\\d{9}$"
  return "^(9)\\d{9}$"
}

export function phoneAddingPatternValidation(){
  return "^(9)\\d{9}$"
  // return "^(09|9|\\+639)\\d{9}$"
}

export function inventoryEditValidation(stock,inventoryInfo){
  return stock
  ? (parseFloat(stock) +
    parseFloat(inventoryInfo?.Stock))-1
  : inventoryInfo?.Stock-1
}

export function inventoryAddValidation(stock){
  return (stock-1)
}

export function handleEnterSubmit(e){
  var key = e.charCode || e.keyCode || 0;     
  if (key === 13) {
    e.preventDefault();
  }
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertToNormalTime(militaryTime) {
  const militaryTimeArray = militaryTime.split(':');
  let hours = parseInt(militaryTimeArray[0], 10);
  const minutes = militaryTimeArray[1];

  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  }

  if (hours === 0) {
    hours = 12; // Convert midnight (00:00) to 12:00 AM
  }

  return `${hours}:${minutes} ${period}`;
}