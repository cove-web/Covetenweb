export default function convertISODateToDDMMYear(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const year = date.getFullYear();
  
    if(isoDate){
      return `${day}-${month}-${year}`;
    }else{
      return null
    }
    
  }