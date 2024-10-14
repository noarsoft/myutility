//---validate---

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าตัวแปรเป็น undefined หรือไม่
 * @param variable - ตัวแปรที่ต้องการตรวจสอบ
 * @returns true หากตัวแปรเป็น undefined, false หากไม่ใช่
 */
export function is_undefined(variable: any): boolean {
    return typeof variable === 'undefined';
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าตัวแปรเป็น undefined or null หรือไม่
 * @param variable - ตัวแปรที่ต้องการตรวจสอบ
 * @returns true หากตัวแปรเป็น undefined,null false หากไม่ใช่
 */
export function is_undefined_or_null(variable: any): boolean {
    return typeof variable === 'undefined' || typeof variable === null;
}

/**
 * ฟังก์ชันสำหรับตรวจสอบรูปแบบอีเมล
 * @param email - อีเมลที่ต้องการตรวจสอบ
 * @returns true หากอีเมลถูกต้อง, false หากไม่ถูกต้อง
 */
export function is_email(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็นตัวเลขหรือไม่
 * @param value - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็นตัวเลข, false หากไม่ใช่ตัวเลข
 */
export function is_number(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็น integer หรือไม่
 * @param regex_string - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็น integer, false หากไม่ใช่ integer
 */
export function is_int(regex_string: string) {
    const intPattern = /^\d+$/;
    return intPattern.test(regex_string);
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็น float หรือไม่
 * @param regex_string - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็น float, false หากไม่ใช่ float
 */
export function is_float(regex_string: string): boolean {
    const floatPattern = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
    return floatPattern.test(regex_string);
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็น js array หรือไม่
 * @param value - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็น js array, false หากไม่ใช่ js array
 */
export function is_array(value: string) {

    if (typeof value === "string") {
        return false;
    }

    return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็น JSON (object or array) หรือไม่
 * @param val - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็น JSON (object or array), false หากไม่ใช่
 */
export function is_json(val: string): boolean {
    try {
        JSON.parse(val);
        return true;
    } catch (e) {
        return false;
    }
}
JSON.stringify

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าค่าที่ให้มาเป็น JSON object หรือไม่
 * @param val - ค่าที่ต้องการตรวจสอบ
 * @returns true หากเป็น JSON object, false หากไม่ใช่
 */
export function is_jsonobject(val: any): boolean {
    if (is_array(val)) {
        return false;
    } else if (is_json(val)) {
        return true;
    } else {
        return false;
    }
}

//--date function--

/**
 * ฟังก์ชันสำหรับดึงชื่อวันในสัปดาห์จากวันที่ที่กำหนด หรือวันที่ปัจจุบัน
 * @param date - วันที่ที่ต้องการตรวจสอบ (optional) ถ้าไม่ระบุจะใช้วันที่ปัจจุบัน
 * @returns วันในสัปดาห์ (0=Sunday - 6=Saturday)
 */
export function get_dayofweekString(date?: Date): string {
    // ถ้าไม่มีการระบุวันที่ จะใช้วันที่ปัจจุบัน
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    // ถ้ามีการส่งค่า date มาและไม่ใช่ undefined หรือ null จะใช้ค่านั้น
    if (date !== undefined && date !== null) {
        d = date;
    }
    
    return d.getUTCDay() + ""
}

/**
 * ฟังก์ชันสำหรับดึงชื่อวันในสัปดาห์จากวันที่ที่กำหนด หรือวันที่ปัจจุบัน
 * @param date - วันที่ที่ต้องการตรวจสอบ (optional) ถ้าไม่ระบุจะใช้วันที่ปัจจุบัน
 * @returns ชื่อวันในสัปดาห์ Sunday - Saturday)
 */
export function get_dayofweekEng(date?: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    // ถ้ามีการส่งค่า date มาและไม่ใช่ undefined หรือ null จะใช้ค่านั้น
    if (date !== undefined && date !== null) {
        d = date;
    }

    // ดึงวันในสัปดาห์ (0-6) และคืนชื่อวันตามตำแหน่งใน array
    return daysOfWeek[d.getUTCDay()];
}

/**
 * ฟังก์ชันสำหรับดึงปีปัจจุบันในรูปแบบ YYYY (UTC)
 * @returns ปีในรูปแบบ string
 */
export function get_yearString(date?: Date | null): string {
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    // ถ้ามีการส่งค่า date มาและไม่ใช่ undefined หรือ null จะใช้ค่านั้น
    if (date !== undefined && date !== null) {
        d = date;
    }

    const year = d.getUTCFullYear().toString(); // ดึงปีและแปลงเป็น string
    return year;
}

/**
 * ฟังก์ชันสำหรับดึงเดือนปัจจุบันในรูปแบบ MM (UTC)
 * @returns เดือนในรูปแบบ string (01 - 12)
 */
export function get_monthString(date?: Date | null): string {
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    // ถ้ามีการส่งค่า date มาและไม่ใช่ undefined หรือ null จะใช้ค่านั้น
    if (date !== undefined && date !== null) {
        d = date;
    }

    let month = (d.getUTCMonth() + 1).toString(); // เดือนต้อง +1 แล้วแปลงเป็น string

    // ถ้าเดือนมีน้อยกว่า 2 หลัก ให้เติม 0 ข้างหน้า
    if (month.length < 2) {
        month = "0" + month;
    }

    return month;
}

/**
 * ฟังก์ชันสำหรับดึงเดือนปัจจุบันในรูปแบบ MM (UTC)
 * @returns เดือนในรูปแบบ string January - December)
 */
export function get_monthEng(date?: Date | null): string {
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    // ถ้ามีการส่งค่า date มาและไม่ใช่ undefined หรือ null จะใช้ค่านั้น
    if (date !== undefined && date !== null) {
        d = date;
    }

    const monthsOfYear = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let monthNumber:number = d.getUTCMonth()

    return monthsOfYear[monthNumber];
}

/**
 * ฟังก์ชันสำหรับดึงวันที่ในรูปแบบ YYYYMMDD (UTC)
 * @param date - วันที่ที่ต้องการใช้ (สามารถเป็น null หรือไม่ส่งมาก็ได้)
 * @returns วันที่ในรูปแบบ YYYYMMDD
 */
export function get_ymdString(date?: Date | null): string {
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    // ถ้ามีการส่งค่า date มาและไม่ใช่ undefined หรือ null จะใช้ค่านั้น
    if (date !== undefined && date !== null) {
        d = date;
    }

    // ดึงปี เดือน และวันแบบ UTC
    let year = d.getUTCFullYear().toString(); // แปลงเป็น string
    let month = (d.getUTCMonth() + 1).toString(); // แปลงเป็น string และเดือนต้อง +1
    let day = d.getUTCDate().toString(); // ดึงวัน

    // ถ้าเดือนหรือตัวเลขวันมีน้อยกว่า 2 หลัก ให้เติม 0 ข้างหน้า
    if (month.length < 2) {
        month = "0" + month;
    }

    if (day.length < 2) {
        day = "0" + day;
    }

    // รวมปี เดือน และวันเป็น string
    return year + month + day;
}

/**
 * ฟังก์ชันสำหรับดึงเวลาในรูปแบบ HHMM (UTC)
 * @param date - เวลาที่ต้องการใช้ (สามารถเป็น null หรือไม่ส่งมาก็ได้)
 * @returns เวลาในรูปแบบ HHMM
 */
export function get_hhmmString(date?: Date | null) {
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    if (date !== undefined && date !== null) {

        d = date;
    }

    let h = d.getHours() + ""; // => 9
    let m = d.getMinutes() + ""; // =>  30

    if (h.length === 1) {
        h = "0" + h;
    }
    if (m.length === 1) {
        m = "0" + m;
    }

    return h + m;
}


/**
 * ฟังก์ชันสำหรับดึงเวลาในรูปแบบ HHMMSS (UTC)
 * @param date - เวลาที่ต้องการใช้ (สามารถเป็น null หรือไม่ส่งมาก็ได้)
 * @returns เวลาในรูปแบบ HHMMSS
 */
export function get_hhmmssString(date?: Date | null) {
    let d = new Date(); // สำหรับวันที่ปัจจุบัน

    if (date !== undefined && date !== null) {

        d = date;
    }

    let h = d.getHours() + ""; // => 9
    let m = d.getMinutes() + ""; // =>  30
    var s = d.getSeconds() + ""; // => 51

    if (h.length === 1) {
        h = "0" + h;
    }
    if (m.length === 1) {
        m = "0" + m;
    }
    if (s.length === 1) {
        s = "0" + s;
    }
    return h + m + s;
}

/**
 * ฟังก์ชันสำหรับดึงเวลาในรูปแบบ HHMMSS (UTC)
 * @param date - เวลาที่ต้องการใช้ (สามารถเป็น null หรือไม่ส่งมาก็ได้)
 * @returns เวลาในรูปแบบ HHMMSS
 */
export function get_ymdhhmmSsstring(date?: Date | null) {
    return get_ymdString(date) + get_hhmmssString(date);
}



