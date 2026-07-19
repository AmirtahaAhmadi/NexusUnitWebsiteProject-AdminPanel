import { toJalaali, toGregorian } from 'jalaali-js'

export const jalaliMonthNames = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]

export const toPersianDigits = num => String(num).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

export const gregorianToJalali = date => {
  const gy = date.getFullYear()
  const gm = date.getMonth() + 1
  const gd = date.getDate()
  const { jy, jm, jd } = toJalaali(gy, gm, gd)
  return { jy, jm, jd }
}

export const jalaliToGregorian = (jy, jm, jd) => {
  const { gy, gm, gd } = toGregorian(jy, jm, jd)
  return new Date(gy, gm - 1, gd)
}

export const getJalaliMonthRange = (jy, jm) => {
  const start = jalaliToGregorian(jy, jm, 1)
  const { jy: nextJy, jm: nextJm } = shiftJalaliMonth(jy, jm, 1)
  const end = jalaliToGregorian(nextJy, nextJm, 1)
  return { start, end }
}

export const shiftJalaliMonth = (jy, jm, delta) => {
  let m = jm + delta
  let y = jy
  while (m > 12) {
    m -= 12
    y += 1
  }
  while (m < 1) {
    m += 12
    y -= 1
  }
  return { jy: y, jm: m }
}

export const getJalaliMonthTitle = (jy, jm) => `${jalaliMonthNames[jm - 1]} ${toPersianDigits(jy)}`