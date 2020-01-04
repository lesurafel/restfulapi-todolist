$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $('#todo-list').children().remove();
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=94',
      dataType: 'json',
      success: function (response, textStatus) {
        response.tasks.forEach(function (task) {
          $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
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

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=94',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=94',
      dataType: 'json',
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

  $(document).on('click', 'li', function () {
    if (this.className === 'checked') {
      markTaskActive($(this).data('id'));
      this.className = '';
    } else {
      markTaskComplete($(this).data('id'));
      this.className = 'checked';
    }
  });
  
  getAndDisplayAllTasks();

});
