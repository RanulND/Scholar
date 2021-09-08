var db = firebase.firestore()
applicant = {};
function login(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let token = document.getElementById('password').value;

    var user = db.collection('admin-users').doc(username);

    user.get().then((doc) => {
        // console.log(doc.data());
        if (doc.exists) {
            if (doc.data().token === token) {
                // console.log('logged-in');
                // console.log(doc.data()); //session storage daanna
                sessionStorage.setItem('admin', JSON.stringify(doc.data().admin));
                sessionStorage.setItem('level', JSON.stringify(doc.data().level));

                if(doc.data().admin == "true"){
                    location.href = "dashboard/index.html";
                } 
            } else {
                alert("Incorrect Password");
                console.log('Incorrect Password');
            }
        } else {
            alert("Incorrect Username");
            console.log('Incorrect Username');
        }
    }).catch((err) => {
        console.log(err);
    });
}

function adminAdd() {
    let admin = {};
    admin.name = document.getElementById("username").value;
    admin.token = document.getElementById("password").value;
    if (admin.name != '' && admin.token != '') {
        admin.admin = true;
        admin.level = 1;
        db.collection('admin-users').doc(admin.name).set(admin)
            .then(() => {
                console.log(admin);
                alert("admin created");
                document.getElementById("username").value = '';
                document.getElementById("password").value = '';
            }).catch((err) => {
                console.log(err);
            })
    }
}

function getAdmins() {
    let res = '';
    db.collection('admin-users').get()
        .then((snap) => {
            snap.forEach((doc) => {
                console.log(doc.data());
                res += '<div class="col-md-7 text-center"><p style="font-size: 21px;">' + doc.data().name + '</p></div><div class="col-md-5 text-left"><button class="btn text-center" style="background-color: #dfbe07; color: #FFF;" onclick="deleteAdmin(\'' + doc.data().name + '\')">Delete&nbsp;&nbsp;<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABY0lEQVRIS72V4TFFMRCFv1cBHaACVIAOqAAVoBJUgApQAR2gAzqgAuaYrNm7d5P78mauzORPbnK+ze7Z3AUzj8XM+iwDOAH2gJ0yFdNrmQ/AYyvIFuAQuAQ2J275DlwAgo1GDXAFnHWmT2cEGowMsIq4iV4D554QAUrLfWfkcfuRT1cEKJ8bCeALWAvr2Zq2SGPL9nqA3HKTiJ8Wxzw7iMT3i6uyM3+38IBb4DgAPoGDApBNBdGQuKyqtSdgPZy7AxTwoA90YDu5QYRYH9TE7ftuBHw3iush2tYSH6Tfp6gFsJzrlgbwNcli+9X2gFqKvLgi9ymqQd7sWZkqssSUS19QrfnCvyThp0WuNZncpQ71brGaqGuj88RLbWpNkjVao/6jTx/+gfz3p0LhzPrY2X1XgYxe0mjTmEwVXaCpmijnKnbXD8fDBNJUD9hTIp/LuhJNhQft3GOR3r3L/PR7NQf7fwBDLk0ZyC9d1QAAAABJRU5ErkJggg==" /></button></div>';
            })
            document.getElementById("displayAdmin").innerHTML = res;
        });

}

function deleteAdmin(id) {
    db.collection('admin-users').doc(id).delete()
        .then(() => {
            getAdmins();
        }).catch((err) => {
            alert(err);
        })
}


function getAllusers() {
    let level = JSON.parse(sessionStorage.getItem('level'));
    if (level == '0') {
        document.getElementById("admin").innerHTML = '<a class="nav-link scrollto" href="add-admin.html">Admins</a>'
    }
    let id = 0, res = '';
    // console.log('wada');
    db.collection('applicants').get()
        .then((snap) => {
            snap.forEach((doc) => {
                res += '<div class="row px-5"><div class="col-md-6 text-left"><p><strong>' + (id + 1).toString() + '.&nbsp;</strong>' + doc.data().fullName + '</p></div><div class="col-md-2 text-center">' + doc.data().academicYear + '</div><div class="col-md-2 text-center">' + doc.data().uniIndex + '</div><div class="col-md-2 text-center"><button class="btn px-3 view" onclick="getUser(\'' + doc.id + '\')">View</button></div><hr></div>';
                id++;
            })
            document.getElementById('users').innerHTML = res;
        });
}

