function deleteCheck(event, form){
    event.preventDefault(); //Don't let the form to be submitted
    var decision = confirm("Deseja deletar?");
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