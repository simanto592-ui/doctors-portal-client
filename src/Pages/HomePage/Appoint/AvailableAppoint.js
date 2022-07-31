import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import OpenModal from './OpenModal';
import Service from './Service';

const AvailableAppoint = ({date}) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect( ()=>{
        fetch('http://localhost:5000/service')
        .then(res => res.json())
        .then(data => setServices(data))
    } ,[])

    return (
        <div>
            <h4 className='text-xl text-primary text-center'>Available Appointments on {format(date, 'PP')}</h4>           
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service=><Service
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Service>)
                }
           </div>
           {treatment && <OpenModal 
           treatment={treatment} 
           date={date}
           setTreatment={setTreatment}
           ></OpenModal>}
        </div>
    );
};

export default AvailableAppoint;