import * as dateUtils from '../../src/UtilityFunc';
  
  describe('Date Utilities', () => {

    test('get_ymdhhmmssString to get_ymdhhmmssString_to_dateutc to get_dateutc_to_ymdhhmmssString', () => {
        let cur_ymdhhmmss1:string = dateUtils.get_ymdhhmmssString();
        let cur_date1:Date = dateUtils.get_ymdhhmmssString_to_dateutc(cur_ymdhhmmss1) as Date
        let cur_ymdhhmmss2:string =  dateUtils.get_dateutc_to_ymdhhmmssString(cur_date1);

        let dmy:string = dateUtils.get_ymd_to_dmyString(cur_ymdhhmmss2);
        let dmy543:string = dateUtils.get_ymd_to_dmy543String(cur_ymdhhmmss2);
        let hhmm:string = dateUtils.get_hhmmString(cur_date1);
        let hhmmss:string = dateUtils.get_hhmmssString(cur_date1);
        console.log(cur_ymdhhmmss1 + " --> " + dmy + " " + hhmm);
        console.log(cur_ymdhhmmss1 + " --> " + dmy543 + " " + hhmm);
        console.log(cur_ymdhhmmss1 + " --> " + dmy + " " + hhmmss);
        
        let ymdhhmmss543_1 = dateUtils.get_dmy543hhmmss_to_ymdhhmmss(dmy543);
        console.log(dmy543 + " --> " + ymdhhmmss543_1);

        expect(cur_ymdhhmmss1).toBe(cur_ymdhhmmss2);
    });

  });