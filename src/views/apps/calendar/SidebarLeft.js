// // ** React Imports
// import { Fragment } from 'react'

// // ** Reactstrap Imports
// import { Card, CardBody, Button } from 'reactstrap'

// // ** illustration import
// import illustration from '@src/assets/images/pages/calendar-illustration.png'

// const SidebarLeft = props => {
//   // ** Props
//   const { handleAddEventSidebar, toggleSidebar } = props

//   const handleAddEventClick = () => {
//     toggleSidebar(false)
//     handleAddEventSidebar()
//   }

//   return (
//     <Fragment>
//       <Card className='sidebar-wrapper shadow-none'>
//         <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
//           <Button color='primary' block onClick={handleAddEventClick}>
//             <span className='align-middle'>افزودن جلسه</span>
//           </Button>
//         </CardBody>
//         <CardBody>
//           <h5 className='section-label mb-1'>
//             <span className='align-middle'>راهنمای رنگ‌ها</span>
//           </h5>
//           <div className='d-flex align-items-center mb-1'>
//             <span className='bullet bullet-success bullet-sm me-50'></span>
//             <span>قفل‌شده (غایب نمی‌تواند شرکت کند)</span>
//           </div>
//           <div className='d-flex align-items-center'>
//             <span className='bullet bullet-warning bullet-sm me-50'></span>
//             <span>باز (امکان شرکت وجود دارد)</span>
//           </div>
//         </CardBody>
//       </Card>
//       <div className='mt-auto'>
//         <img className='img-fluid' src={illustration} alt='illustration' />
//       </div>
//     </Fragment>
//   )
// }

// export default SidebarLeft