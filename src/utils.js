function getClass(tag) {
    const classMatch = tag.match(/class=["']([^"']*)["']/);

    if (classMatch) {
        return classMatch[1];
    }
    return null
}

export function findDifferences(str1, str2) {

    str2 = str2.replace("<br>", "")

    let start = 0;
    let end1 = str1.length;
    let end2 = str2.length;
    
    let openSpan = -1

    while (start < end1 && start < end2 && str1[start] === str2[start]) {
        if (str1[start] == "<") {
            openSpan = start
        }
        if (str1[start] == ">") {
            openSpan = -1
        }
        start++;
    }

    if (openSpan != -1) {
        start = openSpan
    }

    while (end1 > start && end2 > start && str1[end1 - 1] === str2[end2 - 1]) {
        end1--;
        end2--;
    }

    const prefix = str2.slice(0, start);
    const changedPartAdd = str2.slice(start, end2);
    const changedPartDelete = str1.slice(start, end1);
    const suffix = str2.slice(end2);

    console.log(changedPartDelete)

    const date = new Date()
    const formatDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()  

    let startMatches = changedPartDelete.match(/^(.*?)<\/span>/s) // Нахождение строки до span
    const matches = changedPartDelete.match(/<span\b[^>]*>[\s\S]*?<\/span>/g); // Нахождение всех внутри span
    let endMatches = changedPartDelete.match(/<span[^>]*>([^<]*)/g); // Нахождение после последнего span
    const PrefixEndMatches = prefix.match(/<span\b[^>]*>/g); // Нахождение префиксов
    console.log(startMatches, matches, endMatches)

    if (matches && matches[0] == changedPartDelete) {
        startMatches = null
        endMatches = null
    }

    let result = `${prefix}`
    if (changedPartAdd && !changedPartAdd.includes("&nbsp;")) {
        if (PrefixEndMatches) {
            const AddClass = getClass(PrefixEndMatches[PrefixEndMatches.length - 1])
            result += `</span><span class="add ${AddClass}" data-title="Изменение было сделано в: ${formatDate}">${changedPartAdd}</span>${PrefixEndMatches[PrefixEndMatches.length - 1]}`
        }
    }
    if (changedPartDelete) {
        if (startMatches) {
            if (PrefixEndMatches) {
                const AddClass = getClass(PrefixEndMatches[PrefixEndMatches.length - 1])
                result += `</span><span class="remove ${AddClass}" data-title="Изменение было сделано в: ${formatDate}">${startMatches[0]}</span>${PrefixEndMatches[PrefixEndMatches.length - 1]}`
            }
        }
        // console.log(result)
        if (matches) {
            matches.forEach((CurMatch) => {
                const newMatch = CurMatch.replace(/(<span\b[^>]*>)([\s\S]*?)(<\/span>)/g, (match, openTag, content, closeTag) => {
                    const AddClass = getClass(openTag)
                    return `</span><span class="remove ${AddClass}" data-title="Изменение было сделано в: ${formatDate}">${content}</span>${openTag}`;
                })
                result += newMatch
            })
        }
        // console.log(result)
        if (endMatches) {
            const newEndMatch = endMatches[endMatches.length - 1].replace(/(<span\b[^>]*>)([^<]*)$/, (match, openTag, content) => {
                const AddClass= getClass(openTag)
                return `</span><span class="remove ${AddClass}" data-title="Изменение было сделано в: ${formatDate}">${content}</span>${openTag}`;
            });
            result += newEndMatch
        }
        // console.log(result)
        if (!(startMatches || matches || endMatches)) {
            if (PrefixEndMatches ) {
                const AddClass = getClass(PrefixEndMatches[PrefixEndMatches.length - 1])
                result += `</span><span class="remove ${AddClass}" data-title="Изменение было сделано в: ${formatDate}">${changedPartDelete}</span>${PrefixEndMatches[PrefixEndMatches.length - 1]}`
            }
        }
        // console.log(result)
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
