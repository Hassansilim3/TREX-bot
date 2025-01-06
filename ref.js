// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const usernameCont = document.querySelector(".usernameCont");
const usernameinput = document.querySelector("#usernameinput");
const submitBtn = document.querySelector("#submitBtn");
const refForm = document.querySelector("#refForm");
const CopyBtn = document.querySelector("#CopyBtn");
const ref_no_cont = document.querySelector(".ref_no_cont");
const refCont = document.querySelector("#refCont");
let userName;

const firebaseConfig = {
  apiKey: "AIzaSyD7N60pjSZd2cX5b7sC8VEWkq4DTWYnhyI",
  authDomain: "sapatg-ba630.firebaseapp.com",
  projectId: "sapatg-ba630",
  storageBucket: "sapatg-ba630.appspot.com",
  messagingSenderId: "213739469633",
  appId: "1:213739469633:web:af96904eab332a5842bfc0",
  measurementId: "G-YTGY6LXV2N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// *****
const db = getDatabase();

//
document.addEventListener('DOMContentLoaded', () => {
    let score = parseInt(localStorage.getItem('score')) || 0;
    const scoreDisplay = document.getElementById('score');
    const submitBtn = document.getElementById('submitBtn');

    scoreDisplay.textContent = `Score: ${score}`;

    submitBtn.addEventListener('click', () => {
        setTimeout(() => {
            score += 100; // يمكنك تغيير القيمة هنا إذا أردت
            scoreDisplay.textContent = ` ${score}`;
            localStorage.setItem('score', score);
        }, 1000); // 15000 milliseconds = 15 seconds
    });
});

const renderRefBoard = (refData) => {
  if (refData.length > 0) {
    console.log(refData);
    let refBoardHtml = refData
      .map((ref, idx) => {
        return `
         <li>
            <div class="dp">
            ${ref.username.toString().charAt(0).toUpperCase()}
            </div>
            <h2>
              ${ref.username} 
              <span>+${ref.score} Rex</span>
            </h2>
          </li>
    `;
      })
      .join("");

    refCont.innerHTML = refBoardHtml;
  console.log(taskBoardHtml);
  }
};

//FUNCTIONS
const topUpRef = async (e) => {
  e.preventDefault();
  const refUsername = usernameinput.value;
  const userReferralsRef = ref(db, `users/${refUsername}/referrals`);
  const userReferralsSnapshot = await get(userReferralsRef);
  const currentReferrals = userReferralsSnapshot.exists()
    ? userReferralsSnapshot.val()
    : [];
  const updatedReferrals = Array.isArray(currentReferrals)
    ? [...currentReferrals, userName]
    : [userName];
   console.log(updatedReferrals);
  update(ref(db, `users/${refUsername}`), {
    referrals: updatedReferrals,
  });
  update(ref(db, `users/${userName}`), {
    referred: true,
  });
  // Points
  const userPointsRef = ref(db, `users/${refUsername}/score`);
  get(userPointsRef).then((snapshot) => {
     console.log(snapshot.val());
    const score = snapshot.exists() ? snapshot.val() : 0;
    update(ref(db, `users/${refUsername}`), {
      score: Number(score) + 1,
    });
    e.target.parentNode.remove();
  });
   console.log(refUsername);
};

//
const copyUsername = () => {
  navigator.clipboard.writeText(userName);
};
// EVENTS
submitBtn.addEventListener("click", topUpRef);
CopyBtn.addEventListener("click", copyUsername);
// RUNS WHEN THE WEBSITE LOADS
window.addEventListener("load", async () => {
   userName = "Nuelyoungtech";
  if (window.Telegram && window.Telegram.WebApp) {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    userName = user.username;
    usernameCont.innerHTML = userName;
    const userReferredRef = ref(db, `users/${userName}/referred`);
    const userReferredSnapsot = await get(userReferredRef);
    const refExists = userReferredSnapsot.exists()
      ? userReferredSnapsot.val()
      : false;
    if (refExists) {
      const userReferralsRef = ref(db, `users/${userName}/referrals`);
      const userReferralsSnapshot = await get(userReferralsRef);
      const currentReferrals = userReferralsSnapshot.exists()
        ? userReferralsSnapshot.val()
        : [];
      if (currentReferrals.length > 0) {
        ref_no_cont.innerHTML = currentReferrals.length;
         console.log(currentReferrals);
        const referralDetails = await Promise.all(
          currentReferrals.map(async (refItem) => {
            const refDataSnapshot = await get(
              ref(db, `users/${refItem}/score`)
            );
            const score = refDataSnapshot.exists() ? refDataSnapshot.val() : 1;
            const details = {
              username: refItem,
              score: score,
            };
            return details;
          })
        );
        renderRefBoard(referralDetails);
      }
    } else {
      refForm.classList.add("show"); //aded this extra
    }
  }
});
