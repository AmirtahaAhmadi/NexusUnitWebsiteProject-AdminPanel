// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { formatDateToMonthShort, isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search } from 'react-feather'

// ** Reactstrap Imports
import { CardText, InputGroup, InputGroupText, Badge, Input } from 'reactstrap'

const SidebarLeft = props => {
  const {
    chatData,
    sidebar,
    handleSidebar,
    userSidebarLeft,
    handleUserSidebarLeft,
    handleSelectChat,
    onSearch,
    isLoading,
    duplicateWarning
  } = props
  const { chats, contacts, userProfile } = chatData

  // ** State
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState('online')

  const searchDebounce = useRef(null)

  const handleUserClick = id => {
    handleSelectChat(id)
    setActive(id)
    if (sidebar === true) {
      handleSidebar()
    }
  }

  useEffect(() => {
    if (!isObjEmpty(chatData.selectedUser)) {
      if (chatData.selectedUser.chat) {
        setActive(chatData.selectedUser.chat.id)
      } else {
        setActive(chatData.selectedUser.contact.id)
      }
    }
  }, [chatData.selectedUser])

  const renderChats = () => {
    if (!chats || !chats.length) {
      return query.length ? (
        <li className='no-results show'>
          <h6 className='mb-0'>نتیجه‌ای یافت نشد</h6>
        </li>
      ) : null
    }

    return chats.map(item => {
      const time = formatDateToMonthShort(item.chat.lastMessage ? item.chat.lastMessage.time : new Date())
      const isDone = item.isDone ?? item.contact?.isDone

      return (
        <li
          key={item.id}
          onClick={() => handleUserClick(item.id)}
          className={classnames({
            active: active === item.id
          })}
        >
          <Avatar img={item.avatar} imgHeight='42' imgWidth='42' status={item.status} />
          <div className='chat-info flex-grow-1'>
            <h5 className='mb-0'>{item.fullName}</h5>
            <CardText className='text-truncate'>
              {item.chat.lastMessage ? item.chat.lastMessage.message : 'پیامی ثبت نشده است'}
            </CardText>
          </div>
          <div className='chat-meta text-nowrap d-flex flex-column align-items-end'>
            <small className='mb-25 chat-time'>{time}</small>
        
            {item.chat.unseenMsgs >= 1 ? (
              <Badge color='danger' pill>
                {item.chat.unseenMsgs}
              </Badge>
            ) : null}
          </div>
        </li>
      )
    })
  }

  const renderContacts = () => {
    if (contacts && contacts.length) {
      return contacts.map(item => {
        return (
          <li key={item.fullName} onClick={() => handleUserClick(item.id)}>
            <Avatar img={item.avatar} imgHeight='42' imgWidth='42' />
            <div className='chat-info flex-grow-1'>
              <h5 className='mb-0'>{item.fullName}</h5>
              <CardText className='text-truncate'>{item.about}</CardText>
            </div>
          </li>
        )
      })
    } else {
      return null
    }
  }

  const handleFilter = e => {
    const value = e.target.value
    setQuery(value)

    if (searchDebounce.current) clearTimeout(searchDebounce.current)
    searchDebounce.current = setTimeout(() => {
      onSearch?.(value)
    }, 400)
  }

  return chatData ? (
    <div className='sidebar-left'>
      <div className='sidebar'>
        <div className={classnames('sidebar-content', { show: sidebar === true })}>
          <div className='sidebar-close-icon' onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className='chat-fixed-search'>
            <div className='d-flex align-items-center w-100'>
              <div className='sidebar-profile-toggle' onClick={handleUserSidebarLeft}>
                {Object.keys(userProfile).length ? (
                  <Avatar
                    className='avatar-border'
                    img={userProfile.avatar}
                    status={status}
                    imgHeight='42'
                    imgWidth='42'
                  />
                ) : null}
              </div>
              <InputGroup className='input-group-merge ms-1 w-100'>
                <InputGroupText className='round'>
                  <Search className='text-muted' size={14} />
                </InputGroupText>
                <Input value={query} className='round' placeholder='جستجوی تیکت' onChange={handleFilter} />
              </InputGroup>
            </div>
            {duplicateWarning ? (
              <small className='text-danger d-block mt-50'>
                تیکتی مشابه «{duplicateWarning}» قبلاً ثبت شده است
              </small>
            ) : null}
          </div>
          <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
            <h4 className='chat-list-title'>تیکت‌ها {isLoading ? '(در حال بارگذاری...)' : ''}</h4>
            <ul className='chat-users-list chat-list media-list'>{renderChats()}</ul>
            {contacts && contacts.length ? (
              <>
                <h4 className='chat-list-title'>مخاطبین</h4>
                <ul className='chat-users-list contact-list media-list'>{renderContacts()}</ul>
              </>
            ) : null}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null
}

export default SidebarLeft