import { convertToDayDateTime } from './days.js';

// time slot id look up
const timeSlotLookup = {
    "Monday": {
      "08:00": "TS1",
      "09:00": "TS2",
      "10:00": "TS3",
      "11:00": "TS4",
      "12:00": "BREAK",
      "13:00": "TS5",
      "14:00": "TS6",
      "15:00": "TS7",
      "16:00": "TS8",
      "17:00": "TS9"
    },
    "Tuesday": {
      "08:00": "TS10",
      "09:00": "TS11",
      "10:00": "TS12",
      "11:00": "TS13",
      "12:00": "BREAK",
      "13:00": "TS14",
      "14:00": "TS15",
      "15:00": "TS16",
      "16:00": "TS17",
      "17:00": "TS18"
    },
    "Wednesday": {
      "08:00": "TS19",
      "09:00": "TS20",
      "10:00": "TS21",
      "11:00": "TS22",
      "12:00": "BREAK",
      "13:00": "TS23",
      "14:00": "TS24",
      "15:00": "TS25",
      "16:00": "TS26",
      "17:00": "TS27"
    },
    "Thursday": {
      "08:00": "TS28",
      "09:00": "TS29",
      "10:00": "TS30",
      "11:00": "TS31",
      "12:00": "BREAK",
      "13:00": "TS32",
      "14:00": "TS33",
      "15:00": "TS34",
      "16:00": "TS35",
      "17:00": "TS36"
    },
    "Friday": {
      "08:00": "TS37",
      "09:00": "TS38",
      "10:00": "TS39",
      "11:00": "TS40",
      "12:00": "BREAK",
      "13:00": "TS41",
      "14:00": "TS42",
      "15:00": "TS43",
      "16:00": "TS44",
      "17:00": "TS45"
    }
  };
  

  export const convertToCSV = (events, lecturer) => {
    const getDayValue = (day) => {
        const dayValues = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
        };
        return dayValues[day] || 6; // Default to 6 for any invalid day
    };

    // Convert events to CSV format
    // 'Working_Day', 'start_time', 'end_time', 'Module', 'Lecturer', 'Class_Type', 'Class', 'Room'
    const header = "Working_Day,start_time,end_time,Module,Lecturer,Class_Type,Class,Room,Time_Slot\n"; // Added Lecturer to the header
    
    const rows = events.flatMap(event => {
        const { dayOfWeek } = convertToDayDateTime(event.start);
        const startDateTime = new Date(event.start);
        const endDateTime = new Date(event.end);

        const eventRows = [];
        
        // Loop through each hour from start to end
        for (let dt = startDateTime; dt < endDateTime; dt.setHours(dt.getHours() + 1)) {
            const {time:currentStartTime} = convertToDayDateTime(dt);
            const currentEndTime = new Date(dt);
            currentEndTime.setHours(currentEndTime.getHours() + 1);
            const {time:formattedEndTime} = convertToDayDateTime(currentEndTime);

            // Lookup the time_slot_id based on the day and current start time
            const timeSlotId = timeSlotLookup[dayOfWeek] && timeSlotLookup[dayOfWeek][currentStartTime] ? timeSlotLookup[dayOfWeek][currentStartTime] : "";

            eventRows.push([
                dayOfWeek, // timeslot_day
                currentStartTime, // timeslot_start
                formattedEndTime, // timeslot_end
                event.module, // Module
                lecturer, // Include lecturer name in each row
                event.classType, // Class Type
                event.class, // Class
                event.classroom.replace(/[\u200B-\u200D\uFEFF]/g, '').trim(), // Remove zero-width spaces and trim
                timeSlotId, // Time Slot
            ].join(","));
        }
        return eventRows; // Return all rows generated for this event
    });

    // Sort the rows based on the day of the week and then by start time
    rows.sort((a, b) => {
        const dayComparison = getDayValue(a.split(",")[0]) - getDayValue(b.split(",")[0]); // Compare by day of the week
        if (dayComparison !== 0) {
            return dayComparison; // If days are different, sort by day
        }
        // If days are the same, compare by start time
        return a.split(",")[1].localeCompare(b.split(",")[1]); // Use localeCompare for time comparison
    });
    console.log('csv done');

    return header + rows.join("\n"); // Return the complete CSV content
};


  
//   // Function to trigger CSV file download
//   export const downloadCSV = (csvContent, filename) => {
//     console.log('went into download');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', filename);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     console.log('finish download');
//   };

export const downloadCSV = (csvContent, filename) => {
    console.log('went into download');
    // Encode CSV content as a URI component
    const csvDataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    
    // Create an anchor element
    const link = document.createElement('a');
    link.href = csvDataUri;
    link.setAttribute('download', filename); // Set the filename for download
    
    // Append the anchor to the document, trigger the click, and remove the anchor
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('finish download');
};



