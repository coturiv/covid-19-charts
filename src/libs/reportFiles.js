import * as FileSystem from 'expo-file-system';

const DAILY_REPORTS_FOLDER = `${FileSystem.documentDirectory}daily-reports/`;
const REMOTE_REPORTS_URI =
  'https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_daily_reports/';

export const initFilesystem = () => {
  // make a folder if missing
  return FileSystem.makeDirectoryAsync(DAILY_REPORTS_FOLDER, {
    intermediates: true,
  });
};

export const downloadFile = async dayString => {
  const name = getFileName(dayString);
  const fileUri = `${DAILY_REPORTS_FOLDER}${name}`;

  try {
    const res = await FileSystem.downloadAsync(`${REMOTE_REPORTS_URI}${name}`, fileUri);

    if (res.status !== 200) {
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
    }
  } catch (err) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Downloading error:', name, err);
    }
  }
};

export const readCsvString = async dayString => {
  const name = getFileName(dayString);
  let result = '';
  try {
    result = await FileSystem.readAsStringAsync(`${DAILY_REPORTS_FOLDER}${name}`, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (err) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('File reading error:', name, err);
    }
  }
  return result;
};

export const fileExists = async dayString => {
  const name = getFileName(dayString);
  let result = {};
  try {
    result = await FileSystem.getInfoAsync(`${DAILY_REPORTS_FOLDER}${name}`);
  } catch (err) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('File reading error:', name, err);
    }
  }
  return result && result.exists && !result.isDirectory;
};

export const deleteReports = async () => {
  try {
    // remove folder
    await FileSystem.deleteAsync(`${DAILY_REPORTS_FOLDER}`, {
      idempotent: true,
    });
    // create empty folder
    await initFilesystem();
  } catch (err) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Deleting error:', err);
    }
  }
};

function getFileName(dayString) {
  return `${dayString}.csv`;
}
