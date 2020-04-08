const US_STATES = {
  AZ: 'Arizona',
  CA: 'California',
  'CA (From Diamond Princess)': 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  IA: 'Iowa',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  MN: 'Minnesota',
  MO: 'Missouri',
  NC: 'North Carolina',
  NE: 'Nebraska',
  'NE (From Diamond Princess)': 'Nebraska',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NV: 'Nevada',
  NY: 'New York',
  OK: 'Oklahoma',
  OR: 'Oregon',
  'OR ': 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  TN: 'Tennessee',
  TX: 'Texas',
  'TX (From Diamond Princess)': 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  VT: 'Vermont',
  WA: 'Washington',
  WI: 'Wisconsin',
};

/**
 * @param {Number} day
 * @param {[Object]} data - Array of objects from CSV files.
 * @return {[Array]} Array of arrays ready to insert to SQLite.
 */
export function normalizeData(day, data) {
  return data.map(d => {
    return toArrayOfRows(day, d);
  });
}

/* eslint-disable camelcase */
function toArrayOfRows(day, data) {
  const { Recovered = 0, Deaths = 0 } = data;
  let { Confirmed = 0, Country_Region = '', Province_State = '', Admin2 = '' } = data;

  if (day < 20200322) {
    // fix names

    if (Country_Region === 'US') {
      // fix US
      switch (Province_State) {
        case 'Grand Princess Cruise Ship':
          Province_State = 'Grand Princess';
          break;
        case 'Unassigned Location (From Diamond Princess)':
          Province_State = 'Diamond Princess';
          break;
        case 'Chicago':
          Province_State = 'Illinois';
          Admin2 = 'Chicago';
          break;
        case 'US':
          // should be deleted
          Confirmed = 0;
          break;
        case 'Bahamas, The':
          Province_State = 'Bahamas';
          break;
        case 'Virgin Islands, U.S.':
        case 'United States Virgin Islands':
          Province_State = 'Virgin Islands';
          break;
        default:
      }

      if (day < 20200310 && Province_State) {
        // compound names like 'Seattle, WA'
        const [loc, st] = Province_State.split(', ', 2);
        if (loc && st) {
          switch (st) {
            case 'D.C.':
              Province_State = 'District of Columbia';
              Admin2 = 'District of Columbia';
              break;
            default:
              if (US_STATES[st]) {
                Province_State = US_STATES[st];
                Admin2 = loc;
              }
          }
        }
      }
    } else {
      // fix other than US
      switch (Country_Region) {
        case 'Czech Republic':
          Country_Region = 'Czechia';
          break;
        case 'Mainland China':
          Country_Region = 'China';
          break;
        case 'Russian Federation':
          Country_Region = 'Russia';
          break;
        case ' Azerbaijan':
          Country_Region = 'Azerbaijan';
          break;
        case 'Taiwan':
        case 'Taipei and environs':
          Country_Region = 'Taiwan*';
          Province_State = '';
          break;
        case 'Austria':
          if (Province_State === 'None') {
            Province_State = '';
          }
          break;
        case 'The Bahamas':
        case 'Bahamas, The':
          Country_Region = 'Bahamas';
          break;
        case 'The Gambia':
        case 'Gambia, The':
          Country_Region = 'Gambia';
          break;
        case 'UK':
          Country_Region = 'United Kingdom';
          break;
        case 'Gibraltar':
          Country_Region = 'United Kingdom';
          Province_State = 'Gibraltar';
          break;
        case 'Cayman Islands':
          Country_Region = 'United Kingdom';
          Province_State = 'Cayman Islands';
          break;
        case 'Channel Islands':
          Country_Region = 'United Kingdom';
          Province_State = 'Channel Islands';
          break;
        case 'United Kingdom':
          if (Province_State === 'United Kingdom' || Province_State === 'UK') {
            // should be deleted
            Confirmed = 0;
          }
          break;
        case 'Germany':
          if (Province_State === 'Bavaria') {
            // should be deleted
            Confirmed = 0;
          }
          break;
        case 'France':
          if (Province_State === 'Fench Guiana' || Province_State === 'France') {
            // should be deleted
            Confirmed = 0;
          }
          break;
        case 'Guadeloupe':
          // should be deleted
          Confirmed = 0;
          break;
        case 'Mayotte':
          Country_Region = 'France';
          Province_State = 'Mayotte';
          break;
        case 'Martinique':
          Country_Region = 'France';
          Province_State = 'Martinique';
          break;
        case 'Reunion':
          Country_Region = 'France';
          Province_State = 'Reunion';
          break;
        case 'Saint Barthelemy':
          Country_Region = 'France';
          Province_State = 'Saint Barthelemy';
          break;
        case 'St. Martin':
        case 'Saint Martin':
          Country_Region = 'France';
          Province_State = 'St Martin';
          break;
        case 'Hong Kong SAR':
          Country_Region = 'Hong Kong';
          break;
        case 'Macao SAR':
          Country_Region = 'Macau';
          break;
        case 'Viet Nam':
          Country_Region = 'Vietnam';
          break;
        case 'South Korea':
          Country_Region = 'Korea, South';
          break;
        case 'Iran (Islamic Republic of)':
          Country_Region = 'Iran';
          break;
        case 'occupied Palestinian territory':
          Country_Region = 'Palestine';
          break;
        case 'Republic of the Congo':
          // should be deleted
          Confirmed = 0;
          break;
        case 'Cruise Ship':
          if (Province_State === 'Diamond Princess') {
            Country_Region = 'Diamond Princess';
            Province_State = '';
          }
          break;
        case 'Others':
          if (Province_State === 'Diamond Princess cruise ship') {
            Country_Region = 'Diamond Princess';
            Province_State = '';
          } else if (Province_State === 'Cruise Ship') {
            // should be deleted
            Confirmed = 0;
          }
          break;
        default:
      }
    }
  }

  if (day >= 20200322 && day < 20200324) {
    switch (Country_Region) {
      case 'Cruise Ship':
        if (Province_State === 'Diamond Princess') {
          Country_Region = 'Diamond Princess';
          Province_State = '';
        }
        break;
      default:
    }
  }

  return [day, Country_Region, Province_State, Admin2, Confirmed, Recovered, Deaths];
}
