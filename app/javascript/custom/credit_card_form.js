$(document).on('ready turbolinks:load', function(){
  var show_error, stripeResponseHandler, submitHandler;

  stripeResponseHandler = function (status, response) {
    var token, $form;
    $form = $('.cc_form');

    if (response.error) {
      console.log(response.error.message);
      show_error(response.error.message);
      $form.find("input[type=submit]").prop("disabled", false);
    } else {
      token = response.id;
      $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
      $("[data-stripe=number]").remove();
      $("[data-stripe=cvc]").remove();
      $("[data-stripe=exp-year]").remove();
      $("[data-stripe=exp-month]").remove();
      $("[data-stripe=label]").remove();
      $form.get(0).submit();
    }

    return false;
  };

  show_error = function (message) {
    console.log(message);
    if(!$("#flash-messages").length){
      $('#main').prepend("<div id='flash-messages'></div>");
    }

    $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
    $('.alert').delay(5000).fadeOut(3000);

    return false;
  };

  function stripeTokenHandler(token, form){
    form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token.id));
    form.get(0).submit();
  };

  function createToken(form){
    stripe.createToken(card).then(function(result) {
      if(result.error){
        show_error(result.error.message);
        form.find("input[type=submit]").prop("disabled", false);
      } else {
        stripeTokenHandler(result.token, form);
      }
    });
  };

  submitHandler = function(event){
    event.preventDefault();

    var $form = $(event.target);
    $form.find("input[type=submit]").prop("disabled", true);

    //If Stripe was initialized correctly this will create a token using the credit card info
    if(stripe){
      createToken($form);
    }else{
      show_error("Failed to load credit card processing functionality. Please reload this page in your browser.");
    }
  };

  $(".cc_form").on("submit", submitHandler);

  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

});
