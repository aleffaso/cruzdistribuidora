//Make sure of deleting something
function deleteCheck(event, form){
    event.preventDefault(); //Don't let the form to be submitted
    var decision = confirm("Deseja deletar?");
    if(decision){
        form.submit();
    }
}

//Make sure sending form
function sentCheck(event, form){
  var decision = confirm("Deseja enviar o formulário?");
  event.preventDefault(); 
  if(decision){
      form.submit();
  }
}

//Filter list
$(document).ready(function(){
    $("#listSearch").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myList #listItem").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });