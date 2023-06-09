public with sharing class CustomerquickcompController {

@AuraEnabled

public static account InsertCustomerRec(String lastname,string email, string phone)

{

account accRec=new account();

accRec.Name=lastname;


accRec.Email__c=email;
accRec.phone=phone;





insert accRec;
return accRec.Id;

}


}