/**
 * @description       : 
 * @author            : Vrushabh Uprikar
 * @group             : 
 * @last modified on  : 03-10-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   03-02-2021   Vrushabh Uprikar   Initial Version
**/
import { api, LightningElement } from 'lwc';

export default class Lwctimer extends LightningElement 
{
    
@api recordId;
      
   /**
    *  handleSubmit(event)
    {   
        window.console.log('calling setinterval');
        window.console.log('Time :'+this.vartime); //04:00:00.000
        window.console.log('Date :'+this.vardate); //2021-03-30
        var ddd = this.vardate;
        var t = this.vartime;       
        var endtime = ddd.toString()+' ' + t.toString(); // converting time to string
        window.console.log('datetime ' +endtime ); 
        var total = Date.parse(endtime) - Date.parse(new Date()); // getting total milisec
        window.console.log('total ' +total );
        if(total < 0)
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

        
      
    }
    
    */


    
 
      


}