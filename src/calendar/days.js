// Base reference date: 07/10/2024 is Monday
export const baseDate = new Date(2024, 9, 7); // October is month 9 (zero-indexed)

export const getDateForSelectedDay = (day) => {
    const dayMap = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4 };
    const offset = dayMap[day];
    const selectedDate = new Date(baseDate);
    selectedDate.setDate(baseDate.getDate() + offset); // Add the offset to 07/10/2024 (Monday)
    return selectedDate;
  };

export const convertToDayDateTime = (isoString) => {
    const date = new Date(isoString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // Example: 10:30

    return { dayOfWeek, time };
}

export const toDateTime = (day, startTime, endTime) => {
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

