// Base reference date: 07/10/2024 is Monday
export const baseDate = new Date(2024, 9, 7); // October is month 9 (zero-indexed)

export const getDateForSelectedDay = (day) => {
    const dayMap = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4 };
    const offset = dayMap[day];
    const selectedDate = new Date(baseDate);
    selectedDate.setDate(baseDate.getDate() + offset); // Add the offset to 07/10/2024 (Monday)
    return selectedDate;
  };

export const convertToDayDateTime = (isoString, num) => {
    const date = new Date(isoString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // Example: 10:30
    if (num === 1){
        return time;
    } else {
        return { dayOfWeek, time };
    };
}

export const processFormDates = (day, startTime, endTime) => {
    // Get the selected day and map it to a real date starting from 07/10/2024
    const selectedDay = day;
    const selectedDate = getDateForSelectedDay(selectedDay);
  
    // Parse the selected start and end times
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    // Create the full start and end dates with the selected times
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(startHour + 8, startMinute, 0, 0);
  
    const endDateTime = new Date(selectedDate);
    endDateTime.setHours(endHour + 8, endMinute, 0, 0);

    return {startDateTime, endDateTime};
};

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
  

  export const convertToCSV = (events) => {
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
    const header = "Module,Class,Class_Type,Time_Slot,Room,timeslot_day,timeslot_start,timeslot_end\n";
    
    const rows = events.flatMap(event => {
        const { dayOfWeek, time: startTime } = convertToDayDateTime(event.start, 2);
        const startDateTime = new Date(event.start);
        const endDateTime = new Date(event.end);

        const eventRows = [];
        
        // Loop through each hour from start to end
        for (let dt = startDateTime; dt < endDateTime; dt.setHours(dt.getHours() + 1)) {
            const currentStartTime = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const currentEndTime = new Date(dt);
            currentEndTime.setHours(currentEndTime.getHours() + 1);
            const formattedEndTime = currentEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            // Lookup the time_slot_id based on the day and current start time
            const timeSlotId = timeSlotLookup[dayOfWeek] && timeSlotLookup[dayOfWeek][currentStartTime] ? timeSlotLookup[dayOfWeek][currentStartTime] : "";

            eventRows.push([
                event.text, // Module
                event.class || 'N/A', // Class
                event.classType || 'N/A', // Class Type
                timeSlotId, // Time Slot
                event.classroom.replace(/[\u200B-\u200D\uFEFF]/g, '').trim(), // Remove zero-width spaces and trim
                dayOfWeek, // timeslot_day
                currentStartTime, // timeslot_start
                formattedEndTime // timeslot_end
            ].join(","));
        }

        return eventRows; // Return all rows generated for this event
    });

    // Sort the rows based on the day of the week and then by start time
    rows.sort((a, b) => {
        const dayComparison = getDayValue(a.split(",")[5]) - getDayValue(b.split(",")[5]); // Compare by day of the week
        if (dayComparison !== 0) {
            return dayComparison; // If days are different, sort by day
        }
        // If days are the same, compare by start time
        return a.split(",")[6].localeCompare(b.split(",")[6]); // Use localeCompare for time comparison
    });

    return header + rows.join("\n"); // Return the complete CSV content
};

  
  // Function to trigger CSV file download
  export const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// export const downloadCSV = (csvContent, filename) => {
//     // Encode CSV content as a URI component
//     const csvDataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    
//     // Create an anchor element
//     const link = document.createElement('a');
//     link.href = csvDataUri;
//     link.setAttribute('download', filename); // Set the filename for download
    
//     // Append the anchor to the document, trigger the click, and remove the anchor
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };

  // Testing 
// export const downloadCSV = (csvContent, filename) => {
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
//     // Check if the iframe sandbox allows downloads
//     if (window.parent === window) {
//         // If no iframe, proceed with normal download
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', filename);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     } else {
//         // If inside an iframe, try to communicate with parent window
//         try {
//             const data = { csvContent, filename, type: 'csvDownload' };
//             window.parent.postMessage(data, '*');
//         } catch (error) {
//             console.error('Unable to trigger download within SAS VA:', error);
//         }
//     }
// };


