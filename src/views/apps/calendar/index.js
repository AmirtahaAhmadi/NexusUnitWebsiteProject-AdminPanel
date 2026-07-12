// ** React Imports
import { Fragment, useState, useEffect, useCallback } from 'react'

// ** Third Party Components
import toast from 'react-hot-toast'
import { Button } from 'reactstrap'
import { Plus } from 'react-feather'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import AddEventSidebar from './AddEventSidebar'

// ** Real API Services
import { getAdminScheduals } from '../../../core/Interceptor/Services/CalenderPageServieces/ger'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

// بک‌اند ممکنه نام فیلد active رو با casing/نام متفاوتی برگردونه؛
// این تابع همه‌ی حالت‌های محتمل رو پوشش می‌ده تا آیتم قفل‌شده درست سبز بشه.
const getActiveFlag = item =>
  Boolean(item.active ?? item.Active ?? item.isActive ?? item.IsActive ?? false)

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
      active: getActiveFlag(item),
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
  const [selectedEvent, setSelectedEvent] = useState({})
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  const [courseId, setCourseId] = useState(undefined)

  const [isRtl] = useRTL()

  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

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
    if (!dateRange.startDate || !dateRange.endDate) return

    setLoading(true)

    try {
      const response = await getAdminScheduals(dateRange.startDate, dateRange.endDate, courseId)

      const list = response?.data?.data || response?.data || []

      const mappedEvents = list.map(mapScheduleToEvent)

      setEvents(mappedEvents)
    } catch (error) {
      toast.error('خطا در دریافت برنامه‌ها')
    } finally {
      setLoading(false)
    }
  }, [dateRange, courseId])

  useEffect(() => {
    fetchAdminSchedules()
  }, [fetchAdminSchedules])

  const handleDatesSet = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate })
  }

  const refetchEvents = () => {
    fetchAdminSchedules()
  }

  // آپدیت آنی رنگ رویداد در تقویم.
  // نکته‌ی مهم: فقط عوض کردن آرایه‌ی events در state ری‌اکت تضمین نمی‌کنه که
  // FullCalendar کلاسِ رویدادِ از‌قبل‌رندرشده رو دوباره محاسبه کنه. راه مطمئن،
  // استفاده از خودِ متد رسمی FullCalendar (getEventById + setExtendedProp) است
  // که رندر آن رویداد را بلافاصله و تضمین‌شده به‌روز می‌کند.
  const updateEventActiveState = (eventId, active) => {
    const idStr = String(eventId)

    const liveEvent = calendarApi?.getEventById(idStr)
    if (liveEvent) {
      liveEvent.setExtendedProp('active', active)
    }

    // هماهنگ نگه داشتن state داخلی برای رفتچ‌ها و رندرهای بعدی
    setEvents(prev =>
      prev.map(ev =>
        ev.id === idStr ? { ...ev, extendedProps: { ...ev.extendedProps, active } } : ev
      )
    )
  }

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <div className='d-flex justify-content-end p-1'>
          <Button color='primary' onClick={handleAddEventSidebar}>
            <Plus size={15} className='me-50' />
            <span className='align-middle'>افزودن جلسه</span>
          </Button>
        </div>
        <div className='position-relative'>
          <Calendar
            isRtl={isRtl}
            blankEvent={blankEvent}
            calendarApi={calendarApi}
            setCalendarApi={setCalendarApi}
            events={events}
            selectEvent={selectEvent}
            onDatesSet={handleDatesSet}
            handleAddEventSidebar={handleAddEventSidebar}
          />
        </div>
      </div>
      <AddEventSidebar
        open={addSidebarOpen}
        selectedEvent={selectedEvent}
        selectEvent={selectEvent}
        refetchEvents={refetchEvents}
        currentCurseId={courseId}
        handleAddEventSidebar={handleAddEventSidebar}
        onLockToggled={updateEventActiveState}
      />
    </Fragment>
  )
}

export default CalendarComponent