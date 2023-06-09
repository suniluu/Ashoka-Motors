public with sharing class CustomerquickcompController {

@AuraEnabled
public static void InsertCustomerRec(String lastname,string email, string phone)

{

account accRec=new account();

accRec.Name=lastname;


accRec.Email__c=email;
accRec.phone=phone;





insert accRec;

}


}