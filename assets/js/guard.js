function guard() {
    var isAdmin = sessionStorage.getItem('admin');
    // console.log(isAdmin);
    if (isAdmin != 'true') {
        location.href = "../../index.html";
    }
}

guard();
