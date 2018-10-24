var addNew = '<form method="post" action="index.html?navigate=listall" id="createForm">'+
			'<div class="form_container form-group" >'+
			'<!--To use RegEx in pattern attribute to so I can validate the input data -->'+
				'<h2>Application Form(Add New Student)</h2>'+
				'<strong>Student\'s Name:</strong> <input name="name" id="name" type="text" class="form-control" placeholder="Student Full name" size="50" required><br><br>'+
				'<strong>Student\'s E-mail:</strong> <input type="text" name="email" id="email" class="form-control" size="50" placeholder="Student e-mail" autocomplete="off" required><br><br>'+
				'<strong>Student\'s Age:</strong> <input type="number"  name="age" id="age" class="form-control" min="16"  required><br><br>'+
				'<strong>Student\'s Phone Number:</strong> <input name="phone" id="phone" type="text" class="form-control" placeholder="Student phone number" size="42" required><br><br>'+
				'<strong>Preferred Way of Communication:</strong><br>'+
				'<input type="radio" name="contactby" value="email" checked> E-mail<br>'+
				'<input type="radio" name="contactby" value="phone"> Phone<br><br>'+
				'<strong>English Level: </strong>'+
				'<select name="englishlevel" id="englishlevel" class="form-control" required>'+
				'	<option value="beginner">Beginner</option>'+
				'	<option value="elementary">Elementary(A1)</option>'+
				'	<option value="preintermediate">Pre-intermediate(A2)</option>'+
				'	<option value="lowintermediate">Low Intermediate(B1)</option>'+
				'	<option value="intermediate">Intermediate (B1)</option>'+
				'	<option value="upperintermediate">Upper Intermediate(B2)</option>'+
				'	<option value="preadvanced">Pre-advanced(C1)</option>'+
				'	<option value="advanced">Advanced(C2)</option>'+
				'	<option value="veryadvanced">Very Advanced(C2)</option>'+
				'</select><br><br>'+
				'<strong>Available to Start:</strong>'+
				'<input type="date" name="startdate"  id="startdate" min="" required><br><br>'+
				'<strong>Technical Skills and Courses:</strong> <br>'+
				'<textarea name="skillsandcourses" id="skillsandcourses" class="form-control" rows="10"  cols="60"'+
				' placeholder="Please write tell us about your skills and any completed courses that may be relevant to your application.">'+
				'</textarea><br><br>'+
				'<strong>Short Personal Presentation:</strong><br>(e.g. reason for joining the program)<br>'+
				'<textarea name="selfpresentation" id="selfpresentation" class="form-control" rows="10" cols="60"'+
				' placeholder="Please write tell us more about yourself and your reasons to join the program.">'+
				'</textarea><br><br>'+
				'<input type="checkbox" name="homestudy" id="homestudy" value="true">Study from home<br><br>'+
				'<button id="submit" onclick="AddNewStudent()" class="btn btn-primary">Add</button>&nbsp;'+
				'<input type="reset" name="reset" class="btn btn-danger">'+
			'</div>'+
		'</form>';
/*Provides simple navigation trough application's functionality 
supplying different page content by using url query parameters*/
function printContent(navVar){
	if (navVar == 'add'){
		document.getElementById("content").innerHTML = addNew;
		document.getElementById("title").innerHTML += '::Add New student';
	}
	else if(navVar == 'listall'){
		listAllStudents();
	} 
	else{
		listStudent(navVar);
	}
	
}

	
/*Getting fields values from Add New Student form and 
add them to the localStorage*/
function AddNewStudent(){
	//Initialize students array to be in correct JSON format
	
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var age = document.getElementById('age').value;
	var phone = document.getElementById('phone').value;
	var contactBy = $('input:radio[name=contactby]:checked').val();
	var englishlevel = document.getElementById('englishlevel').value;
	var startdate = document.getElementById('startdate').value;
	var skillsandcourses = document.getElementById('skillsandcourses').value;
	var selfpresentation = document.getElementById('selfpresentation').value;	
	var homestudy = document.getElementById('homestudy').value;
	var student = {
		"name":name,
		"email":email,
		"age":age,
		"phone":phone,
		"contactBy":contactBy,
		"englishlevel":englishlevel,
		"startdate":startdate,
		"skillsandcourses":skillsandcourses,
		"selfpresentation":selfpresentation,
		"homestudy":homestudy}; 
	if(localStorage.savedStudents==null){
			var students = [];
		}
		else{
			var students=JSON.parse(localStorage.getItem('savedStudents'));
		}
		students.push(student);
		localStorage.setItem('savedStudents', JSON.stringify(students));	
} 

