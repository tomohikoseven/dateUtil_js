const dayjs = require("dayjs");
const JA = require("dayjs/locale/ja");
dayjs.extend(require('dayjs/plugin/customParseFormat'));

const YYYYMMDD = "YYYYMMDD";
const YYYYMMDD_HHmmss = "YYYYMMDD HHmmss";

function isValidDate(day) {
  if (typeof day === "string") {
    return day === "Invalid Date" ? null : day;
  }

  return day.isValid() ? day : null;
}

/**
 * 年齢計算
 * @param {string} baseDate  年齢計算の基準日 YYYYMMDD
 * @param {string} birthday  生年月日 YYYYMMDD
 * @returns 満年齢 or null(計算不可)
 */
exports.calcAge = (baseDate, birthday) => {
  let base = dayjs(baseDate, YYYYMMDD, true);
  let birth = dayjs(birthday, YYYYMMDD, true);

  // 日付をパースできない.
  if (!isValidDate(base) || !isValidDate(birth)) {
    return null;
  }

  return base.diff(birth, "year");
};

/**
 * 日付計算（年）
 * @param {string} baseDate 基準日 YYYYMMDD
 * @param {number} year 加減算する年
 * @returns 加減算後の日付 YYYYMMDD
 */
exports.addYears = (baseDate, year) => {
  return isValidDate(
    dayjs(baseDate, YYYYMMDD, true).add(year, "year").format(YYYYMMDD)
  );
};

/**
 * 日付計算（月）
 * @param {string} baseDate 基準日 YYYYMMDD
 * @param {number} month 加減算する月
 * @returns 加減算後の日付 YYYYMMDD
 */
exports.addMonths = (baseDate, month) => {
  return isValidDate(
    dayjs(baseDate, YYYYMMDD, true).add(month, "month").format(YYYYMMDD)
  );
};

/**
 * 日付計算（日）
 * @param {string} baseDate 基準日 YYYYMMDD
 * @param {number} day 加減算する日
 * @returns 加減算後の日付 YYYYMMDD
 */
exports.addDays = (baseDate, day) => {
  return isValidDate(
    dayjs(baseDate, YYYYMMDD, true).add(day, "day").format(YYYYMMDD)
  );
};

/**
 * 日付フォーマット
 * @param {string} baseDate 日付日時
 * @param {string} format フォーマット. Day.jsのフォーマット.
 * @returns {string} フォーマット後日付
 */
exports.format = (baseDate, format) => {
  return isValidDate(dayjs(baseDate).format(format));
};

/**
 * 月末の日付を返す.
 * @param {string} baseDate 日付 YYYYMMDD or YYYYMM
 * @returns {string} 月末日付 YYYYMMDD
 */
exports.endOfMonth = (baseDate) => {
  return isValidDate(
    dayjs(baseDate, [YYYYMMDD, 'YYYYMM'], true).endOf("month").format(YYYYMMDD)
  );
};

/**
 * 日付比較
 * @param {string} baseDate 基準日 YYYYMMDD
 * @param {string} compDate 対象日 YYYYMMDD
 * @returns {number} 比較結果. 基準日 < 対象日 は -1, 基準日 = 対象日 は 0, 基準日 > 対象日 は 1
 */
exports.compare = (baseDate, compDate) => {
  const base = dayjs(baseDate, YYYYMMDD, true);
  const comp = dayjs(compDate, YYYYMMDD, true);

  if( !isValidDate(base) || !isValidDate(comp) ){
    return null;
  }

  if (base.isSame(comp, "days")) {
    return 0;
  }

  return base.isBefore(comp, "days") ? -1 : 1;
};

/**
 * 差分日数
 * @param {string} fromDate 基準日 YYYYMMDD
 * @param {string} toDate 対象日 YYYYMMDD
 * @returns {number} 計算結果. 基準日 < 対象日は 正、基準日 > 対象日は 負.
 */
exports.diffDays = (fromDate, toDate) => {
  let from = dayjs(fromDate, YYYYMMDD, true);
  let to = dayjs(toDate, YYYYMMDD, true);

  if( !isValidDate(from) || !isValidDate(to) ) {
    return null;
  }

  return dayjs(to).diff(dayjs(from), "day");
};

/**
 * エポック(秒) to UTC変換
 * @param {number} seconds Unixエポック
 * @returns UTC時間 YYYYMMDD hhmmss
 */
exports.epocSecToUtc = (seconds) => {
  dayjs.extend(require('dayjs/plugin/utc'));
  return isValidDate(dayjs.unix(seconds).utc().format(YYYYMMDD_HHmmss));
};

/**
 * エポック(ミリ秒) to UTC変換
 * @param {number} miliseconds
 * @returns UTC時間 YYYYMMDD hhmmss
 */
exports.epocMilliSecToUtc = (miliseconds) => {
  dayjs.extend(require('dayjs/plugin/utc'));
  return isValidDate(dayjs(miliseconds).utc().format(YYYYMMDD_HHmmss));
};

/**
 * UTC to エポック(秒)
 * @param {string} baseDate 日付
 * @returns エポック(秒)
 */
exports.utcToEpocSec = (baseDate) => {
  return dayjs(baseDate).unix();
};

/**
 * UTC to エポック(ミリ秒)
 * @param {string} baseDate
 * @returns エポック(ミリ秒)
 */
exports.utcToEpocMilliSec = (baseDate) => {
  return dayjs(baseDate).valueOf();
};

/**
 * UTC to JST変換
 * @param {string} baseUtc UTC時間
 * @returns 日本時間. YYYY-MM-DDThh:mm:ss+0900
 */
exports.utcToJst = (baseUtc) => {
  dayjs.extend(require("dayjs/plugin/timezone"));
  dayjs.extend(require("dayjs/plugin/utc"));
  dayjs.tz.setDefault("Asia/Tokyo");

  return isValidDate(dayjs(baseUtc).tz().format());
};

/**
 * JST to UTC変換
 * @param {string} baseJst
 * @returns UTC. YYYY-MM-DDThh:mm:ssZ
 */
exports.jstToUtc = (baseJst) => {
  dayjs.extend(require("dayjs/plugin/timezone"));
  dayjs.extend(require("dayjs/plugin/utc"));
  dayjs.tz.setDefault("Asia/Tokyo");

  return isValidDate(dayjs(baseJst).utc().format());
};
