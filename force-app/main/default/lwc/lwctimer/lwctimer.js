/**
 * @description       : 
 * @author            : Vrushabh Uprikar
 * @group             : 
 * @last modified on  : 03-11-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   03-02-2021   Vrushabh Uprikar   Initial Version
**/
import { api, LightningElement ,wire} from 'lwc';
import getOppData from '@salesforce/apex/lwcTimer.getOppData';

export default class Lwctimer extends LightningElement 
{

@api recordId;
error;
jsonData;
showtimedata;
showtime;
@wire(getOppData, { recId: '$recordId' })
    wiredRecordsMethod({ error, data })   
    {
        if(data) 
        {
            console.log('data: ', data);
            this.jsonData = data;
            //console.log('this.jsonData: ', this.jsonData);
            this.error = undefined;
            console.log('this.error: ', this.error);

            // Slpiting data to get time

            var obj = JSON.parse(data);
            var timelong= obj.Expiry_Date__c; //2021-03-11T22:00:00.000+0000         
            console.log('timelong => '+timelong);
            var date = timelong.slice(0,-18);
            console.log('date:', date);
            var time = timelong.slice(11,-5);
            console.log('time:', time);
            var endtime = date.toString()+ ' '+ time.toString();
            var total = Date.parse(endtime) - Date.parse(new Date()); // getting total milisec
            window.console.log('total ' +total );
            if(total > 0)
            {
                this.showtime = false;
                window.clearInterval(this.timeInstance);
                    
            }
            this.timeInstance = setInterval(function()
            {   
                        var seconds = Math.floor( (total/1000) % 60 );
                        window.console.log('seconds ' +seconds );
                        
                        var minutes = Math.floor( (total/1000/60) % 60 );
                        window.console.log('minutes ' +minutes );
                        
                        var hours = Math.floor( (total/(1000*60*60)) % 24 );
                        window.console.log('hours ' +hours );
                        
                        var days = Math.floor( total/(1000*60*60*24) );
                        window.console.log('days ' +days );
                        // output the result
                        var xy = days.toLocaleString()+' Days : '+ hours.toLocaleString()+ ' Hours : '+  minutes.toLocaleString() + ' Minutes : '+ seconds.toLocaleString() +' Seconds';
                        window.console.log('xy '+xy);
                        this.showtimedata = xy;
                        window.console.log('this.showtimedata '+this.showtimedata);
                        total = total-1000;
                        
            }, 1000);


        } else if(error) 
        {
            console.log('error ', error);
            this.error = error;
            console.log('this.error: ', this.error);
            this.jsonData = undefined;
            console.log('this.jsonData : ', this.jsonData);
        }
        
    }
      
   /**
    * 
        window.console.log('Time :'+this.vartime); //04:00:00.000
        window.console.log('Date :'+this.vardate); //2021-03-30
        var ddd = this.vardate;
        var t = this.vartime;       
        var endtime = ddd.toString()+' ' + t.toString(); // converting time to string
        window.console.log('datetime ' +endtime ); 
        
        window.console.log('total ' +total );
        

        
      
    }
    
    */


    
 
      


}