/*Reading the data in localStorage.savedStudents 
and displays it in table-like format*/
function listAllStudents(){
	if(localStorage.savedStudents==null){
			document.getElementById('content').innerHTML = "<h3>There are no students in the database!</h3>";
		}
		 else{
			var students = JSON.parse(localStorage.getItem('savedStudents'));
			var content = '<div class="table-responsive">'+ 
							  '<h3> List of all students</h3>'+
							  '<table class="table table-hover">';
			for(i=0;i<students.length;i++){
				content+='<tr>'+
							'<td><a href="index.html?navigate='+students[i].name+'">'+students[i].name+'</a>'+'</td>'+
							'<td class="btns"><a href="" class="btn btn-success">Edit</a></td>'+//Edit button
							'<td class="btns"><button onclick="removeStudent(\''+students[i].name+'\')" class="btn btn-danger">Delete</button></td>'+//Delete button
						'</tr>';
			}
			content+='</table>'+'</div>';
			document.getElementById('content').innerHTML = content;
		} 
} 

/*Reading data from localStorage.savedStudents and displays chosen student*/
function listStudent(name){
			var students = JSON.parse(localStorage.getItem('savedStudents'));
			var content = '<div class="form_container">'+
							'<h3>'+name+'</h3>';
			for(i=0;i<students.length;i++){
				if(students[i].name==name){
					content+='<hr>'+
							'<p><strong>Student\'s  E-mail:</strong> '+students[i].email+'</p>'+
							'<p><strong>Student\'s  age:</strong> '+students[i].age+'</p>'+
							'<p><strong>Student\'s  Phone number:</strong> '+students[i].phone+'</p>'+
							'<p><strong>To be contacted by:</strong> '+students[i].contactBy+'</p>'+
							'<p><strong>Student\'s  English level:</strong> '+students[i].englishlevel+'</p>'+
							'<p><strong>Available to start:</strong> '+students[i].startdate+'</p>'+
							'<p><strong>Student\'s  skills and courses:</strong> '+students[i].skillsandcourses+'</p>'+
							'<p><strong>Student\'s  info:</strong> '+students[i].selfpresentation+'</p>'+
							'<p><strong>Studying from home:</strong> '+students[i].homestudy+'</p>'+
							'<hr>'+
							'<p><a href="" class="btn btn-success">Edit</a>&nbsp;'+//Edit button
							'<button onclick="removeStudent('+name+')" class="btn btn-danger">Delete</button></p>'+
							'</div>';//Delete button
							break;
				}
				
			}
			document.getElementById('content').innerHTML = content;
}

/*Displays form and sets values to all data of chosen student from localStorage.savedStudents 
then updates the JSON array and updates the localStorage.savedStudents */
function updateStudentInfo(name){
	
}

/*Reads all data from localStorage.savedStudents, removes chosen student data 
and updates localStorage.savedStudents */

function removeStudent(name){
	var action = confirm('You are about to delete all data of student '+
						name+'. Are you sure you want to do that? \n Press OK to continue, and Cancel to leave the data as it is.');
	var students = JSON.parse(localStorage.getItem('savedStudents'));
	var studentsUpdated = [];
	
	for(i=0;i<students.length;i++){
		if(students[i].name!=name){
			studentsUpdated.push(students[i]);
		}
	}
	localStorage.setItem('savedStudents',JSON.stringify(studentsUpdated));
	listAllStudents();
	alert('Student with name'+name+' was removed from the Database.');
}