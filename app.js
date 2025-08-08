  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup , getRedirectResult} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAQ4DRgtsImXSoXxDIYpMEkkUlCk_iQaTM",
    authDomain: "programmingwithibrahim-4f61f.firebaseapp.com",
    projectId: "programmingwithibrahim-4f61f",
    storageBucket: "programmingwithibrahim-4f61f.firebasestorage.app",
    messagingSenderId: "90334252028",
    appId: "1:90334252028:web:d4f96c658cbb72fcf9c079",
    measurementId: "G-NVT63LPG78"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();





let sbtn = document.getElementById("sbtn");
if(sbtn){

    sbtn.addEventListener("click", ()=>{
        
        
        let email = document.getElementById("semail").value
        let password = document.getElementById("spass").value
        
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email)
            window.location.href = "folder/login.html"
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
    });
    
})

}







let lbtn = document.getElementById("lbtn")
if(lbtn){
    
    lbtn.addEventListener("click", async()=>{
        let email = document.getElementById("lemail").value
        let password = document.getElementById("lpass").value
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            console.log(user.email)
            alert("Login Successfuly")
            window.location.href = "dashboard.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)


        });
    })
}





let swithGoogle = document.getElementById("swithGoogle")

if(swithGoogle){
swithGoogle.addEventListener("click", ()=>{

    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

})

}


let lwithGoogle = document.getElementById("lwithGoogle");
if(lwithGoogle){


    lwithGoogle.addEventListener("click", () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google Login:", user.email);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.log("Google login error:", error.message);
    });
});


}