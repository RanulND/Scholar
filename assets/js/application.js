let act, activities = [], fam, family = [], ext, extra = [], sub, subject = [], obj = {};
var db = firebase.firestore()

function displayActivities() {
  let res = '', id = 0;
  activities.forEach(e => {
    res += '<div class="row my-2"><div class="col-md-5"><strong>' + (id + 1).toString() + '. </strong>' + e.activity + '</div><div class="col-md-2">' + e.district + '</div><div class="col-md-2">' + e.provincial + '</div><div class="col-md-2">' + e.national + '</div></div>';
    id++;
  });
  document.getElementById("activities").innerHTML = res;
}

function displayExtra() {
  let res = '', id = 0;
  extra.forEach(e => {
    res += '<div class="row my-2"><div class="col-md-4"><strong>' + (id + 1).toString() + '. </strong>' + e.extraAct + '</div><div class="col-md-4">' + e.role + '</div><div class="col-md-4">' + e.year + '</div></div>';
    id++;
  });
  document.getElementById("ECA").innerHTML = res;
}

function displayFam() {
  let res = '', id = 0;
  family.forEach(e => {
    res += '<div class="row my-2"><div class="col"><strong>' + (id + 1).toString() + '. </strong>' + e.memberName + '</div><div class="col">' + e.age + '</div><div class="col">' + e.relationship + '</div><div class="col">' + e.occupation + '</div><div class="col">' + e.income + '</div></div>';
    id++;
  });
  document.getElementById("family").innerHTML = res;
}

function addActivities() {
  // console.log('act wada');
  let act_1 = document.getElementById("activityType").value;
  // console.log(act_1);
  if (act_1 != '') {
    obj = {};
    obj.activity = document.getElementById("activityType").value;
    obj.district = document.getElementById("district").value;
    obj.provincial = document.getElementById("provincial").value;
    obj.national = document.getElementById("national").value;
    activities.push(obj);
    console.log(activities);//testing

    document.getElementById("district").value = '';
    document.getElementById("activityType").value = '';
    document.getElementById("national").value = '';
    document.getElementById("provincial").value = '';

    displayActivities();
  } else {
    alert("activity cannot be empty");
  }
}

function addEca() {
  // console.log('eca wada');
  let ext = document.getElementById("act").value;
  if (ext != '' && document.getElementById("role").value != '' && document.getElementById("year").value != '') {
    obj = {};
    obj.extraAct = document.getElementById("act").value;
    obj.role = document.getElementById("role").value;
    obj.year = document.getElementById("year").value;
    extra.push(obj);
    console.log(extra);//testing

    document.getElementById("act").value = '';
    document.getElementById("role").value = '';
    document.getElementById("year").value = '';

    displayExtra();
  } else {
    alert("You have to fill all the fields provided");
  }
}

function addFam() {
  // console.log('fam wada');
  let fam_1 = document.getElementById("famName-4").value;
  if (fam_1 != '' && document.getElementById("age-4").value != '' && document.getElementById("relationship-4").value != '' && document.getElementById("occupation-4").value != '' && document.getElementById("income-4").value != '') {
    obj = {};
    obj.memberName = document.getElementById("famName-4").value;
    obj.age = document.getElementById("age-4").value;
    obj.relationship = document.getElementById("relationship-4").value;
    obj.occupation = document.getElementById("occupation-4").value;
    obj.income = document.getElementById("income-4").value;
    family.push(obj);
    console.log(family);//testing

    document.getElementById("famName-4").value = '';
    document.getElementById("age-4").value = '';
    document.getElementById("relationship-4").value = '';
    document.getElementById("occupation-4").value = '';
    document.getElementById("income-4").value = '';

    displayFam();
  } else {
    alert("Family member details cannot be empty");
  }
}

