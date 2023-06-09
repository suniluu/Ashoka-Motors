public with sharing class CustomerquickcompController {

@AuraEnabled

public static void InsertCustomerRec(string firstname,String lastname,string email, string phone,string status)

{

account accRec=new account();

accRec.lastname=lastname;
accRec.firstname=firstname;

accRec.Email__c=email;
accRec.phone=phone;





insert accRec;

}


}