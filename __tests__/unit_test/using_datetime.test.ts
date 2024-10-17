import * as dateUtils from '../../src/UtilityFunc';
  
  describe('Date Utilities', () => {

    test('get_ymdhhmmssString to get_ymdhhmmssString_to_dateutc to get_dateutc_to_ymdhhmmssString', () => {
        let cur_ymdhhmmss1:string = dateUtils.get_ymdhhmmssString();
        let cur_date1:Date = dateUtils.get_ymdhhmmssString_to_dateutc(cur_ymdhhmmss1) as Date
        let cur_ymdhhmmss2:string =  dateUtils.get_dateutc_to_ymdhhmmssString(cur_date1);

        let dmy:string = dateUtils.get_ymd_to_dmyString(cur_ymdhhmmss2);
        let hhmm:string = dateUtils.get_hhmmString(cur_date1);
        console.log(cur_ymdhhmmss1 + " " + dmy + " " + hhmm);

        expect(cur_ymdhhmmss1).toBe(cur_ymdhhmmss2);
    });

  });