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

var preMSG = [];
var botOFF = false;

var blank = " ";

var patchnote = "\n[Bee Bot] 패치노트 v1.2\n\n★새로운 명령어\n/비봇 - Bee Bot의 명령어 출력\n\n/방종 - 방종 시 입력\n  자신의 방송을 방종 처리합니다.\n  /방송은 생방송 목록에 추가\n  /방종은 목록에서 삭제\n\n/생방송 - 생방송 목록 출력\n  생방송 중인 분의 닉네임과\n  채널 링크를 보여줍니다.\n\n  실시간 반영X 수동 반영O\n  스트리머가 스스로 /방송, /방종을 해야 합니다.\n  (자유 방에서만 가능)\n\n★명령어 패치\n/등록, /방송\n1) 닉네임 인식을 제대로 못 하던 버그 픽스\n\n/트위치, /채팅, /홍보, /명령어\n- 삭제\n\n-----------------\n[Bee Bot] 패치노트 v1.1\n\n★새로운 명령어\n/등록+톡방 닉네임+트위치 ID\n  자신의 닉네임, 아이디를 등록합니다.\n  현재 닉네임과 동일하면 됩니다.\n  (실제 닉네임 X/트위치만 가능)\n\n/방송 - 새로운 홍보 명령어!\n  이제 아이디가 필요하지 않습니다.\n  오직 /방송 + 할 말 이면 됩니다.\n  (등록된 분 한정/트위치만 가능)\n\n★명령어 패치\n/방송\n1) 도와요/자유 방 중 한 곳에서만 전송해도 동시 전송\n\n-----------------\n[Bee Bot] 패치노트 v1.0\n\n★새로운 명령어\n/켜기 - 봇을 켭니다.\n/끄기 - 봇을 끕니다.\n(관리자 한정)\n\n/호출 - 메시지를 보냅니다.\n(현재 /호출 마또리 가능)\n\n★명령어 패치\n/트위치\n1) '할 말'이 없어도 링크만 정상 출력\n2) '할 말'을 여러 번 띄어 써도 되도록 수정";

function response(room, msg, sender, isGroupChat, replier, ImageDB) {

var id = msg.split(' ');

var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
var checknum = /[0-9]/;

var senderInfo = sender.split("/")
var sender0 = senderInfo[0];

var rule = [['\n※관리자: 소가, 닭강정\n※닉네임 양식: 닉네임/플랫폼\n※봇 명령어: /비봇\n\n - 방송관련 내용만 채팅 OK\n 잡담은 https://bit.ly/2La41SV\n\n - 톡방 내 친목행위 X\n - 단체 모집, 홍보 X\n - 다른 곳에 채팅방 언급 X\n\n※채팅 규칙\n- 기본은 존댓말입니다.\n 반말/음슴/애교체 X\n- 올바른 표준어를 사용합시다.\n\n경고 2회 강퇴- 단타(도배), 혼잣말\n즉시 강퇴- 비하/비난, 욕설,\n    불쾌한 발언, 분쟁 등\n\n※홍보 규칙\n- 24시간 내 최대 2회\n 중복이 아닌 생방송만 OK!\n 예) /등록+톡방 닉+트위치 ID\n등록 후, /방송+할 말\n\n 가끔 영상도 OK!','\n※관리자: 소가, 닭강정\n※닉네임 양식: 닉네임/플랫폼\n※봇 명령어: /비봇\n\n - 톡방 내 친목행위 X\n - 단체 모집, 홍보 X\n - 다른 곳에 채팅방 언급 X\n\n※채팅 규칙\n- 기본은 존댓말입니다.\n 반말/음슴/애교체 X\n- 올바른 표준어를 사용합시다.\n\n경고 2회 강퇴- 단타(도배), 혼잣말\n즉시 강퇴- 비하/비난, 욕설,\n    불쾌한 발언, 분쟁 등\n\n※홍보 규칙\n- 24시간 내 최대 2회\n 중복이 아닌 생방송만 OK!\n 예) /등록+톡방 닉+트위치 ID\n등록 후, /방송+할 말\n\n 가끔 영상도 OK!'],['\n/등록+톡방 닉+트위치 ID\n- 닉네임/ID를 DB에 저장\n/방송+할 말\n- 홍보용! 채널 링크 출력\n\n/트게더+검색할 내용\n- 트게더에서 검색한 결과 링크\n\n/트게더링크+트게더 게시물 번호\n- 해당 번호의 게시물 링크\n\n/호출+마또리\n- 호출 메시지를 보냅니다.','\n/등록+톡방 닉+트위치 ID\n- 닉네임/ID를 DB에 저장\n/방송+할 말\n- 홍보용! 채널 링크 출력\n\n/게시판+트위치 ID: 트게더 링크\n/트게더+검색할 내용\n- 트게더에서 검색한 결과 링크\n\n/트게더링크+트게더 게시물 번호\n- 해당 번호의 게시물 링크\n\n/호출+마또리\n- 호출 메시지를 보냅니다.']]


if (preMSG[room] == msg) return;
    preMSG[room] == msg;
    msg = msg.trim();
    if (sender0 == "소가"|sender0 == "닭강정"|sender0 == "마또리"){
      if (msg == "/켜기") {
        botOFF = false;
        replier.reply("티모 대위, 출동준비 완료!");
      } else if (msg == "/끄기") {
        botOFF = true;
        replier.reply("티모 대위, 퇴각준비 완료!");
      }
    }
if (botOFF) return;
if (msg == "/티모" && sender == "마또리/트위치 준비중"){
    replier.reply("옛 썰!");
}

// 명령어
if(id[0] == "/게시판" && check.test(id[1])&& room == "스트리머 자유 채팅방"){
    replier.reply("흫흫핳↘핳➡!\n아이디만 가능하다구!");
}else if(id[0] == "/게시판"&& room == "스트리머 자유 채팅방"){
    replier.reply("tgd.kr/" + id[1]);
}
if(id[0] == "/트게더" && room == "트위치 스트리머 서로 도와요!"|room == "스트리머 자유 채팅방"){
    replier.reply("tgd.kr/search?q=" + id[1]);
}
if(id[0] == "/트게더링크" && checknum.test(id[1])&& room ==  "트위치 스트리머 서로 도와요!"|room == "스트리머 자유 채팅방"){
    replier.reply("tgd.kr/" + id[1]);
}

// 공지모음
if(id[0] == "!공지" && room == "트위치 스트리머 서로 도와요!"){
    replier.reply("[공지] 트위치 스트리머 서로 도와요!",rule[0][0]);
    Utils.compress();
}
if(id[0] == "!공지" && room == "스트리머 자유 채팅방"){
    replier.reply("[공지] 스트리머 자유 채팅방",rule[0][1]);
    Utils.compress();
}
if(id[0] == "/비봇" && room == "트위치 스트리머 서로 도와요!"){
    replier.reply("[Bee Bot] 명령어 목록",rule[1][0]);
    Utils.compress();
}
if(id[0] == "/비봇" && room == "스트리머 자유 채팅방"){
    replier.reply("[Bee Bot] 명령어 목록",rule[1][1]);
    Utils.compress();
}
if(id[0] == "/패치노트"){
    replier.reply("[Bee Bot] 패치노트",patchnote);
    Utils.compress();
}

// 호출
if(id[0] == "/호출" && id[1] == "마또리" && room == "트위치 스트리머 서로 도와요!" | room == "스트리머 자유 채팅방" |room == "앙 테스트"){
    replier.reply("호출이 전송되었어요!");
    KakaoTalk.reply("앙 테스트", "대장님! 호출이 수신되었어요!");
}
}
