   const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://hassansilim3.github.io/TREX-bot//tonconnect-manifest.json',
  buttonRootId: 'ton-connect'
});

// استماع لحدث الاتصال
tonConnectUI.onStatusChange((status) => {
  if (status === 'CONNECTED') {
    console.log('Connected to wallet');
  } else {
    console.log('Disconnected from wallet');
  }
});

// إنشاء دالة لعرض الرسائل المخصصة
function showCustomAlert(message, imageUrl, callback) {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('custom-alert');
  alertDiv.innerHTML = `<img src="${imageUrl}" class="poiuytrlkn" alt="Image"><p class="poiuhb">${message}</p><button>OK</button>`;
  document.body.appendChild(alertDiv);

  alertDiv.querySelector('button').addEventListener('click', () => {
    document.body.removeChild(alertDiv);
    if (callback) callback();
  });
}

// دالة لتفعيل الزر التالي بعد فترة زمنية
function activateNextButtonWithDelay(currentButton) {
  const nextButton = currentButton.nextElementSibling;
  if (nextButton && (nextButton.classList.contains('qwery') || nextButton.classList.contains('qweryu') || nextButton.classList.contains('qwer') || nextButton.classList.contains('qweryui') || nextButton.classList.contains('qweryuio') || nextButton.classList.contains('qwert'))) {
    setTimeout(() => {
      nextButton.classList.add('enabled');
      nextButton.style.backgroundColor = '#f0f0f0';
      nextButton.style.cursor = 'pointer';
      nextButton.style.color = '#000';

      nextButton.addEventListener('click', async () => {
        const amount = nextButton.getAttribute('data-amount');
        try {
          const transaction = await tonConnectUI.sendTransaction({
            validUntil: Date.now() + 5 * 60 * 1000, // صلاحية 5 دقائق
            messages: [
              {
                address: 'UQDS3dF2uLozPX4cvt8lgTKhH-70pEl3dYCFpsqG5O6hgwNA',
                amount: (parseFloat(amount) * 100000000).toString() // تحويل المبلغ إلى نانوتون
                    }
                  ]
          });
          console.log('Transaction successful:', transaction);
          // تخصيص رسالة النجاح
          showCustomAlert(`🎉 Payment successful! Paid ${amount} TON. Thank you for using our service.`, 'https://example.com/success.png', () => activateNextButtonWithDelay(nextButton));
        } catch (error) {
          console.error('Transaction failed:', error);
          // تخصيص رسالة الفشل
          showCustomAlert('😢 Payment failed. Please try again.', 'https://example.com/failure.png');
        }
      }, { once: true });
    }, 24 * 60 * 60 * 1000); // تأخير يوم واحد (24 ساعة)
  }
}

