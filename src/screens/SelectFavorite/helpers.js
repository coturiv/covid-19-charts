export function getFilteredList(filter, data, columnName) {
  if (!filter || !data || !columnName) {
    return data;
  }
  const f = filter.toLocaleLowerCase();
  return data.filter(item => item[columnName].toLocaleLowerCase().includes(f));
}
