const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quotes');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];

//show loading
function showloadingsymbol() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}
//Hide loading
function removeloadingsymbol(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}



function newQuote() {
    showloadingsymbol();
    //pick a random quote from apiquotes
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //Check whether author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
    //check quotelength to determine styling
    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //set quote and hide loader
    quoteText.textContent=quote.text;
    removeloadingsymbol();
}
//quotes from api
async function getQuotes() {
    showloadingsymbol();
    const apiUrl="https://type.fit/api/quotes";
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        //set quote and hide loader
        newQuote()
        removeloadingsymbol()
    } catch(error){
        //catch error here.
    }
}
//Tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
//Event listeners
newquoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();

