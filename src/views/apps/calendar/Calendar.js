// ** React Import
import { useEffect, useRef, useState, memo } from 'react'

// ** Full Calendar & Plugins
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import faLocale from '@fullcalendar/core/locales/fa'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Components
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

// ** Jalali Utils
import {
  gregorianToJalali,
  getJalaliMonthRange,
  getJalaliMonthTitle,
  shiftJalaliMonth,
  toPersianDigits
} from './jalali'

const Calendar = props => {
  const calendarRef = useRef(null)

  const {
    isRtl,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    events,
    selectEvent,
    onDatesSet
  } = props

  const [jalaliCursor, setJalaliCursor] = useState(() => {
    const { jy, jm } = gregorianToJalali(new Date())
    return { jy, jm }
  })

  const [jalaliTitle, setJalaliTitle] = useState(() => getJalaliMonthTitle(jalaliCursor.jy, jalaliCursor.jm))

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi, setCalendarApi])

  // customButtons فقط یک‌بار موقع mount ساخته می‌شن و click handlerشون دیگه با
  // re-render آپدیت نمی‌شه (محدودیت شناخته‌شده‌ی FullCalendar). به همین خاطر داخل
  // این توابع هیچ‌وقت از state ری‌اکت (jalaliCursor / prop calendarApi) استفاده
  // نمی‌کنیم؛ همیشه مستقیم از calendarRef.current می‌خونیم که یک ref پایدار است
  // و همیشه به نمونه‌ی زنده‌ی تقویم اشاره می‌کند، حتی داخل closureِ قدیمی.
  const handlePrevMonth = () => {
    const api = calendarRef.current?.getApi()
    if (!api) return

    if (api.view.type === 'dayGridMonth') {
      const { jy, jm } = gregorianToJalali(api.view.currentStart)
      const prev = shiftJalaliMonth(jy, jm, -1)
      const { start } = getJalaliMonthRange(prev.jy, prev.jm)
      api.gotoDate(start)
    } else {
      // در نمای هفته/روز/لیست از ناوبری داخلی خودِ FullCalendar استفاده می‌کنیم
      api.prev()
    }
  }

  const handleNextMonth = () => {
    const api = calendarRef.current?.getApi()
    if (!api) return

    if (api.view.type === 'dayGridMonth') {
      const { jy, jm } = gregorianToJalali(api.view.currentStart)
      const next = shiftJalaliMonth(jy, jm, 1)
      const { start } = getJalaliMonthRange(next.jy, next.jm)
      api.gotoDate(start)
    } else {
      api.next()
    }
  }

  // چون متنِ customButtons هم به‌صورت خودکار با تغییر state آپدیت نمی‌شه،
  // دستی روی خودِ دکمه‌ی تیتر تنظیمش می‌کنیم.
  useEffect(() => {
    if (!calendarApi) return
    const btn = calendarApi.el?.querySelector('.fc-jalaliTitle-button')
    if (btn) btn.textContent = jalaliTitle
  }, [calendarApi, jalaliTitle])

  const calendarOptions = {
    locale: faLocale,

    buttonText: {
      today: 'امروز',
      month: 'ماه',
      week: 'هفته',
      day: 'روز',
      list: 'لیست'
    },

    events: events || [],

    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],

    initialView: 'dayGridMonth',
    initialDate: getJalaliMonthRange(jalaliCursor.jy, jalaliCursor.jm).start,

    headerToolbar: {
      start: 'jalaliPrev jalaliTitle jalaliNext',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    // پوشش کامل بازه‌ی ساعتی روز تا هیچ رویدادی در نمای روز/هفته به خاطر
    // محدودیت ساعتی پیش‌فرض مخفی نمونه
    slotMinTime: '00:00:00',
    slotMaxTime: '24:00:00',

    dayCellContent: arg => {
      const { jd } = gregorianToJalali(arg.date)
      return {
        html: `<span class="jalali-daynum${arg.isToday ? ' jalali-today' : ''}">${toPersianDigits(jd)}</span>`
      }
    },

    // منبع حقیقتِ ماه/عنوان رو از خودِ view می‌گیریم (نه از state جداگانه)، تا با
    // هر نوع ناوبری - چه دکمه‌های سفارشی ما، چه دکمه‌های داخلی هفته/روز/لیست -
    // همیشه هماهنگ بمونه. دیگه هیچ افکتی به‌خاطر این تغییر، view رو زورکی عوض نمی‌کنه.
    datesSet(info) {
      const { jy, jm } = gregorianToJalali(info.view.currentStart)
      setJalaliCursor({ jy, jm })
      setJalaliTitle(getJalaliMonthTitle(jy, jm))

      if (onDatesSet) {
        onDatesSet({
          startDate: info.startStr,
          endDate: info.endStr
        })
      }
    },

    editable: false,
    eventResizableFromStart: false,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,

    eventClassNames({ event }) {
      const isActive = event._def.extendedProps?.active
      return [isActive ? 'bg-light-success' : 'bg-light-warning']
    },

    // لایه‌ی اطمینان اضافه: هر بار رویداد رندر/آپدیت می‌شه، رنگش رو هم مستقیم
    // روی خودِ المان DOM اعمال می‌کنیم. این باعث می‌شه حتی اگه eventClassNames
    // به هر دلیلی دیر recompute بشه، رنگ بلافاصله درست باشه.
    eventDidMount(arg) {
      const applyColor = () => {
        const isActive = !!arg.event.extendedProps?.active
        arg.el.classList.remove('bg-light-success', 'bg-light-warning')
        arg.el.classList.add(isActive ? 'bg-light-success' : 'bg-light-warning')
      }
      applyColor()
      // اگه بعداً extendedProps با setExtendedProp عوض بشه، دوباره اعمال کن
      arg.event.setProp === undefined ? null : null
    },

    eventClick({ event: clickedEvent }) {
      selectEvent(clickedEvent)
      handleAddEventSidebar()
    },

    dateClick(info) {
      blankEvent.start = info.date
      blankEvent.end = info.date
      selectEvent(blankEvent)
      handleAddEventSidebar()
    },

    customButtons: {
      jalaliPrev: {
        text: <ChevronRight size={16} />,
        click: handlePrevMonth
      },
      jalaliTitle: {
        text: jalaliTitle,
        click: () => {}
      },
      jalaliNext: {
        text: <ChevronLeft size={16} />,
        click: handleNextMonth
      }
    },

    ref: calendarRef,

    direction: isRtl ? 'rtl' : 'ltr'
  }

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <style>{`
        .jalali-daynum {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .jalali-today {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #7367f0;
          color: #fff !important;
          font-weight: 600;
        }
      `}</style>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)