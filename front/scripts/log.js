const role = localStorage.getItem('role');

if (role === 'user') {
    window.location.href = "./user.html";
}
else if (role === 'admin') {
    window.location.href = './admin.html'
}

const login = event => {
    event.preventDefault()

    fetch('https://parcelfiles.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({
            email: document.querySelector('#mail').value,
            password: document.querySelector('#pass').value
        })
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.token) {
                fetch('https://parcelfiles.herokuapp.com/products/user', {
                    headers: {
                    'Authorization' : res.token,
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log('coming from login', data);
                    if ((data.role === 'user') || (data.role === 'admin')) {
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('userId', res.userId);
                        localStorage.setItem('firstname', data.first_name);
                        localStorage.setItem('role', data.role);
                        toastr.success(res.msg);
                        { data.role === 'user' ? (window.location.href = "./user.html") : (window.location.href = './admin.html') };
                        
                    } 
                    else { 
                        toastr.error('Sorry only members can login to this page');
                    }
                })
                .catch(err => console.log("err occured", err))
            } else if(res.msg) {
                toastr.error(res.msg)
            }              
        })
        .catch(err => console.log('err occured', err))    
    }

    document.querySelector('#submiti').addEventListener('submit', login);



