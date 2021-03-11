/**
 * @author            : Vrushabh Uprikar
 * @group             : 
 * @last modified on  : 03-11-2021
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
    @track showtimedata =" ";
    showtime;
    @wire(getOppData, { recId: '$recordId' })
    wiredRecordsMethod({ error, data }) 
    {
        if (data) 
        {
            console.log('data: ', data);
            this.jsonData = data;
            this.error = undefined;
            console.log('this.error: ', this.error);

            // Slpiting data to get time

            var obj = JSON.parse(data);
            var timelong = obj.Expiry_Date__c; //2021-03-11T22:00:00.000+0000         
            var date = timelong.slice(0, -18);
            console.log('date:', date);
            var time = timelong.slice(11, -5);
            console.log('time:', time);
            var endtime = date.toString() + ' ' + time.toString();
            var qw = new Date();
            console.log('qw:', qw);
            var total = Date.parse(endtime) - Date.parse(new Date()); // getting total milisec
            if (total < 0) 
            {
                this.showtime = false;
                window.clearInterval(this.timeInstance);
                this.showtimedata= 'Expired';
            }
            else {

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
                    var xy = days.toLocaleString() + ' Days : ' + hours.toLocaleString() + ' Hours : ' + minutes.toLocaleString() + ' Minutes : ' + seconds.toLocaleString() + ' Seconds';
                    
                    this.showtimedata = xy;
                    window.console.log('this.showtimedata ' + this.showtimedata);
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