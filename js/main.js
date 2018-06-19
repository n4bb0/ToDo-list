let toDoList;
// check if there is a saved list, if yes, get it
if (localStorage.getItem('toDo list')) {
  toDoList = JSON.parse(localStorage.getItem('toDo list'));
  // display the list
  showList();
};

// if there isn't any saved list, create an empty one
if (!localStorage.getItem('toDo list')) {
  toDoList = [];
};



// save an event in the toDoList
$('#submitBtn').on('click', save);



function save(e) {
  e.preventDefault();
  // create an object for the event
    // create a valid Id, two events can't have the same Id
  let eventId = Math.floor(100000*Math.random() + 1);
  // validate id
  for (i = 0; i < toDoList.length; i++) {
    if (eventId === toDoList[i].id) {
      eventId = Math.floor(100000*Math.random() + 1);;
      i = -1;
    }
  }; // end for

  let description = $('#description').val();
  // validate description
  if (!description) {
    alert('Please add a description');
    return false;
  };

  let date = $('#date').val();
  let importance = $('#importance').val();
  let toDoEvent = {
    'id' : eventId,
    'description': description,
    'date': formatDate(date),
    'importance': importance
  };


  // add the created object to the list and store it
  toDoList.push(toDoEvent);
  localStorage.setItem('toDo list', JSON.stringify(toDoList));
  // display the list
  showList();
  // clear the form
  document.getElementById('inputForm').reset();
}; // end save



// display the stored toDo list
function showList() {
  let output = $('#list');
  output.html('');
  for (let i = 0; i < toDoList.length; i++) {
    output.append('<div class="col-12 jumbotron event">' +
                  '<p class="importanceOutput"><span class="circle float-left"></span><span class="float-right">' + toDoList[i].importance.toUpperCase() + '</span></p>' +
                  '<h4 class="descriptionOutput">' + toDoList[i].description + '</h4>' +
                  '<p class="dateOutput">' + toDoList[i].date + '</p>' +
                  '<button type="button" class="deleteBtn btn btn-danger btn-sm" id="deleteBtn-' + toDoList[i].id +'">Delete</button></div>');
  };

  $('.importanceOutput').each(function() {
    if($(this).text() === 'LOW') {
      $(this).addClass('lowImp');
      $(this).children('span:first-child').addClass('lowImp-bg');
    } else if($(this).text() === 'MEDIUM') {
      $(this).addClass('mediumImp');
      $(this).children('span:first-child').addClass('mediumImp-bg');
    } else if($(this).text() === 'HIGH') {
      $(this).addClass('highImp');
      $(this).children('span:first-child').addClass('highImp-bg');
    }
  });
  // attach an event listener to each button
  $('.deleteBtn').on('click', deleteEvent);
}; // end showList



// delete an event
function deleteEvent(e) {
  // get the id of the event to be deleted
  let deleteId = $(e.target).attr('id').slice(10);
  // find and delete the event in the toDoList
  for (i = 0; i < toDoList.length; i++) {
    if (deleteId == toDoList[i].id) {
      toDoList.splice(i, 1);
    }
  }
  // set the modified list in the localStorage
  localStorage.setItem('toDo list', JSON.stringify(toDoList));
  // display the list
  showList();
}; // end deleteEvent



// format the date date in dd-mm-yyyy
function formatDate(date) {
  let d = new Date(date);
  let finalDate;

  if (d !== "Invalid Date" && !isNaN(new Date(date))) {
    let day = d.getDate();

    let month;
    if(d.getMonth() + 1 < 10) {
      month = '0' + (d.getMonth() + 1);
    } else {
      month = d.getMonth() + 1;
    };

    let year = d.getFullYear();

    finalDate = day + '-' + month + '-' + year;
  } else {
    finalDate = '';
  };

  return finalDate;
}; // end formatDate
