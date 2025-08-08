import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getRedirectResult, sendPasswordResetEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

// Signup functionality
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
            alert("Error: " + errorMessage);
        });
    })
}

// Login functionality
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
            alert("Error: " + errorMessage);
        });
    })
}

// Google Signup
let swithGoogle = document.getElementById("swithGoogle")
if(swithGoogle){
    swithGoogle.addEventListener("click", ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location.href = "folder/dashboard.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert("Error: " + errorMessage);
        });
    })
}

// Google Login
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
            alert("Error: " + error.message);
        });
    });
}

// Forget Password functionality
let forgetPasswordBtn = document.getElementById("forgetPasswordBtn");
if(forgetPasswordBtn){
    forgetPasswordBtn.addEventListener("click", () => {
        let email = document.getElementById("forgetEmail").value;
        if(!email) {
            alert("Please enter your email address");
            return;
        }
        
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent! Check your inbox.");
            // Hide forget password modal/form
            const forgetPasswordModal = document.getElementById("forgetPasswordModal");
            if(forgetPasswordModal) {
                forgetPasswordModal.classList.add("hidden");
            }
        })
        .catch((error) => {
            console.log("Forget password error:", error.message);
            alert("Error: " + error.message);
        });
    });
}

// Change Password functionality
let changePasswordBtn = document.getElementById("changePasswordBtn");
if(changePasswordBtn){
    changePasswordBtn.addEventListener("click", () => {
        const user = auth.currentUser;
        if(!user) {
            alert("Please login first");
            return;
        }

        let currentPassword = document.getElementById("currentPassword").value;
        let newPassword = document.getElementById("newPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if(!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if(newPassword !== confirmPassword) {
            alert("New passwords don't match");
            return;
        }

        if(newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        reauthenticateWithCredential(user, credential)
        .then(() => {
            // Now change password
            return updatePassword(user, newPassword);
        })
        .then(() => {
            alert("Password changed successfully!");
            // Clear form
            document.getElementById("currentPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";
            
            // Hide change password modal/form
            const changePasswordModal = document.getElementById("changePasswordModal");
            if(changePasswordModal) {
                changePasswordModal.classList.add("hidden");
            }
        })
        .catch((error) => {
            console.log("Change password error:", error.message);
            alert("Error: " + error.message);
        });
    });
}

// Close modal functionality
let closeModalBtns = document.querySelectorAll(".closeModal");
closeModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        if(modal) {
            modal.classList.add("hidden");
        }
    });
});

// Show modal functionality
let showForgetPasswordBtn = document.getElementById("showForgetPassword");
if(showForgetPasswordBtn){
    showForgetPasswordBtn.addEventListener("click", () => {
        const modal = document.getElementById("forgetPasswordModal");
        if(modal) {
            modal.classList.remove("hidden");
        }
    });
}

let showChangePasswordBtn = document.getElementById("showChangePassword");
if(showChangePasswordBtn){
    showChangePasswordBtn.addEventListener("click", () => {
        const modal = document.getElementById("changePasswordModal");
        if(modal) {
            modal.classList.remove("hidden");
        }
    });
}