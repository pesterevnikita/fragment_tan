const myId = 713088229;
let lehaId = 366684569;
function parseHTMLList() {
  let url = 'https://ton.diamonds/collection/anonymous-telegram-numbers?tab=activity';
  let table = UrlFetchApp.fetch(url).getContentText();
  let firstIndex = table.indexOf('<div class="BannerInfoCards_assestCount__VNg9P">');
  let secondIndex = table.indexOf('<div class="BannerInfoCards_assestCount__VNg9P">', firstIndex + 1);
  let endIndex = table.indexOf('</div>', secondIndex);
  let data = table.substring(secondIndex, endIndex);
  let output = data.split('>')[1];
  let outputNumber = output.split(' ')[0];
  return (outputNumber);
}

function testSend() { sendMessage("debug_cock", lehaId) };

function checkLowest() {
  const parsedText = parseHTMLList();
  let message;
  let message2;
  switch (true) {
    case (parsedText <= 90):
      message = `@keta_p, floor is ${parsedText} TON!`;
      message2 = `@aslepenkov, floor is ${parsedText} TON!`;
      break;
    case (parsedText >= 200):
      message = `@keta_p, floor is fuckin' ${parsedText} TON!!1OMAGAD Sell dis shit!`;
      message2 = `@aslepenkov, floor is fuckin' ${parsedText} TON!!1OMAGAD Sell dis shit!`;
      break;
    default:
      return;
  }
  sendMessage(message, myId);
  sendMessage(message2, lehaId);
}

function checkEvery30() {
  const parsedText = parseHTMLList();
  // sendMessage(parsedText, myId);
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let historySheet = ss.getSheetByName("history");
  let currentTime = new Date();
  historySheet.appendRow([parsedText, currentTime]);
}


function doPost(e) {
  const parsedText = parseHTMLList();
    const message = `Hey beggar, floor price is ${parsedText} TON, go buy a number`;
  let content = JSON.parse(e.postData.contents);

  if (content.callback_query) {
    let callbackData = content.callback_query.data;
    let chatId = content.callback_query.message.chat.id;
    let messageId = content.callback_query.message.message_id;
    
    if (callbackData === "check_price") {
      updMessage(message, chatId, messageId);
    }
  } else {
    let chatId = content.message.chat.id;
    sendMessage(message, chatId);
  }
}
