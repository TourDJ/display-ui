
function padding(num) {
  let str;

  if(typeof num == "number")
    str = num.toString();
  else
    str = num;

  if(str.length == 1)
    str = "0" + str;

  return str;
}

const dateUtils = {

  /**
   * 日期转换字符串
   * @param {*} date 日期(时间)
   * @param {*} time 是否带时间
   */
  date2String: function(date, time) {
    let Y, M, D, h, m, s, datetime;

    Y = date.getFullYear();
    M = padding(date.getMonth() + 1);
    D = padding(date.getDate());

    datetime = Y + '-' + M + '-' + D;

    if(time) {
      h = padding(date.getHours());
      m = padding(date.getMinutes());
      s = padding(date.getSeconds()); 
      datetime += ' ' + h + ':' + m + ':' + s;
    }
    
    return datetime;
  },

  /**
   * 时间戳转换字符串
   * @param {*} timestamp 时间戳
   * @param {*} time 是否带时间
   */
  timestamp2String: function(timestamp, time) {
    let date = new Date(timestamp)
    return this.date2String(date, time)
  }

}

export default dateUtils