// حدث الضغط على عنصر الدفع
document.querySelectorAll('.qwe, .qwery, .qweryu, .qwer, .qweryui, .qweryuio, .qwert').forEach(div => {
  div.addEventListener('click', async () => {
    if (!div.classList.contains('enabled')) return;

    const amount = div.getAttribute('data-amount');
    try {
      const transaction = await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000, // صلاحية 5 دقائق
        messages: [
          {
            address: 'UQDS3dF2uLozPX4cvt8lgTKhH-70pEl3dYCFpsqG5O6hgwNA',
            amount: (parseFloat(amount) * 100000000).toString() // تحويل المبلغ إلى نانوتون
                }
              ]
      });
      console.log('Transaction successful:', transaction);
      // تخصيص رسالة النجاح
      showCustomAlert(`🎉 Payment successful! Paid ${amount} TON. Thank you for using our service.`, 'Photoroom-٢٠٢٥٠١٣٠_١٤٥٥٥٦.png', () => {
        // تغيير الزر الحالي إلى اللون الرمادي بعد الدفع الناجح
        div.classList.remove('enabled');
        div.classList.add('disabled');
        div.style.backgroundColor = '#ccc';
        div.style.cursor = 'not-allowed';
        div.style.color = '#aaa';

        activateNextButtonWithDelay(div);
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      // تخصيص رسالة الفشل
      showCustomAlert('😢 Payment failed. Please try again.', 'Photoroom-٢٠٢٥٠١٣٠_٠٩١٥٢٨.png');
    }
  });
});
      
    function showBox(boxId) {
  // إخفاء جميع المربعات
  const boxes = document.querySelectorAll('.boxmax');
  boxes.forEach(box => box.style.display = 'none');

  // عرض المربع المطلوب فقط
  const selectedBox = document.getElementById(boxId);
  selectedBox.style.display = 'block';
}
        
        let points = parseInt(localStorage.getItem('points')) || 0;
        let startTime = parseInt(localStorage.getItem('startTime')) || null;
        let initialPoints = points;
        let mining = false;
        const pointsDisplay = document.getElementById('currentPoints');
        const startButton = document.getElementById('start');
        const miningInterval = 28800; // كل 432 ثانية (432000 مللي ثانية)

        // تحديث عرض النقاط
        function updatePoints() {
            pointsDisplay.textContent = points;
            localStorage.setItem('points', points); // حفظ النقاط في localStorage
        }

        // حساب النقاط بناءً على الوقت المنقضي
        function calculatePoints() {
            if (startTime) {
                const elapsedTime = Date.now() - startTime;
                const intervals = Math.floor(elapsedTime / miningInterval); // حساب الفترات الزمنية المنقضية
                const newPoints = intervals - (parseInt(localStorage.getItem('calculatedIntervals')) || 0); // حساب النقاط الجديدة بناءً على الفترات الزمنية المحسوبة
                points += newPoints > 0 ? newPoints : 0; // إضافة النقاط الجديدة إلى النقاط الموجودة
                localStorage.setItem('calculatedIntervals', intervals); // حفظ الفترات الزمنية المحسوبة
                updatePoints();
            }
        }

        // بدء التعدين
        function startMining() {
            points = parseInt(localStorage.getItem('points')) || 0; // تحديث النقاط عند البدء
            initialPoints = points; // حفظ النقاط الحالية كبداية
            startTime = Date.now(); // تسجيل وقت البدء
            localStorage.setItem('startTime', startTime);
            localStorage.setItem('calculatedIntervals', 0); // إعادة تعيين الفترات الزمنية المحسوبة
            startButton.disabled = true;
            mining = true;
            miningLoop();
        }

        // التعدين بشكل مستمر
        function miningLoop() {
            calculatePoints();
            if (mining) {
                setTimeout(miningLoop, 1000); // يحدث التحديث كل ثانية
            }
        }

        // وقف التعدين
        function stopMining() {
            mining = false;
            startButton.disabled = false;
        }

        // عند تحميل الصفحة
        function onLoad() {
            if (startTime) {
                calculatePoints();
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < 28800000 && (points - initialPoints) < 1000) { // 43200000 مللي ثانية = 12 ساعة، توقف عند 1000 نقطة جديدة
                    mining = true;
                    startButton.disabled = true;
                    miningLoop(); // استمر في التعدين عند الدخول للصفحة
                }
            }
            updatePoints();
        }

        startButton.addEventListener('click', startMining);
        window.addEventListener('load', onLoad);
    


document.addEventListener('DOMContentLoaded', () => {
    let score = parseInt(localStorage.getItem('score')) || 0;
    const scoreDisplay = document.getElementById('score');
    const buttons = {
        button50: 90,
        button150: 150,
        button250: 250,
        button300: 300
    };

    scoreDisplay.textContent = `Score: ${score}`;

    Object.keys(buttons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            setTimeout(() => {
                score += buttons[buttonId];
                scoreDisplay.textContent = `Score: ${score}`;
                localStorage.setItem('score', score);
            }, 15000); // 15000 milliseconds = 15 seconds
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  let score = parseInt(localStorage.getItem('score')) || 0;
  const scoreDisplay = document.getElementById('score');
  const buttons = {
    button50: 50,
  };

  scoreDisplay.textContent = ` ${score}`;

  Object.keys(buttons).forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => {
      setTimeout(() => {
        score += buttons[buttonId];
        scoreDisplay.textContent = ` ${score}`;
        localStorage.setItem('score', score);
      }, 15000); // 15000 milliseconds = 15 seconds
    });
  });
});
        
