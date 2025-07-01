Just a very simple API to convert PDFs to text
Just send a post with the url as the request body Ex.: {body: JSON.stringify({url:"https://your_pdf_url.pdf"})}
And it will respond with the {body:{text:"The text in your pdf, without line breaks"}}
