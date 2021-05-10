const { expect } = require("@jest/globals");
const dateUtil = require("../lib/dateUtil");

describe("calcAge", () => {
  it("基準日と生年月日が同日の場合、0歳であること。", () => {
    const base = "20210101";
    const birthday = "20210101";
    expect(dateUtil.calcAge(base, birthday)).toBe(0);
  });
  it("基準日が日付でない場合、nullであること。", () => {
    const base = "aaa";
    const birthday = "20210101";
    expect(dateUtil.calcAge(base, birthday)).toBeNull();
  });
  it("誕生日が日付でない場合、nullであること。", () => {
    const base = "20210101";
    const birthday = "2021bbb";
    expect(dateUtil.calcAge(base, birthday)).toBeNull();
  });
});

describe("addYears", () => {
  it("基準日：20210301の2年後は、20230301であること。", () => {
    const base = "20210301";
    const add = 2;
    expect(dateUtil.addYears(base, add)).toBe("20230301");
  });
  it("基準日：20200229の1年後は、20210228であること。", () => {
    const base = "20200229";
    const add = 1;
    expect(dateUtil.addYears(base, add)).toBe("20210228");
  });
  it("基準日：20210301の-2年後は、20190301であること。", () => {
    const base = "20210301";
    const add = -2;
    expect(dateUtil.addYears(base, add)).toBe("20190301");
  });
  it("基準日：不正日付の-2年後は、nullであること。", () => {
    const base = "202103aa";
    const add = -2;
    expect(dateUtil.addYears(base, add)).toBeNull();
  });
  it("基準日：20210301のa年後は、nullであること。", () => {
    const base = "20210301";
    const add = "a";
    expect(dateUtil.addYears(base, add)).toBeNull();
  });
});

describe("addMonths", () => {
  it("基準日：20210131の1か月後は、20210228であること。", () => {
    const base = "20210131";
    const add = 1;
    expect(dateUtil.addMonths(base, add)).toBe("20210228");
  });
  it("基準日：20210331の1か月後は、20210430であること。", () => {
    const base = "20210331";
    const add = 1;
    expect(dateUtil.addMonths(base, add)).toBe("20210430");
  });
  it("基準日：20200229の2か月後は、20200429であること。", () => {
    const base = "20200229";
    const add = 2;
    expect(dateUtil.addMonths(base, add)).toBe("20200429");
  });
  it("基準日：20210301の-2か月後は、20210101であること。", () => {
    const base = "20210301";
    const add = -2;
    expect(dateUtil.addMonths(base, add)).toBe("20210101");
  });
  it("基準日が不正日付で、その2か月後はnullとなること。", () => {
    const base = "aa";
    const add = 2;
    expect(dateUtil.addMonths(base, add)).toBeNull();
  });
  it("基準日：20210301で、そのaか月後はnullとなること。", () => {
    const base = "20210301";
    const add = "a";
    expect(dateUtil.addMonths(base, add)).toBeNull();
  });
});

describe("addDays", () => {
  it("基準日：20210131の1日後は、20210201であること。", () => {
    const base = "20210131";
    const add = 1;
    expect(dateUtil.addDays(base, add)).toBe("20210201");
  });
  it("基準日：不正日付の1日後は、nullであること。", () => {
    const base = "aa210131";
    const add = 1;
    expect(dateUtil.addDays(base, add)).toBeNull();
  });
  it("基準日：20210131のa日後は、nullであること。", () => {
    const base = "20210131";
    const add = "a";
    expect(dateUtil.addDays(base, add)).toBeNull();
  });
});

describe("format", () => {
  it("日付:20210304をYYYYMMフォーマットする。", () => {
    const base = "20210304";
    const format = "YYYYMM";
    expect(dateUtil.format(base, format)).toBe("202103");
  });
  it("日付:2021-03-04をYYYYMMフォーマットする。", () => {
    const base = "2021-03-04";
    const format = "YYYYMM";
    expect(dateUtil.format(base, format)).toBe("202103");
  });
  it("日時:2021-03-04 00:00:00.000をYYYYMMDDフォーマットする。", () => {
    const base = "2021-03-04 00:00:00.000";
    const format = "YYYYMMDD";
    expect(dateUtil.format(base, format)).toBe("20210304");
  });
  it("日付：不正日付 をYYYYMMDDフォーマットすると、nullとなる。", () => {
    const base = "aa";
    const format = "YYYYMMDD";
    expect(dateUtil.format(base, format)).toBeNull();
  });
});
describe("endOfMonth", () => {
  it("日付：20210301の月末は20210331であること。", () => {
    const base = "20210301";
    expect(dateUtil.endOfMonth(base)).toBe("20210331");
  });
  it("日付：20200201の月末は20200229であること。", () => {
    const base = "20200201";
    expect(dateUtil.endOfMonth(base)).toBe("20200229");
  });
  it("日付：202002の月末は20200229であること。", () => {
    const base = "202002";
    expect(dateUtil.endOfMonth(base)).toBe("20200229");
  });
  it("日付：202013の月末はnullであること。", () => {
    const base = "202013";
    expect(dateUtil.endOfMonth(base)).toBeNull();
  });
});