document.addEventListener("DOMContentLoaded", () => {
  const box1 = document.getElementById("box1");
  const box2 = document.getElementById("box2");
  const box3 = document.getElementById("box3");
  const boxes = [box1, box2, box3];
  const listItems = document.querySelectorAll(".list-item");
  const imagesContainer = document.getElementById("imagesContainer");
  const overlay = document.getElementById("overlay");
  const resultMessage = document.getElementById("resultMessage");
  const scoreElement = document.getElementById("points");
  let points = 0;

  const correctOrder = ["/assets/img/octopus/tgfvc.jpeg", "/assets/img/octopus/copilot_image_1732148679332.jpeg", "/678aee0b72ec7e4c533303b0f31e5677.jpg"];

  const imageSets = {
    1: ["/28c703ca2ebb4b6952eda1c405ea3896.jpg", "/869cd1f570993f592dfa34a5db4e3c7e.jpg", "/a785c5ba54c46f87e6ae0bfc44ba5a58.jpg", "/af4c2facd0329b98dc17b8693d8b1f28.jpg", "/a785c5ba54c46f87e6ae0bfc44ba5a58.jpg", "/28c703ca2ebb4b6952eda1c405ea3896.jpg", "/6ccf05b7b48366249b7ba126f31774a3.jpg", "/Photoroom-٢٠٢٤١٢٣١_٠٨٢٨١٥.png", "/c5fba4d66dada9dc52b220dbf1394a3e.jpg"],
    
    2: ["/assets/img/octopus/copilot_image_1732148679332.jpeg", "/Photoroom-٢٠٢٥٠١٠٣_٢٣١٥٠٦.png","/1bf94f509e7dd8c0cfe1b1521cff67e9.jpg","/ff9eb9cc44377e2d09aa43452cc578e4.jpg","/e1f35f5adadcfafd3f6321a1bb7d115a.jpg", "/918d3dfb2ea84350d760c334aaed3c62.jpg", "/05c37d5f0a7f3c08d550c59b373966b8.jpg"  , "/11d10b918d5878be6e66983dc59f9859.jpg", "/d625676bc8aca6d401f677617460a0ce.jpg"],

 
    
    3: ["/678aee0b72ec7e4c533303b0f31e5677.jpg", "/77fdeb9d0791f13b7e1774c56a02d6f6.jpg", "/6fde83444da459e72f4be5d4b934421f.jpg", "/fa134d5457492af750adf33eec7a41d6.jpg", "/assets/img/octopus/p0o9i8.jpeg", "/tfgvcxz.jpg", "/78c8d320204d707597902b25c7512823.jpg", "/images.jpeg", "/3032c9868cac60b596c63b49387ca4ac.jpg"],
    
    4: ["/09b00ad2281dcdb681dfc5fd1984bdc7.jpg", "/ff3573cd739ed6732043ebbd891ce369.jpg", "/1609f2935ff8fe6e6b08a791302fa098.jpg", "/d4294c4f87ac900261eb0145b1434ad7.jpg", "/0442afcba21d80ed513f6b91377eb300.jpg", "/assets/img/octopus/copilot_image_1732148757774.jpeg", "/7b76ff12b13cb6928d95a95ee1e0cac1.jpg", "/Photoroom-٢٠٢٤١٢٣١_١٢٤٨٢٦.png", "/780e913b4367ca16491f48fc18eeeb7f.jpg"],
    
  };

setTimeout(() => {
            document.getElementById('cover').style.display = 'none';
        }, 50);

  listItems.forEach(item => {
    item.addEventListener("click", () => {
      const set = item.getAttribute("data-set");
      const images = imageSets[set];
      imagesContainer.innerHTML = ''; 
      imagesContainer.classList.remove('hidden'); // Show the container

      images.forEach(imageSrc => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "صورة";
        imagesContainer.appendChild(img);

        img.addEventListener("click", () => {
          const availableBox = boxes.find(box => !box.getAttribute('data-filled'));
          if (availableBox) {
            availableBox.style.backgroundImage = `url(${imageSrc})`;
            availableBox.style.backgroundSize = 'cover'; // Ensure the image fits the box
            availableBox.style.backgroundPosition = 'center';
            availableBox.setAttribute('data-filled', 'true');
            checkWinCondition();
          }
        });
      });
    });
  });

  function checkWinCondition() {
    const selectedImages = boxes.map(box => box.style.backgroundImage.slice(5, -2)); // Extract URL from backgroundImage
    const allFilled = boxes.every(box => box.getAttribute('data-filled') === 'true');

    if (allFilled) {
      if (selectedImages.every((image, index) => image === correctOrder[index])) {
        winGame();
      } else {
        loseGame();
      }
    }
  }

  function winGame() {
    score += 100;
    scoreElement.textContent = score;
    showMessage("تم الكسب! العب مرة أخرى بعد 24 ساعة");
    disableGame();
  }

  function loseGame() {
    showMessage("خسرت! العب مرة أخرى بعد 24 ساعة");
    disableGame();
  }

  function showMessage(message) {
    resultMessage.textContent = message;
    overlay.classList.remove('hidden');
  }

  function disableGame() {
    listItems.forEach(item => item.disabled = true);
    setTimeout(() => {
      overlay.classList.add('hidden');
      resetBoxes();
      listItems.forEach(item => item.disabled = false);
    }, 86400000); // 24 hours in milliseconds
  }

  function resetBoxes() {
    boxes.forEach(box => {
      box.style.backgroundImage = 'none';
      box.removeAttribute('data-filled');
    });
  }
});
     

