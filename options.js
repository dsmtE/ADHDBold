// Saves options to chrome.storage
const saveOptions = () => {
    const firstLetter = document.getElementById("firstLetter").checked;
    const selectors = document.getElementById("selector").selectedOptions;
    const fontWeight = document.getElementById("fontWeight").value;

    chrome.storage.sync.set(
        {
            firstLetter: firstLetter,
            selectors: Array.from(selectors).map(({ value }) => value),
            fontWeight: fontWeight
        },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById("status");
            status.textContent = "Options saved.";
            setTimeout(() => {
                status.textContent = "";
            }, 750);
        }
    );
};

// Restores using the preferences stored in chrome.storage
const restoreOptions = () => {
    

    chrome.storage.sync.get(
        { firstLetter: false, selectors: "span,p", fontWeight: 600},
        (items) => {
            document.getElementById("firstLetter").checked = items.firstLetter;
            document.getElementById("fontWeight").value = items.fontWeight;

            const selectorsOptions = Array.from(document.getElementById("selector").options);
            for (var i = 0; i < selectorsOptions.length; i++) {
                selectorsOptions[i].selected = items.selectors.includes(selectorsOptions[i].value);
            }
        }
    );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
