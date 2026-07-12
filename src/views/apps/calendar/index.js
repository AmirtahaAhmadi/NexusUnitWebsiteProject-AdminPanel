// ** React Imports
import { Fragment, useState, useEffect, useCallback } from 'react'

// ** Third Party Components
import toast from 'react-hot-toast'
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

// ** Real API Services
import { getAdminScheduals } from '../../../core/Interceptor/Services/CalenderPageServieces/ger'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

const mapScheduleToEvent = item => {
  const start = item.startDate && item.startTime ? `${item.startDate.split('T')[0]}T${item.startTime}` : item.startDate

  const end = item.startDate && item.endTime ? `${item.startDate.split('T')[0]}T${item.endTime}` : item.startDate

  return {
    id: String(item.id),
    title: item.courseName || item.title || `دوره ${item.courseGroupId ?? ''}`,
    start,
    end,
    allDay: false,
    display: 'block',
    extendedProps: {
      active: item.active,
      courseGroupId: item.courseGroupId,
      weekNumber: item.weekNumber,
      rowEffect: item.rowEffect,
      raw: item
    }
  }
}

const CalendarComponent = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  const [courseId, setCourseId] = useState(undefined)

  const [isRtl] = useRTL()

  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  const toggleSidebar = val => setLeftSidebarOpen(val)

  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    extendedProps: {
      active: false,
      courseGroupId: '',
      weekNumber: '',
      rowEffect: ''
    }
  }

  const selectEvent = event => setSelectedEvent(event)

 const fetchAdminSchedules = useCallback(async () => {
  if (!dateRange.startDate || !dateRange.endDate) return;

  setLoading(true);

  try {
    console.log("Date Range:", dateRange);
    console.log("CourseId:", courseId);

    const response = await getAdminScheduals(
      dateRange.startDate,
      dateRange.endDate,
      courseId
    );

    console.log("API Response:", response);
    console.log("API Data:", response.data);

    const list = response?.data?.data || response?.data || [];

    console.log("Schedule List:", list);

    const mappedEvents = list.map(mapScheduleToEvent);

    console.log("Mapped Events:", mappedEvents);

    setEvents(mappedEvents);
  } catch (error) {
    console.log("Calendar Error:", error);
    console.log("Response Error:", error?.response?.data);
    toast.error("خطا در دریافت برنامه‌ها");
  } finally {
    setLoading(false);
  }
}, [dateRange, courseId]);

  useEffect(() => {
    fetchAdminSchedules()
  }, [fetchAdminSchedules])

  const handleDatesSet = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate })
  }

  const refetchEvents = () => {
    fetchAdminSchedules()
  }

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
            <SidebarLeft toggleSidebar={toggleSidebar} handleAddEventSidebar={handleAddEventSidebar} />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              toggleSidebar={toggleSidebar}
              setCalendarApi={setCalendarApi}
              events={events}
              selectEvent={selectEvent}
              onDatesSet={handleDatesSet}
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
        selectedEvent={selectedEvent}
        selectEvent={selectEvent}
        refetchEvents={refetchEvents}
        currentCurseId={courseId}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  )
}

export default CalendarComponent