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




//--validate date function--
/**
 * ฟังก์ชันสำหรับตรวจสอบความถูกต้องของวันที่ในรูปแบบ YYYYMMDDHHMMSS หรือ YYYYMMDDHHMM หรือ YYYYMMDD
 * @param ymdhhmmss - วันที่ในรูปแบบ YYYYMMDDHHMMSS หรือ YYYYMMDDHHMM หรือ YYYYMMDD
 * @returns true หากวันที่ถูกต้อง, false หากไม่ถูกต้อง
 */
export function validate_ymdhhmmss(ymdhhmmss: string): boolean {
    if (ymdhhmmss.length < 8 || ymdhhmmss.length > 14 ||
        ymdhhmmss.length === 9 || ymdhhmmss.length === 11) {
        return false;
    }

    // ดึงข้อมูลปี, เดือน, วัน, ชั่วโมง และนาทีจาก string
    const year = parseInt(ymdhhmmss.substring(0, 4), 10);
    const month = parseInt(ymdhhmmss.substring(4, 6), 10) - 1; // เดือนใน Date ต้อง -1 (0-11)
    const day = parseInt(ymdhhmmss.substring(6, 8), 10);
    
    let hours:number = 0;
    let minutes:number = 0;
    let seconds:number = 0;

    if (ymdhhmmss.length >= 12) {
        hours = parseInt(ymdhhmmss.substring(8, 10), 10);
        minutes = parseInt(ymdhhmmss.substring(10, 12), 10);
    }
    if (ymdhhmmss.length >= 14) {
        seconds = parseInt(ymdhhmmss.substring(12, 14), 10);
    }

    // ตรวจสอบชั่วโมง นาที และวินาที (ชั่วโมงต้องอยู่ในช่วง 0-23, นาทีและวินาทีอยู่ในช่วง 0-59)
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        return false;
    }

    // ตรวจสอบวันที่โดยใช้ฟังก์ชัน Date ของ JavaScript
    const date = new Date(year, month, day);
    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month ||
        date.getUTCDate() !== day
    ) {
        return false;
    }

    // ถ้าวันที่และเวลาทั้งหมดถูกต้อง
    return true;
}



//--convert date function--

/**
 * ฟังก์ชันสำหรับดึงชื่อวันในสัปดาห์จากวันที่ที่กำหนด หรือวันที่ปัจจุบัน
 * @param date - วันที่ที่ต้องการตรวจสอบ (optional) ถ้าไม่ระบุจะใช้วันที่ปัจจุบัน
 * @returns วันในสัปดาห์ (0=Sunday - 6=Saturday)
 */
