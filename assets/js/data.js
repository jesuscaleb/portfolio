function loading(bool) {
  if(bool){
    $('#contact-form').waitMe({
        effect : 'bounce',
        text : 'Enviando tu mensaje...',
        bg : 'rgba(36, 38, 41, 0.975)',
        color : '#34a58e',
        maxSize : '40',
        waitTime : -1,
        textPos : 'vertical',
        fontSize : '18px',
        source : '',
        onClose : function() {}
    });
    // Cleaning response message
    $('div.response').hide();
    $('div.response').css('background-color', 'none');
    $('div.response p').empty();
  }else{
    $('#contact-form').waitMe("hide");
  }
}

function responseStatus(bool){
  if(bool){
    $('div.response').show();
    $('div.response').css('background-color', '#34a58e');
    $('div.response p').text('Su mensaje se ha enviado. Estaremos en contacto lo más pronto posible.');
  }else{
    $('div.response').show();
    $('div.response').css('background-color', 'rgb(219, 59, 59)');
    $('div.response p').text('Algo salió mal. Por favor inténtelo más tarde.');
  }
}

$(document).ready(function() {
  $('#contact-form').validate({
    focusCleanUp: true,
    rules:{
      name:{
        required: true
      },
      email:{
        required: true,
        email:true
      },
      message: {
        required: true
      }
    },
    messages: {
      name:{
        required: "Ingrese su nombre."
      },
      email:{
        required: "Ingrese su correo.",
        email: "Correo no es válido."
      },
      message: {
        required: "Escriba su mensaje."
      }
    },
    errorPlacement: function( label, element ) {
        if( element.attr( "name" ) === "audience[]" || element.attr( "name" ) === "event_services[]" ) {
            element.parent().append( label );
        } else {
            label.insertAfter( element ); // standard behaviour
        }
    },
    submitHandler: ()=>{
      loading(true);
      $.ajax({
        type: "POST",
        url: "https://jcob-myapi.herokuapp.com/api/email/send",
        data: $('#contact-form').serialize(),
        processData: false,
        success: function (response) {
          loading(false);
          responseStatus(true);
          console.log({response});            
          return false;
        },
        error: function (err) {
          loading(false);
          responseStatus(false);
          console.log({error: err});
          return false;
        }
      });
      return false; 
    }
  });
});