describe("compare", () => {
  it("基準日と比較対象日付が同じ場合、結果が 0 であること。", () => {
    const base = "20210508";
    const comp = "20210508";
    expect(dateUtil.compare(base, comp)).toBe(0);
  });
  it("基準日 < 比較対象日付の場合、結果が -1 であること。", () => {
    const base = "20210508";
    const comp = "20210509";
    expect(dateUtil.compare(base, comp)).toBe(-1);
  });
  it("基準日 > 比較対象日付の場合、結果が 1 であること。", () => {
    const base = "20210508";
    const comp = "20210507";
    expect(dateUtil.compare(base, comp)).toBe(1);
  });
  it("基準日が不正日付の場合、結果が null であること。", () => {
    const base = "202111aa";
    const comp = "20210507";
    expect(dateUtil.compare(base, comp)).toBeNull();
  });
  it("比較対象日付が不正日付の場合、結果が null であること。", () => {
    const base = "20211111";
    const comp = "202105aa";
    expect(dateUtil.compare(base, comp)).toBeNull();
  });
});

describe("diffDays", () => {
  it("同じ日付を指定した場合、日付差分結果が 0 であること。", () => {
    const from = "20200508";
    const to = "20200508";
    expect(dateUtil.diffDays(from, to)).toBe(0);
  });
  it("20210508と20210509の日付差分結果は、1 であること。", () => {
    const from = "20210508";
    const to = "20210509";
    expect(dateUtil.diffDays(from, to)).toBe(1);
  });
  it("20210508と20210507の日付差分結果は、-1 であること。", () => {
    const from = "20210508";
    const to = "20210507";
    expect(dateUtil.diffDays(from, to)).toBe(-1);
  });
  it("基準日が不正日付の場合、結果はnullであること。", () => {
    const from = "202105aa";
    const to = "20210507";
    expect(dateUtil.diffDays(from, to)).toBeNull();
  });
  it("対象日が不正日付の場合、結果はnullであること。", () => {
    const from = "20210518";
    const to = "202105aa";
    expect(dateUtil.diffDays(from, to)).toBeNull();
  });
});

describe("epochSecToUtc", () => {
  it("エポック1秒は、19700101 000001 であること。", () => {
    const sec = 1;
    const expected = "19700101 000001";
    expect(dateUtil.epochSecToUtc(sec)).toBe(expected);
  });
  it("エポックa秒は、null であること。", () => {
    const sec = "a";
    expect(dateUtil.epochSecToUtc(sec)).toBeNull();
  });
});

describe("epochMilliSecToUtc", () => {
  it("エポック1ミリ秒は、19700101 000000.001 であること。", () => {
    const millisec = 1;
    const expected = "19700101 000000.001";
    expect(dateUtil.epochMilliSecToUtc(millisec)).toBe(expected);
  });
});

describe("utcToEpochSec", () => {
  it("19700101 000001 はエポック1秒であること。", () => {
    const utc = "19700101 000001";
    const expected = 1;
    expect(dateUtil.utcToEpochSec(utc)).toBe(expected);
  });
  it("日付不正 はnullが返ってくること。", () => {
    const utc = "abc";
    expect(dateUtil.utcToEpochSec(utc)).toBeNull();
  });
});

describe("utcToEpochSec", () => {
  it("19700101 000000.001 はエポック1ミリ秒であること。", () => {
    const utc = "19700101 000000.001";
    const expected = 1;
    expect(dateUtil.utcToEpochMilliSec(utc)).toBe(expected);
  });
  it("日付不正 はnullが返ってくること。", () => {
    const utc = "abc";
    expect(dateUtil.utcToEpochMilliSec(utc)).toBeNull();
  });
});

describe("utcToJst", () => {
  it("UTC：19700101 000000 は日本時間では 19700101 090000となること。", () => {
    const utc = "19700101 000000";
    const expected = "19700101 090000";
    expect(dateUtil.utcToJst(utc)).toBe(expected);
  });
  it("UTC：不正日付 は null となること。", () => {
    const utc = "abc";
    expect(dateUtil.utcToJst(utc)).toBeNull();
  });
});

describe("jstToUtc", () => {
  it("JST：19700101 090000 は日本時間では 19700101 000000となること。", () => {
    const jst = "19700101 090000";
    const expected = "19700101 000000";
    expect(dateUtil.jstToUtc(jst)).toBe(expected);
  });
  it("JST：不正日付 は null となること。", () => {
    const jst = "abc";
    expect(dateUtil.jstToUtc(jst)).toBeNull();
  });
});
