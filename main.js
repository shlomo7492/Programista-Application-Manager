var addNew = '<form method="post" action="index.html?navigate=listall" id="createForm">'+
			'<div class="form_container form-group" >'+
			'<!--To use RegEx in pattern attribute to so I can validate the input data -->'+
				'<h2 id="form_title">Application Form(Add New Student)</h2>'+
				'<strong>Student\'s Name:</strong> <input name="name" id="name" type="text" class="form-control"'+
				'placeholder="Student Full name"  size="50" required><br><br>'+
				'<strong>Student\'s E-mail:</strong> <input type="text" name="email" id="email" class="form-control" size="50" placeholder="Student e-mail" autocomplete="off"'+
				'  pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" required><br><br>'+
				'<strong>Student\'s Age:</strong> <input type="number"  name="age" id="age" class="form-control" min="16"  required><br><br>'+
				'<strong>Student\'s Phone Number:</strong> <input name="phone" id="phone" type="text" class="form-control"'+ 
				'placeholder="Student phone number:"  required><br><br>'+
				'<strong>Preferred Way of Communication:</strong><br>'+
				'<input type="radio" name="contactby" id="byemail" value="email" checked> E-mail<br>'+
				'<input type="radio" name="contactby" id="byphone" value="phone"> Phone<br><br>'+
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
				'<input type="checkbox" name="homestudy" id="homestudy">Study from home<br><br>'+
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
	else if(navVar==null){
		document.getElementById("content").innerHTML = '<h3>Student Application Manager v1.0a</h3>'+
		'<p>This webapp is created by Dimitar Daskalov as part of application process for Programista Internship Program, October\'2018'+
		'<p> To add new Student click the \'Add New Student\' link above '+
		'and to vew All Students click the \'List All Students\' link next to it.</p>';
	}
	else{
		listStudent(navVar);
	}
	
}

	
/*Getting fields values from Add New Student form and 
add them to the localStorage*/
function AddNewStudent(){
	//Initialize students array to be in correct JSON format
	validateFormInput();
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var age = document.getElementById('age').value;
	var phone = document.getElementById('phone').value;
	var contactBy = $('input:radio[name=contactby]:checked').val();
	var englishlevel = document.getElementById('englishlevel').value;
	var startdate = document.getElementById('startdate').value;
	var skillsandcourses = document.getElementById('skillsandcourses').value;
	var selfpresentation = document.getElementById('selfpresentation').value;	
	if(document.getElementById('homestudy').checked){
		var homestudy = 'Yes';
	}
	else{
		var homestudy = 'No';
	}
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
	if (validateFormInput()){
		localStorage.setItem('savedStudents', JSON.stringify(students));
	}
		
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
							'<td class="btns"><button onclick="updateStudentInfo(\''+students[i].name+'\')" class="btn btn-success">Edit</button></td>'+//Edit button
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
							'<p><button onclick="updateStudentInfo(\''+students[i].name+'\')" class="btn btn-success">Edit</button>&nbsp;'+//Edit button
							'<button onclick="removeStudent(\''+students[i].name+'\')" class="btn btn-danger">Delete</button></p>'+//Delete button
							'</div>';
							break;
				}
				
			}
			document.getElementById('content').innerHTML = content;
}

/*Displays form and sets values to all data of chosen student from localStorage.savedStudents 
then changes submit button onclick behavior  */
function updateStudentInfo(name){
	document.getElementById("content").innerHTML = addNew;
	document.getElementById("form_title").innerHTML='Update Students\' Application Data';
	var students = JSON.parse(localStorage.getItem('savedStudents'));
	for(i=0;i<students.length;i++){
		if(students[i].name==name){
			document.getElementById("name").value =	students[i].name;
			document.getElementById("email").value = students[i].email;
			document.getElementById("age").value =	students[i].age;
			document.getElementById("phone").value = students[i].phone;
			if(students[i].contactBy == 'phone'){
				document.getElementById('byemail').removeAttribute("checked"); 
				var radio = document.getElementById('byphone');
				var att = document.createAttribute("checked");
				radio.setAttributeNode(att);
			}
			document.getElementById("englishlevel").value = students[i].englishlevel;
			document.getElementById("startdate").value = students[i].startdate;
			document.getElementById("skillsandcourses").value = students[i].skillsandcourses;
			document.getElementById("selfpresentation").value = students[i].selfpresentation;
			if(students[i].homestudy == 'Yes'){
				var check = document.getElementById('homestudy');
				var att = document.createAttribute("checked");
				check.setAttributeNode(att);
			}
			document.getElementById("submit").innerHTML='Update';
			document.getElementById("submit").setAttribute("class","btn btn-success");
			document.getElementById("submit").setAttribute("onclick","updateStudentData(\'"+students[i].name+"\')");
		}
	}
}
/*updates the JSON array and updates the localStorage.savedStudents*/
function updateStudentData(student){
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var age = document.getElementById('age').value;
	var phone = document.getElementById('phone').value;
	var contactBy = $('input:radio[name=contactby]:checked').val();
	var englishlevel = document.getElementById('englishlevel').value;
	var startdate = document.getElementById('startdate').value;
	var skillsandcourses = document.getElementById('skillsandcourses').value;
	var selfpresentation = document.getElementById('selfpresentation').value;	
	var homestudy;
	if(document.getElementById('homestudy').checked){
		homestudy = 'Yes';
	}
	else{
		homestudy = 'No';
	}
	var students = JSON.parse(localStorage.getItem('savedStudents'));
	for(i=0;i<students.length;i++){
		if(students[i].name==student){
			students[i] = {
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
			student=students[i].name;
		}
	}
	localStorage.setItem('savedStudents', JSON.stringify(students));	
	listStudent(student);
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

//Validation

function validateFormInput(){
	var email = document.getElementById('email').validity.valid;
	var age = document.getElementById('age').validity.valid;
	//var phone = document.getElementById('phone').validity.valid;
	//var startdate = document.getElementById('startdate').validity.valid;
	if(email&age){
		return true;
	}
}
