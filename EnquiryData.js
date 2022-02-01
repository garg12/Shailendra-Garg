print("enquiryId" +","+"scId"+","+"role"+","+"createTime" +","+"updateTime"+","+"currentState"+","+"mobileNumber"+","+"userId"+","+"dealerCode"+ ","+"source"+","+"lastActivityUpdateTime");

var enquiryCursor = db.enquiry.find({}).pretty();
var mysort = {"updateTime":-1};
/** 
Data Processing Starts from Here.
**/

while(enquiryCursor.hasNext()){

var enquiryId = "";
var enquiryIdd = "";
var mobileNumber = "";
var name = "";
var scId = "";
var role = "";
var createTime = "";
var updateTime = "";
var source = "";
var dealerId = "";
var currentState = "";
var dealerCode ="";
var result = "";

try{
var enquiry = enquiryCursor.next();
    enquiryId = enquiry._id.valueOf();
    enquiryIdd = enquiry._id;
    
    var consumerId = enquiry.consumerId;
     createTime = new Date(enquiry.createTime);
     updateTime = new Date(enquiry.updateTime);
    
    var consumerCursor = db.consumer.find(consumerId);
    if(consumerCursor.hasNext()){
        var consumer = consumerCursor.next();
        mobileNumber = consumer._e1;
        name = consumer.consumerDatas[0]._r1;
    }

    var userId = enquiry.customerId;
    
    var userCursor = db.users.find(userId);
     if(userCursor.hasNext()){
        var user = userCursor.next();
         dealerId = user.dealerId;
        scId = user.username;
        role = user.processInfo[0].roleId;
    }

    var dealerCursor = db.dealer.find(dealerId);
     if(dealerCursor.hasNext()){
        var dealer = dealerCursor.next();
        dealerCode = dealer.dealerCode;
    }
     currentState = enquiry.activityAttributes.currentState;
     source = enquiry.sourceAttributes.createSource;
     var activityCursor = db.activity.find({"enquiryId":enquiry._id.valueOf()}).sort(mysort);
     let count =0;
      if(activityCursor.hasNext()){
         var activity = activityCursor.next();
         var lastUpdatedActivityTime = new Date(activity.updateTime);
         if(lastUpdatedActivityTime < new Date("2021-09-30 23:59:00")) {
            result = enquiryIdd +","+scId+","+role+","+createTime +","+updateTime+","+currentState+","+mobileNumber+","+userId+","+dealerCode+ ","+source+ ","+lastUpdatedActivityTime;
            print(result) ;
         }
     }
} catch (err) {
}
 }

    
    