window.onload = function() {
            var tasks = ['task1', 'task2', 'task3', 'task4'];
            tasks.forEach(function(task) {
                if (localStorage.getItem(task) === 'claimed') {
                    document.getElementById(task).style.display = 'none';
                }
            });
        }

        function claimTask(taskId) {
  // أخفي المهمة
  document.getElementById(taskId).style.display = 'none';
  // خزّن الحالة في Local Storage
  localStorage.setItem(taskId, 'claimed');
}
 
function updateScore(newScore) {
    let currentScore = parseInt(document.getElementById("score").innerText);
    currentScore += newScore;
    document.getElementById("score").innerText = currentScore;
}

        
const playerIcon = document.getElementById('player-icon');
const playerName = document.getElementById('player-name');

//Initialize Telegram Mini App
if (window.Telegram && window.Telegram.WebApp) {
  const playerInfo = document.querySelector('.player__info');

  // Initialize the Telegram Mini App
  const TELEGRAM = window.Telegram.WebApp;

  // Notify Telegram that the web app is ready
  TELEGRAM.ready();

  TELEGRAM.disableVerticalSwipes();

  // Show the block only if the app is running within Telegram
  playerInfo.style.display = 'flex';

  const user = TELEGRAM.initDataUnsafe.user;
  console.log(user);

  // Settings
  TELEGRAM.setHeaderColor('#252F43');
  TELEGRAM.expand(); // Expand the app to 100% height on the user's phone

  function updateProfile() {
    // Display user information in the element
    let level = getCurrentLevel();
    updateImage(level);
    if (user) {
      playerName.textContent = `${user.first_name} - lvl: ${level}`; // Display the user's first name
    } else {
      // playerIcon.src = "assets/img/nopic.png"; // Fallback image if no photo is available
      playerName.textContent = `No user - lvl: ${level}`;
    }
  }
}
//Initialize Telegram Mini App

const $score = document.querySelector('.game__score');
const $balance = document.querySelector('.boost-menu__balance');
const $circle = document.querySelector('.game__clicker-circle');
const $mainImg = document.querySelector('.game__main-image');
const $energy = document.querySelector('.energy__value');
const $maxEnergy = document.querySelector('.energy__max');
 const $toLvlUp = document.querySelector("#to-lvl-up");
const $perTap = document.querySelector('#tap');

function start() {
  setScore(getScore());
  updateLevel();
  setCoinsPerTap(getCoinsPerTap());
  restoreRecoveryState();
  initializeDailyRewards();
}





let $cardContainer = document.querySelector('.mine-tab__grid');


//Coins and Score

function addCoins(coins) {
  setScore(getScore() + coins);
  updateLevel();
}

function getScore() {
  return Number(localStorage.getItem('score')) || 0;
}

function setScore(score) {
  localStorage.setItem('score', score);
  $score.textContent = score;
  $balance.textContent = score;
}

// Level

function getCurrentLevel() {
  return Number(localStorage.getItem('level')) || 0;
}

function setCurrentLevel(level) {
  localStorage.setItem('level', level);
}

function updateLevel() {
  const score = getScore();
  let level = getCurrentLevel();
  let nextLevelScore = '';

  if (score >= 80 && level < 8) {
    level = 8;
    nextLevelScore = 'Max lvl';
  } 
  if (score >= 70 && level < 7) {
    level = 7;
    nextLevelScore = '80';
  }
  if (score >= 60 && level < 6) {
    level = 6;
    nextLevelScore = '70';
  } 
  if (score >= 50 && level < 5) {
    level = 5;
    nextLevelScore = '60';
  } 
  if (score >= 40 && level < 4) {
    level = 4;
    nextLevelScore = '50';
  }  
  if (score >= 30 && level < 3) {
    level = 3;
    nextLevelScore = '40';
  } 
  if (score >= 20 && level < 2) {
    level = 2;
    nextLevelScore = '30';
  }  
  if (score >= 10 && level < 1) {
    level = 1;
    nextLevelScore = '20';
  }  
  if (score >= 0 && level < 0) {
    level = 0;
    nextLevelScore = '10';
  
} else {
 nextLevelScore = level === 8 ? '': 'max lvl';
 nextLevelScore = level === 7 ? '14000': '14k';
 nextLevelScore = level === 6 ? '11500' : '11.5k';
 nextLevelScore = level === 5 ? '9500' : '9.5k';
 nextLevelScore = level === 4 ? '7500' : '7.5k';
 nextLevelScore = level === 0 ? '5000' : '5k';
 nextLevelScore = level === 2 ? '3500' : '3.5k';
 nextLevelScore = level === 1 ? '1000' : '1000';
 nextLevelScore = level === 3 ? '100' : '100';
 
  }

  setCurrentLevel(level);
  $toLvlUp.textContent = nextLevelScore;
  updateImage(level);
  updateProfile();
}

