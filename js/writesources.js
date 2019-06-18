function writeSources() {
    readSourceObject();
    var httpRef = document.referrer;
    var currentPage = window.location.href;
    jQuery(".httpReferrer").val(httpRef);
    jQuery(".currentPage").val(currentPage);
}
jQuery(document).ready(function() {
    writeSources();
});