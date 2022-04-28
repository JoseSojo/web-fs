/* $ `` ! || # \ */

// ANIMATIONS

gsap.from('.item-nav', {
  y: 10,
  rotate: 50,
  scale: 0,
  duration: 1,
  stagger: .2,
  ease: 'elastic'
});
let dev = gsap.timeline();
dev.from('.alert-message', {
  delay: 1,
  scale: 0,
  y: 10,
  opacity: 0
})
dev.to('.alert-message', {
  delay: 2,
  scale: 0,
  opacity: 0,
  ease: 'linear'
})

/* VALIDATION THE REGISTER */
const exp = {
  number: /^[0-9]+$/, // numeros 0-9
  letter: /^[a-zA-Z \s]+$/, // letras AZaz
  letterLimit: /^[a-zA-Z\s]{4,24}$/, // letras AZaz limit
  email: /^[a-zA-Z0-9._]+@[a-zA-Z0-9]{2,}[.][a-zA-Z]{2,4}$/, // email completo
  usernameRege: /^[a-z0-9._-]{5,16}$/, // expresion letras az ._- de 3 a 16 caracteres
  passwordRege: /^[a-zA-Z0-9._-]{8,24}$/, // password letras AZaz09._- 10 a 24 caracteres
  numberLimit: /^[0-9]{2}$/, // numeros 0-9 dos digitos to age
};
let valid = [true,false,false,false,false,false,false];
const inputsRegister = [
  $('#submit-register'),
  $('#fs-register-username'),
  $('#fs-register-fullname'),
  $('#fs-register-age'),
  $('#fs-register-email'),
  $('#fs-register-password'),
  $('#fs-register-repeat-password')
];

inputsRegister[0].addClass('disabled');
function showBtnSubmit(submit, inputs, index, value){
  valid[index] = value;
  if(valid[1] == true && valid[2] == true && valid[3] == true &&
    valid[4] == true && valid[5] == true && valid[6] == true) inputsRegister[0].removeClass('disabled');
  else inputsRegister[0].addClass('disabled');
}
function validInputs(input, exp, index){
  if(input.val().match(exp)){
    input.removeClass('fs-input-danger');
    input.addClass('fs-input-success');
    input.attr({
      'valid': true
    });
    showBtnSubmit(inputsRegister[0], inputsRegister, index, true);
  } else{
    input.removeClass('fs-input-success');
    input.addClass('fs-input-danger');
    input.attr({
      'valid': false
    })
    showBtnSubmit(inputsRegister[0], inputsRegister, index, false);
  }
}
function passwordEqual(password, repeat, index){
  if(password.val() == repeat.val()){
    repeat.removeClass('fs-input-danger');
    repeat.addClass('fs-input-success');
    showBtnSubmit(inputsRegister[0], inputsRegister, index, true);
  } else{
    repeat.removeClass('fs-input-success');
    repeat.addClass('fs-input-danger');
    showBtnSubmit(inputsRegister[0], inputsRegister, index, false);
  }
}

// evnts keyup
inputsRegister[1].keyup(()=> validInputs(inputsRegister[1], exp.usernameRege, 1));
inputsRegister[2].keyup(()=> validInputs(inputsRegister[2], exp.letter, 2));
inputsRegister[3].keyup(()=> validInputs(inputsRegister[3], exp.numberLimit, 3));
inputsRegister[4].keyup(()=> validInputs(inputsRegister[4], exp.email, 4));
inputsRegister[5].keyup(function(){
  validInputs(inputsRegister[5], exp.passwordRege, 5);
  passwordEqual($(this), inputsRegister[6], 6);
})
inputsRegister[6].keyup(function (){
  passwordEqual(inputsRegister[5], $(this), 6);
})

// Main Responsive
const buttonMainResponsive = $('#main-responsive');
const mainResponsive = $('#main-overlay');
const closedMainResponsive = $('#closed-main-responsive');

