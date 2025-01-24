// searchFilterFunction.ts
export const searchFilterFunction = (text: string, variety: any[], setFilteredData: (data: any[]) => void) => {
    const newData = variety.filter(item => {
      const itemData = item.common_name ? item.common_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  
    const groupedVariety = newData.reduce((acc: { [x: string]: any[] }, item: { common_name: string[] }) => {
      const firstLetter = item.common_name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item.common_name);
      return acc;
    }, {});
  
    const orderItems = Object.keys(groupedVariety).sort().map(letter => ({
      title: letter,
      data: groupedVariety[letter],
    }));
  
    setFilteredData(orderItems);
};