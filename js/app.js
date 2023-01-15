
const pageNumber = 10;


let i = 0;
const messagesElement = document.querySelector('#messages');
const textareaElement = document.querySelector('#message-input');

function urlify(textToChange) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return textToChange.replace(urlRegex, function(url) {
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
  })
}

function addMessageToPage(message) {
    i++;
    let text = message.content;
    text = text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
text=urlify(text);
    const element = document.createElement('div');
element.classList.add("sent-message");
    element.innerHTML = text;
    messagesElement.append(element);
/*setTimeout(() => {
element.scrollIntoView({behavior: 'smooth' });
}, 300)*/
}
async function init(){
const { data: messages, error } = await client
  .from('messages')
  .select('*')
.eq('page',pageNumber)
messages.forEach(addMessageToPage);
textareaElement.value ='';
}
init();
client
  .channel('public:messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `page=eq.${pageNumber}`, }, message => {
addMessageToPage(message.new);
  })
  .subscribe();
async function send(){
if(event.key == 'Enter'){
let messageToSend = textareaElement.value.trim();
if(messageToSend != ''){
const { data, error } = await client
  .from('messages')
  .insert([
    { page: pageNumber, content: messageToSend },
  ])
textareaElement.value ='';
}
}
}