function updateImage(level) {
  const octopusImages = {
    0: 'assets/img/levels/lvl0.png',
    1: 'assets/img/levels/lvl1.png',
    2: 'assets/img/levels/lvl2.png',
    3: 'assets/img/levels/lvl3.png',
    4: 'assets/img/levels/lvl4.png',
    5: 'assets/img/levels/lvl5.png',
    6: 'assets/img/levels/lvl6.png',
    7: 'assets/img/levels/lvl7.png',
    8: 'assets/img/levels/lvl8.png',
    
  };
   playerIcon.src = octopusImages[level]
  playerIcon.setAttribute('src', octopusImages[level]);
}

// Energy regenerator
setInterval(() => {
  if (getEnergy() < getMaxEnergy()) {
    setEnergy(getEnergy() + 1);
  }
}, 2000);

$circle.addEventListener('click', (event) => {
  if (getEnergy() >= getCoinsPerTap()) {
    // Vibration
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    const rect = $circle.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const DEG = 40;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
      $circle.style.setProperty('--tiltX', `0deg`);
      $circle.style.setProperty('--tiltY', `0deg`);
    }, 300);

    const coinsPerTap = getCoinsPerTap();
    const plusCoins = document.createElement('div');
    plusCoins.classList.add('plusCoins');
    plusCoins.textContent = '+' + coinsPerTap;
    plusCoins.style.left = `${event.clientX}px`;
    plusCoins.style.top = `${event.clientY - 60}px`;

    $circle.parentElement.appendChild(plusCoins);

    addCoins(coinsPerTap);
    setEnergy(getEnergy() - getCoinsPerTap());
    updateLevel();
    setMaxEnergy(getMaxEnergy());

    setTimeout(() => {
      plusCoins.remove();
    }, 2000);
  }
});

// Upgrades

const $boostMenu = document.querySelector('.boost-menu');

function toggleBoostMenu() {
  $boostMenu.classList.toggle('active');
}

const $upgradeMenu = document.querySelector('#upgrade-menu');
const $upgradeImg = document.querySelector('#upgrade-img');
const $upgradeTitle = document.querySelector('#upgrade-title');
const $upgradeDescription = document.querySelector('#upgrade-description');
const $upgradeBtn = document.querySelector('#upgrade-button');
const $upgradeCost = document.querySelector('#upgrade-cost');

const $upgrades = document.querySelectorAll(
  '.boost-menu__bosters__upgrade .boost-menu__boost'
);

const $energieUpgrade = document.querySelector('#energie-upgrade');
const $tapUpgrade = document.querySelector('#tap-upgrade');

let PerHourPurchases = localStorage.getItem('PerHourPurchases')
  ? parseInt(localStorage.getItem('PerHourPurchases'))
  : 0;
let PerHourCost = localStorage.getItem('PerHourCost')
  ? parseInt(localStorage.getItem('PerHourCost'))
  : 0;
let NextPerHourIncome = localStorage.getItem('NextPerHourIncome')
  ? parseInt(localStorage.getItem('NextPerHourIncome'))
  : 0;
let PerHourLevel = localStorage.getItem('PerHourLevel')
  ? parseInt(localStorage.getItem('PerHourLevel'))
  : 0;
let multitapPurchases = localStorage.getItem('multitapPurchases')
  ? parseInt(localStorage.getItem('multitapPurchases'))
  : 0;
let multitapCost = localStorage.getItem('multitapCost')
  ? parseInt(localStorage.getItem('multitapCost'))
  : 1000;
let maxEnergyCost = localStorage.getItem('maxEnergyCost')
  ? parseInt(localStorage.getItem('maxEnergyCost'))
  : 1000;


document.querySelector('#multitap-cost').textContent = multitapCost;
document.querySelector('#max-energy-cost').textContent = maxEnergyCost;

for (let upgrade of $upgrades) {
  upgrade.addEventListener('click', (e) => {
    showUpgradeMenu(e.currentTarget);
  });
}

