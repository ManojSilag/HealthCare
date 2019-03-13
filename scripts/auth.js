// get data
db.collection('guides').get().then(snapshot => {
    setupGuides(snapshot);
})

//Listen for auth status changes
auth.onAuthStateChanged(user => {
    //console.log(user);
    if(user){
        console.log('In: ', user );
        // get data
        db.collection('guides').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
        }, err =>{
            console.log(err.message);
        });

    } else {
        setupUI();
        setupGuides([]);
        console.log('out');
        
    }
});

//create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var d = new Date();
    var n = d.toString();
    db.collection('guides').add({
        da: n,
        title: createForm['title'].value,
        content: createForm['content'].value,
        text: createForm['text'].value
    }).then(() => {
    //close the modal and reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
});

// signUp
const signupForm = document.getElementById('signup-form');
//console.log(signupForm);

    signupForm.addEventListener('submit',(e) =>{
        e.preventDefault();

        //Get user info
        const email =signupForm['signup-email'].value
        //console.log(email);
        const password = signupForm['signup-password'].value
        //console.log(password);

        //sighing up the user 
        auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                bio: signupForm['signup-bio'].value
            })
           .then(() =>{
            console.log(cred.user);
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
            })
        })
        .catch(err =>{
        alert(err.message)
        })
    });

//Logout 
const logout = document.querySelector('#logout');

    logout.addEventListener('click',(e) => {
        e.preventDefault();
        auth.signOut()
            .catch(err =>{
            alert(err.message)
            })
    });

//Login
const loginForm = document.querySelector('#login-form');

    loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

        //Get user info
        const email =loginForm['login-email'].value
        //console.log(email);
        const password = loginForm['login-password'].value
        //console.log(password);

        auth.signInWithEmailAndPassword(email, password)
        .then((cred) =>{
        //console.log(cred.user);

        //close the login model and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        })
    });