var addNew = '<form method="post" action="index.html" id="createForm">'+
			'<div class="form_container form-group" >'+
			'<!--To use RegEx in pattern attribute to so I can validate the input data -->'+
				'<h2>Application Form(Add New Student)</h2>'+
				'<strong>Name:</strong> <input name="name" type="text" class="form-control" placeholder="Student Full name" size="50" required><br><br>'+
				'<strong>E-mail:</strong> <input type="text" name="email" class="form-control" size="50" placeholder="Student e-mail" autocomplete="off" required><br><br>'+
				'<strong>Age:</strong> <input type="number"  name="age" class="form-control" min="16"  required><br><br>'+
				'<strong>Phone Number:</strong> <input name="phone" type="text" class="form-control" placeholder="Student phone number" size="42" required><br><br>'+
				'<strong>Preferred Way of Communication:</strong><br>'+
				'<input type="radio" name="contactby" value="email" checked> E-mail<br>'+
				'<input type="radio" name="contactby" value="phone"> Phone<br><br>'+
				'<strong>English Level: </strong>'+
				'<select name="englishlevel" class="form-control" required>'+
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
				'<input type="date" name="startdate" min="" required><br><br>'+
				'<strong>Technical Skills and Courses:</strong> <br>'+
				'<textarea name="skillsandcourses" class="form-control" rows="10"  cols="60" >'+
				'</textarea><br><br>'+
				'<strong>Short Personal Presentation:</strong><br>(e.g. reason for joining the program)<br>'+
				'<textarea name="selfpresentation" class="form-control" rows="10" cols="60"  placeholder="Please write tell us more about yourself and your reasons to join the program?">'+
				'</textarea><br><br>'+
				'<input type="checkbox" name="homestudy" value="true">Study from home<br><br>'+
				'<input type="hidden" name="navigation" value="create">'+
				'<input type="submit" name="" value="Submit">'+

			'</div>'+
		'</form>';
function printContent(navVar){
	if (navVar == 'add'){
		document.getElementById("content").innerHTML = addNew;
		document.getElementById("title").innerHTML += '::Add New student';
	}
}