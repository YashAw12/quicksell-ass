import Todo from './Todo.jsx';
import '../style/todos.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Todos({ setSelectedGrouping, sortBy, setSortBy }) {
  // State to hold fetched data for tickets and users
  const [allData, setAllData] = useState({ tickets: [], users: [] });
  
  // State to manage sort order (ascending or descending)
  const [sortOrder, setSortOrder] = useState('desc');

  // Retrieve grouping type from local storage, defaulting to 'user'
  const selectedGrouping = localStorage.getItem('selectedGrouping') || 'user';

  // Fetch data on component mount and retrieve selected grouping from local storage
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => {
        setAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const storedValue = localStorage.getItem('selectedGrouping');
    setSelectedGrouping(storedValue || 'user');
  }, []);

  // Function to check if a user is available based on their ID
  const isUserAvailable = (userID) => {
    const user = allData.users.find((user) => user.id === userID);
    return user.available;
  };

  // Sort users alphabetically by name
  allData.users.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Function to toggle sorting order for priority
  const handleSortByPriority = () => {
    if (sortBy === 'priority') {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy('priority');
      setSortOrder('desc');
    }
  };

  // Function to toggle sorting order for title
  const handleSortByTitle = () => {
    if (sortBy === 'title') {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy('title');
      setSortOrder('asc');
    }
  };

  // Sort tickets based on selected sort criteria (priority or title)
  const sortedTickets = allData.tickets.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityDiff = a.priority - b.priority;
      return sortOrder === 'asc' ? priorityDiff : -priorityDiff;
    } else if (sortBy === 'title') {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      const titleComparison = titleA.localeCompare(titleB);
      return sortOrder === 'asc' ? titleComparison : -titleComparison;
    }
    return 0;
  });

  // Group tickets by user
  const groupedTickets = {};
  allData.tickets.forEach((ticket) => {
    const userId = ticket.userId;
    if (!groupedTickets[userId]) {
      groupedTickets[userId] = [];
    }
    groupedTickets[userId].push(ticket);
  });

  // Group tickets by status, including empty groups for 'Done' and 'Canceled'
  const groupedStatus = {
    Todo: [],
    'In progress': [],
    Backlog: [],
    Done: [],
    Canceled: [],
  };

  // Populate groupedStatus with tickets from API data
  allData.tickets.forEach((ticket) => {
    const status = ticket.status;
    if (!groupedStatus[status]) {
      groupedStatus[status] = [];
    }
    groupedStatus[status].push(ticket);
  });

  // Group tickets by priority
  const groupedPriority = {};
  allData.tickets.forEach((ticket) => {
    const priority = ticket.priority;
    if (!groupedPriority[priority]) {
      groupedPriority[priority] = [];
    }
    groupedPriority[priority].push(ticket);
  });

  // Render grouped data based on the selected grouping type (status, priority, or user)
  const renderGroupedData = () => {
    switch (selectedGrouping) {
      case 'status':
        return (
          <>
            {Object.keys(groupedStatus).map((status) => (
              <Todo
                key={status}
                status={status}
                groupedTickets={groupedStatus[status]}
                groupMode={'status'}
                isUserAvailable={isUserAvailable}
              />
            ))}
          </>
        );
      case 'priority':
        return (
          <>
            {Object.keys(groupedPriority).map((priority) => (
              <Todo
                key={priority}
                priority={priority}
                groupedTickets={groupedPriority[priority]}
                isUserAvailable={isUserAvailable}
                groupMode={"priority"}
              />
            ))}
          </>
        );
      default:
        return (
          <>
            {allData.users.map((user) => (
              <Todo
                key={user.id}
                user={user}
                groupedTickets={groupedTickets[user.id]}
                isUserAvailable={isUserAvailable}
                groupMode={"user"}
              />
            ))}
          </>
        );
    }
  };

  // Render the main Todos component, calling renderGroupedData for display
  return (
    <div className='todos'>    
      {renderGroupedData()}
    </div>
  );
}

export default Todos;