function showUpgradeMenu(upgrade) {
  const imgSrc = upgrade.querySelector('img').src;
  const title = upgrade.querySelector('h3').textContent;
  const cost = upgrade.querySelector('span').textContent;

  $upgradeImg.src = imgSrc;
  $upgradeTitle.textContent = title;
  $upgradeDescription.textContent = `Increase your ${title.toLowerCase()}.`;
  $upgradeCost.textContent = cost;

  $upgradeBtn.addEventListener('click', handleUpgradeClick);

  function handleUpgradeClick() {
    buyUpgrade(upgrade);
    $upgradeBtn.removeEventListener('click', handleUpgradeClick);
  }

  $upgradeMenu.classList.add('active');
}

function hideUpgradeMenu() {
  $cardsUpgradeMenu.classList.remove('active');
  $upgradeMenu.classList.remove('active');
}

function getCoinsPerTap() {
  return parseInt(localStorage.getItem('coinsPerTap')) || 1;
}

function setCoinsPerTap(coins) {
  localStorage.setItem('coinsPerTap', coins);
  $perTap.textContent = coins;
}

function buyUpgrade(upgrade) {
  const currentBalance = getScore();
  const cost = Number($upgradeCost.textContent);
  const upgradeName = $upgradeTitle.textContent.toLowerCase();

  if (currentBalance >= cost) {
    setScore(currentBalance - cost);
    if (upgradeName === 'multitap') {
      upgradeMultitap();
    } else if (upgradeName === 'max energy') {
      upgradeMaxEnergy();
    }
    hideUpgradeMenu();
    startFallingCoins();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Upgrade purchased!',
    });
    // alert("Upgrade purchased!");
  } else {
    hideUpgradeMenu();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'error',
      title: 'Not enough coins!',
    });
  }
}

window.addEventListener('click', function (event) {
  if (event.target === $upgradeMenu || event.target === $cardsUpgradeMenu) {
    hideUpgradeMenu();
  }
});

// Energie

function getMaxEnergy() {
  const maxEnergy = localStorage.getItem('maxEnergy');
  return maxEnergy === null ? 1000 : Number(maxEnergy);
}
function setMaxEnergy(maxEnergy) {
  localStorage.setItem('maxEnergy', maxEnergy);
  $maxEnergy.textContent = maxEnergy;
}

function getEnergy() {
  const energy = localStorage.getItem('energy');
  return energy === null ? 1000 : Number(energy);
}

function setEnergy(energy) {
  localStorage.setItem('energy', energy);
  $energy.textContent = energy;
}
function upgradeMaxEnergy() {
  setMaxEnergy(getMaxEnergy() + 500);
  maxEnergyCost += 1000;
  localStorage.setItem('maxEnergyCost', maxEnergyCost);
  document.querySelector('#max-energy-cost').textContent = maxEnergyCost;
}

function upgradeMultitap() {
  if (multitapPurchases < 8) {
    setCoinsPerTap(getCoinsPerTap() + 1);
    multitapPurchases++;
    multitapCost += 1000;
    localStorage.setItem('multitapPurchases', multitapPurchases);
    localStorage.setItem('multitapCost', multitapCost);
    document.querySelector('#multitap-cost').textContent = multitapCost;
  } else {
    alert('Multitap upgrade is maxed out!');
  }
}

const $energyBoost = document.querySelector('.boost-menu__boost__energy');
const $energyLimit = document.querySelector('#energy-limit');
const $energyTimer = document.querySelector('#energy-timer');
let energyBoostLimit = 1;
let recoveryTime = 60 * 60 * 1000; // 60 min in milliseconds
let recoveryInterval;
let remainingTime = recoveryTime;

function startRecoveryTimer(startTime) {
  recoveryInterval = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    remainingTime = recoveryTime - elapsedTime;

    if (remainingTime <= 0) {
      energyBoostLimit = 1;
      $energyLimit.textContent = energyBoostLimit;
      $energyBoost.classList.remove('disabled');
      $energyTimer.textContent = '';
      clearInterval(recoveryInterval);
      localStorage.removeItem('recoveryEndTime');
    } else {
      let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      let seconds = Math.floor((remainingTime / 1000) % 60);
      $energyTimer.innerHTML = `${minutes} min<br> ${seconds} sec`;
      localStorage.setItem('remainingTime', remainingTime);
      localStorage.setItem('recoveryEndTime', startTime + recoveryTime);
    }
  }, 1000);
}

function restoreRecoveryState() {
  let recoveryEndTime = localStorage.getItem('recoveryEndTime');
  if (recoveryEndTime) {
    let timeLeft = recoveryEndTime - Date.now();
    if (timeLeft > 0) {
      energyBoostLimit = 0;
      $energyLimit.textContent = energyBoostLimit;
      $energyBoost.classList.add('disabled');
      recoveryTime = timeLeft;
      startRecoveryTimer(Date.now() - (recoveryTime - timeLeft));
    } else {
      localStorage.removeItem('recoveryEndTime');
      localStorage.removeItem('remainingTime');
    }
  }
}

