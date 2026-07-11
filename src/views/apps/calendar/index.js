// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
}

export const calendarsLabelFa = {
  Business: 'کاری',
  Holiday: 'تعطیلات',
  Personal: 'شخصی',
  Family: 'خانواده',
  ETC: 'متفرقه'
}

const CalendarComponent = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const [events, setEvents] = useState([])
  const [selectedCalendars, setSelectedCalendars] = useState(Object.keys(calendarsColor))

  // ** Hooks
  const [isRtl] = useRTL()

  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** شیء خالی رویداد
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }

  const selectEvent = event => setSelectedEvent(event)

  const addEvent = event => {
    setEvents(prev => [...prev, { ...event, id: `${Date.now()}` }])
  }

  const updateEvent = updatedEvent => {
    setEvents(prev => prev.map(event => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event)))
  }

  const removeEvent = eventId => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const updateFilter = filterLabel => {
    setSelectedCalendars(prev =>
      prev.includes(filterLabel) ? prev.filter(f => f !== filterLabel) : [...prev, filterLabel]
    )
  }

  const updateAllFilters = checked => {
    setSelectedCalendars(checked ? Object.keys(calendarsColor) : [])
  }

  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents()
    }
  }

  const filteredEvents = events.filter(event => selectedCalendars.includes(event.extendedProps?.calendar))

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              toggleSidebar={toggleSidebar}
              handleAddEventSidebar={handleAddEventSidebar}
              selectedCalendars={selectedCalendars}
              updateFilter={updateFilter}
              updateAllFilters={updateAllFilters}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              events={filteredEvents}
              selectEvent={selectEvent}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        open={addSidebarOpen}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        selectedEvent={selectedEvent}
        selectEvent={selectEvent}
        addEvent={addEvent}
        updateEvent={updateEvent}
        removeEvent={removeEvent}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  )
}

export default CalendarComponent