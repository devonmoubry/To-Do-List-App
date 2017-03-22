console.log(jQuery);

function renderToDoList() {
    $('.container').remove();
    $('body').append('<div class="container" ></div>')
    $('.container').append('<header></header>');
    $('header').append('<form id="addTask" method="post"><input type="text" name="Make a New List" placeholder="new task"><input class="submit" type="submit" value="Add Task"></form>');
    $('.container').append('<div class="toDoListContainer"></div>');
    $('.toDoListContainer').append('<ul></ul>');

    var settings = {
        type: 'GET',
        dataType: 'json',
        url: 'http://tiny-za-server.herokuapp.com/collections/devonmoubry-todo',
    }

    $.ajax(settings).then(function(data, status, xhr) {
        data.forEach(function(task, key, listObj, argument) {
            $('ul').append('<li><input type="checkbox" class="checkbox" id="' + task._id + '"><label for="' + task._id + '">' + task.task + '</label><a id="' + task._id + '" href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a></li>');
        })

        $('.checkbox').on('change', function(event) {
          var className = event.currentTarget.labels;
          $(className).addClass('checked');
        })

        $('a').on('click', function(event) {
            var id = event.currentTarget.id;
            var url = 'http://tiny-za-server.herokuapp.com/collections/devonmoubry-todo/' + id;
            var deleteSetting = {
                type: 'DELETE',
                url: url
            };


            $.ajax(deleteSetting).then(function(data, status, xhr) {
                renderToDoList();
            })
        });
    });
}

renderToDoList();

$('#addTask').submit(function(event) {
    event.preventDefault();
    var addTaskInput = event.currentTarget[0].value;
    var settings = {
        type: 'POST',
        contentType: 'application/json',
        url: 'http://tiny-za-server.herokuapp.com/collections/devonmoubry-todo',
        data: JSON.stringify({
            'task': addTaskInput
        })
    }

    $.ajax(settings).then(function(data, status, xhr) {
        renderToDoList();
    })
})
