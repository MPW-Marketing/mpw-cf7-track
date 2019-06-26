function readSourceObject() {
  jQuery(document).ready(function() {
      jQuery(".utmsource").val(sbjs.get.current.src);
      jQuery(".utmcamp").val(sbjs.get.current.cmp);
      jQuery(".utmmediun").val(sbjs.get.current.mdm);
      jQuery(".utmterm").val(sbjs.get.current.trm);
      jQuery(".firstutmsource").val(sbjs.get.first.src);
      jQuery(".firstutmcamp").val(sbjs.get.first.cmp);
      jQuery(".firstutmmediun").val(sbjs.get.first.mdm);
      jQuery(".firstutmterm").val(sbjs.get.first.trm);
  });
}

function glcidGetParameterByName(name) {  
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function glicSetCookie(cname, cvalue, exdays) {  
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires+ "; path=/";
}

function gclidGetCookie(cname) {  
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function(){  
  if(glcidGetParameterByName('gclid')){
      glicSetCookie('gclid_hold', glcidGetParameterByName('gclid'), 60);
  }

  if(gclidGetCookie('gclid_hold') && document.getElementById("gclid")){
      var gclid_input = document.getElementById("gclid");
      gclid_input.value = gclidGetCookie('gclid_hold');
  }
  if(gclidGetCookie('gclid_hold') && document.getElementById("glcid")){
    var gclid_input = document.getElementById("glcid");
    gclid_input.value = gclidGetCookie('gclid_hold');
}
if(gclidGetCookie('gclid_hold')) {
  jQuery(".landingGclid").val(gclidGetCookie('gclid_hold'));
}
})

jQuery(document).ready(function() {
  sbjs.init({
      campaign_param: 'ads',
  });
});