export function get_dayofweekString(date?: Date | null): string {
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
export function get_dayofweekEng(date?: Date | null): string {
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

    let monthNumber: number = d.getUTCMonth()

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

    let h = d.getUTCHours() + ""; // => 9
    let m = d.getUTCMinutes() + ""; // =>  30

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

    let h = d.getUTCHours() + ""; // => 9
    let m = d.getUTCMinutes() + ""; // =>  30
    var s = d.getUTCSeconds() + ""; // => 51

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




/**
 * ฟังก์ชันสำหรับแปลงวันที่จากรูปแบบ YYYYMMDDHHMMSS เป็น DD-MM-YYYY
 * @param ymdhhmmss - วันที่ในรูปแบบ YYYYMMDD หรือ YYYYMMDDHHMM หรือ YYYYMMDDHHMMSS, dilimeter default '-'
 * @returns วันที่ในรูปแบบ DD-MM-YYYY
 */
export function get_ymd_to_dmyString(ymdhhmmss: string, dilimeter?: string | null): string {
    // ตรวจสอบว่าความยาวของ input ต้องมีอย่างน้อย 8 ตัวอักษร
    if (ymdhhmmss.length < 8) {
        throw new Error('Invalid input. The date format should be at least YYYYMMDD.');
    }

    let s1: string = "-"
    if (dilimeter !== undefined && dilimeter !== null) {
        s1 = dilimeter;
    }

    // ดึงข้อมูลจาก string
    const year = ymdhhmmss.substring(0, 4); // 4 ตัวแรกคือปี
    const month = ymdhhmmss.substring(4, 6); // ถัดมา 2 ตัวคือเดือน
    const day = ymdhhmmss.substring(6, 8); // ถัดมาอีก 2 ตัวคือวัน

    // คืนค่าในรูปแบบ DD-MM-YYYY
    return `${day}${s1}${month}${s1}${year}`;
}

/**
 * ฟังก์ชันสำหรับแปลงวันที่จากรูปแบบ YYYYMMDDHHMMSS เป็น HH:MM
 * @param ymdhhmmss - วันที่ในรูปแบบ YYYYMMDDHHMMSS หรือ YYYYMMDDHHMM
 * @returns เวลาที่แปลงเป็น HH:MM
 */
export function get_ymdhhmm_to_hhmmString(ymdhhmmss: string, dilimeter?: string | null): string {
    // ตรวจสอบว่าความยาวของ input ต้องมีอย่างน้อย 12 ตัวอักษร
    if (ymdhhmmss.length < 12) {
        throw new Error('Invalid input. The date format should be at least YYYYMMDDHHMM.');
    }

    let s1: string = ":"
    if (dilimeter !== undefined && dilimeter !== null) {
        s1 = dilimeter;
    }

    // ดึงข้อมูลชั่วโมงและนาทีจาก string
    const hours = ymdhhmmss.substring(8, 10); // ตัวที่ 9-10 คือชั่วโมง
    const minutes = ymdhhmmss.substring(10, 12); // ตัวที่ 11-12 คือนาที

    // คืนค่าในรูปแบบ HH:MM
    return `${hours}${s1}${minutes}`;
}

/**
 * ฟังก์ชันสำหรับแปลงวันที่จากรูปแบบ YYYYMMDDHHMMSS เป็น HH:MM
 * @param ymdhhmmss - วันที่ในรูปแบบ YYYYMMDDHHMMSS หรือ YYYYMMDDHHMM
 * @returns เวลาที่แปลงเป็น HH:MM
 */
export function get_ymdhhmm_to_hhmmTH(ymdhhmmss: string, dilimeter?: string | null): string {
    // ตรวจสอบว่าความยาวของ input ต้องมีอย่างน้อย 12 ตัวอักษร
    if (ymdhhmmss.length < 12) {
        throw new Error('Invalid input. The date format should be at least YYYYMMDDHHMM.');
    }

    let s1: string = "-"
    if (dilimeter !== undefined && dilimeter !== null) {
        s1 = dilimeter;
    }

    // ดึงข้อมูลชั่วโมงและนาทีจาก string
    const hours = ymdhhmmss.substring(8, 10); // ตัวที่ 9-10 คือชั่วโมง
    const minutes = ymdhhmmss.substring(10, 12); // ตัวที่ 11-12 คือนาที

    // คืนค่าในรูปแบบ HH:MM
    return `${hours}${s1}${minutes}`;
}


/**
 * ฟังก์ชันสำหรับแปลงวันที่จากรูปแบบ YYYYMMDDHHMMSS เป็น HH:MM
 * @param ymdhhmmss - วันที่ในรูปแบบ YYYYMMDDHHMMSS
 * @returns เวลาที่แปลงเป็น HH:MM:SS
 */
export function get_ymdhhmmss_to_hhmmssString(ymdhhmmss: string, dilimeter?: string | null): string {
    // ตรวจสอบว่าความยาวของ input ต้องมีอย่างน้อย 12 ตัวอักษร
    if (ymdhhmmss.length < 14) {
        throw new Error('Invalid input. The date format should be at least YYYYMMDDHHMMSS.');
    }

    let s1: string = ":"
    if (dilimeter !== undefined && dilimeter !== null) {
        s1 = dilimeter;
    }

    // ดึงข้อมูลชั่วโมงและนาทีจาก string
    const hours = ymdhhmmss.substring(8, 10); // ตัวที่ 9-10 คือชั่วโมง
    const minutes = ymdhhmmss.substring(10, 12); // ตัวที่ 11-12 คือนาที
    const seconds = ymdhhmmss.substring(12, 14); // ตัวที่ 11-12 คือวินาที

    // คืนค่าในรูปแบบ HH:MM
    return `${hours}${s1}${minutes}${s1}${seconds}`;
}

/**
 * ฟังก์ชันสำหรับแปลงวันที่และเวลาในรูปแบบ YYYYMMDDHHMMSS หรือ YYYYMMDDHHMM หรือ YYYYMMDD เป็น Date
 * @param ymdhhmmss - วันที่และเวลาในรูปแบบ YYYYMMDDHHMMSS หรือ YYYYMMDDHHMM หรือ YYYYMMDD
 * @returns Date object หรือ null หากรูปแบบไม่ถูกต้อง
 */
export function get_ymdhhmmssString_to_dateutc(ymdhhmmss: string): Date | null {
    // ตรวจสอบความยาวของ input ต้องเท่ากับ 14 ตัวอักษร
    if (validate_ymdhhmmss(ymdhhmmss)) {
        return null;
    } 

    // ดึงข้อมูลปี, เดือน, วัน, ชั่วโมง, นาที และวินาทีจาก string
    const year = parseInt(ymdhhmmss.substring(0, 4), 10);
    const month = parseInt(ymdhhmmss.substring(4, 6), 10) - 1; // เดือนใน Date ต้อง -1 (0-11)
    const day = parseInt(ymdhhmmss.substring(6, 8), 10);

    let hours:number = 0;
    let minutes:number = 0;
    let seconds:number = 0;

    if (ymdhhmmss.length >= 12) {
        hours = parseInt(ymdhhmmss.substring(8, 10), 10);
        minutes = parseInt(ymdhhmmss.substring(10, 12), 10);
    }
    if (ymdhhmmss.length >= 14) {
        seconds = parseInt(ymdhhmmss.substring(12, 14), 10);
    }

    // สร้าง Date object
    const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));

    // ตรวจสอบว่าวันที่ที่สร้างขึ้นตรงกับ input หรือไม่
    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month ||
        date.getUTCDate() !== day ||
        date.getUTCHours() !== hours ||
        date.getUTCMinutes() !== minutes ||
        date.getUTCSeconds() !== seconds
    ) {
        return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
    }

    return date; // คืนค่า Date object ที่ถูกต้อง
}