$energyBoost.addEventListener('click', () => {
  if (energyBoostLimit > 0) {
    setEnergy(getMaxEnergy());
    energyBoostLimit--;
    $energyLimit.textContent = energyBoostLimit;
    $energyBoost.classList.add('disabled');
    let startTime = Date.now();
    startRecoveryTimer(startTime);
  }
});



function getCoinsPerHour() {
  return localStorage.getItem('coinsPerHour') ?? 0;
}

let accumulatedCoins = 0;
let coinsIntervalId = null;

function startCoinAccumulation() {
  if (coinsIntervalId) {
    clearInterval(coinsIntervalId);
  }

  coinsIntervalId = setInterval(() => {
    accumulatedCoins += getCoinsPerHour() / 3600;
    if (accumulatedCoins >= 1) {
      addCoins(Math.floor(accumulatedCoins));
      accumulatedCoins -= Math.floor(accumulatedCoins);
    }
  }, 1000);
}

function updateCoinsPerHour(coins) {
  setCoinsPerHour(Number(getCoinsPerHour()) + coins);
  PerHourPurchases++;
  PerHourCost += 10;
  NextPerHourIncome = PerHourCost / 10;
  PerHourLevel += 1;

  localStorage.setItem('PerHourPurchases', PerHourPurchases);
  localStorage.setItem('PerHourCost', PerHourCost);
  localStorage.setItem('NextPerHourIncome', NextPerHourIncome);
  localStorage.setItem('PerHourLevel', PerHourLevel);

  
  


  startCoinAccumulation();
}

if (getCoinsPerHour() > 0) {
  startCoinAccumulation();
}

const $barItems = document.querySelectorAll('.menu-bar__item');
const $tabContents = document.querySelectorAll('.tab-content');
const $gameContent = document.querySelectorAll(
  '.game__header, .game__clicker-circle, .game__footer, .info'
);

$barItems.forEach((barItem) => {
  barItem.addEventListener('click', (e) => {
    e.preventDefault();

    $barItems.forEach((item) => {
      item.classList.remove('menu-bar__item__active');
    });

    barItem.classList.add('menu-bar__item__active');

    const targetId = barItem.getAttribute('href').substring(1);

    $tabContents.forEach((tabContent) => {
      tabContent.classList.remove('tab-content__active');
    });

    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add('tab-content__active');
    }

    if (targetId === 'home') {
      $gameContent.forEach((element) => element.classList.remove('hidden'));
    } else {
      $gameContent.forEach((element) => element.classList.add('hidden'));
    }
  });
});
const $mineTabItems = document.querySelectorAll('.mine-tab__card');

$mineTabItems.forEach(($mineTabItem) => {
  $mineTabItem.addEventListener('click', (e) => {
    showCardsUpgradeMenu(e.currentTarget);
  });
});

const $cardsUpgradeMenu = document.querySelector('#cards-upgrade-menu');
const $cardsUpgradeImg = document.querySelector('#cards-upgrade-img');
const $cardsUpgradeTitle = document.querySelector('#cards-upgrade-title');
const $cardsUpgradeDescription = document.querySelector(
  '#cards-upgrade-description'
);
const $cardsUpgradeBtn = document.querySelector('#cards-upgrade-button');
const $cardsUpgradeCost = document.querySelector('#cards-upgrade-cost');
const $cardsUpgradeIncome = document.querySelector('#cards-upgrade-income');

function showCardsUpgradeMenu(card) {
  const imgSrc = card.querySelector('img').src;
  const title = card.querySelector('h3').textContent;
  const cost = card.querySelector('span').textContent.trim();
  const description = card.querySelector('p').textContent;
  

  $cardsUpgradeImg.src = imgSrc;
  $cardsUpgradeTitle.textContent = title;
  $cardsUpgradeDescription.textContent = description;
  $cardsUpgradeCost.textContent = cost;
  $cardsUpgradeIncome.textContent = ` +${income} `;

  $cardsUpgradeBtn.addEventListener('click', handleUpgradeClick);

  function handleUpgradeClick() {
    buyCardUpgrade(card);
    $cardsUpgradeBtn.removeEventListener('click', handleUpgradeClick);
  }

  $cardsUpgradeMenu.classList.add('active');
}

