const inlineButton = { text: "Check Price", callback_data: "check_price" };
const options = {
  method: "post",
  contentType: "application/json",
  payload: JSON.stringify({
    reply_markup: { inline_keyboard: [[inlineButton]] },
  }),
};

function sendMessage(textToSend, whoToSend) {
  let url = bot + `/sendMessage?chat_id=` + whoToSend + `&text=` + encodeURIComponent(textToSend);
  UrlFetchApp.fetch(url, options);
}


function updMessage(textToSend, chatId, messageId) {
  let url = bot + "/editMessageText?chat_id=" + chatId + "&message_id=" + messageId + "&text=" + encodeURIComponent(textToSend);
  UrlFetchApp.fetch(url, options);

}
