
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details')

//conditional menu links
const setupUI = (user) => {
    if(user){
  //account info
  db.collection('users').doc(user.uid).get().then(doc => {
    const html = `
    <div> Logged in as ${user.email}</div>
    <div> Aadhar card number ${doc.data().bio}</div>
    `;
    accountDetails.innerHTML = html;
    });

    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    } else{
    //hide account info
    accountDetails.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    }
  }

//setup guides
const setupGuides = (data) => {
  // data.docs.forEach(doc =>{
  //   console.log(doc.data());
  // })

  if(data.length){ 
  let html = '';
  data.forEach(doc => {
      const guide = doc.data();
      console.log(guide);
      
      const li = `
      <li>
      <div class="collapsible-header  grey lighten-4">${guide.title}</div>
      <div class = "cyan lighten-3">${guide.da}</div>
      <div class="collapsible-body grey lighten-1">${guide.content}</div>
      <div class="collapsible-body grey">${guide.text}</div>
      </li>
      `;
      html += li
    });
    guideList.innerHTML = html;

   } else{
     
     guideList.innerHTML = `<h5 class='center-align'>
     <span class='blue-grey lighten-4'> 
     Your Health is our Wealth</span>
     </h5>
     <h4 class='center-align'>Join us today for better tomorrow</h4>`
   }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });