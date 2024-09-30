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

export const convertToCSV = (events) => {
    // Define the CSV headers
    const headers = ['Day', 'Start Time', 'End Time', 'Module Name', 'Class', 'Class Type', 'Classroom'];
    
    // Define a helper function to get the numeric value of the day of the week
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

    // Map over the events array to convert each event to a CSV row
    const rows = events.map(event => {
        // Convert start and end time using the convertToDayDateTime function
        const { dayOfWeek, time: startTime } = convertToDayDateTime(event.start, 2); // Get day of the week and start time
        const endTime = convertToDayDateTime(event.end, 1); // Get only the end time

        // Return an array representing one row in the CSV
        return [
            dayOfWeek,           // Day of the week
            startTime,           // Start time
            endTime,             // End time
            event.text,          // Module name
            event.class || 'N/A', // Class, default to 'N/A' if missing
            event.classType || 'N/A', // Class type, default to 'N/A' if missing
            event.classroom || 'N/A'  // Classroom, default to 'N/A' if missing
        ];
    });

    // Sort the rows based on the day of the week and then by start time
    rows.sort((a, b) => {
        const dayComparison = getDayValue(a[0]) - getDayValue(b[0]); // Compare by day of the week
        if (dayComparison !== 0) {
            return dayComparison; // If days are different, sort by day
        }
        // If days are the same, compare by start time
        return a[1].localeCompare(b[1]); // Use localeCompare for time comparison
    });

    // Combine the headers and rows into the final CSV content
    const csvContent = [
        headers.join(','),  // Join headers with commas to form the first row
        ...rows.map(row => row.join(','))  // Map each row array to a CSV row and join with commas
    ].join('\n');  // Join rows with newlines to form the complete CSV file content
  
    return csvContent;  // Return the final CSV content
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


