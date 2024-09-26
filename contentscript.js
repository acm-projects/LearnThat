document.addEventListener('mouseup',() =>{
    const highlightedText = window.getSelection().toString().trim();

    if(highlightedText.length > 0)
    {
        console.log("The word Highlighted by the user is: ", highlightedText);
    }
});