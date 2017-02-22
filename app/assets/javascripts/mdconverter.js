const mdConverterOptions = {
    ghCodeBlocks: true,
    tables: true,
    tasklists: true,
};
const MdConverter = new Showdown.converter(mdConverterOptions);

function rawMarkup(text) {
    if (!text) { return text; }
    var sanitizedText = htmlEncode(text);
    return MdConverter.makeHtml(sanitizedText);
}

function htmlEncode(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

$(function () {
    var doc = $("#markdown_document").text();
    $("#markdown_document").html(rawMarkup(doc));
});
