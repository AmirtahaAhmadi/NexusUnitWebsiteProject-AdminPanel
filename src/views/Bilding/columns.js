// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

// ** Vars
const colors = {
  support: 'light-info',
  user: 'light-success',
  manager: 'light-warning',
  administrator: 'light-primary',
  'restricted-user': 'light-danger'
}

// ** برچسب فارسی برای هر نقش
const roleLabels = {
  support: 'پشتیبانی',
  user: 'کاربر',
  manager: 'مدیر',
  administrator: 'مدیر کل',
  'restricted-user': 'کاربر محدود'
}

export const columns = [
  {
    name: 'نام',
    sortable: true,
    minWidth: '350px',
    cell: ({ buildingName }) => buildingName,
    selector: row => row.buildingName
  },
  {
    sortable: true,
    minWidth: '350px',
    name: 'اختصاص یافته به',
    cell: ({ assignedTo }) => {
      if (assignedTo) {
        return assignedTo.map((assignee, index) => {
          const isLastBadge = assignedTo[assignedTo.length - 1] === index
          return (
            <Link key={`${assignee}-${index}`} to='/apps/user/list' className={classnames({ 'me-50': !isLastBadge })}>
              <Badge pill color={colors[assignee]} className='text-capitalize'>
                {roleLabels[assignee] || assignee.replace('-', ' ')}
              </Badge>
            </Link>
          )
        })
      } else {
        return null
      }
    }
  },
  {
    sortable: true,
    minWidth: '350px',
    name: 'تاریخ ایجاد',
    selector: row => row.createdDate,
    cell: ({ createdDate }) => createdDate,
    sortFunction: (rowA, rowB) => {
      return new Date(rowB.createdDate) - new Date(rowA.createdDate)
    }
  }
]