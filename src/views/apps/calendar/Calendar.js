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

  const jalaliCursorRef = useRef(jalaliCursor)

  useEffect(() => {
    jalaliCursorRef.current = jalaliCursor
  }, [jalaliCursor])

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi, setCalendarApi])

  const goToJalaliMonth = (jy, jm) => {
    const api = calendarRef.current?.getApi()
    const { start } = getJalaliMonthRange(jy, jm)

    jalaliCursorRef.current = { jy, jm }
    setJalaliCursor({ jy, jm })
    setJalaliTitle(getJalaliMonthTitle(jy, jm))

    if (api) api.gotoDate(start)
  }

  const handlePrevMonth = () => {
    const api = calendarRef.current?.getApi()
    if (!api) return

    if (api.view.type === 'dayGridMonth') {
      const { jy, jm } = jalaliCursorRef.current
      const prev = shiftJalaliMonth(jy, jm, -1)
      goToJalaliMonth(prev.jy, prev.jm)
    } else {
      api.prev()
    }
  }

  const handleNextMonth = () => {
    const api = calendarRef.current?.getApi()
    if (!api) return

    if (api.view.type === 'dayGridMonth') {
      const { jy, jm } = jalaliCursorRef.current
      const next = shiftJalaliMonth(jy, jm, 1)
      goToJalaliMonth(next.jy, next.jm)
    } else {
      api.next()
    }
  }

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

    slotMinTime: '00:00:00',
    slotMaxTime: '24:00:00',

    dayCellContent: arg => {
      const { jd } = gregorianToJalali(arg.date)
      return {
        html: `<span class="jalali-daynum${arg.isToday ? ' jalali-today' : ''}">${toPersianDigits(jd)}</span>`
      }
    },
    dayCellClassNames: arg => (arg.isToday ? ['jalali-today-cell'] : []),

    datesSet(info) {
      if (info.view.type !== 'dayGridMonth') {
        const { jy, jm } = gregorianToJalali(info.view.currentStart)
        jalaliCursorRef.current = { jy, jm }
        setJalaliCursor({ jy, jm })
        setJalaliTitle(getJalaliMonthTitle(jy, jm))
      }

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

    eventDidMount(arg) {
      const applyColor = () => {
        const isActive = !!arg.event.extendedProps?.active
        arg.el.classList.remove('bg-light-success', 'bg-light-warning')
        arg.el.classList.add(isActive ? 'bg-light-success' : 'bg-light-warning')
      }
      applyColor()
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
        .fc .jalali-today-cell {
          background-color: rgba(115, 103, 240, 0.08) !important;
        }
      `}</style>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)