import { dailyReports } from './queries';
import {
  DAYS_CONFIRMED_DAILY,
  DAYS_ACTIVE_DAILY,
  DAYS_RECOVERED_DAILY,
  DAYS_DEATHS_DAILY,
  DAYS_CONFIRMED_PERC,
  DAYS_ACTIVE_PERC,
  DAYS_RECOVERED_PERC,
  DAYS_DEATHS_PERC,
  DAYS_ORDER,
} from '../constants';
import { parseDayNumber, differenceInCalendarDays } from '../../libs/date';

const gueryFullDailyReports = async ({ location, province, country }) => {
  const data = await dailyReports({ location, province, country });
  let c = 0;
  let a = 0;
  let r = 0;
  let d = 0;
  const firstDate = data.length ? parseDayNumber(data[0].day) : null;
  const fullData = data.map(dt => {
    const { day, confirmed, active, recovered, deaths } = dt;
    const dc = confirmed - c;
    const da = active - a;
    const dr = recovered - r;
    const dd = deaths - d;
    const fullRow = {
      ...dt,
      [DAYS_CONFIRMED_DAILY]: dc,
      [DAYS_ACTIVE_DAILY]: da,
      [DAYS_RECOVERED_DAILY]: dr,
      [DAYS_DEATHS_DAILY]: dd,
      [DAYS_CONFIRMED_PERC]: Math.round(dc * (c ? 100 / c : 0)),
      [DAYS_ACTIVE_PERC]: Math.round(da * (a ? 100 / a : 0)),
      [DAYS_RECOVERED_PERC]: Math.round(dr * (r ? 100 / r : 0)),
      [DAYS_DEATHS_PERC]: Math.round(dd * (d ? 100 / d : 0)),
      [DAYS_ORDER]: differenceInCalendarDays(parseDayNumber(day), firstDate) + 1,
    };
    c = confirmed;
    a = active;
    r = recovered;
    d = deaths;
    return fullRow;
  });
  return fullData;
};

export default gueryFullDailyReports;