// NAVIGATION RESPONSIVE
gsap.to(mainResponsive, {
  scale: 0,
  opacity: 0,
  display: 'none',
  duration: 0
});
gsap.to('.main-links',{
  scale: 0,
  opaciti: 0,
  duration: 0
})
buttonMainResponsive.click(function(){
  let showResponsive = gsap.timeline();
  showResponsive.to(mainResponsive, {
    scale: 1,
    opacity: 1,
    display: 'flex',
    x: 0,
    y: 0,
    duration: .5
  });
  showResponsive.to('.main-links', {
    scale: 1,
    opaciti: 1,
    duration: 1,
    stagger: .3
  })
})
closedMainResponsive.click(function(){
  let showResponsive = gsap.timeline();
  showResponsive.to('.main-links', {
    scale: 0,
    opaciti: 0,
    duration: 1
  })
  showResponsive.to(mainResponsive, {
    scale: 0,
    opacity: 0,
    display: 'flex',
    duration: 1,
    stagger: .3
  });
})

/* $ `` ! || # \ */
// ajax reactions
const buttonsReactions = {
  btnlike: $('.post-btn-like'),
  btnhealt: $('.post-btn-healt'),
  btndislike: $('.post-btn-dislikes')
}

const queryAjax = (t,url) => {
  const id = t.attr('id-post');
  const camp = t.attr('camp-post');
  let c = '.' + camp + '-' + id;
  const cls = $(c);
  $.ajax({
    url: '/post/reaction/' + id,
    method: 'POST',
    data: { id,camp },
    success: (response)=>{
      const value = JSON.parse(response);
      cls.text('');
      cls.text(value);
    }
  });
}

buttonsReactions.btnlike.click(function(){
  queryAjax($(this));
});
buttonsReactions.btnhealt.click(function(){
  queryAjax($(this));
});
buttonsReactions.btndislike.click(function(){
  queryAjax($(this));
});

/* $ `` ! || # \ */
// ajax up point
const pluss = {
  heal: $('.fs_game_point-fs_heal'),
  lv: $('.fs_game_point-fs_lv'),
  at: $('.fs_game_point-fs_at'),
  def: $('.fs_game_point-fs_def'),
  vel: $('.fs_game_point-fs_vel'),
  mana: $('.fs_game_point-fs_mana')
};

function plus(t){
  const id = t.attr('stast-id');
  const points = $('.fs-total-points');
  const camp = t.attr('stast-camp');
  const value = t;
  if(points.text() > 0){
    $.ajax({
      url: '/plus-stast/' + id,
      method: 'POST',
      data: {id,camp},
      success: function(response){
        if(response){
          if(points.text() >= 0 && points.text() < 5) {
            points.removeClass('text-warning');
            points.removeClass('text-success');
            points.addClass('text-danger');
          } else if(points.text() >= 5 && points.text() < 8) {
            points.removeClass('text-danger');
            points.removeClass('text-success');
            points.addClass('text-warning');
          } else{
            points.removeClass('text-danger');
            points.removeClass('text-warning');
            points.addClass('text-success');
          }
          value.parent().siblings()[1].textContent = response.l;
          points.text(response.p);
        }
      }
    });
  }
}

pluss.heal.click(()=>{ plus(pluss.heal); });
pluss.at.click(()=>{ plus(pluss.at); });
pluss.def.click(()=>{ plus(pluss.def); });
pluss.vel.click(()=>{ plus(pluss.vel); });
pluss.mana.click(()=>{ plus(pluss.mana); });

// ajax Search
const searchUser = $('#search-user');

searchUser.keyup(function(){
  const valueSearch = $(this).val();
  $.ajax({
    url: '/search/' + valueSearch,
    method: 'POST',
    success: function(response){
      const user = JSON.parse(response);
      let template = '';
      $('#result-search').html('');
      user.forEach((item, i) => {
        template += `
        <tr>
          <td class="card-header text-center text-light">
            <a href='/search/${item.id}' class='lead'>@${item.fs_username}</a>
          </td>
        </tr>`
      });
      $('#result-search').html(template);
      template = '';
    }
  })
})









//
