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

var twnicktxt = File.read("/storage/emulated/0/BeeBot/twnick.txt");
var twidtxt = File.read("/storage/emulated/0/BeeBot/twid.txt");
var testtwnicksplit = twnicktxt.split(" ");
var testtwidsplit = twidtxt.split(" ");

var testtwnick = []
var testtwid = []
var testtwliveNick = []
var testtwliveid = []
var testtwlivereply = []

var testmsgcount = []
var testcount1value = []
var testcount2value = []

var blank = " ";
var botOFF = false;
var countSet = false;

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  msg = msg.trim();
  var id = msg.split(' ');

  if (msg == "/켜기" && sender == "소가/트위치"|sender == "닭강정/트위치"|sender == "마또리/트위치 준비중") {
    botOFF = false;
} else if (msg == "/끄기" && sender == "소가/트위치"|sender == "닭강정/트위치"|sender == "마또리/트위치 준비중") {
    botOFF = true;
}
if (botOFF) return;

if(id[0] == "/테스트읽기" && sender == "마또리/트위치 준비중" && room == "앙 테스트"){
    for(var i=0; i<testtwnicksplit.length;i++){
    testtwnick.push(testtwnicksplit[i]);
    testtwid.push(testtwidsplit[i]);
    }
    replier.reply("대장님! 정상적으로 읽어왔습니다!")
}

    var senderInfo = sender.split("/")
    var senderNick = id[1] == senderInfo[0].trim() ? senderInfo[0].trim() : null;
    var senderId = id[2];

    var sendercountNick = senderInfo[0].trim();
    var testcounthold1 = testmsgcount.indexOf(sendercountNick);

if(id.length <= 2|id.length < 2^getTextLength(msg) < 15 | getTextLength(msg) < 15 && msg.indexOf("/") == -1 && msg.indexOf("!공지") == -1 && msg.indexOf("(이모티콘)") ==-1 && msg.indexOf("사진") ==-1 &&isEmpty(testcount1value[testmsgcount.indexOf(sendercountNick)]) && room == "앙 테스트2"){
    testmsgcount.push(sendercountNick);
    uniqueArray(testmsgcount);
    testcount1value.insert(testmsgcount.indexOf(sendercountNick),0);
    }
if(id.length <= 2|id.length < 2^getTextLength(msg) < 15 | getTextLength(msg) < 15 && msg.indexOf("/") == -1 && msg.indexOf("!공지") == -1 && msg.indexOf("(이모티콘)") ==-1 && msg.indexOf("사진") ==-1 &&testcount1value[testmsgcount.indexOf(sendercountNick)] < 3 && room == "앙 테스트2" ){
      uniqueArray(testmsgcount);
      testcount1value[testmsgcount.indexOf(sendercountNick)] += 1;
    if(1 < testcount1value[testmsgcount.indexOf(sendercountNick)] < 3){
    replier.reply("15초 딜레이시작")
    sleep(15000);
    testcount1value.splice([testmsgcount.indexOf(sendercountNick)],1)
    testmsgcount.splice(testmsgcount.indexOf(sendercountNick),1)
replier.reply("15초 딜레이끝")
  }
      }
if(testcount1value[testmsgcount.indexOf(sendercountNick)] == 3&& room == "앙 테스트2"){
       testcount1value.splice([testmsgcount.indexOf(sendercountNick)],1);
       testmsgcount.splice(testmsgcount.indexOf(sendercountNick),1);
       replier.reply("[Bee Bot] 단타감지\n" + sendercountNick + "님 채팅 매너를 지켜주세요!")
      }

if(msg == "/인덱스" && room == "앙 테스트2"){
replier.reply("닉 인덱스: "+testmsgcount.indexOf(sendercountNick));
replier.reply("카운트 인덱스: "+testcount1value.indexOf(testcount1value[testcounthold1]));
}
if(msg == "/닉" && room == "앙 테스트2"){
replier.reply(testmsgcount.join(", "));
}
if(msg == "/카운트" && room == "앙 테스트2"){
replier.reply(testcount1value.join(", "));
}

if(id[0] == "/테스트등록"&& id.length >= 1){
    if (senderNick != null && senderId != null) {
         testtwnick.push(senderNick);
         testtwid.push(senderId);
         replier.reply(senderNick+"님 꿀단지에 등록 완료!");
}else if(senderNick != null && isEmpty(senderId) ){
    replier.reply("신속하게! 아이디를 적으라구!");
}else if(isEmpty(senderNick) && isEmpty(senderId)){
    replier.reply("톡방 닉네임을 적어주세요!");
}
}

if(id[0] == "/테스트방송" && room == "앙 테스트"){
  if(testtwnick.indexOf(senderInfo[0].trim()) != -1){
      testtwliveNick.push(senderInfo[0].trim())
      testtwliveid.push(testtwid[testtwnick.indexOf(senderInfo[0].trim())])
    replier.reply("twitch.tv/" + testtwid[testtwnick.indexOf(senderInfo[0].trim())] + blank + id.slice(1).join(" "));
}else{
    replier.reply("등록이 필요합니다.\n정찰대의 규율을 깔보지 마시길!\n방법: /등록 + 톡방 닉네임 + 트위치 ID");
}
}
if(id[0] == "/테스트방종" && room == "앙 테스트"){
  if(testtwliveNick.indexOf(senderInfo[0].trim()) != -1){
    testtwliveid.splice(testtwliveNick.indexOf(senderInfo[0].trim()),1);
    testtwliveNick.splice(testtwliveNick.indexOf(senderInfo[0].trim()),1);
    replier.reply("방종 처리되었습니다!\n오늘도 수고하셨어요!");
}else{
    replier.reply("방종 처리가 되지 않았어요!\n'마또리'에게 문의해주세요. :p");
}
}
if(id[0] == "/테스트생방송" && room == "앙 테스트"){
    while(testtwlivereply.length > 0) {
    testtwlivereply.pop();
    }
    for(var i=0; i<testtwliveNick.length;i++){
    testtwlivereply.push("\n" + testtwliveNick[i] + " 님\n링크: " + "twitch.tv/" + testtwliveid[i])
    }
    replier.reply("[Bee Bot] 생방송 목록", testtwlivereply.join());
    Utils.compress();
}

if(id[0] == "/테스트닉네임" && sender == "마또리/트위치 준비중"){
 replier.reply("[Bee Bot] 등록 닉네임 목록", testtwnick.join(", "));
 Utils.compress();
}

if(id[0] == "/테스트아이디" && sender == "마또리/트위치 준비중"){
 replier.reply("[Bee Bot] 등록 아이디 목록", testtwid.join(", "));
Utils.compress();
}
}
