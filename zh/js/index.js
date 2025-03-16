module.exports.createHttpHeaders = (input) => {
    const headers = {};
    if (!Array.isArray(input)) {
      return headers; 
    }
    input.forEach(headerData => {
      const headerName = headerData[0].toLowerCase();
      const headerValue = headerData.slice(1).join(', ');
      if (headers[headerName]) {
        headers[headerName] += `, ${headerValue}`;
      } else {
        headers[headerName] = headerValue;
      }
    });
    return headers;
  };


/**
 * Returns items for a paginated list.
 * 
 * The input is in the following format:
 * items: [
 *  { id: 1, title: '<main>item 1</main>', displayTitle: 'Item 1', metadata: {} },
 * ]
 * 
 * params: {
 *  page: 1,
 *  pageSize: 4,
 *  sort: 'asc',
 * }
 * 
 * Expected output:
 * [
 *  { id: 1, title: { main: 'Item 1' }  }
 * ]
 */
module.exports.getItems = (items, params) => {
    const { page, pageSize, sort } = params;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const sortedItems = sort === 'asc'
      ? [...items].sort((x, y) => x.displayTitle.localeCompare(y.displayTitle))
      : [...items].sort((x, y) => x.displayTitle.localeCompare(y.displayTitle));
  
    return sortedItems.slice(startIndex, endIndex).map(item => ({
      id: item.id,
      title: { main: item.displayTitle }
    }));
  };

