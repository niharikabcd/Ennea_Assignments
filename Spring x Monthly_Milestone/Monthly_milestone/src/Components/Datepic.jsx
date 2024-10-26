import React, { useCallback, useMemo,memo } from "react";
import { useState } from "react";
import { DatePicker,Modal} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { Division } from "../Confirmation";

const { RangePicker }= DatePicker;
const Datepic =() =>{
    console.log('Datepic comp is rendering...')
    const expirydate=useMemo(()=>(moment().add(7, 'days')),[])//story the day 7 days ago in earlydate variable
    const today=useMemo(()=>moment().format('YYYY-MM-DD'),[])//storing today's date in today variable
    const [newDate,setnewDate]=useState([moment(),expirydate])
    const disabledDate = useCallback((current) => {
      console.log('hi')
        if(current>expirydate){
            return true;
        }
      },[expirydate]) //function for disabling dates earlier than 7 days ago and after today
    return (   
    <Division> 
    
    <RangePicker
    onChange={(values)=>{
        setnewDate(values)
        console.log('OK');
      fetch('http://localhost:8080/add_dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manDate: values[0].format("YYYY/MM/DD"),
          expDate : values[1].format("YYYY/MM/DD")
        })
      })
      .then(res => res.json())
      .then(()=>{
        Modal.success({
          title:'Success',
          content : 'Date Added Successfully'
        })
      });
    }}
    
    disabledDate={disabledDate}
    defaultValue={[dayjs(today),dayjs(expirydate)]}
    disabled={[true,false]}
    needConfirm
    />

    <h3>The selected date range </h3>
    {newDate && newDate[0] && newDate[1] && (
        <h4>
          From: {newDate[0].format('DD-MM-YYYY')} <br/> To: {newDate[1].format('DD-MM-YYYY')}
        </h4>
      )}
    </Division>
);
}
export default memo(Datepic);