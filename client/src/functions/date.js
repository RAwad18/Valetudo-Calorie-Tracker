
export const dateFormatter = (fromToday = 0) => {
    
    const daysToAdd = 86400000 * fromToday;
    // retrieves current date
    const date = new Date(Date.now() + daysToAdd)
    const mmddyy = new Intl.DateTimeFormat('en-us', {year: "numeric", month: "2-digit", day: "2-digit"}).format(date)
    const numeric = new Intl.DateTimeFormat('en-us', { month: "2-digit", day: "2-digit"}).format(date);
    const monthD = new Intl.DateTimeFormat('en-us', { month: 'short', day: "2-digit"}).format(date);
    
    return {mmddyy, numeric, monthD}
}
