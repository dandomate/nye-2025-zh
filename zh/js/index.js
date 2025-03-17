module.exports.createHttpHeaders = (input) => {
  if (!Array.isArray(input)) return {}; 

  return input.reduce((headers, headerData) => {
      if (!Array.isArray(headerData) || headerData.length < 2) return headers;
      
      const headerName = headerData[0].toLowerCase();
      const headerValue = headerData.slice(1).join(', ');

      headers[headerName] = headers[headerName] ? `${headers[headerName]}, ${headerValue}` : headerValue;
      return headers;
  }, {});
};

module.exports.getItems = (items, params) => {
  const { page = 1, pageSize = 10, sort = 'asc' } = params;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedItems = [...items].sort((x, y) => 
      sort === 'asc' 
          ? x.displayTitle.localeCompare(y.displayTitle) 
          : y.displayTitle.localeCompare(x.displayTitle)
  );

  return sortedItems.slice(startIndex, endIndex).map(item => ({
      id: item.id,
      title: { main: item.displayTitle }
  }));
};
