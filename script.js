function make_it_bold(params)
{
    var {firstLetter, selectors, fontWeight} = params;

    // console.log(params);
    var elements = document.querySelectorAll(selectors.length ? selectors.join(',') : "span,p");
    console.log(`ADHD make bold ${elements.length} elements`);

    elements.forEach((element) => {
        var htmlContent = element.innerHTML;
        var modifiedContent = htmlContent.replace(
            /(?:<[^>]*>|&\w+;)|\b(\w+)\b/ig,
            function (match, word) {
                if (word) {
                    var bold_count = firstLetter ? 1 : Math.round(word.length*0.4);
                    // console.log(`${word}: ${word.length}->${bold_count}`);
                    return "<span style='font-weight: " + fontWeight + ";'>" + word.substring(0, bold_count) + "</span>" + word.substring(bold_count);
                } else {
                    return match; // Preserve HTML tags
                }
            }
        );
        element.innerHTML = modifiedContent;
    });
}

chrome.storage.sync.get(function (items) {
    make_it_bold(items);
});
