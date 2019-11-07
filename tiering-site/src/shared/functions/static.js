/**
 * Capitolizes the string s as a proper noun
 * @param {String} s 
 */
export function ProperNoun(s){
  if(s){
    if(s === '') return s
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()
  }
}

/**
 * Replaces the ID indicator portion of a url with the passed ID
 * @param {string} url 
 * @param {string} id 
 */
export function urlId(url, id){
  const s = url.substr(url.indexOf(':'), url.lastIndexOf('/') - url.indexOf(':'))
  return url.replace(s, id)
}


/**
 * Converts a hex string (#XXXXXX) to RGB
 * @param {String} hex 
 */
export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Determines if the given hex color is dark or light
 * @param {C} hex
 */
export const isDarkHex = (hex) => {
  const c = hexToRgb(hex)
  const Y = (2*c.r + c.b + 3*c.g) / (6);
  return Y < 0.5;
}

export const RgbToHex = (rgb) => {
  return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}
	
/**
 * mixes the RGB values of the two colors using an average
 * @param {*} first 
 * @param {*} second
 * @return the mixed color
 * @see blendColors 
 */
export const blendColorsFlat = (first, second) => {
  return blendColorsT(0.5, first, second);
}

/**
 * mixes the RGB values of the two colors using an average
 * @param {Float} t percentage of mixing
 * @param {*} first 
 * @param {*} second
 * @return the mixed color
 * @see   
 */
export const blendColorsT = (t, first, second) =>{
  return lerpColor(t, 0, 1, first, second);
}
	
/**
 * linearly interpolates the RGB values of the two colors with relation to time
 * @param {Float} t the current time; if outside the parameters start and end, the value is constained automatically
 * @param {Float} start initial time
 * @param {Float} end maximum time
 * @param {*} first the beginning color
 * @param {} last the final color
 * @return the mixed color; if either color is null, the resulting color is the instantiated one. 
 * If both are null, the resulting color is #FFFFFF
 */
export const lerpColor = (t, start, end, first, last) => {
  if(first===null || last===null){
    if(first==null && last==null)
      return '#FFFFF';
    if(first==null)
      return last;
    return first;
  }

  //bounds validation
  if(t>end) t = end;
  if(t<start) t = start;

  //slope calculation
  const mr = (last.r - first.r)/(end - start);
  const mg = (last.g - first.g)/(end - start);
  const mb = (last.b - first.b)/(end - start);

  //interpolation
  return RgbToHex({
    r: (mr*(t-start)+first.r), 
    g: (mg*(t-start)+first.g), 
    b: (mb*(t-start)+first.b), 
  })
}

/**
 * Converts a time in milliseconds to hhmmss string format
 * @param {number} ms 
 */
export function msToHMS( ms ) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return( hours+":"+minutes+":"+seconds);
}

/**
 * Converts an iso formatted string to a Javascript date
 * @param {string} d 
 * @returns The parsed date in milliseconds
 */
export function isoToDate(d) {
  return Date.parse(d)
}

export const css = `text-shadow: -1px -1px hsl(0,100%,50%), 
1px 1px hsl(5.4, 100%, 50%), 
3px 2px hsl(10.8, 100%, 50%),
 5px 3px hsl(16.2, 100%, 50%), 
 7px 4px hsl(21.6, 100%, 50%), 
 9px 5px hsl(27, 100%, 50%), 
 11px 6px hsl(32.4, 100%, 50%), 
 13px 7px hsl(37.8, 100%, 50%), 
 14px 8px hsl(43.2, 100%, 50%), 
 16px 9px hsl(48.6, 100%, 50%), 
 18px 10px hsl(54, 100%, 50%), 
 20px 11px hsl(59.4, 100%, 50%), 
 22px 12px hsl(64.8, 100%, 50%), 
 23px 13px hsl(70.2, 100%, 50%), 
 25px 14px hsl(75.6, 100%, 50%), 
 27px 15px hsl(81, 100%, 50%), 
 28px 16px hsl(86.4, 100%, 50%), 
 30px 17px hsl(91.8, 100%, 50%), 
 32px 18px hsl(97.2, 100%, 50%), 
 33px 19px hsl(102.6, 100%, 50%), 
 35px 20px hsl(108, 100%, 50%), 
 36px 21px hsl(113.4, 100%, 50%), 
 38px 22px hsl(118.8, 100%, 50%), 
 39px 23px hsl(124.2, 100%, 50%), 
 41px 24px hsl(129.6, 100%, 50%), 
 42px 25px hsl(135, 100%, 50%), 
 43px 26px hsl(140.4, 100%, 50%) -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%)`

/**
 * Colorful debugging
 */
export function debug(text, object){
  if(object) console.log("%c %s", css, text, object)
  else console.log  ("%c %s", text)
}

export function humanDate(isoDate){
  var date = new Date(isoDate)
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}