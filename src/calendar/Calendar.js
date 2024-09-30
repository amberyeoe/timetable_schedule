import React, { useEffect, useState } from 'react';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react"; // Import DayPilot
import "./Calendar.css";
import { convertToDayDateTime, processFormDates, convertToCSV, downloadCSV } from './days.js';

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

  // Fixed start date to always show the same week (Monday to Friday)
  const startDate = "2024-10-07"; // Monday of the desired week

  const config = {
    viewType: "days",
    durationBarVisible: false,
    days: 5, // Show only Monday to Friday
    timeRangeSelectedHandling: "Enabled",
    businessBeginsHour: 7,
    businessEndsHour: 20,
    onTimeRangeSelected: async args => {
      const { dayOfWeek, time: startTime } = convertToDayDateTime(args.start, 2);
      const endTime = convertToDayDateTime(args.end, 1);

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
  

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2024-10-07T10:30:00", // Monday
        end: "2024-10-07T13:00:00",
        classroom: "Classroom A", // Add classroom attribute here
        class: "Math 101",           // Add Class
        classType: "Lecture",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2024-10-08T09:30:00", // Tuesday
        end: "2024-10-08T11:30:00",
        classroom: "Classroom B", // Add classroom attribute here
        backColor: "#6aa84f",
        class: "English",           // Add Class
        classType: "Lecture",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2024-10-09T12:00:00", // Wednesday
        end: "2024-10-09T15:00:00",
        classroom: "Classroom C", // Add classroom attribute here
        backColor: "#f1c232",
        class: "Science",           // Add Class
        classType: "Practical",
      },
      {
        id: 4,
        text: "Event 4",
        start: "2024-10-10T11:30:00", // Thursday
        end: "2024-10-10T14:30:00",
        classroom: "Classroom D", // Add classroom attribute here
        backColor: "#cc4125",
        class: "Chinese",           // Add Class
        classType: "Lecture",
      },
      {
        id: 5,
        text: "Event 5",
        start: "2024-10-11T10:00:00", // Friday
        end: "2024-10-11T12:00:00",
        classroom: "Classroom E", // Add classroom attribute here
        class: "Geography",           // Add Class
        classType: "Lecture",
      }
    ];
    setEvents(events);
  }, []);

  return (
    
    <div>
      <div style={styles.buttonWrap}>
        <button onClick={() => {
          const csvContent = convertToCSV(events);  // Convert events to CSV format
          downloadCSV(csvContent, 'schedule.csv');  // Trigger the download
        }}>
          Export to CSV
        </button>
      </div>

      <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          events={events}
          startDate={startDate}
          controlRef={setCalendar}
        />
      </div>
    </div>
  );
}

export default Calendar;
