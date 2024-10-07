import React, { useState } from 'react';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react"; // Import DayPilot
import "./Calendar.css";
import { convertToDayDateTime, toDateTime } from './days.js';
import { convertToCSV, downloadCSV } from './handledata.js';

const styles = {
  wrap: {
    display: "flex"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = () => {
  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState([]);
  const [lecturer, setLecturer] = useState(""); // State to hold the lecturer name


  const startDate = "2024-10-07"; // Fixed start date for the week (Monday)

  const config = {
    viewType: "days",
    durationBarVisible: false,
    days: 5, // Show only Monday to Friday
    timeRangeSelectedHandling: "Enabled",
    businessBeginsHour: 8,
    businessEndsHour: 18,
    cellDuration: 60,
    events: events,
    onTimeRangeSelected: async args => {
      const { dayOfWeek, time: startTime } = convertToDayDateTime(args.start);
      const {time: endTime} = convertToDayDateTime(args.end);

      // Check if the selected time range falls within 12:00 - 13:00
      if (startTime < 13 && endTime > 12) {
        alert("This time range is not available for selection.");
        calendar.clearSelection();
        return; // Prevent selection
      }

      // Prompt user to enter event details
      const form = await DayPilot.Modal.form([
        { name: "Module Name", id: "ModuleName", type: "text" },
        { name: "Class", id: "Class", type: "text" },
        { name: "Class Type", id: "ClassType", type: "text" },
        { name: "Classroom", id: "Classroom", type: "text" },
        { 
          name: "Day of the Week", 
          id: "Day", 
          type: "select", 
          options: [
            { name: "Monday", id: "Monday" },
            { name: "Tuesday", id: "Tuesday" },
            { name: "Wednesday", id: "Wednesday" },
            { name: "Thursday", id: "Thursday" },
            { name: "Friday", id: "Friday" }
          ]
        },
        { name: "Start Time", id: "StartTime", type: "time" }, // Default start time
        { name: "End Time", id: "EndTime", type: "time" } // Default end time
      ], 
      { 
        ModuleName: "",  // You can set this if needed
        Class: "",
        ClassType: "",
        Classroom: "",
        Day: dayOfWeek,  // Initialize with the extracted day of the week
        StartTime: startTime,  // Set the initial value for Start Time
        EndTime: endTime        // Set the initial value for End Time
      });
    
      if (!form.result) {
        return; // If form is cancelled, do nothing
      }

      const {startDateTime, endDateTime} = toDateTime(form.result.Day, form.result.StartTime, form.result.EndTime)
    
      // Clear the selection on the calendar
      calendar.clearSelection();
    
      // Add the event to the calendar
      calendar.events.add({
        start: new DayPilot.Date(startDateTime), // Set start date and time
        end: new DayPilot.Date(endDateTime),     // Set end date and time
        id: DayPilot.guid(),                 // Generate a unique ID for the event
        module: form.result.ModuleName,         // Module name entered by the user
        classroom: form.result.Classroom,     // Classroom entered by the user
        class: form.result.Class,
        classType: form.result.ClassType
      });
    },
    
    
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            calendar.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            calendar.events.remove(args.source);
          }
        }
      ];

      // Display classroom information visually in the event text
      args.data.html = `<div>
        <strong>Module: ${args.data.module}</strong><br/>
        <span style="font-size: 12px; color: #FFF;">Class: ${args.data.class || 'N/A'} <br/> Class Type: ${args.data.classType || 'N/A'} <br/> Classroom: ${args.data.classroom || 'N/A'}</span>
      </div>`;
    },
    onBeforeHeaderRender: args => {
      // Override header to only show the day names (Monday, Tuesday, etc.)
      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const dayIndex = args.header.start.getDayOfWeek() - 1; // Monday is index 0
      args.header.html = dayNames[dayIndex];
    }
  };

  const editEvent = async (e) => {
    const { dayOfWeek, time: startTime } = convertToDayDateTime(e.data.start);
    const {time: endTime} = convertToDayDateTime(e.data.end);

    // Open modal form with dropdown for day selection and time inputs
    const form = await DayPilot.Modal.form([
      { name: "Module Name", id: "ModuleName", type: "text" },
      { name: "Class", id: "Class", type: "text" },
      { name: "Class Type", id: "ClassType", type: "text" },
      { name: "Classroom", id: "Classroom", type: "text" },

      { 
        name: "Day of the Week", 
        id: "Day", 
        type: "select", 
        options: [
          { name: "Monday", id: "Monday" },
          { name: "Tuesday", id: "Tuesday" },
          { name: "Wednesday", id: "Wednesday" },
          { name: "Thursday", id: "Thursday" },
          { name: "Friday", id: "Friday" }
        ], 
      },
      { 
        name: "Start Time", 
        id: "StartTime", 
        type: "time", 
      },
      { 
        name: "End Time", 
        id: "EndTime", 
        type: "time", 
      },
    ], {
      ModuleName: e.data.module,
      Class: e.data.class ,
      ClassType: e.data.classType ,
      Classroom: e.data.classroom ,
      Day: dayOfWeek,  // Initialize with the extracted day of the week
      StartTime: startTime,  // Set the initial value for Start Time
      EndTime: endTime        // Set the initial value for End Time    }
    });
  
    // If the form was canceled, stop the process
    if (!form.result) {
      return;
    }

    const {startDateTime, endDateTime} = toDateTime(form.result.Day, form.result.StartTime, form.result.EndTime)
  
    // Update event data
    e.data.module = form.result.ModuleName;
    e.data.classroom = form.result.Classroom;
    e.data.start = startDateTime;
    e.data.end = endDateTime;
    e.data.class = form.result.Class;
    e.data.classType = form.result.ClassType;
  
    // Update the event in the calendar
    calendar.events.update(e);
  };
  // Helper function to read the CSV file and parse it into event objects
  const getDayValue = (day) => {
    const dayValues = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
    };
    return dayValues[day] || 6; // Default to 6 for any invalid day (e.g., Saturday, Sunday)
  };
  
  const parseCSVFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target.result;
  
      // Split rows, remove any empty lines
      const rows = csvContent.split("\n").filter(row => row.trim() !== "");
      
      // Get the first row (headers)
      const headers = rows[0].replace(/\r$/, "").split(",").map(col => col.trim().replace(/^"|"$/g, ""));
  
      // Parse the remaining rows into objects using the headers
      const parsedRows = rows.slice(1).map((row, index) => {
        const columns = row.replace(/\r$/, "").split(",").map(col => col.trim().replace(/^"|"$/g, "")); // Remove leading and trailing quotes
  
        if (columns.length !== headers.length) {
          console.error(`Row ${index + 2} has a different number of columns`, columns);
          return null;
        }
  
        // Create an object where the keys are the headers and values are the corresponding columns
        const rowObject = headers.reduce((obj, header, i) => {
          obj[header] = columns[i];
          return obj;
        }, {});
  
        return rowObject;
      }).filter(row => row !== null);
  
      // console.log("Parsed Rows:", parsedRows); // Debugging parsed rows
  
      // Process the rows for sorting or merging
      const rowsForSorting = parsedRows.map(event => {
        // Ensure the correct property names match those in the parsedRows
        const { Working_Day: timeslotDay, start_time: timeslotStart, end_time: timeslotEnd, Module: module, Lecturer: lecturer, Class_Type: classType, Class: classInfo, Room: room } = event;
        setLecturer(lecturer);

        return {
          timeslotDay,          // Day of the week
          timeslotStart,        // Start time
          timeslotEnd,          // End time
          module,               // Module name
          lecturer,             // lecturer name
          classInfo: classInfo || 'N/A',   // Class, default to 'N/A' if missing
          classType: classType || 'N/A',   // Class type, default to 'N/A' if missing
          room: room || 'N/A'              // Classroom, default to 'N/A' if missing
        };
      });
  
      // Sort the rows by day of the week and then by start time
      rowsForSorting.sort((a, b) => {
        const dayComparison = getDayValue(a.timeslotDay) - getDayValue(b.timeslotDay); // Compare by day of the week
        if (dayComparison !== 0) {
          return dayComparison; // If days are different, sort by day
        }
        // If days are the same, compare by start time
        return a.timeslotStart.localeCompare(b.timeslotStart); // Use localeCompare for time comparison
      });
  
      // Helper function to check if two rows should be merged
      const shouldMerge = (row1, row2) => {
        return (
          row1.module === row2.module &&
          row1.classInfo === row2.classInfo &&
          row1.classType === row2.classType &&
          row1.room === row2.room &&
          row1.timeslotDay === row2.timeslotDay &&
          row1.timeslotEnd === row2.timeslotStart
        );
      };
  
      // Merge consecutive rows into single events
      const mergedEvents = [];
      let currentEvent = null;
  
      rowsForSorting.forEach((row, index) => {
        if (!currentEvent) {
          currentEvent = { ...row };
        } else {
          if (shouldMerge(currentEvent, row)) {
            currentEvent.timeslotEnd = row.timeslotEnd;
          } else {
            mergedEvents.push(currentEvent);
            currentEvent = { ...row };
          }
        }
        if (index === rowsForSorting.length - 1) {
          mergedEvents.push(currentEvent);
        }
      });
    
      const parsedEvents = mergedEvents.map(event => {
        const { startDateTime, endDateTime } = toDateTime(event.timeslotDay, event.timeslotStart, event.timeslotEnd);
        return {
          id: DayPilot.guid(),
          start: new DayPilot.Date(startDateTime),
          end: new DayPilot.Date(endDateTime),
          module: event.module,
          classroom: event.room,
          class: event.classInfo,
          classType: event.classType
        };
      });
  
      setEvents(parsedEvents);
  
      calendar.update(); // Force the calendar to update
    };
  
    reader.readAsText(file); // Read the CSV file as text
  };
  
  

  return ( 
    <div className="calendar-container">
      {/* Display the lecturer's timetable heading */}
      {lecturer && <h2>Timetable for {lecturer}</h2>} {/* Conditionally render the heading */}
      <div>
        <div style={styles.buttonWrap} className="csv-btn">

          {/* Add the file input for CSV import */}
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                parseCSVFile(file);
              }
            }}
          />
        <button className="csv-export-btn" onClick={() => {
            if (events.length === 0) {
              alert("No events to export.");
              return; // Exit if there are no events
            }
            const csvContent = convertToCSV(events, lecturer);  // Convert events to CSV format
            downloadCSV(csvContent, 'schedule.csv');  // Trigger the download
          }}>
            Export to CSV
          </button>
          {/* <button>Import from CSV</button> */}
        </div>
      </div>

      <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          startDate={startDate}
          controlRef={setCalendar}
        />
      </div>
    </div>
  );
}

export default Calendar;
