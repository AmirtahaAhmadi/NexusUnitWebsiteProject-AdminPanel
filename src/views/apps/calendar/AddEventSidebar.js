// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import toast from 'react-hot-toast'
import { X } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import Select, { components } from 'react-select'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    selectedEvent,
    selectEvent,
    addEvent,
    updateEvent,
    removeEvent,
    calendarApi,
    refetchEvents,
    calendarsColor,
    handleAddEventSidebar
  } = props

  const options = [
    { value: 'Business', label: 'کاری', color: 'primary' },
    { value: 'Personal', label: 'شخصی', color: 'danger' },
    { value: 'Family', label: 'خانواده', color: 'warning' },
    { value: 'Holiday', label: 'تعطیلات', color: 'success' },
    { value: 'ETC', label: 'متفرقه', color: 'info' }
  ]

  const guestsOptions = [
    { value: 'دنا فرانک', label: 'دنا فرانک' },
    { value: 'ژانت فاستر', label: 'ژانت فاستر' },
    { value: 'گابریل رابرتسون', label: 'گابریل رابرتسون' },
    { value: 'لوری اسپیرز', label: 'لوری اسپیرز' },
    { value: 'ساندی وگا', label: 'ساندی وگا' },
    { value: 'شریل می', label: 'شریل می' }
  ]

  // ** Vars & Hooks
  const {
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: '' }
  })

  // ** States
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [guests, setGuests] = useState([])
  const [allDay, setAllDay] = useState(false)
  const [location, setLocation] = useState('')
  const [endPicker, setEndPicker] = useState(new Date())
  const [startPicker, setStartPicker] = useState(new Date())
  const [calendarLabel, setCalendarLabel] = useState([options[0]])

  const OptionComponent = ({ data, ...rest }) => {
    return (
      <components.Option {...rest}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    )
  }

  const GuestsComponent = ({ data, ...rest }) => {
    return (
      <components.Option {...rest}>
        <div className='d-flex flex-wrap align-items-center'>
          <Avatar className='my-0 me-1' size='sm' content={data.label} initials />
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }

  const handleAddEvent = () => {
    const obj = {
      title: getValues('title'),
      start: startPicker,
      end: endPicker,
      allDay,
      display: 'block',
      extendedProps: {
        calendar: calendarLabel[0].value,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        location: location.length ? location : undefined,
        description: desc.length ? desc : undefined
      }
    }
    addEvent(obj)
    refetchEvents()
    handleAddEventSidebar()
    toast.success('رویداد اضافه شد')
  }

  const handleResetInputValues = () => {
    selectEvent({})
    setValue('title', '')
    setAllDay(false)
    setUrl('')
    setLocation('')
    setDesc('')
    setGuests([])
    setCalendarLabel([options[0]])
    setStartPicker(new Date())
    setEndPicker(new Date())
  }

  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const calendarValue = selectedEvent.extendedProps?.calendar

      const resolveLabel = () => {
        if (calendarValue && calendarValue.length) {
          const found = options.find(opt => opt.value === calendarValue)
          return found || options[0]
        }
        return options[0]
      }

      setValue('title', selectedEvent.title || '')
      setAllDay(selectedEvent.allDay || false)
      setUrl(selectedEvent.url || '')
      setLocation(selectedEvent.extendedProps?.location || '')
      setDesc(selectedEvent.extendedProps?.description || '')
      setGuests(selectedEvent.extendedProps?.guests || [])
      setStartPicker(selectedEvent.start ? new Date(selectedEvent.start) : new Date())
      setEndPicker(
        selectedEvent.allDay
          ? new Date(selectedEvent.start || new Date())
          : new Date(selectedEvent.end || selectedEvent.start || new Date())
      )
      setCalendarLabel([resolveLabel()])
    }
  }

  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id)
    if (!existingEvent) return

    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(new Date(updatedEventData.start), new Date(updatedEventData.end), {
      allDay: updatedEventData.allDay
    })

    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }

  const handleUpdateEvent = () => {
    if (getValues('title').length) {
      const eventToUpdate = {
        id: selectedEvent.id,
        title: getValues('title'),
        allDay,
        start: startPicker,
        end: endPicker,
        url,
        display: allDay === false ? 'block' : undefined,
        extendedProps: {
          location,
          description: desc,
          guests,
          calendar: calendarLabel[0].value
        }
      }

      const propsToUpdate = ['id', 'title', 'url']
      const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']

      updateEvent(eventToUpdate)
      updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)

      handleAddEventSidebar()
      toast.success('رویداد بروزرسانی شد')
    } else {
      setError('title', { type: 'manual' })
    }
  }

  const removeEventInCalendar = eventId => {
    const existingEvent = calendarApi.getEventById(eventId)
    if (existingEvent) existingEvent.remove()
  }

  const handleDeleteEvent = () => {
    removeEvent(selectedEvent.id)
    removeEventInCalendar(selectedEvent.id)
    handleAddEventSidebar()
    toast.error('رویداد حذف شد')
  }

  const EventActions = () => {
    if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title?.length)) {
      return (
        <Fragment>
          <Button className='me-1' type='submit' color='primary'>
            افزودن
          </Button>
          <Button color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            انصراف
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button className='me-1' color='primary' onClick={handleUpdateEvent}>
            بروزرسانی
          </Button>
          <Button color='danger' onClick={handleDeleteEvent} outline>
            حذف
          </Button>
        </Fragment>
      )
    }
  }

  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleAddEventSidebar}
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'بروزرسانی' : 'افزودن'} رویداد
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <Form
            onSubmit={handleSubmit(data => {
              if (data.title.length) {
                if (isObjEmpty(errors)) {
                  if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title?.length)) {
                    handleAddEvent()
                  } else {
                    handleUpdateEvent()
                  }
                }
              } else {
                setError('title', { type: 'manual' })
              }
            })}
          >
            <div className='mb-1'>
              <Label className='form-label' for='title'>
                عنوان <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Input id='title' placeholder='عنوان' invalid={errors.title && true} {...field} />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='label'>
                برچسب
              </Label>
              <Select
                id='label'
                value={calendarLabel}
                options={options}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                onChange={data => setCalendarLabel([data])}
                components={{
                  Option: OptionComponent
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='startDate'>
                تاریخ شروع
              </Label>
              <Flatpickr
                required
                id='startDate'
                name='startDate'
                className='form-control'
                onChange={date => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'Y-m-d H:i'
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='endDate'>
                تاریخ پایان
              </Label>
              <Flatpickr
                required
                id='endDate'
                name='endDate'
                className='form-control'
                onChange={date => setEndPicker(date[0])}
                value={endPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'Y-m-d H:i'
                }}
              />
            </div>

            <div className='form-switch mb-1'>
              <Input
                id='allDay'
                type='switch'
                className='me-1'
                checked={allDay}
                name='customSwitch'
                onChange={e => setAllDay(e.target.checked)}
              />
              <Label className='form-label' for='allDay'>
                تمام روز
              </Label>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='eventURL'>
                آدرس رویداد
              </Label>
              <Input
                type='url'
                id='eventURL'
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder='https://www.example.com'
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='guests'>
                مهمانان
              </Label>
              <Select
                isMulti
                id='guests'
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                options={guestsOptions}
                theme={selectThemeColors}
                value={guests.length ? guests : null}
                onChange={data => setGuests(data ? [...data] : [])}
                components={{
                  Option: GuestsComponent
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='location'>
                مکان
              </Label>
              <Input id='location' value={location} onChange={e => setLocation(e.target.value)} placeholder='دفتر کار' />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='description'>
                توضیحات
              </Label>
              <Input
                type='textarea'
                name='text'
                id='description'
                rows='3'
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder='توضیحات'
              />
            </div>
            <div className='d-flex mb-1'>
              <EventActions />
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default AddEventSidebar