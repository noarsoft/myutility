import * as dateUtils from '../../src/UtilityFunc';
  
  describe('Utility Functions Unit Tests', () => {
  
    //--- Tests for validate_ymdhhmmss ---
    test('validate_ymdhhmmss should return true for valid YYYYMMDDHHMMSS', () => {
      expect(dateUtils.validate_ymdhhmmss('20240101120000')).toBe(true);
      expect(dateUtils.validate_ymdhhmmss('202401011200')).toBe(true);
      expect(dateUtils.validate_ymdhhmmss('20240101')).toBe(true);
    });
  
    test('validate_ymdhhmmss should return false for invalid formats', () => {
      expect(dateUtils.validate_ymdhhmmss('2024010112')).toBe(false); // Invalid length
      expect(dateUtils.validate_ymdhhmmss('20240199')).toBe(false); // Invalid day
      expect(dateUtils.validate_ymdhhmmss('20240101130060')).toBe(false); // Invalid seconds
    });
  
    //--- Tests for get_dateutc_to_timestamp ---
    test('get_dateutc_to_timestamp should return correct timestamp', () => {
      const date = new Date('2024-01-01T12:00:00Z');
      expect(dateUtils.get_dateutc_to_timestamp(date)).toBe(1704110400);
    });
  
    //--- Tests for get_timestamp_to_dateutc ---
    test('get_timestamp_to_dateutc should return correct Date object', () => {
      const timestamp = 1704110400;
      expect(dateUtils.get_timestamp_to_dateutc(timestamp)).toEqual(new Date('2024-01-01T12:00:00Z'));
    });
  
    //--- Tests for get_dayofweekString ---
    test('get_dayofweekString should return correct day of the week (number)', () => {
      const date = new Date('2024-01-01T00:00:00Z'); // Monday
      expect(dateUtils.get_dayofweekString(date)).toBe('1');
    });
  
    //--- Tests for get_dayofweekEng ---
    test('get_dayofweekEng should return correct day of the week (English)', () => {
      const date = new Date('2024-01-01T00:00:00Z'); // Monday
      expect(dateUtils.get_dayofweekEng(date)).toBe('Monday');
    });
  
    //--- Tests for get_yearString ---
    test('get_yearString should return current year', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      expect(dateUtils.get_yearString(date)).toBe('2024');
    });
  
    //--- Tests for get_monthString ---
    test('get_monthString should return current month', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      expect(dateUtils.get_monthString(date)).toBe('01');
    });
  
    //--- Tests for get_monthEng ---
    test('get_monthEng should return current month in English', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      expect(dateUtils.get_monthEng(date)).toBe('January');
    });
  
    //--- Tests for get_ymdString ---
    test('get_ymdString should return date in YYYYMMDD format', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      expect(dateUtils.get_ymdString(date)).toBe('20240101');
    });
  
    //--- Tests for get_hhmmString ---
    test('get_hhmmString should return time in HHMM format', () => {
      const date = new Date('2024-01-01T12:30:00Z');
      expect(dateUtils.get_hhmmString(date)).toBe('1230');
    });
  
    //--- Tests for get_hhmmssString ---
    test('get_hhmmssString should return time in HHMMSS format', () => {
      const date = new Date('2024-01-01T12:30:45Z');
      expect(dateUtils.get_hhmmssString(date)).toBe('123045');
    });
  
    //--- Tests for get_ymdhhmmSsstring ---
    test('get_ymdhhmmSsstring should return datetime in YYYYMMDDHHMMSS format', () => {
      const date = new Date('2024-01-01T12:30:45Z');
      expect(dateUtils.get_ymdhhmmssString(date)).toBe('20240101123045');
    });
  
    //--- Tests for get_ymd_to_dmyString ---
    test('get_ymd_to_dmyString should convert YYYYMMDD to DD-MM-YYYY', () => {
      expect(dateUtils.get_ymd_to_dmyString('20240101')).toBe('01-01-2024');
      expect(dateUtils.get_ymd_to_dmyString('20240101', '/')).toBe('01/01/2024');
    });
  
    //--- Tests for get_ymdhhmm_to_hhmmString ---
    test('get_ymdhhmm_to_hhmmString should convert YYYYMMDDHHMM to HH:MM', () => {
      expect(dateUtils.get_ymdhhmm_to_hhmmString('202401011230')).toBe('12:30');
      expect(dateUtils.get_ymdhhmm_to_hhmmString('202401011230', '-')).toBe('12-30');
    });
  
    //--- Tests for get_ymdhhmmss_to_hhmmssString ---
    test('get_ymdhhmmss_to_hhmmssString should convert YYYYMMDDHHMMSS to HH:MM:SS', () => {
      expect(dateUtils.get_ymdhhmmss_to_hhmmssString('20240101123045')).toBe('12:30:45');
    });
  
    //--- Tests for get_ymdhhmmssString_to_dateutc ---
    test('get_ymdhhmmssString_to_dateutc should convert YYYYMMDDHHMMSS to Date object', () => {
      expect(dateUtils.get_ymdhhmmssString_to_dateutc('20240101123045')).toEqual(new Date(Date.UTC(2024, 0, 1, 12, 30, 45)));

      
    });
  
    //--- Tests for get_dmyhhmmss_to_ymdhhmmss ---
    test('get_dmyhhmmss_to_ymdhhmmss should convert DD-MM-YYYY and HH:MM:SS to YYYYMMDDHHMMSS', () => {
      expect(dateUtils.get_dmyhhmmss_to_ymdhhmmss('01-01-2024', '12:30:45')).toBe('20240101123045');
    });


    //--- Tests for count date number ---
    test('get_dmyhhmmss_to_ymdhhmmss should convert DD-MM-YYYY and HH:MM:SS to YYYYMMDDHHMMSS', () => {
      const start = '20241015000000'; // YYMMDDHHMMSS
      const end = '20241018000000';   // YYMMDDHHMMSS
      console.log(dateUtils.get_count_date_difference(start, end)); // Output: 1
      expect(dateUtils.get_count_date_difference(start, end)).toBe(3);
    });
  
  });
  