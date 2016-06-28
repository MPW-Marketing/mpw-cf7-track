function readSourceObject () {
  jQuery(".utmsource").val(sbjs.get.current.src);
  jQuery(".utmcamp").val(sbjs.get.current.cmp);
  jQuery(".utmmediun").val(sbjs.get.current.mdm);
  jQuery(".utmterm").val(sbjs.get.current.trm);
    jQuery(".firstutmsource").val(sbjs.get.first.src);
  jQuery(".firstutmcamp").val(sbjs.get.first.cmp);
  jQuery(".firstutmmediun").val(sbjs.get.first.mdm);
  jQuery(".firstutmterm").val(sbjs.get.first.trm);
}

jQuery( document ).ready( function () {
sbjs.init();
  });
