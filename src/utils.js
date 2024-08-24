export function findDifferences(str1, str2) {
    // let typeOfChange = "add"
    // if (str1.length > str2.length) {
    //     const temp = str2
    //     str2 = str1
    //     str1 = temp
    //     typeOfChange = "remove"
    // }

    let start = 0;
    let end1 = str1.length;
    let end2 = str2.length;
    
    while (start < end1 && start < end2 && str1[start] === str2[start]) {
        start++;
    }

    while (end1 > start && end2 > start && str1[end1 - 1] === str2[end2 - 1]) {
        end1--;
        end2--;
    }

    const prefix = str2.slice(0, start);
    const changedPartAdd = str2.slice(start, end2);
    const changedPartDelete = str1.slice(start, end1);
    const suffix = str2.slice(end2);

    const date = new Date()
    const formatDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()  

    let result = `${prefix}`
    if (changedPartAdd) {
        result += `<span class="add" data-title="Изменение было сделано в: ${formatDate}">${changedPartAdd}</span>`
    }
    if (changedPartDelete) {
        result += `<span class="remove" data-title="Изменение было сделано в: ${formatDate}">${changedPartDelete}</span>`
    }
    result += `${suffix}`
    return result
}

export function downloadFile (iframe, changes, comments) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const body = iframeDocument.querySelector('body')
    if (changes) {
        body.setAttribute("changes", changes)
    }
    if (comments) {
        body.setAttribute("comments", JSON.stringify(comments))
    }
    const content = iframeDocument.documentElement.outerHTML;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.html';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
