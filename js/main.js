(function () {

    // add event listeners to tabs
    var tabs = document.getElementsByName('tabs');

    tabs.forEach(function (tab) {
        tab.onchange = function () {
            loadContents(tab);
        };
    });

    /**
     * Loads content into tab content container.
     * @param tab DOM element
     */
    function loadContents(tab) {
        var tabId = tab.getAttribute('id').split('-')[1];
        var tabContent = tab.nextElementSibling.nextElementSibling;

        // check if tab content is empty
        if (tabContent.getAttribute('class') === 'rb-accordion__content' && tabContent.innerHTML.trim().length === 0) {

            // request tab content
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/res/tab-content-' + tabId + '.json');
            xhr.onload = function () {
                if (xhr.status === 200) {

                    var headline = document.createElement("h2");
                    var headlineContent = document.createTextNode(JSON.parse(xhr.responseText).title);
                    headline.appendChild(headlineContent);

                    var text = document.createElement("p");
                    var textContent = document.createTextNode(JSON.parse(xhr.responseText).text);
                    text.appendChild(textContent);

                    tabContent.appendChild(headline);
                    tabContent.appendChild(text);
                }
                else {
                    console.log('Request failed.  Returned status of ' + xhr.status);
                }
            };
            xhr.send();
        }
    }
})();
