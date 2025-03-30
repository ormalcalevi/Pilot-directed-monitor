import {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import AltitudeGauge from './AltitudeDisplay/AltitudeDisplay';
import HSIDisplay from './HSIDisplay/HSIDisplay'; 
import ADIDisplay from './ADIDisplay/ADIDisplay';



function App(){
    const [Altitude, setAltitude] = useState('');
    const handleChangeAltitude=(event)=>{ setAltitude(event.target.value);setError('');setConfirmation('');
    };
    const [HSI, setHSI] = useState('');
    const handleChangeHSI=(event)=>{ setHSI(event.target.value);setError('');setConfirmation('');
    };
    const [ADI, setADI] = useState('');
    const handleChangeADI=(event)=>{ setADI(event.target.value);setError('');setConfirmation('');
    };
//יצירת את שלושת המשתנים עבור הקלטים מהשתמש

    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');
//שדות עבור שגיאה או קבלת הנתונים 

const [lastData, setLastData] = useState(null);
//שומר את הקלט האחרון

    const [status,setStatus]=useState('+');
//ישנם שלושה מצבים :TEXT/VISUAL/+ -הגדרת defult של המשתנה לפלוס:הצגת נתונים


 
    const changeStatusSubmit=(newStatus)=>{
        setStatus(newStatus);

        if (newStatus === '+') {
          setAltitude('');
          setHSI('');
          setADI('');
          setError('');
          setConfirmation('');
        }
    };
     

    const submitDataToServer = async () => {


      if (
        Altitude.trim() === '' || isNaN(Altitude.trim()) ||
        HSI.trim() === '' || isNaN(HSI.trim()) ||
        ADI.trim() === '' || isNaN(ADI.trim())
      ) {
        setError('יש למלא ערכים מספריים בכל השדות');
        return;
      }

      try {
          const response = await axios.post('http://localhost:3001/api/data', {
          Altitude: Number(Altitude),
          HSI: Number(HSI),
          ADI: Number(ADI),
          });
        
          console.log('הנתונים נשלחו!', response.data);
          setConfirmation('הנתונים התקבלו');

        } catch (error) {
          console.error('שגיאה בשליחה:', error.response?.data || error.message);
          setError(error.response?.data?.error || 'שגיאה כללית בשליחה');
        }
    };
//פונקציית שליחה לשרת והדפסת אישור/שגיאה באתר 

    useEffect(() => {
      if (status === 'TEXT') {
        axios.get('http://localhost:3001/api/last')
          .then((response) => {
            console.log('הקלט האחרון שנשלח לשרת:', response.data);
            setLastData(response.data);
          })
          .catch((err) => {
            console.error('שגיאה בשליפה מהשרת', err);
          });
      }
    }, [status]);
//ברגע שהסטטוס שווה לערך מסויים : מבקשים שליפה מהשרת דרך המבנה נתונים 


return(
  
    <div className="formInput">

      <div className="buttonsStatus">
          <button className="btnPlus" onClick={() => changeStatusSubmit('+')}>+</button>
          <button className="btnText" onClick={() => changeStatusSubmit('TEXT')}>Text</button>
          <button className="btnVisual" onClick={() => changeStatusSubmit('VISUAL')}>Visual</button>
      </div>
      {status ==='+'&&(
        <>
            <div className="input">
              <label htmlFor="altitude">Altitude</label>
              <input value={Altitude} onChange={handleChangeAltitude} />
            </div>

            <div className="input">
            <label htmlFor="HSI">HSI</label>
              <input value={HSI} onChange={handleChangeHSI} />
            </div>

            <div className="input"> 
            <label htmlFor="ADI">ADI </label>
              <input value={ADI} onChange={handleChangeADI} />
            </div>


            {error && (
              <p style={{ color: 'red', fontWeight: 'bold' }}>
                {error}
              </p>
            )}
            {confirmation &&(
              <p style={{ color: 'green', fontWeight: 'bold', alignSelf: 'flex-end' , marginTop: '20px' }}>
                {confirmation}
                </p>
            )}

            <button  className ="btn" onClick={submitDataToServer}>שלח לשרת</button>
          
        </>
      )}

      {status === 'TEXT' && lastData && (
        <div className="circlesContainer">
            <div className="circle">
              <p className="label">Altitude</p>
              <p className="value">{lastData.Altitude}</p>
            </div>

            <div className="circle">
              <p className="label">HSI</p>
              <p className="value">{lastData.HSI}</p>
            </div>

            <div className="circle">
              <p className="label">ADI</p>
              <p className="value">{lastData.ADI}</p>
            </div>
        </div>
      )}

{status === 'VISUAL' && lastData && (
  <div className="visual-display-container">
    <div className="visual-block">
      <AltitudeGauge value={lastData.Altitude} />
      <p>Altitude: {lastData.Altitude} ft</p>
    </div>

    <div className="visual-block">
      <HSIDisplay heading={lastData.HSI} />
      <p>Heading: {lastData.HSI}°</p>
    </div>

    <div className="visual-block">
      <ADIDisplay adi={lastData.ADI} />
      <p>Pitch: {lastData.ADI}°</p>
    </div>
  </div>
)}


    </div>
  );
};
export default App;
