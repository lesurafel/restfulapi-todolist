
var viewTasks = "all";
var allCompletedTasks = [];
$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=94',
      dataType: 'json',
      success: function (response, textStatus) {
        allCompletedTasks = [];
        $('#todo-list').children().remove();
        $('#menu').children().remove();
        if (response.tasks.length>0) {
          $('#menu').append('<div class="bottomMenu"><span>' + response.tasks.length + ' Item left</span><span class="all"><a href="#">All</a></span>' +
          '<span class="active"><a href="#">Active</a></span>' +
          '<span class="complete"><a href="#">Complete</a></span>' +
          '<span class="clearCompleted"><a href="#">Clear Completed Tasks</a></span></div>');
        }
        response.tasks.forEach(function (task) {
          if (task.completed === true) {
            allCompletedTasks.push(task.id);
          }

          if (viewTasks === 'all') {
            $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
          } else if (viewTasks === 'complete') {
            if (task.completed === true) {
              $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
            }
          } else {
            if (task.completed === false) {
              $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
            }
          }
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

  var deleteCompletedTasks = function () {
    for (var i = 0; i<allCompletedTasks.length; i++) {
      $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + allCompletedTasks[i] + '?api_key=94',
        dataType: 'json',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
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

  $(document).on('click', '.delete', function (event) {
    event.stopPropagation();
    deleteTask($(this).parent().data('id'));
  });

  $(document).on('click', 'li', function (event) {
    event.preventDefault();
    if (this.className === 'checked') {
      markTaskActive($(this).data('id'));
      this.className = '';
    } else {
      markTaskComplete($(this).data('id'));
      this.className = 'checked';
    }
  });

  $(document).on('click', '.all', function (event) {
    event.stopPropagation();
    viewTasks = "all";
    getAndDisplayAllTasks();
  });

  $(document).on('click', '.active', function (event) {
    event.stopPropagation();
    viewTasks = "active";
    getAndDisplayAllTasks();
  });

  $(document).on('click', '.complete', function (event) {
    event.stopPropagation();
    viewTasks = "complete";
    getAndDisplayAllTasks();
  });

  $(document).on('click', '.clearCompleted', function (event) {
    getAndDisplayAllTasks();
    event.stopPropagation();
    event.preventDefault();
    deleteCompletedTasks();
  });

  getAndDisplayAllTasks();

});
