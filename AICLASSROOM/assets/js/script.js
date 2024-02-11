function downloadTemplate() {
    var heading = document.getElementById('heading').value;
    var author = document.getElementById('author').value;
    var releaseDate = document.getElementById('release_date').value;
    var content = document.getElementById('content').value;
    
    // Handling file upload
    var imageInput = document.getElementById('image');
    var imageFile = imageInput.files[0];
    var imageUrl = window.URL.createObjectURL(imageFile);

    // Update links to have blue color
    var parser = new DOMParser();
    var parsedContent = parser.parseFromString(content, 'text/html');
    var links = parsedContent.querySelectorAll('a');

    links.forEach(link => {
        link.classList.add('link-text');
    });

    content = parsedContent.body.innerHTML;

    var htmlContent = `
        <html>
            <head>
                <title>${heading}</title>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body class="container">
                <h1 class="mt-3">${heading}</h1>
                <p>Author: ${author}</p>
                <p>Release Date: ${releaseDate}</p>
                <p>${content}</p>
                <img src="${imageUrl}" class="img-fluid mt-3 template-image" alt="Image">
            </body>
        </html>
    `;

    var blob = new Blob([htmlContent], { type: 'text/html' });

    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${heading}.html`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function insertBold() {
    var contentTextarea = document.getElementById('content');
    var currentContent = contentTextarea.value;
    var selectionStart = contentTextarea.selectionStart;
    var selectionEnd = contentTextarea.selectionEnd;

    var boldedText = currentContent.slice(0, selectionStart) +
                     '<strong>' + currentContent.slice(selectionStart, selectionEnd) + '</strong>' +
                     currentContent.slice(selectionEnd);

    contentTextarea.value = boldedText;
}

function insertLink() {
    var contentTextarea = document.getElementById('content');
    var currentContent = contentTextarea.value;
    var selectionStart = contentTextarea.selectionStart;
    var selectionEnd = contentTextarea.selectionEnd;

    var linkText = prompt('Enter the text for the link:', '');
    if (linkText) {
        var linkUrl = prompt('Enter the URL for the link:', 'https://');
        if (linkUrl) {
            var linkedText = currentContent.slice(0, selectionStart) +
                             `<a href="${linkUrl}" target="_blank" class="link-text">${linkText}</a>` +
                             currentContent.slice(selectionEnd);

            contentTextarea.value = linkedText;
        }
    }
}