function getUser(id) {

    db.collection('applicants').doc(id).get()
        .then((doc) => {
            let userData = JSON.stringify(doc.data());
            sessionStorage.setItem('userData', userData);
            location.href = "applicant.html";
            // displayUser();
        })

}

function displayUser() {
    let userData = {}, i, res = '';
    userData = JSON.parse(sessionStorage.getItem('userData'));

    document.getElementById("fullname").innerHTML = userData.fullName;
    document.getElementById("initials").innerHTML = userData.nameInitials;
    document.getElementById("gender").innerHTML = userData.gender;
    document.getElementById("email").innerHTML = userData.email;
    document.getElementById("mobile").innerHTML = userData.mobileNo;
    document.getElementById("landline").innerHTML = userData.homeNo;
    document.getElementById("dob").innerHTML = userData.dob;
    document.getElementById("nic").innerHTML = userData.nic;
    document.getElementById("address").innerHTML = userData.address;
    document.getElementById("school").innerHTML = userData.school;
    document.getElementById("hostel").innerHTML = userData.hostel;
    document.getElementById("mahapola").innerHTML = userData.mahapola;
    document.getElementById("samurdi").innerHTML = userData.samurdhi;
    document.getElementById("notes").innerHTML = userData.specialNotes;
    document.getElementById("index").innerHTML = userData.uniIndex;
    document.getElementById("acayear").innerHTML = userData.academicYear;
    document.getElementById("cgpa").innerHTML = userData.cgpa;

    displaySubjects();
    displayActivities();
    displayExtra();
    displayFamily();


    function displaySubjects() {
        res = '';
        for (i = 0; i < userData.subject.length; i++) {
            res += '  <div class="col-md-3 mb-3"><label>' + userData.subject[i].subject + '</label></div><div class="col-md-3 mb-3"><p>' + userData.subject[i].result + '</p></div>'
        }
        document.getElementById("alresults").innerHTML = res;
    }

    function displayActivities() {
        res = '';
        if (userData.activities.length == 0) {
            res = '<div class="text-center"><p>No extra curricular activities in school</p></div>';
        } else {
            for (i = 0; i < userData.activities.length; i++) {
                res += '<div class="col-md-3"><label>Activity</label></div><div class="col-md-9"><p>' + userData.activities[i].activity + '</p></div>';
                if (userData.activities[i].district != '') {
                    res += '<div class="col-md-3"><label>&emsp;District</label></div><div class="col-md-9"><p>' + userData.activities[i].district + '</p></div>';
                }
                if (userData.activities[i].provincial != '') {
                    res += '<div class="col-md-3"><label>&emsp;Provincial</label></div><div class="col-md-9"><p>' + userData.activities[i].provincial + '</p></div>'
                }
                if (userData.activities[i].national != '') {
                    res += '<div class="col-md-3"><label>&emsp;National</label></div><div class="col-md-9"><p>' + userData.activities[i].national + '</p></div>'
                }
            }
        }
        document.getElementById("schoolact").innerHTML = res;
    }


    function displayExtra() {
        res = '';
        if (userData.extra.length == 0) {
            res = '<div class="text-center"><p>No extra curricular activities /Acievements in university</p></div>'
        } else {
            for (i = 0; i < userData.extra.length; i++) {
                res += '<div class="col-md-4 mb-3">' + (i + 1).toString() + '.&nbsp;' + userData.extra[i].extraAct + '</div><div class="col-md-4 mb-3 text-center">' + userData.extra[i].role + '</div><div class="col-md-4 mb-3 text-center">' + userData.extra[i].year + '</div>';
            }
        }
        document.getElementById("achievements").innerHTML = res;
    }

    function displayFamily() {
        res = '';
        for (i = 0; i < userData.family.length; i++) {
            res += '<label style="font-size: 20px;">' + (i + 1).toString() + '.&nbsp;' + userData.family[i].relationship + ' - ' + userData.family[i].name + ' - ' + userData.family[i].age + '</label><div class="row mb-3 mt-3"><div class="col-md-3"><label>Occupation</label></div><div class="col-md-3"><p>' + userData.family[i].occupation + '</p></div><div class="col-md-3"><label>Gross monthly income</label></div><div class="col-md-3">' + userData.family[i].income + '</div></div>'
        }
        document.getElementById("family").innerHTML = res;
    }

}

function logOut() {
    sessionStorage.clear();
    location.href = "../index.html";
}


