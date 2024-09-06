import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState({});
  const [isFormVisible, setFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', color: '#ffffff' });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, index) => index < firstDayOfMonth ? '' : index - firstDayOfMonth + 1);

  // Default events with specific months and days
  const defaultEvents = {
    0: { // January
      15: [{ title: "Lila's Birthday", time: "10:00 am", color: "#FF6347" }],
      27: [{ title: "Nithiya's Anjana Birthday", time: "11:00 am", color: "#FF6347" }]
    },
    1: { // February
      12: [{ title: "Jeevan's Birthday", time: "2:00 pm", color: "#FF6347" }],
      17: [{ title: "Vidhu's Birthday", time: "5:00 pm", color: "#FF6347" }],
      19: [
        { title: "Kreep's Birthday", time: "4:00 pm", color: "#FF6347" },
        { title: "Simple to Know About Me Birthday", time: "4:00 pm", color: "#FF6347" }
      ]
    },
    3: { // April
      1: [{ title: "Sahu's Birthday", time: "12:00 pm", color: "#FF6347" }]
    },
    4: { // May
      15: [{ title: "Lucy's Birthday", time: "3:00 pm", color: "#FF6347" }],
      21: [{ title: "Aric's Birthday", time: "6:00 pm", color: "#FF6347" }]
    },
    5: { // June
      14: [{ title: "Rit's Birthday", time: "1:00 pm", color: "#FF6347" }],
      19: [{ title: "Iri's Birthday", time: "7:00 pm", color: "#FF6347" }]
    },
    6: { // July
      13: [{ title: "Ann's Birthday", time: "10:00 am", color: "#FF6347" }],
      22: [{ title: "Ruby's Birthday", time: "9:00 am", color: "#FF6347" }]
    },
    7: { // August
      2: [{ title: "Sana's Birthday", time: "11:00 am", color: "#FF6347" }],
      12: [{ title: "Aqua's Birthday", time: "3:00 pm", color: "#FF6347" }]
    },
    8: { // September
      26: [{ title: "Emi's Birthday", time: "5:00 pm", color: "#FF6347" }]
    },
    9: { // October
      11: [{ title: "IDK Jun's Birthday", time: "2:00 pm", color: "#FF6347" }],
      25: [{ title: "Dweep's Birthday", time: "4:00 pm", color: "#FF6347" }]
    },
    10: { // November
      19: [{ title: "Eva's Birthday", time: "6:00 pm", color: "#FF6347" }],
      20: [{ title: "Tim's Birthday", time: "7:00 pm", color: "#FF6347" }],
      25: [{ title: "David's Birthday", time: "8:00 pm", color: "#FF6347" }]
    },
    11: { // December
      5: [{ title: "Theo's Birthday", time: "10:00 am", color: "#FF6347" }]
    }
  };

  // Merge default events with the state events
  const mergedEvents = { ...defaultEvents, ...events };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleMonthClick = (index) => {
    setCurrentDate(new Date(currentYear, index, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleFormChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedDay) {
      const updatedEvents = { ...events };
      if (!updatedEvents[selectedDay]) {
        updatedEvents[selectedDay] = [];
      }
      updatedEvents[selectedDay].push(newEvent);
      setEvents(updatedEvents);
      setNewEvent({ title: '', time: '', color: '#ffffff' });
      setFormVisible(false);
    }
  };

  const handleRemoveEvent = () => {
    if (selectedDay) {
      const updatedEvents = { ...events };
      delete updatedEvents[selectedDay];
      setEvents(updatedEvents);
      setSelectedDay(null);
    }
  };

  return (
    <>
     <style>{`
  .calendar-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .sidebar {
    background-color: #6c63ff;
    color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .sidebar button {
    background: none;
    border: none;
    color: #fff;
    font-size: 18px;
    margin: 10px 0;
    cursor: pointer;
  }

  .sidebar .year {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .sidebar ul li {
    padding: 8px;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s;
    flex: 1 1 30%; /* Responsive flex-basis */
    box-sizing: border-box;
  }

  .sidebar ul li.active, .sidebar ul li:hover {
    background-color: #5a54e8;
    border-radius: 5px;
  }

  .calendar-main {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }

  .calendar-main header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .calendar-main header h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .add-btn {
    background-color: #6c63ff;
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 24px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-top: 10px;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    gap: 5px;
  }

  .day-name {
    padding: 10px 0;
    color: #999;
    font-weight: bold;
  }

  .day {
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .day.selected {
    background-color: #e0e7ff;
  }

  .day-number {
    display: block;
    margin-bottom: 5px;
  }

  .event-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .event-panel {
    width: 100%;
    max-width: 300px;
    padding: 20px;
    background-color: #f8f8ff;
    border-left: 1px solid #eee;
    box-sizing: border-box;
  }

  .event-panel h3 {
    margin-top: 0;
  }

  .event {
    margin-bottom: 10px;
  }

  .event-title {
    font-weight: bold;
  }

  form {
    margin-top: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    margin-top: 5px;
    padding: 5px;
    width: 100%;
  }

  button {
    margin-top: 10px;
  }

  /* Responsive styles */
  @media (max-width: 600px) {
    .sidebar {
      padding: 10px;
    }

    .sidebar .year {
      font-size: 18px;
    }

    .sidebar ul li {
      font-size: 14px;
      flex: 1 1 20%; /* Adjust based on screen width */
    }

    .calendar-main header h2 {
      font-size: 1.25rem;
    }

    .add-btn {
      font-size: 20px;
      width: 35px;
      height: 35px;
    }

    .event-panel {
      max-width: 100%;
    }
  }
`}</style>

      <div className="calendar-container">
        <div className="sidebar">
          <button onClick={goToPreviousMonth}>‹</button>
          <div className="year">{currentYear}</div>
          <ul>
            {months.map((month, index) => (
              <li
                key={index}
                className={currentMonth === index ? 'active' : ''}
                onClick={() => handleMonthClick(index)}
              >
                {month}
              </li>
            ))}
          </ul>
          <button onClick={goToNextMonth}>›</button>
        </div>
        <div className="calendar-main">
          <header>
            <h2>{months[currentMonth]} {currentYear}</h2>
            <button className="add-btn" onClick={() => setFormVisible(!isFormVisible)}>+</button>
          </header>
          <div className="calendar-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="day-name">{day}</div>
            ))}
            {daysArray.map((day, index) => {
              const dayEvents = mergedEvents[currentMonth]?.[day] || [];
              return (
                <div
                  key={index}
                  className={`day ${selectedDay === day ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <span className="day-number">{day}</span>
                  {dayEvents.map((event, i) => (
                    <span
                      key={i}
                      className="event-dot"
                      style={{ backgroundColor: event.color }}
                    ></span>
                  ))}
                </div>
              );
            })}
          </div>
          {selectedDay && (
            <div className="event-panel">
              <h3>Events on {selectedDay}</h3>
              {mergedEvents[currentMonth]?.[selectedDay] && mergedEvents[currentMonth][selectedDay].map((event, index) => (
                <div key={index} className="event">
                  <div className="event-title">{event.title}</div>
                  <div>{event.time}</div>
                </div>
              ))}
              <button onClick={handleRemoveEvent}>Remove Event</button>
            </div>
          )}
          {isFormVisible && (
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Time:
                <input
                  type="text"
                  name="time"
                  value={newEvent.time}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Color:
                <input
                  type="color"
                  name="color"
                  value={newEvent.color}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit">Add Event</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
