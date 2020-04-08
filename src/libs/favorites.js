const KEY_SEPARATOR = '@';

export function getFavoriteKey(country, province, location) {
  return `${country}${KEY_SEPARATOR}${province}${KEY_SEPARATOR}${location}`;
}

/**
 * @param {String} key
 * @returns {{country: String, province: String, location: String}}
 */
export function getLocationsFromKey(key) {
  const [country = '', province = '', location = ''] = key.split(KEY_SEPARATOR, 3);
  return { country, province, location };
}

export function getTitleSubtitle(country, province, location, defaultTitle) {
  const title = location || province || country || defaultTitle || '';
  let subtitle1;
  let subtitle2;
  if (location) {
    subtitle1 = province || country || '';
    subtitle2 = province && country ? country : '';
  } else {
    subtitle1 = province && country ? country : '';
    subtitle2 = '';
  }
  return [title, subtitle1, subtitle2];
}

function concatTitles(country, province, location) {
  return [location, province, country].filter(t => !!t).join(', ');
}

export function getTitleSubtitlePair(
  country,
  province,
  location,
  withMiddleSeparator,
  defaultTitle,
) {
  const [title, subtitle1, subtitle2] = getTitleSubtitle(country, province, location, defaultTitle);
  const subtitle = concatTitles(subtitle2, subtitle1);
  const sub = withMiddleSeparator && subtitle ? `, ${subtitle}` : subtitle;
  return [title, sub];
}
