import Papa from 'papaparse';

/**
 * @param {String} csvString
 * @returns {{data: Array, errors: Array, meta: Array}}
 */
export const parseCsvString = csvString => {
  const resObj = {
    data: [],
    errors: null,
  };
  try {
    const res = Papa.parse(csvString, {
      header: true,
      transformHeader,
      skipEmptyLines: 'greedy',
    });
    if (res) {
      resObj.data = res.data || [];
      if (res.errors && res.errors.length) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('CSV parser errors:', res.errors);
        }
        resObj.errors = res.errors;
      }
    }
  } catch (err) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('CSV parsing failed:', err);
    }
    resObj.errors = [err];
  }

  return resObj;
};

function transformHeader(header) {
  // Changes to CSV format from 22.3.2020:
  // - column "Country/Region" renamed to "Country_Region"
  // - column "Province/State" renamed to "Province_State"
  // - added column "Admin2" (contains US county)
  // - file 03-20-2020.csv: header "Province/State" starts with unknown character (therefore we must use includes())
  if (header.includes('Country/Region')) {
    return 'Country_Region';
  }
  if (header.includes('Province/State')) {
    return 'Province_State';
  }
  return header;
}
