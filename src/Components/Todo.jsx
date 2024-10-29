import '../style/todo.css'
import NoPriority from '../assets/NoPriority.svg';
import LowPriority from '../assets/LowPriority.svg';
import MediumPriority from '../assets/MediumPriority.svg';
import HighPriority from '../assets/HighPriority.svg';
import UrgentPriority from '../assets/UrgentPriority.svg';
import TodoIcon from '../assets/TodoIcon.svg';
import InProgressIcon from '../assets/InProgressIcon.svg';
import BacklogIcon from '../assets/BacklogIcon.svg';
import DoneIcon from '../assets/DoneIcon.svg';
import CanceledIcon from '../assets/CanceledIcon.svg';
import addIcon from '../assets/addIcon.svg'; 
import menuIcon from '../assets/menuIcon.svg';

function Todo(props) {
  const {groupedTickets,user,priority,groupMode,status} = props;
  const iconMapping = {
    'Todo': <img src={TodoIcon} alt="Todo" />,
    'In progress': <img src={InProgressIcon} alt="In progress" />,
    'Backlog': <img src={BacklogIcon} alt="Backlog" />,
    'Done': <img src={DoneIcon} alt="Done" />,
    'Canceled': <img src={CanceledIcon} alt="Canceled" />
  };
 
  const priorityMapping = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent'
  };

  const priorityIconMapping = {
    0: <img src={NoPriority} alt="No priority" />,
    1: <img src={LowPriority} alt="Low priority" />,
    2: <img src={MediumPriority} alt="Medium priority" />,
    3: <img src={HighPriority} alt="High priority" />,
    4: <img src={UrgentPriority} alt="Urgent priority" />
  };

  const userImageMapping = {
    'usr-1': 'https://imgv3.fotor.com/images/ai-headshot-generator/headshot-of-a-man-in-a-gray-and-white-professional-suit-standing-with-his-back-to-the-window.jpg',
    'usr-2': 'https://imgv3.fotor.com/images/ai-headshot-generator/headshot-of-a-man-in-dark-silver-business-attire-with-dark-grey-backdop.jpg',
    'usr-3': 'https://imgv3.fotor.com/images/ai-headshot-generator/headshot-of-a-man-in-a-professional-suit-with-a-dark-grey-backdrop.jpg',
    'usr-4': 'https://imgv3.fotor.com/images/ai-headshot-generator/Headshot-of-a-man-in-dark-blur-attire-with-his-back-to-a-tree-view-window.jpg',
    'usr-5': 'https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-professional-headshot-of-a-smiling-man-wearing-a-blur-business-attire-by-Fotor.jpg',
  };
  
  const renderPriorityIcon = (level) => {
    const icon = priorityIconMapping[level];
    return <>{icon}</>;
  };
  
  const renderPriorityHeading = (level) => {
    const heading = priorityMapping[level] || 'No priority';
    return heading;
  };
  
  const renderIconStatus = (state) => {
    return iconMapping[state] || <img src={TodoIcon} alt="Default" />;
  };

  const renderTop = ()=>{
    switch(groupMode){
      case 'status':
       return(
         <>
          <div className='menu-item'>
          {renderIconStatus(status)}
         {status}
         <p>{groupedTickets.length}</p> 
          </div>
         </>
       )
       case 'priority':
        return(
          <>
           
          {renderPriorityIcon(priority)}
            {renderPriorityHeading(priority)}
            <p>{groupedTickets.length}</p> 
          </>
        )

      default:
        return(
          <>
          <img src={userImageMapping[user.id]} alt={`${user.name}'s profile`} />
                 <h1> {user.name}</h1>
                 <p>{groupedTickets.length}</p> 
          </>
        )
    }

  }
   
  return (
    
    <div className="todo">
         <div className='todo-info'>
            <div className='info-about'>
                {renderTop()}
            </div>

            <div className="info-options">
            <img src={addIcon} alt="Add" />
  <img src={menuIcon} alt="More options" />
            </div>
         </div>


         {groupedTickets.map((data)=>{
           const isUserAvailable = props.isUserAvailable
           const userAvailable = isUserAvailable(data.userId);
          return(
            <div key={data.id} className='todo-task'>
            <div className='todo-task-header'>
       
              <h1>{data.id}</h1>
              {groupMode!='user'? <>
                <img src={userImageMapping[data.userId]} alt={`${data.userId}'s profile`} />
            <style>
            {`
              .todo-task-header::before {
               background-color: ${ userAvailable ? 'green' : '#CCC'};
                }
                .todo-task-header::before {
                  border: ${groupMode !== 'user' ? '1px solid #ccc' : 'none'};
                }
             `}
            </style></> : ""}
            </div>
            <div className='todo-task-text'>
             
            {groupMode=='status' ? "" : renderIconStatus(data.status)  }

            <p>{data.title}</p>
            </div>

            <div className='todo-task-options'>
            { groupMode != 'priority'  ?  renderPriorityIcon(data.priority) : ""}
             <div className='todo-task-options-request'>
             <img src={TodoIcon} alt="Feature Icon" />
              <p>Feature Request</p>
            </div> 
            </div>
         </div>
          )
         })}
    </div>
  )
}

export default Todo