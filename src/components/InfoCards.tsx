import React from 'react';

const InfoCards = ({ title, value, icon, iconColor }: { title: string, value: string, icon: JSX.Element, iconColor: string }) => {
    return (
      <>
        {/* <div className="single-card flex flex-col items-center justify-center p-4 bg-white dark:bg-darkBgLight dark:text-white shadow-lg rounded-md cursor-pointer hover:bg-primary hover:text-white transition-all" 
        style={{ borderRadius:'10px' }}>
       
      
        <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                <div className="card-title">
                  <p className="text-nowrap mb-2">{title}</p>
                  <span className="badge bg-label-warning rounded-pill"></span>
                </div>
                <div className="mt-sm-auto">
                  <p className="mb-0">{value}</p>
                </div>
                <div id="profileReportChart"><img  src={icon}  style={{width:'100px'}}></img></div>
              </div>
      </div> */}

<div >

<ul style={{ display: 'flex', alignItems: 'center' }} className='dashbaord'>
  <li>
    <a >{title}</a>
  </li>
  <li>{value}</li>
</ul>


	

	</div>
</>
      
    );
};

export default InfoCards;
