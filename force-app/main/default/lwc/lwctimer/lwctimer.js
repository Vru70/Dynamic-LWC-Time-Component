/**
 * @author            : Vrushabh Uprikar
 * @group             : 
 * @last modified on  : 03-12-2021
 * @last modified by  : Vrushabh Uprikar
 * Ver   Date         Author             Modification
 * 1.0   03-02-2021   Vrushabh Uprikar   Initial Version
**/
import { api, LightningElement, track, wire } from 'lwc';
import getOppData from '@salesforce/apex/lwcTimer.getOppData';

export default class Lwctimer extends LightningElement 
{
    @api recordId;
    error;
    jsonData;
    @track exp = false;
    @track showtimedata = " ";

    @wire(getOppData, { recId: '$recordId' })
    wiredRecordsMethod({ error, data }) 
    {
        if (data) 
        {
            // getting data
            this.jsonData = data;
            this.error = undefined;
            // Slpiting data to get time
            var obj = JSON.parse(data);
            var timelong = obj.Expiry_Date__c; //2021-03-11T22:00:00.000+0000         
            var date = timelong.slice(0, -18);
            var time = timelong.slice(11, -5);
            var endtime = date.toString() + ' ' + time.toString();
            var total = Date.parse(endtime) - Date.parse(new Date()); // getting total milisec
            total = total + 19800000; // ading 5:30Hr to match IST
            let myparam = this; // refers this block of context 
            if (total < 0) 
            {
                window.clearInterval(this.timeInstance);
                this.showtimedata = 'Expired';
                this.exp = true;
            }
            else 
            {
                this.timeInstance = setInterval(function () 
                {
                    var seconds = Math.floor((total / 1000) % 60);
                    // window.console.log('seconds ' + seconds);

                    var minutes = Math.floor((total / 1000 / 60) % 60);
                    // window.console.log('minutes ' + minutes);

                    var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
                    // window.console.log('hours ' + hours);

                    var days = Math.floor(total / (1000 * 60 * 60 * 24));
                    // window.console.log('days ' + days);
                    // output the result
                    var timeString = days.toLocaleString() + ' Days : ' + hours.toLocaleString() + ' Hours : ' + minutes.toLocaleString() + ' Minutes : ' + seconds.toLocaleString() + ' Seconds';

                    myparam.showtimedata = timeString;

                    total = total - 1000;

                }, 1000);
            }

        } else if (error) 
        {
            console.log('error ', error);
            this.error = error;
            console.log('this.error: ', this.error);
            this.jsonData = undefined;
            console.log('this.jsonData : ', this.jsonData);
        }
    }
}