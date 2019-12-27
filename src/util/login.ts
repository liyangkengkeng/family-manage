export const setCookie = (c_name:string, c_value:string, exdays?:number) => {
  const date = new Date();
  // cookie保存的天数
  exdays && date.setTime(date.getTime() + 24 * 60 *60 * 1000 * exdays);
  document.cookie = `${c_name}=${c_value};path=/;expires=${date}.toGMTString()`;
}

export const getCookie = (c_name: string) => {
  const search = c_name + '=';
  let returnVal = '';
  if (document.cookie.length > 0) {
    let index = document.cookie.indexOf(search);
    if(index != -1) {
      index += search.length;
      let end = document.cookie.indexOf(';', index);
      if(end == -1) {
        end = document.cookie.length;
      }
      returnVal = document.cookie.substring(index, end);
    }
  }
  return returnVal;
}

export const removeCookie = (c_name: string) => {
  document.cookie = `${c_name}=adfsd;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}