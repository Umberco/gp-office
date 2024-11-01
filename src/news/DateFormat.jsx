import { format } from 'date-fns';


function DateFormat(dateTime) {
    const formattedDate = format(new Date(dateTime), 'dd.MM.yyyy');
    
    return ( 
        <>
        {formattedDate}
        </>
     );
}

export default DateFormat;