/**
 * ฟังก์ชันสำหรับแปลงวันที่ในรูปแบบ DD-MM-YYYY และเวลาในรูปแบบ HH:MM:SS
 * เป็นรูปแบบ YYYYMMDDHHMMSS
 * @param dateStr - วันที่ในรูปแบบ DD-MM-YYYY
 * @param timeStr - เวลาในรูปแบบ undefinded หรือ null หรือ HH:MM หรือ HH:MM:SS
 * @returns วันที่และเวลาในรูปแบบ YYYYMMDDHHMMSS หรือ null หากรูปแบบไม่ถูกต้อง
 */
export function get_dmyhhmmss_to_ymdhhmmss(dateStr: string, timeStr?: string | null, 
    dilimeter_date?: string | null, dilimeter_time?: string | null): string | null {
    // แยกวัน, เดือน และปีจาก dateStr

    let s1: string = "-"
    if (dilimeter_date !== undefined && dilimeter_date !== null) {
        s1 = dilimeter_date;
    }

    if (s1?.length !== 1) {
        return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
    }


    const dateParts:string[] = dateStr.split(s1);
    if (dateParts.length !== 3) {
        return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
    }
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];


    let hours = "00";
    let minutes = "00";
    let seconds = "00";

    if (timeStr !== undefined && timeStr !== null) {
        let s2: string = ":";
        if (dilimeter_time !== undefined && dilimeter_time !== null) {
            s2 = dilimeter_time;
        }

        if (s2?.length !== 1) {
            return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
        }

        // แยกชั่วโมง, นาที และวินาทีจาก timeStr
        const timeParts = timeStr.split(s2);
        if (timeParts.length === 3) {
            hours = timeParts[0];
            minutes = timeParts[1];
            seconds = timeParts[2];
        } else if (timeParts.length === 2) {
            hours = timeParts[0];
            minutes = timeParts[1];
        } else {
            return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
        }
    }
    
    // สร้าง string ในรูปแบบ YYYYMMDDHHMMSS
    const ymdhhmmss = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return ymdhhmmss; // คืนค่าในรูปแบบ YYYYMMDDHHMMSS

}

/**
 * ฟังก์ชันสำหรับแปลงวันที่ในรูปแบบ DD-MM-YYYY เป็น UTC Date
 * @param dateStr - วันที่ในรูปแบบ DD-MM-YYYY
 * @returns UTC Date object หรือ null หากรูปแบบไม่ถูกต้อง
 */
export function get_dmyString_to_dateutc(dateStr: string, dilimeter?: string | null): Date | null {
    
    let s1: string = "-"
    if (dilimeter !== undefined && dilimeter !== null) {
        s1 = dilimeter;
    }

    if (s1?.length !== 1) {
        return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
    }

    // แยกวัน, เดือน และปีจาก string
    const parts = dateStr.split(s1);
    
    
    if (parts.length !== 3) {
        return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
    }
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // เดือนใน Date ต้อง -1 (0-11)
    const year = parseInt(parts[2], 10);
    
    // สร้าง UTC Date object
    const utcDate = new Date(Date.UTC(year, month, day));
    
    // ตรวจสอบว่าวันที่ที่สร้างขึ้นตรงกับ input หรือไม่
    if (
        utcDate.getUTCDate() !== day ||
        utcDate.getUTCMonth() !== month ||
        utcDate.getUTCFullYear() !== year
    ) {
        return null; // คืนค่า null หากรูปแบบไม่ถูกต้อง
    }

    return utcDate; // คืนค่า UTC Date object ที่ถูกต้อง
}