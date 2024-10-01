import React, { useEffect, useState } from 'react';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react"; // Import DayPilot
import "./Calendar.css";
import { convertToDayDateTime, processFormDates, convertToCSV, downloadCSV, getDateForSelectedDay } from './days.js';

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
      const { dayOfWeek, time: startTime } = convertToDayDateTime(args.start, 2);
      const endTime = convertToDayDateTime(args.end, 1);

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

      const {startDateTime, endDateTime} = processFormDates(form.result.Day, form.result.StartTime, form.result.EndTime)
    
      // Clear the selection on the calendar
      calendar.clearSelection();
    
      // Add the event to the calendar
      calendar.events.add({
        start: new DayPilot.Date(startDateTime), // Set start date and time
        end: new DayPilot.Date(endDateTime),     // Set end date and time
        id: DayPilot.guid(),                 // Generate a unique ID for the event
        text: form.result.ModuleName,         // Module name entered by the user
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
        <strong>Module: ${args.data.text}</strong><br/>
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
    const { dayOfWeek, time: startTime } = convertToDayDateTime(e.data.start, 2);
    const endTime = convertToDayDateTime(e.data.end, 1);

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
      ModuleName: e.data.text,
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

    const {startDateTime, endDateTime} = processFormDates(form.result.Day, form.result.StartTime, form.result.EndTime)
  
    // Update event data
    e.data.text = form.result.ModuleName;
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
      console.log("CSV Content:", csvContent); // Log the CSV content for debugging
  
      // Split rows, remove any empty lines, and skip the first row (header)
      const rows = csvContent.split("\n").filter(row => row.trim() !== "").slice(1); // Skip the first row
  
      // Parse the rows into objects
      const parsedRows = rows.map((row, index) => {
        // Remove the trailing '\r' from each row and split it into columns
        const columns = row.replace(/\r$/, "").split(",").map(col => col.trim());
  
        if (columns.length < 8) {
          console.error(`Row ${index + 2} has missing columns`, columns);
          return null;
        }
  
        const [module, classInfo, classType, timeSlot, room, timeslotDay, timeslotStart, timeslotEnd] = columns;
  
        return {
          module,
          classInfo,
          classType,
          timeSlot,
          room,
          timeslotDay,
          timeslotStart,
          timeslotEnd
        };
      }).filter(row => row !== null);
  
      // Map over the parsed rows to prepare them for sorting by day and start time
      const rowsForSorting = parsedRows.map(event => {
        const { module, classInfo, classType, room, timeslotDay, timeslotStart, timeslotEnd } = event;
        return [
          timeslotDay,          // Day of the week
          timeslotStart,        // Start time
          timeslotEnd,          // End time
          module,               // Module name
          classInfo || 'N/A',   // Class, default to 'N/A' if missing
          classType || 'N/A',   // Class type, default to 'N/A' if missing
          room || 'N/A'         // Classroom, default to 'N/A' if missing
        ];
      });
  
      // Sort the rows by day of the week and then by start time
      rowsForSorting.sort((a, b) => {
        const dayComparison = getDayValue(a[0]) - getDayValue(b[0]); // Compare by day of the week
        if (dayComparison !== 0) {
          return dayComparison; // If days are different, sort by day
        }
        // If days are the same, compare by start time
        return a[1].localeCompare(b[1]); // Use localeCompare for time comparison
      });
    
      // Helper function to check if two rows should be merged
      const shouldMerge = (row1, row2) => {
        // Check if the same module, class, classType, room, and day
        if (
          row1.module === row2.module &&
          row1.classInfo === row2.classInfo &&
          row1.classType === row2.classType &&
          row1.room === row2.room &&
          row1.timeslotDay === row2.timeslotDay
        ) {
          // Check if row2 starts exactly when row1 ends
          return row1.timeslotEnd === row2.timeslotStart;
        }
        return false;
      };
  
      // Merge consecutive rows into single events
      const mergedEvents = [];
      let currentEvent = null;
  
      parsedRows.forEach((row, index) => {
        if (!currentEvent) {
          // Start a new event
          currentEvent = {
            module: row.module,
            classInfo: row.classInfo,
            classType: row.classType,
            room: row.room,
            timeslotDay: row.timeslotDay,
            timeslotStart: row.timeslotStart,
            timeslotEnd: row.timeslotEnd
          };
        } else {
          // Check if the current row should be merged with the current event
          if (shouldMerge(currentEvent, row)) {
            // Extend the current event's end time
            currentEvent.timeslotEnd = row.timeslotEnd;
          } else {
            // Save the current event and start a new one
            mergedEvents.push(currentEvent);
            currentEvent = {
              module: row.module,
              classInfo: row.classInfo,
              classType: row.classType,
              room: row.room,
              timeslotDay: row.timeslotDay,
              timeslotStart: row.timeslotStart,
              timeslotEnd: row.timeslotEnd
            };
          }
        }
  
        // Push the last event when done iterating
        if (index === parsedRows.length - 1) {
          mergedEvents.push(currentEvent);
        }
      });
  
      // Convert the merged events to DayPilot events
      const parsedEvents = mergedEvents.map(event => {
        const { startDateTime, endDateTime } = processFormDates(event.timeslotDay, event.timeslotStart, event.timeslotEnd);
  
        return {
          id: DayPilot.guid(),
          start: new DayPilot.Date(startDateTime),
          end: new DayPilot.Date(endDateTime),
          text: event.module,
          classroom: event.room,
          class: event.classInfo,
          classType: event.classType
        };
      });
  
      setEvents(parsedEvents); // Update the events state
      console.log("Parsed and Merged Events:", parsedEvents); // Log merged events for debugging
  
      calendar.update(); // Force the calendar to update
    };
  
    reader.readAsText(file); // Read the CSV file as text
  };
  
  
  

  return (
    <div>
      <div style={styles.buttonWrap}>

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

      <button onClick={() => {
          const csvContent = convertToCSV(events);  // Convert events to CSV format
          downloadCSV(csvContent, 'schedule.csv');  // Trigger the download
        }}>
          Export to CSV
        </button>
        {/* <button>Import from CSV</button> */}
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
