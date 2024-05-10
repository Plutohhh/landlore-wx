export function frontZeroLength2(number) {
    let res = number + '';
    if (res.length > 2) {
        return res
    }
    while (res.length < 2) {
        res = '0' + res
    }
    return res
}