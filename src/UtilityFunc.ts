/**
 * ฟังก์ชันสำหรับตรวจสอบรูปแบบอีเมล
 * @param email - อีเมลที่ต้องการตรวจสอบ
 * @returns true หากอีเมลถูกต้อง, false หากไม่ถูกต้อง
 */
export function isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็นตัวเลขหรือไม่
 * @param value - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็นตัวเลข, false หากไม่ใช่ตัวเลข
 */
export function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}