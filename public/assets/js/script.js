function deleteCheck(event, form){
    event.preventDefault(); //Don't let the form to be submitted
    var decision = confirm("Deseja deletar?");
    if(decision){
        form.submit();
    }
}