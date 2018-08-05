// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
var isEmpty = function(value){
  if( value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length))
  {
      return true
  } else {
      return false
  }
}
function uniqueArray(arr) {
  var tempArr = []
  for (var i = 0; i < arr.length; i++) {
      if (tempArr.length == 0) {
        tempArr.push(arr[i]);
  } else {
    var duplicatesFlag = true;
    for (var j = 0; j < tempArr.length; j++) {
    if (tempArr[j] == arr[i]) {
      duplicatesFlag = false;
      break;
    }
  }
    if (duplicatesFlag) {
      tempArr.push(arr[i]);
    }
  }
  }
  return tempArr;
}
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
}
function getTextLength(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
      if (escape(str.charAt(i)).length == 6) {
          len++;
      }
      len++;
  }
  return len;
}

var testtwnicktxt = File.read("/storage/emulated/0/BeeBot/testtwnick.txt");
var testtwidtxt = File.read("/storage/emulated/0/BeeBot/testtwid.txt");
var testtwlnicktxt = File.read("/storage/emulated/0/BeeBot/testtwlnick.txt");
var testtwlidtxt = File.read("/storage/emulated/0/BeeBot/testtwlid.txt");
var testtwlreplytxt = File.read("/storage/emulated/0/BeeBot/testtwlreply.txt");

var testtwnicksplit = testtwnicktxt.split(" ");
var testtwidsplit = testtwidtxt.split(" ");

var senderNickarr = []
var senderIdarr = []

var blank = " ";
var botOFF = false;

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  msg = msg.trim();
  var id = msg.split(' ');
  var senderInfo = sender.split("/")
  var sender0 = senderInfo[0];
  var senderNick = id[1] == senderInfo[0].trim() ? senderInfo[0].trim() : null;
  var senderId = id[2];
if(sender0 == "소가"|sender0 == "닭강정"|sender0 == "마또리"){
  if (msg == "/켜기") {
    botOFF = false;
  } else if (msg == "/끄기") {
    botOFF = true;
  }
  }
  if (botOFF) return;

if(room == "앙 테스트4"){
  if(id[0] == "/닉네임4"){
    replier.reply(testtwnicksplit.join());
  }
  if(id[0] == "/아이디4"){
    replier.reply(testtwidsplit.join());
  }
  if(id[0] == "/등록4"){
      if (senderNick != null && senderId != null) {
        senderNickarr.push(senderNick);
        senderIdarr.push(senderId);
          File.save("/storage/emulated/0/BeeBot/testtwnick.txt", senderNickarr.join() + "," + blank, true);
          File.save("/storage/emulated/0/BeeBot/testtwid.txt", senderIdarr.join() + "," + blank, true);
          senderNickarr.pop();
          senderIdarr.pop();
           replier.reply(senderNick+"님 꿀단지에 등록 완료!");
  }else if(senderNick != null && isEmpty(senderId) ){
      replier.reply("신속하게! 아이디를 적으라구!");
  }else if(isEmpty(senderNick) && isEmpty(senderId)){
      replier.reply("톡방 닉네임을 적어주세요!");
  }
}

if(id[0] == "/방송4"){
  if(testtwnicktxt.split(", ").indexOf(senderInfo[0].trim()) != -1){
    senderNickarr.push(senderInfo[0].trim());
    senderIdarr.push(testtwidsplit[testtwnicksplit.indexOf(senderInfo[0].trim())]);
    File.save("/storage/emulated/0/BeeBot/testtwlnick.txt", senderNickarr.join() + "," + blank, true);
    File.save("/storage/emulated/0/BeeBot/testtwlid.txt", senderIdarr.join() + "," + blank, true);
    File.save("/storage/emulated/0/BeeBot/testtwlreply.txt", "\n" + senderNickarr.join() + " 님\n링크: " + "twitch.tv/" + senderIdarr.join() + "," + blank, true);
    senderNickarr.pop();
    senderIdarr.pop();
    replier.reply("twitch.tv/" + testtwidsplit[testtwnicksplit.indexOf(senderInfo[0].trim())] + blank + id.slice(1).join(" "));
}else{
    replier.reply("등록이 필요합니다.\n정찰대의 규율을 깔보지 마시길!\n방법: /등록 + 톡방 닉네임 + 트위치 ID");
}
}
if(id[0] == "/방종4"){
  if(testtwlnicktxt.split(", ").indexOf(senderInfo[0].trim()) != -1){
    File.save("/storage/emulated/0/BeeBot/testtwlreply.txt", testtwlreplytxt.split(", ").splice(testtwlnicktxt.split(", ").indexOf(senderInfo[0].trim()),1).join(" "), false);
    File.save("/storage/emulated/0/BeeBot/testtwlid.txt", testtwlidtxt.split(", ").splice(testtwlnicktxt.split(", ").indexOf(senderInfo[0].trim()),1).join(" "), false);
    File.save("/storage/emulated/0/BeeBot/testtwlnick.txt", testtwlnicktxt.split(", ").splice(testtwlnicktxt.split(", ").indexOf(senderInfo[0].trim()),1).join(" "), false);
    replier.reply("방종 처리되었습니다!\n오늘도 수고하셨어요!");
}else{
    replier.reply("방종 처리가 되지 않았어요!\n'마또리'에게 문의해주세요. :p");
}
}
if(id[0] == "/생방송4"){
    replier.reply("[Bee Bot] 생방송 목록", File.read("/storage/emulated/0/BeeBot/testtwlreply.txt");
    Utils.compress();
    }
}
}
