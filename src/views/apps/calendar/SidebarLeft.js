// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input, Label } from 'reactstrap'

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png'

const filters = [
  { value: 'Personal', label: 'شخصی', color: 'danger', className: 'form-check-danger mb-1' },
  { value: 'Business', label: 'کاری', color: 'primary', className: 'form-check-primary mb-1' },
  { value: 'Family', label: 'خانواده', color: 'warning', className: 'form-check-warning mb-1' },
  { value: 'Holiday', label: 'تعطیلات', color: 'success', className: 'form-check-success mb-1' },
  { value: 'ETC', label: 'متفرقه', color: 'info', className: 'form-check-info' }
]

const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, selectedCalendars } = props

  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  return (
    <Fragment>
      <Card className='sidebar-wrapper shadow-none'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
          <Button color='primary' block onClick={handleAddEventClick}>
            <span className='align-middle'>افزودن رویداد</span>
          </Button>
        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>فیلتر</span>
          </h5>
          <div className='form-check mb-1'>
            <Input
              id='view-all'
              type='checkbox'
              label='نمایش همه'
              className='select-all'
              checked={selectedCalendars.length === filters.length}
              onChange={e => updateAllFilters(e.target.checked)}
            />
            <Label className='form-check-label' for='view-all'>
              نمایش همه
            </Label>
          </div>
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.value}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type='checkbox'
                      key={filter.value}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.value}-event`}
                      checked={selectedCalendars.includes(filter.value)}
                      onChange={() => {
                        updateFilter(filter.value)
                      }}
                    />
                    <Label className='form-check-label' for={`${filter.value}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                )
              })}
          </div>
        </CardBody>
      </Card>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft