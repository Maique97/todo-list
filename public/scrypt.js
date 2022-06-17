$(document).ready(function(){
   
   for (let index = 0; index < localStorage.length; index++) {
      div = localStorage.getItem(localStorage.key(index))
      doneOrTodo = localStorage.key(index).split(";")[1]

      if(doneOrTodo == "todo"){
         $("#new_todo_div").append(div)
      }
      else if(doneOrTodo == "done"){
         $("#new_done_div").append(div)
      }
   }

});

document.addEventListener ('keypress', (event) => {
   const keyName = event.key;
   if (keyName == "Enter") {
      add_todo()
   }
 });


function add_todo(){

   var new_todo = $("#new-todo").val();

   if(new_todo==""){


   }
   else{

      $("#new_todo_div").append('<div class="row linha-todo caixa-todo m-3"><div class="col-2">'+
      '<a onclick="move_todo(this)"><img class="check-todo" title="check-todo" alt="check-todo" src="check-white.png" width="30px" height="30px"></a>'+ 
      '</div><div class="col-8"><div class="label-todo ext-center">'+new_todo+'</div></div>'+
      '<div class="col-2"><a  onclick="delete_todo(this)"><img title="delete-todo" alt="delete-todo" src="trash.png" width="30px" height="30px"></a>'+
      '</div></div>')

      var todo_list = '<div class="row linha-todo caixa-todo m-3"><div class="col-2">'+
      '<a onclick="move_todo(this)"><img class="check-todo" title="check-todo" alt="check-todo" src="check-white.png" width="30px" height="30px"></a>'+ 
      '</div><div class="col-8"><div class="label-todo ext-center">'+new_todo+'</div></div>'+
      '<div class="col-2"><a  onclick="delete_todo(this)"><img title="delete-todo" alt="delete-todo" src="trash.png" width="30px" height="30px"></a>'+
      '</div></div>'

      $("#new-todo").val("");

      localStorage.setItem(new_todo + ";todo", todo_list);

   }

   
}

function delete_todo(element){

   element.closest('.row').remove();
   var elemento = $(element).closest('div.row').text()
   localStorage.removeItem(elemento+";todo");
   localStorage.removeItem(elemento+";done");

}

function move_todo(element){

   id_element = $(element).closest('.selector').attr('id');

   if(id_element=="new_done_div"){
      var elemento = $(element).closest('div.row').text()
      $(element).closest('.row').detach().appendTo("#new_todo_div")
      $(element).closest(".row").find("img.check-todo").attr("src", "check-white.png");
      var elemento_div = $(element).closest('div.row').html()
      for (let index = 0; index < localStorage.length; index++) {
        var element_name = localStorage.key(index).split(";")[0]
         if(element_name.toString()==elemento.toString()){
            localStorage.removeItem(element_name+";done");
            localStorage.setItem(element_name + ";todo", '<div class="row linha-todo caixa-todo m-3">'+elemento_div+'</div>');
         }
         
      }
      
   }
   else{
      var elemento = $(element).closest('div.row').text()
      $(element).closest('.row').detach().appendTo("#new_done_div")
      $(element).closest(".row").find("img.check-todo").attr("src","check-green.png");
      var elemento_div = $(element).closest('div.row').html()
      for (let index = 0; index < localStorage.length; index++) {
         var element_name = localStorage.key(index).split(";")[0]
         if(element_name.toString()==elemento.toString()){
            localStorage.removeItem(element_name+";todo");
            localStorage.setItem(element_name + ";done",  '<div class="row linha-todo caixa-todo m-3">'+elemento_div+'</div>');
         }
         
      }
    
   }
}


