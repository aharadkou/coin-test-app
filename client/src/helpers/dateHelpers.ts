export const getNextDayTimestamp = (date: string) => {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + 1);
    return dateCopy.getTime();
}
