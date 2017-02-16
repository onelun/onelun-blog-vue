/**
 * Created by xiangsongtao on 16/7/31.
 * Description:
 */
// import CONFIG from "../config.js"

/**
 * 大写
 * */
export const uppercase = function (value) {
  return value.toUpperCase();
};

/**
 * 音乐播放器,秒转化为03:40这种格式
 * */
export const secondsConvert = function (values) {
  let seconds = values;
  if (seconds === 0 || !seconds || seconds === 'undefined') {
    return '00:00';
  } else {
    seconds = parseInt(seconds);

    let minute = setZero(Math.floor(seconds / 60));
    let second = setZero(Math.floor(seconds % 60));
    return minute + ':' + second;
  }

  function setZero(value) {
    value = parseInt(value);
    if (parseInt(value) < 10) {
      return '0' + value + '';
    } else {
      return value;
    }
  }
};
