import { useState, useEffect } from "react";
import "./Quote-box.css";

function GenerateQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then((data: { text: string; author: string }[]) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex].text);
        setAuthor(data[randomIndex].author);
      })
      .catch(error => console.log(error));
  }, [refresh]);

  const handleRefresh = () => setRefresh(!refresh);

  const tweetQuote = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " - " + author)}`;

  return(
    <div id="quote-box">
      <div id="text">
        <h2>{quote}</h2>
      </div>
      <div id="author">
        <h3>-{author}</h3>
      </div>
      <div id="buttons">
        <a href={tweetQuote} id="tweet-quote">Tweet</a>
        <button id="new-quote" onClick={handleRefresh}>New Quote</button>
      </div>  
    </div>
  );
}

export default GenerateQuote;