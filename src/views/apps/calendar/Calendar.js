// ** React Import
import { useEffect, useRef, memo } from 'react'

// ** Full Calendar & Plugins
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import faLocale from '@fullcalendar/core/locales/fa'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Components
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

const Calendar = props => {
  const calendarRef = useRef(null)

  const {
    isRtl,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    events,
    selectEvent
  } = props

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi, setCalendarApi])

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

    headerToolbar: {
      start: 'sidebarToggle prev,next title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,

    eventClassNames({ event }) {
      const colorName = calendarsColor[event._def.extendedProps.calendar]

      return [`bg-light-${colorName}`]
    },

    // ** کلیک روی یک رویداد موجود -> باز کردن سایدبار برای ویرایش
    eventClick({ event: clickedEvent }) {
      selectEvent(clickedEvent)
      handleAddEventSidebar()
    },

    // ** کلیک روی یک روز خالی -> باز کردن سایدبار برای افزودن رویداد جدید
    dateClick(info) {
      blankEvent.start = info.date
      blankEvent.end = info.date
      selectEvent(blankEvent)
      handleAddEventSidebar()
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
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