function addRecord(event) {

  event.preventDefault();

  function getData(e) {
    return document.getElementById(e).value;
  }

  function getRadio(e) {
    let radio = document.getElementsByName(e);

    for (i = 0; i < radio.length; i++) {
      if (radio[i].type == 'radio') {
        if (radio[i].checked) {
          return radio[i].value;
        }
      }
    }
  }

  if (document.getElementById('activityType').value != '') {
    alert("add school activites by clicking the add button");
  } else if (document.getElementById('act').value != '') {
    alert("Add extra curricular activities by clicking add button");
  } else if (document.getElementById('famName-4').value != '') {
    alert("Add family member details by clicking the add button");
  } else {

    //personal information
    let fullName = getData('nameInFull');
    let nameInitials = getData('nameWithInitial');
    let email = getData('email');
    let homeNo = getData('homeno')
    let mobileNo = getData('mobileno');
    let address = getData('homeAddress');
    let gender = getRadio('sex');
    let dob = getData('dob');
    let nic = getData('nic');
    let school = getData('schoolName');

    //A/L Results
    let alExamYear = getData('alExamYear');
    let alIndexNo = getData('alIndexNo');
    let sub_1 = getData('sub1');
    let result_1 = getData('result1');
    let sub_2 = getData('sub2');
    let result_2 = getData('result2');
    let sub_3 = getData('sub3');
    let result_3 = getData('result3');
    let result_4 = getData('result4');
    let result_5 = getData('result5');
    let result_6 = getData('result6');

    sub = {
      subject: sub_1,
      result: result_1
    }
    subject.push(sub);

    sub = {
      subject: sub_2,
      result: result_2
    }
    subject.push(sub);

    sub = {
      subject: sub_3,
      result: result_3
    }
    subject.push(sub);

    sub = {
      subject: 'English',
      result: result_4
    }
    subject.push(sub);

    sub = {
      subject: 'General Knowledge',
      result: result_5
    }
    subject.push(sub);

    sub = {
      subject: 'Z-Score',
      result: result_6
    }
    subject.push(sub);

    // unversity information
    let academicYear = getData('academicYear');
    let uniIndex = getData('uniIndex');
    let cgpa = getData('cgpa');
    let hostel = getRadio('hostel');
    let mahapola = getRadio('schol');

    //Family Details
    let famName_1 = getData('famName-1');
    let famage_1 = getData('age-1');
    let occupation_1 = getData('occupation-1');
    let income_1 = getData('income-1');

    let famName_2 = getData('famName-2');
    let famage_2 = getData('age-2');
    let occupation_2 = getData('occupation-2');
    let income_2 = getData('income-2');

    let famName_3 = getData('famName-3');
    let famage_3 = getData('age-3');
    let occupation_3 = getData('occupation-3');
    let income_3 = getData('income-3');

    fam = {
      name: famName_1,
      age: famage_1,
      relationship: 'Applicant',
      occupation: occupation_1,
      income: income_1
    }
    family.splice(0, 0, fam);

    fam = {
      name: famName_2,
      age: famage_2,
      relationship: 'Father',
      occupation: occupation_2,
      income: income_2
    }
    family.splice(1, 0, fam);

    fam = {
      name: famName_3,
      age: famage_3,
      relationship: 'Mother',
      occupation: occupation_3,
      income: income_3
    }
    family.splice(2, 0, fam);

    let samurdhi = getRadio('samurdi');
    let specialNotes = getData('specialNote');
    //let check = ddd;

    let docData = {
      fullName,
      nameInitials,
      email,
      homeNo,
      mobileNo,
      address,
      gender,
      dob,
      nic,
      school,
      alExamYear,
      alIndexNo,
      subject,
      activities,
      academicYear,
      uniIndex,
      cgpa,
      extra,
      hostel,
      mahapola,
      family,
      samurdhi,
      specialNotes
    }

    console.log(docData);

    db.collection('applicants').add(docData)
      .then((docRef) => {
        // console.log(docRef.id);
        alert('Your application uploaded successfully');
        location.href = "application.html";
      })
      .catch((err) => {
        console.log(err);
        db.collection('errors').doc(Date.now).set(err)
        .then(() => {
          alert(err);
        })
        // .catch((error) => {

        // })
      })

  }
}


