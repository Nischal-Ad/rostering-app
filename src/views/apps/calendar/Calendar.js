// ** React Import
import { useEffect, useRef, memo, Fragment } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from 'react-redux'
// ** Custom Components
import Avatar from '@components/avatar'
import './fullcalendar.css'

// ** Third Party Components
import { toast } from 'react-toastify'
import { Card, CardBody } from 'reactstrap'
import { Menu, Check } from 'react-feather'
import { loadEvent } from '../../../redux1/action/auth'

// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className='toastify-header pb-0'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={icon} />
        <h6 className='toast-title'>{title}</h6>
      </div>
    </div>
  </Fragment>
)

const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)

  // ** Props
  const {
    store,
    isRtl,
    dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent
  } = props

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi])


  const events = Array.isArray(store) && store?.map(event => ({
    id:event.uuid,
    title: event.title,
    start: event.start_date,
    end: event.end_date
  }))
  // console.log(events)
  // ** calendarOptions(Props)
  
  const calendarOptions = { 
    events : events ? events : null,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,
    
    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,
    displayEventTime: false,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,
    

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,
    
    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      return [
        // Background Color
        `bg-light-${colorName}`
      ]
    },
    eventClick({ event: clickedEvent }) {
      dispatch(selectEvent(clickedEvent))
      handleAddEventSidebar()

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },

    // dateClick(info) {
    //   const ev = blankEvent
    //   ev.start_date = info.date
    //   const data = ev.start_date
    //   console.log(data)
    //   ev.end_date = info.date
    //   const today = new Date()
    //   // console.log(today)
    //   const nextDate = today.setDate(today.getDate() - 1)
    //   // console.log(nextDate)
    //   // dispatch(loadEvent(ev))
    //   dispatch(selectEvent(ev))
    //   if (data > nextDate) {
    //     handleAddEventSidebar()
    //   } else {
    //     info.jsEvent.preventDefault()
    //   }
      
    // },
    // dateClick(info) {
    //   const ev = blankEvent
    //   ev.start = info.date
    //   ev.end = info.date
    //   dispatch(selectEvent(ev))
    //   handleAddEventSidebar()
    // },
    dateClick(info) {
      const clickedDate = info.date
      const today = new Date()
    
      // Compare the clicked date with today's date
      if (clickedDate < today) {
        // Clicked date is before today
        console.log('Cannot select a date before today')
        return
      }
    
      const ev = blankEvent
      ev.start = clickedDate
      ev.end = clickedDate
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
    },
    
    
    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent))
      toast.success(<ToastComponent title='Event Updated' color='success' icon={<Check />} />, {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false
      })
    },


    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent))
      toast.success(<ToastComponent title='Event Updated' color='success' icon={<Check />} />, {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false
      })
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr'

  }
  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} eventBackgroundColor='#7367FD' eventTextColor='white'  height='700'/>
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)