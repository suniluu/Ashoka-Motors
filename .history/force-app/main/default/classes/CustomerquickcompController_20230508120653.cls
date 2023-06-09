public with sharing class CustomerquickcompController {

@AuraEnabled

public static void InsertCustomerRec(string firstname,String lastname,string email, string phone, string company1,string status)

{

account accRec=new account();

accRec.lastname=lastname;
accRec.firstname=firstname;

accRec.Email__c=email;
accRec.phone=phone;

accRec.company=company1;

accRec.status=status;

insert accRec;

}


}