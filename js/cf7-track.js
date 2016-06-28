function readSourceObject () {
  jQuery(".utmsource").val(sbjs.get.current.src);
  jQuery(".utmcamp").val(sbjs.get.current.cmp);
  jQuery(".utmmediun").val(sbjs.get.current.mdm);
  jQuery(".utmterm").val(sbjs.get.current.trm);
}

jQuery( document ).ready( function () {
sbjs.init();
readSourceObject();
  });
