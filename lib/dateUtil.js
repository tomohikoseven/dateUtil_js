const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/customParseFormat"));
dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.extend(require("dayjs/plugin/utc"));

const YYYYMMDD = "YYYYMMDD";
const YYYYMMDD_HHmmss = "YYYYMMDD HHmmss";
const YYYYMMDD_HHmmss_SSS = "YYYYMMDD HHmmss.SSS";

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
 * @returns {string|null} 加減算後の日付 YYYYMMDD
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
 * @returns {string|null} 加減算後の日付 YYYYMMDD
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
 * @returns {string|null} 加減算後の日付 YYYYMMDD
 */
exports.addDays = (baseDate, day) => {
  return isValidDate(
    dayjs(baseDate, YYYYMMDD, true).add(day, "day").format(YYYYMMDD)
  );
};

/**
 * 日付フォーマット
 * @param {string} baseDate 日付日時
 * @param {string} format フォーマット. フォーマット形式はDay.js参照.
 * @returns {string|null} フォーマット後日付
 */
exports.format = (baseDate, format) => {
  return isValidDate(dayjs(baseDate).format(format));
};

/**
 * 月末の日付を返す.
 * @param {string} baseDate 日付 YYYYMMDD or YYYYMM
 * @returns {string|null} 月末日付 YYYYMMDD
 */
exports.endOfMonth = (baseDate) => {
  return isValidDate(
    dayjs(baseDate, [YYYYMMDD, "YYYYMM"], true).endOf("month").format(YYYYMMDD)
  );
};

/**
 * 日付比較
 * @param {string} baseDate 基準日 YYYYMMDD
 * @param {string} compDate 対象日 YYYYMMDD
 * @returns {number|null} 比較結果. 基準日 < 対象日 は -1, 基準日 = 対象日 は 0, 基準日 > 対象日 は 1
 */
exports.compare = (baseDate, compDate) => {
  const base = dayjs(baseDate, YYYYMMDD, true);
  const comp = dayjs(compDate, YYYYMMDD, true);

  if (!isValidDate(base) || !isValidDate(comp)) {
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
 * @returns {number|null} 計算結果. 基準日 < 対象日は 正の値、基準日 > 対象日は 負の値.
 */
exports.diffDays = (fromDate, toDate) => {
  let from = dayjs(fromDate, YYYYMMDD, true);
  let to = dayjs(toDate, YYYYMMDD, true);

  if (!isValidDate(from) || !isValidDate(to)) {
    return null;
  }

  return to.diff(from, "day");
};

/**
 * エポック(秒) to UTC変換
 * @param {number} seconds Unixエポック
 * @returns {string|null} UTC時間 YYYYMMDD hhmmss
 */
exports.epochSecToUtc = (seconds) => {
  return isValidDate(dayjs.unix(seconds).utc().format(YYYYMMDD_HHmmss));
};

/**
 * エポック(ミリ秒) to UTC変換
 * @param {number} miliseconds
 * @returns {string|null} UTC時間 YYYYMMDD hhmmss.SSS
 */
exports.epochMilliSecToUtc = (miliseconds) => {
  return isValidDate(dayjs(miliseconds).utc().format(YYYYMMDD_HHmmss_SSS));
};

/**
 * UTC to エポック(秒)
 * @param {string} baseDate 日付
 * @returns {number|null} エポック(秒)
 */
exports.utcToEpochSec = (baseDate) => {
  let utc = dayjs.utc(baseDate);
  if (!isValidDate(utc)) {
    return null;
  }
  return utc.unix();
};

/**
 * UTC to エポック(ミリ秒)
 * @param {string} baseDate YYYYMMDD HHmmss.SSS
 * @returns {number|null} エポック(ミリ秒)
 */
exports.utcToEpochMilliSec = (baseDate) => {
  let utc = dayjs.utc(baseDate);
  if (!isValidDate(utc)) {
    return null;
  }
  return utc.valueOf();
};

/**
 * UTC to JST変換
 * @param {string} baseUtc UTC時間. YYYYMMDD HHmmss
 * @returns {string|null} 日本時間. YYYYMMDD HHmmss
 */
exports.utcToJst = (baseUtc) => {

  let utc = dayjs.utc(baseUtc, YYYYMMDD_HHmmss);
  if (!isValidDate(utc)) {
    return null;
  }

  return utc.tz("Asia/Tokyo").format(YYYYMMDD_HHmmss);
};

/**
 * JST to UTC変換
 * @param {string} baseJst YYYYMMDD HHmmss
 * @returns {string|null} UTC. YYYYMMDD HHmmss
 */
exports.jstToUtc = (baseJst) => {

  let jst = dayjs(baseJst, YYYYMMDD_HHmmss, true).tz("Asia/Tokyo");
  if (!isValidDate(jst)) {
    return null;
  }

  return jst.utc().format(YYYYMMDD_HHmmss);
};
