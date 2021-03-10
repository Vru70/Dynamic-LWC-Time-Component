/**
 * @author            : Vrushabh Uprikar
 * @last modified on  : 03-10-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   03-10-2021   Vrushabh Uprikar   Initial Version
**/
public with sharing class lwcTimer 
{
    public static void getOppData(Id recId)
    {
        // validate input
        System.assert(recId != null);

        Schema.SObjectType sObjectType = recId.getSObjectType();
        String objType = String.valueOf(sObjectType);
        System.debug('objType'+objType);
        try 
        {
            String query = 'SELECT Expiry_Date__c FROM '+objType+' WHERE Id='+recId+' Limit 1';
            SObject records = Database.query( query );
            System.debug('records'+records);

        } catch(Exception e) 
        {
            System.debug(e);
        }
        
      //  return objType;
    }
}
