// Basic JS: accessibility helpers, year, menu toggle, simple form submission handling
document.addEventListener('DOMContentLoaded', function(){
  // year
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // menu toggle
  var btn = document.getElementById('menuToggle');
  var menu = document.getElementById('mainMenu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(expanded){ menu.hidden = true; } else { menu.hidden = false; menu.querySelector('a')?.focus(); }
    });
  }

  // form submit (progressive enhancement)
  var form = document.getElementById('cadastroForm');
  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        // let browser show validation messages
        return;
      }
      e.preventDefault();
      // Simple success feedback
      alert('Cadastro enviado com sucesso (demo). Em produção, envie para o servidor via fetch.');
      form.reset();
    });
  }
});
