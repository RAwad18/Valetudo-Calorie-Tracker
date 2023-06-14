export const calorieOverflow = (calories) => {

    if (calories > -1000 && calories < 1000)
        return calories.toString();


    const calString = calories.toString();
    const calLength = calString.length;
    const posCalIndex = calLength - 3;
    const negCalIndex = calLength - 3;

    if (calories > 999)
        return `${calString.slice(0, posCalIndex)}.${calString.slice(posCalIndex, posCalIndex + 1)}k`

    if (calories < -999)
        return `${calString.slice(0, negCalIndex)}.${calString.slice(negCalIndex, negCalIndex + 1)}k`
}