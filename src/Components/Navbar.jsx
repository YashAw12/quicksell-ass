import { useState, useEffect, useRef } from 'react';
import '../style/navbar.css';
import hamburgerIcon from '../assets/hamburgerIcon.svg';
import dropdownIcon from '../assets/dropdownIcon.svg';

function Navbar({ setSelectedGrouping, sortBy, setSortBy }) {
  // Retrieve the selected grouping from local storage, default to 'user'
  const selectedGrouping = localStorage.getItem('selectedGrouping') || 'user';

  // State variables for dropdown visibility and selected ordering value
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isStatusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [isPriorityDropdownVisible, setPriorityDropdownVisible] = useState(false);
  const [orderingValue, setOrderingValue] = useState('priority');

  // Options for the grouping and ordering dropdowns
  const statusOptions = ['user', 'status', 'priority'];
  const orderingOptions = ['title', 'priority'];

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Reference for the dropdown container to detect clicks outside
  const dropdownRef = useRef(null);

  // Effect hook to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update grouping selection and store it in local storage
  const handleGroupingItemClick = (value) => {
    setSelectedGrouping(value);
    localStorage.setItem('selectedGrouping', value);
    setStatusDropdownVisible(false);
  };

  // Update ordering selection and toggle dropdown
  const handleOrderingItemClick = (value) => {
    setSortBy(value);
    setOrderingValue(value);
    setPriorityDropdownVisible(true);
  };

  return (
    <>
      <div className="navbar">
        {/* Dropdown button and container */}
        <div className="dropdown-container" ref={dropdownRef}>
          <button className="dropdown-button" onClick={toggleDropdown}>
            {/* Icons loaded from assets folder */}
            <img src={hamburgerIcon} alt="hamburger icon" />
            Display
            <img src={dropdownIcon} alt="dropdown icon" />
          </button>

          {/* Dropdown content, conditionally rendered */}
          {isDropdownVisible && (
            <div className="dropdown-content">
              {/* Grouping dropdown */}
              <div className="row1">
                <p className='grouping'>Grouping</p>
                <div className="groupingProperties">
                  <select
                    className="dropdown-button-one"
                    value={selectedGrouping}
                    onChange={(e) => handleGroupingItemClick(e.target.value)}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ordering dropdown */}
              <div className="row1">
                <p className='grouping'>Ordering</p>
                <div className="orderingProperties">
                  <select
                    className="dropdown-button-one"
                    value={orderingValue}
                    onChange={(e) => handleOrderingItemClick(e.target.value)}
                  >
                    {orderingOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;