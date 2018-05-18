







$(document).ready(function () {
  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;

  trigger.click(function () {
    hamburger_cross();
  });

  function hamburger_cross() {

    if (isClosed == true) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });
});

let logo = document.querySelector('#logos');
let list = document.querySelector('.sidebar-brand');

// LOGO HOVER EFFECT

list.addEventListener('mouseover', () => {
  logo.setAttribute('src', 'assets/logo_inverted.png')
})
list.addEventListener('mouseout', () => {
  logo.setAttribute('src', 'assets/logo.png')
})
// LOGO ENDS

// FACEBOOK HOVER EFFECT
document.querySelector('.facebook').addEventListener('mouseover', () => {
  document.querySelector('.facebook img').setAttribute('src', 'assets/facebook-hover.png');
})
document.querySelector('.facebook').addEventListener('mouseout', () => {
  document.querySelector('.facebook img').setAttribute('src', 'assets/facebook.png');
})
// FACEBOOK ENDS

// INSTAGRAM HOVER EFFECT

document.querySelector('.instagram').addEventListener('mouseover', () => {
  document.querySelector('.instagram img').setAttribute('src', 'assets/instagram-hover.png');
})
document.querySelector('.instagram').addEventListener('mouseout', () => {
  document.querySelector('.instagram img').setAttribute('src', 'assets/instagram.png');
})

// INSTAGRAM ENDS


document.querySelector('#messageButton').addEventListener('click', () => {

  let fejlbesked = document.querySelector('#fejlbesked')
  let form = document.querySelector('#formSend');

  let email = form.email.value;
  let emne = form.emne.value;
  let indhold = form.indhold.value;

  fejlbesked.textContent = '';



  if (email == '' || emne == '' || indhold == '') {
    if ($('#fejlbesked').hasClass('gemmeren')) {
      $('#fejlbesked').removeClass('gemmeren').addClass('viseren')
    }

    fejlbesked.textContent = "Udfyld venligst alle felterne"
  } else {
    $('#fejlbesked').removeClass('viseren').addClass('gemmeren')
    let data = new FormData(form);

    let fetchSettings = {
      method: 'POST',
      body: data,
      cache: "no-cache",

    }
    console.log(data)

    fetch(api_addresse + 'message', fetchSettings)

      .then((response) => {
        if (response.status == 200) {
          console.log(response)
          return response.json();
        } else {
          throw new Error("Response status not 200")
        }
      }).catch((err) => {
        console.log(err)
      })
    let email = form.email.value = ''
    let emne = form.emne.value = ''
    let indhold = form.indhold.value = ''
  }




})

document.querySelector('#kontaktFormList').addEventListener('click', event => {
  if ($('#kontaktFormList').hasClass("vis")) {
    $('#kontaktFormList').removeClass("vis").addClass('gem');
    $('#contact').show('blind')

  } else {
    $('#kontaktFormList').removeClass('gem').addClass('vis')

    $('#contact').hide('blind')
  }
})

