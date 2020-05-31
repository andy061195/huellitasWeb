(function ($) {
  "use strict";

  /*==================================================================
    [ Focus input ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");
  //var database = firebase.database();

  function writeUserData(userId, name, email) {
    firebase
      .database()
      .ref("perfil/" + userId + "/")
      .set({
        userId: userId,
        username: name,
        email: email,
        age: 0,
        family: 0,
        patient: 0,
      });
  }

  $("#button").click(function () {
    var resp = checkInput();

    if (resp) {
      var e = $("#email").val();
      var p = $("#pass").val();

      firebase
        .auth()
        .createUserWithEmailAndPassword(e, p)
        .then(function (result) {
          var user = firebase.auth().currentUser;
          writeUserData(user.uid, "desconocido", user.email);
          alert("Usuario registrado con exito. Ahora visita la App HUELLITAS!.");
          $("#email").val("");
          $("#pass").val("");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);

          // ...
        });
    }
  });

  function checkInput() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  }

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  /*==================================================================
    [ Show pass ]*/
  var showPass = 0;
  $(".btn-show-pass").on("click", function () {
    if (showPass == 0) {
      $(this).next("input").attr("type", "text");
      $(this).addClass("active");
      showPass = 1;
    } else {
      $(this).next("input").attr("type", "password");
      $(this).removeClass("active");
      showPass = 0;
    }
  });
})(jQuery);
