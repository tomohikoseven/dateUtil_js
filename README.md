# 日付ユーティリティ

## 年齢計算
in 基準日 YYYYMMDD, 生年月日 YYYYMMDD  
out 満年齢

## 日付計算（年）
in 基準日 YYYYMMDD, 加減年 Y  
out 加減した日付 YYYYMMDD  
note : うるう年の考慮が必要 2020/02/29 の1年後は 2021/02/28

## 日付計算（月）
in 基準日 YYYYMMDD, 加減月 M  
out 加減した日付  YYYYMMDD  
note : 月末の判定時の考慮が必要（2021/01/31の1か月後は2021/02/28、2021/03/31の1か月後は2021/04/30）

## 日付計算（日）
in 基準日 YYYYMMDD, 加減日 D  
out 加減した日付 YYYYMMDD

## 日付フォーマッター 
in 基準日、フォーマットパターン  
out フォーマットパターンに合わせた文字列  
YYYYMMDD -> YYYYMMは必須  

## 月末算出   
in 基準日  
out 基準日の月の月末日を返す  

## 日付比較
in 基準日、対象日  
out 基準日 < 対象日 は -1, 基準日 = 対象日 は 0, 基準日 > 対象日 は 1

## 日付差分日数
in 基準日、対象日  
out 基準日と対象日の差分日付  

## エポック <-> 年月日時分秒変換
in 日付時刻(エポックタイム) / 日付時刻 (YYYYMMDD hhmmss (UTC) )  
out 日付時刻 (YYYYMMDD hhmmss (UTC) ) / 日付時刻(エポック)

## UTC <-> JST 変換
in 日付時刻(YYYYMMDD hhmmss (UTC)) / 日付時刻(YYYYMMDD hhmmss (JST) )  
out 日付時刻(YYYYMMDD hhmmss (JST) ) / 日付時刻(YYYYMMDD hhmmss (UTC) )