function buyCardUpgrade(card) {
  const currentBalance = getScore();
  const cost = parseNumber($cardsUpgradeCost.textContent);
  const income = parseNumber($cardsUpgradeIncome.textContent);
  if (PerHourPurchases < 10) {
    if (currentBalance >= cost) {
      setScore(currentBalance - cost);
      updateCoinsPerHour(income);
      hideUpgradeMenu();
      startFallingCoins();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Upgrade purchased!',
      });
      // alert("Upgrade purchased!");
    } else {
      hideUpgradeMenu();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: 'Not enough coins!',
      });
      // alert("Not enough coins!");
    }
  } else {
    hideUpgradeMenu();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'warning',
      title: 'Invest level is maxed out!',
    });
    // alert("Invest level is maxed out!");
  }
}

function parseNumber(value) {
  return Number(value.replace(/[^0-9.-]+/g, ''));
}

const container = document.querySelector('body');

function createCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin-fall');
  coin.style.left = Math.random() * window.innerWidth + 'px';
  coin.style.animationDuration = 2 + 's';
  container.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 2000);
}

let intervalId = null;

function startFallingCoins() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  intervalId = setInterval(createCoin, 200);

  setTimeout(() => {
    clearInterval(intervalId);
    intervalId = null;
  }, 300);
}

const $dailyRewardBtn = document.querySelector('#dailyRewardBtn');
const $dailyRewardPopup = document.querySelector('#dailyRewardPopup');
const $popupCloseBtn = document.querySelector('#popupCloseBtn');
const $claimDailyRewardBtn = document.querySelector('#popupClaimBtn');
const $dailyRewardDays = document.querySelectorAll('.popup__day');

const today = new Date().toISOString().slice(0, 10);

function initializeDailyRewards() {
  const lastRewardDate = localStorage.getItem('lastRewardDate');
  let previousDay = parseInt(localStorage.getItem('previousDay')) || 1;

  // Remove the current and completed status from all reward days
  $dailyRewardDays.forEach((day) =>
    day.classList.remove('popup__day__current', 'popup__day__completed')
  );

  if (!lastRewardDate || lastRewardDate !== today) {
    if (lastRewardDate) {
      // Calculate the number of days since the last reward
      const daysSinceLastReward = Math.floor(
        (new Date(today) - new Date(lastRewardDate)) / (1000 * 60 * 60 * 24)
      );
      previousDay = Math.min(
        previousDay + daysSinceLastReward,
        $dailyRewardDays.length
      );
    } else {
      // If this is the user's first visit
      previousDay = 1;
    }

    // Update the previous day in localStorage
    setPreviousDay(previousDay);
  }

  // Ensure previousDay does not exceed the number of available days
  if (previousDay > $dailyRewardDays.length) {
    previousDay = 1;
    setPreviousDay(previousDay);
  }

  // Update the display of reward days in the popup
  const currentRewardDayNum = getPreviousDay();
  const $currentRewardDay = $dailyRewardDays[currentRewardDayNum - 1];
  if ($currentRewardDay) {
    $currentRewardDay.classList.add('popup__day__current');

    for (let i = 0; i < currentRewardDayNum - 1; i++) {
      $dailyRewardDays[i].classList.add('popup__day__completed');
    }
  }

  updateClaimButtonStatus();
}

function updateClaimButtonStatus() {
  const lastRewardDate = localStorage.getItem('lastRewardDate');

  // Disable the claim button if today's reward has already been claimed
  if (lastRewardDate === today) {
    $claimDailyRewardBtn.setAttribute('disabled', 'true');
  } else {
    $claimDailyRewardBtn.removeAttribute('disabled');
  }
}

function setLastRewardDate(date) {
  localStorage.setItem('lastRewardDate', date);
}

function getPreviousDay() {
  return parseInt(localStorage.getItem('previousDay')) || 1;
}

function setPreviousDay(day) {
  localStorage.setItem('previousDay', day);
}

$claimDailyRewardBtn.addEventListener('click', () => {
  const currentDay = getPreviousDay();
  const reward = parseInt(
    $dailyRewardDays[currentDay - 1].querySelector('.popup__day-coins')
      .textContent
  );

  addCoins(reward);
  startFallingCoins();

  setLastRewardDate(today); // Update the last reward date immediately
  $dailyRewardDays[currentDay - 1].classList.add('popup__day__completed');

  const nextDay = currentDay + 1;
  if (nextDay > $dailyRewardDays.length) {
    setPreviousDay(1);
  } else {
    setPreviousDay(nextDay);
  }

  initializeDailyRewards();
});

$dailyRewardBtn.addEventListener('click', () => {
  initializeDailyRewards();
  $dailyRewardPopup.style.display = 'flex'; // Show the popup after initializing
});

$popupCloseBtn.addEventListener('click', () => {
  $dailyRewardPopup.style.display = 'none';
});

start();
