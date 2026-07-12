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
import { Menu, ChevronLeft, ChevronRight } from 'react-feather'
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
    toggleSidebar,
    events,
    selectEvent,
    onDatesSet
  } = props

  const [jalaliCursor, setJalaliCursor] = useState(() => {
    const { jy, jm } = gregorianToJalali(new Date())
    return { jy, jm }
  })

  const [isMonthView, setIsMonthView] = useState(true)

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi, setCalendarApi])

  useEffect(() => {
    if (calendarApi && isMonthView) {
      const { start, end } = getJalaliMonthRange(jalaliCursor.jy, jalaliCursor.jm)
      calendarApi.changeView('dayGridMonth', { start, end })
    }
  }, [calendarApi, jalaliCursor, isMonthView])

  const handlePrevMonth = () => setJalaliCursor(prev => shiftJalaliMonth(prev.jy, prev.jm, -1))
  const handleNextMonth = () => setJalaliCursor(prev => shiftJalaliMonth(prev.jy, prev.jm, 1))

  const jalaliTitle = getJalaliMonthTitle(jalaliCursor.jy, jalaliCursor.jm)

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
      start: 'sidebarToggle jalaliPrev jalaliTitle jalaliNext',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    dayCellContent: arg => {
      const { jd } = gregorianToJalali(arg.date)
      return { html: `<span>${toPersianDigits(jd)}</span>` }
    },

    viewDidMount(arg) {
      setIsMonthView(arg.view.type === 'dayGridMonth')
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

    datesSet(info) {
      if (onDatesSet) {
        onDatesSet({
          startDate: info.startStr,
          endDate: info.endStr
        })
      }
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      },
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
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)