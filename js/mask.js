// Lightweight input masks for CPF, telefone e CEP (works with paste and input)
(function(){
  function setSelectionRange(el, start, end){
    try { el.setSelectionRange(start, end); }
    catch(e) {}
  }
  function maskCPF(v){
    v = v.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})\.(\d{3})(\d)/,'$1.$2.$3');
    v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/,'$1.$2.$3-$4');
    return v;
  }
  function maskTel(v){
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length>10){
      v = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    } else {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
    }
    return v;
  }
  function maskCEP(v){
    v = v.replace(/\D/g,'').slice(0,8);
    v = v.replace(/(\d{5})(\d{1,3})/,'$1-$2');
    return v;
  }

  function attach(id, fn){
    var el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('input', function(e){
      var start = el.selectionStart;
      var old = el.value;
      el.value = fn(el.value);
      // best-effort to keep caret near end
      var diff = el.value.length - old.length;
      setSelectionRange(el, start + (diff>0?diff:0), start + (diff>0?diff:0));
    });
    el.addEventListener('paste', function(e){
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text');
      el.value = fn(text);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    attach('cpf', maskCPF);
    attach('telefone', maskTel);
    attach('cep', maskCEP);
  });
})();
