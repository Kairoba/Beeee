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
};

function uniqArray(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}

var twnick = []
var twid = []
var twliveNick = []
var twliveid = []
var twlivereply = []

var blank = " ";
var botOFF = false;

function response(room, msg, sender, isGroupChat, replier, ImageDB) {

msg = msg.trim();
var id = msg.split(' ');

var senderInfo = sender.split("/")
var sender0 = senderInfo[0];
var senderNick = id[1] == senderInfo[0].trim() ? senderInfo[0].trim() : null;
var senderId = id[2];

var twnicktxt = File.read("/storage/emulated/0/BeeBot/twnick.txt");
var twidtxt = File.read("/storage/emulated/0/BeeBot/twid.txt");
var twnicksplit = twnicktxt.split(" ");
var twidsplit = twidtxt.split(" ");

var twliveNicktxt = File.read("/storage/emulated/0/BeeBot/twliveNick.txt");
var twliveidtxt = File.read("/storage/emulated/0/BeeBot/twliveid.txt");
var twliveNicksplit = twliveNicktxt.split(",");
var twliveidsplit = twliveidtxt.split(",");

if(sender0 == "소가"|sender0 == "닭강정"|sender0 == "마또리"){
if (msg == "/켜기") {
    botOFF = false;
} else if (msg == "/끄기") {
    botOFF = true;
}
}
if (botOFF) return;

if(sender0 == "마또리"){
if(id[0] == "/읽기"){
    while(twnick.length > 0) {
    twnick.pop();
    twid.pop();
    }
    for(var i=0; i<twnicksplit.length;i++){
    twnick.push(twnicksplit[i]);
    twid.push(twidsplit[i]);
    }
    replier.reply("대장님! 정상적으로 읽어왔습니다!")
}
if(id[0] == "/닉네임"){
 replier.reply("[Bee Bot] 닉네임 등록 DB","\n" + twnick.join(", "));
 Utils.compress();
}
if(id[0] == "/아이디"){
 replier.reply("[Bee Bot] 아이디 등록 DB","n" + twid.join(", "));
Utils.compress();
}}
if(id[0] == "/생방송" && room == "스트리머 자유 채팅방"|room == "앙 테스트"){
    replier.reply("[Bee Bot] 생방송 목록", File.read("/storage/emulated/0/BeeBot/twlive.txt"));
    Utils.compress();
    }else if(id[0] == "/생방송" && room == "트위치 스트리머 서로 도와요!"){
    replier.reply("자유 방에서만 가능하다구!")
}

if(room == "트위치 스트리머 서로 도와요!"|room == "스트리머 자유 채팅방"){
if(id[0] == "/등록"&& id.length >= 1){
if (senderNick != null && senderId != null) {
     twnick.push(senderNick); twid.push(senderId);
     replier.reply(senderNick+"님 꿀단지에 등록 완료!")
}else if(senderNick != null && isEmpty(senderId) ){
replier.reply("신속하게! 아이디를 적으라구!\n양식: /등록+톡방 닉+트위치 ID\n등록 후, /방송+할 말");
}else if(isEmpty(senderNick) && isEmpty(senderId)){
replier.reply("톡방 닉네임을 적어주세요!\n양식: /등록+톡방 닉+트위치 ID\n등록 후, /방송+할 말");
}}
if(id[0] == "/방종"){
  if(twliveNicksplit.indexOf(senderInfo[0].trim()) != -1){
    twliveidsplit.splice(twliveNicksplit.indexOf(senderInfo[0].trim()),1);
    twliveNicksplit.splice(twliveNicksplit.indexOf(senderInfo[0].trim()),1);
    replier.reply("방종 처리되었습니다!\n오늘도 수고하셨어요!");
    while(twlivereply.length > 0) {
    twlivereply.pop();
    }for(var i=0; i<twliveNick.length;i++){
    twlivereply.push("\n" +  twliveNick[i] + " 님\n링크: " + "twitch.tv/" + twliveid[i] + blank)
    }File.save("/storage/emulated/0/BeeBot/twlive.txt", twlivereply.join(), false);

}else{
    replier.reply("방종 처리가 되지 않았어요!\n'마또리'에게 문의해주세요. :p");
}}
}

if(id[0] == "/방송" && room == "트위치 스트리머 서로 도와요!"){
if(twnick.indexOf(senderInfo[0].trim()) != -1){
    File.save("/storage/emulated/0/BeeBot/twliveNick.txt", senderInfo[0].trim() + ",", true);
    File.save("/storage/emulated/0/BeeBot/twliveid.txt", twid[twnick.indexOf(senderInfo[0].trim())] + ",", true);
    KakaoTalk.reply("스트리머 자유 채팅방", "twitch.tv/" + twid[twnick.indexOf(senderInfo[0].trim())] + blank + id.slice(1).join(" "));
    replier.reply("twitch.tv/" + twid[twnick.indexOf(senderInfo[0].trim())] + blank + id.slice(1).join(" "));
    while(twlivereply.length > 0) {
    twlivereply.pop();
    }for(var i=0; i<twliveNick.length;i++){
    twlivereply.push("\n" +  twliveNick[i] + " 님\n링크: " + "twitch.tv/" + twliveid[i] + blank)
    }File.save("/storage/emulated/0/BeeBot/twlive.txt", twlivereply.join(), false);
}else{
replier.reply("등록이 필요합니다.\n정찰대의 규율을 깔보지 마시길!\n양식: /등록+톡방 닉+트위치 ID\n등록 후, /방송+할 말");
}
}
if(id[0] == "/방송" && room == "스트리머 자유 채팅방"){
if(twnick.indexOf(senderInfo[0].trim()) != -1){
    File.save("/storage/emulated/0/BeeBot/twliveNick.txt", senderInfo[0].trim() + ",", true);
    File.save("/storage/emulated/0/BeeBot/twliveid.txt", twid[twnick.indexOf(senderInfo[0].trim())] + ",", true);
    KakaoTalk.reply("트위치 스트리머 서로 도와요!", "twitch.tv/" + twid[twnick.indexOf(senderInfo[0].trim())] + blank + id.slice(1).join(" "));
    replier.reply("twitch.tv/" + twid[twnick.indexOf(senderInfo[0].trim())] + blank + id.slice(1).join(" "));
    while(twlivereply.length > 0) {
    twlivereply.pop();
    }for(var i=0; i<twliveNick.length;i++){
    twlivereply.push("\n" +  twliveNick[i] + " 님\n링크: " + "twitch.tv/" + twliveid[i] + blank)
    }File.save("/storage/emulated/0/BeeBot/twlive.txt", twlivereply.join(), false);
}else{
replier.reply("등록이 필요합니다.\n정찰대의 규율을 깔보지 마시길!\n양식: /등록+톡방 닉+트위치 ID\n등록 후, /방송+할 말");
}
}
if(room == "앙 테스트"){
if(id[0] == "/방송"){
if(twnick.indexOf(id[1]) != -1){
      File.save("/storage/emulated/0/BeeBot/twliveNick.txt", id[1] + ",", true);
      File.save("/storage/emulated/0/BeeBot/twliveid.txt", twid[twnick.indexOf(id[1])] + ",", true);twliveNick.push(id[1])
      replier.reply("대장님! "+id[1]+" 님 방송 완료!")
      while(twlivereply.length > 0) {
    twlivereply.pop();
    }for(var i=0; i<twliveNick.length;i++){
    twlivereply.push("\n" +  twliveNick[i] + " 님\n링크: " + "twitch.tv/" + twliveid[i] + blank)
    }File.save("/storage/emulated/0/BeeBot/twlive.txt", twlivereply.join(), false);
}}

if(id[0] == "/방종"){
if(twliveNick.indexOf(id[1]) != -1){
      twliveid.splice(twliveNick.indexOf(id[1],1));
      twliveNick.splice(twliveNick.indexOf(id[1],1));
      replier.reply("대장님! "+id[1]+" 님 방종 완료!")
      while(twlivereply.length > 0) {
    twlivereply.pop();
    }for(var i=0; i<twliveNick.length;i++){
    twlivereply.push("\n" +  twliveNick[i] + " 님\n링크: " + "twitch.tv/" + twliveid[i] + blank)
    }File.save("/storage/emulated/0/BeeBot/twlive.txt", twlivereply.join(), false);
 
}}
}
}
