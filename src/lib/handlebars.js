const {format} = require('timeago.js');

let helpers = {};

helpers.timeago = (t) => {
  return format(t);
}

helpers.itemNavActive = (n, name, i, l) => {
  if(n == name){
    return `<a class="fs-text-secondary item-nav lead ${i} py-2 d-none d-md-inline-block"></a>`
  } else{
    return `<a class="lead ${i} py-2 item-nav d-none d-md-inline-block" href="${l}"></a>`
  }
}

helpers.itemNavActiveResponsive = (n, name, i, l) => {
  if(n == name){
    return `
    <ol class='main-item-active'>
      <a class="lead nav-link ${i} py-2">
        <span>${name}</span>
      </a>
    </ol>`;
  } else{
    return `
      <ol class='main-link__item'>
        <a class="lead nav-link ${i} py-2" href="${l}">
          <span>${name}</span>
        </a>
      </ol>
    `
  }
}

helpers.ubicationProfile = (t, tab, l, i) => {
  if(t == tab){
    return `
      <div class="card bg-dark col p-0">
        <div class="card-body p-0 text-center border fs-border-secondary">
          <span class='d-none d-md-block lead fs-text-secondary'>${t}</span>
          <span class='d-block d-md-none fs-text-4 fs-text-secondary ${i}'></span>
        </div>
      </div>
      `;
  } else{
    return `
    <div class="card bg-dark col p-0">
      <div class="card-body text-center p-0 border fs-border-primary">
        <a href="${l}" class='d-none d-md-block lead fs-text-primary'>${t}</a>
        <a href="${l}" class='d-block d-md-none fs-text-4 fs-text-primary ${i}'></a>
      </div>
    </div>
    `;
  }
}

helpers.idAutor = (i, id, ip) => {
  if(i == id){
    return `
    <form action='/post/up/${ip}' method='POST'>
      <button type='submit' class="btn btn-lg bi-pencil-fill lead text-success"></button>
    </form>
    <form action='/post/delete/${ip}' method='POST'>
      <button type='submit' class="update-descrption-post btn btn-lg bi-trash-fill lead text-danger"></button>
    </form>`;
  } else{
    return '';
  }
}

helpers.likeHelp = ()=>{

}

module.exports = helpers;
