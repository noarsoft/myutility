import * as dateUtils from '../../src/UtilityFunc';
  
  describe('Date Utilities', () => {
    test('get_dayofweekString should return correct day of week', () => {
      const date = new Date('2024-10-14');
      expect(dateUtils.get_dayofweekString(date)).toBe('1'); // Monday
    });
  
    test('get_dayofweekEng should return correct day of week in English', () => {
      const date = new Date('2024-10-14');
      expect(dateUtils.get_dayofweekEng(date)).toBe('Monday');
    });
  
    test('get_yearString should return correct year', () => {
      const date = new Date('2024-10-14');
      expect(dateUtils.get_yearString(date)).toBe('2024');
    });
  
    test('get_monthString should return correct month as MM', () => {
      const date = new Date('2024-10-14');
      expect(dateUtils.get_monthString(date)).toBe('10');
    });
  
    test('get_monthEng should return correct month in English', () => {
      const date = new Date('2024-10-14');
      expect(dateUtils.get_monthEng(date)).toBe('October');
    });
  
    test('get_ymdString should return correct formatted date', () => {
      const date = new Date('2024-10-14');
      expect(dateUtils.get_ymdString(date)).toBe('20241014');
    });
  
    test('get_hhmmString should return correct time as HHMM', () => {
      const date = new Date(Date.UTC(2024, 9, 14, 9, 30)); // 9:30 UTC
      expect(dateUtils.get_hhmmString(date)).toBe('0930');
    });
  
    test('get_hhmmssString should return correct time as HHMMSS', () => {
      const date = new Date(Date.UTC(2024, 9, 14, 9, 30, 45)); // 9:30:45 UTC
      expect(dateUtils.get_hhmmssString(date)).toBe('093045');
    });
  
    test('get_ymdhhmmSsstring should return correct combined datetime', () => {
      const date = new Date(Date.UTC(2024, 9, 14, 9, 30, 45)); // 2024-10-14T09:30:45Z
      expect(dateUtils.get_ymdhhmmSsstring(date)).toBe('20241014093045');
    });
  
    test('get_ymd_to_dmyString should convert YYYYMMDD to DD-MM-YYYY', () => {
      expect(dateUtils.get_ymd_to_dmyString('20241014')).toBe('14-10-2024');
    });
  
    test('get_ymdhhmm_to_hhmmString should return correct time as HH:MM', () => {
      expect(dateUtils.get_ymdhhmm_to_hhmmString('202410140930')).toBe('09:30');
    });
  
    test('get_ymdhhmmss_to_hhmmssString should return correct time as HH:MM:SS', () => {
      expect(dateUtils.get_ymdhhmmss_to_hhmmssString('20241014093045')).toBe('09:30:45');
    });
  
    test('get_ymdhhmmssString_to_dateutc should return correct Date object', () => {
      const date = dateUtils.get_ymdhhmmssString_to_dateutc('20241014093045');
      expect(date?.toISOString()).toBe('2024-10-14T09:30:45.000Z');
    });
  
    test('get_dmyString_to_dateutc should return correct UTC Date object', () => {
      const date = dateUtils.get_dmyString_to_dateutc('14-10-2024');
      expect(date?.toISOString()).toBe('2024-10-14T00:00:00.000Z');
    });
  
    test('get_dmyhhmmss_to_ymdhhmmss should return correct formatted date and time', () => {
      expect(dateUtils.get_dmyhhmmss_to_ymdhhmmss('14-10-2024', '09:30:45')).toBe('20241014093045');
    });
  });