

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

//==========================================
$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $('#todo-list').children().remove();
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=94',
      dataType: 'json',
      success: function (response, textStatus) {
        response.tasks.forEach(function (task) {
          $('#todo-list').append('<li>' + task.content + '<span data-id ="' + task.id + '" class="delete">\u00D7</span></li>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=94',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $("#doList").val()

        }
      }),
      success: function (response, textStatus) {
        $("#doList").val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var deleteTask = function (id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=94',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });
  }

  $(document).on('click', '#addBtn', function (event) {
    event.preventDefault();
    createTask();
  });

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  getAndDisplayAllTasks();

});
