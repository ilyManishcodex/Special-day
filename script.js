// DOM Elements
const setupStageBtn = document.getElementById('setupStageBtn');
const forMyBtn = document.getElementById('forMyBtn');
const curtainLeft = document.getElementById('curtainLeft');
const curtainRight = document.getElementById('curtainRight');
const curtainStage = document.getElementById('curtainStage');
const forYouBtn = document.getElementById('forYouBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const teddyContainer = document.getElementById('teddyContainer');
const letterPanel = document.getElementById('letterPanel');
const stepPraise = document.getElementById('stepPraise');
const praiseText = document.getElementById('praiseText');
const praiseLong = document.getElementById('praiseLong');
const praiseContinueBtn = document.getElementById('praiseContinueBtn');
const praiseTopGif = document.getElementById('praiseTopGif');
const celebrationBtn = document.getElementById('celebrationBtn');
const step4 = document.getElementById('step4');
const cutCakeBtn = document.getElementById('cutCakeBtn');
const wholeCake = document.getElementById('wholeCake');
const leftCake = document.getElementById('leftCake');
const rightCake = document.getElementById('rightCake');
const knife = document.getElementById('knife');
const giftBoxBtn = document.getElementById('giftBoxBtn');
const aapkiTareefBtnStep4 = document.getElementById('aapkiTareefBtnStep4');
const goodAfternoonGif = document.getElementById('goodAfternoonGif');
const step6 = document.getElementById('step6');
const sunoWrapper = document.getElementById('sunoWrapper');
const heheheGif = document.getElementById('heheheGif');
const sunoHint = document.getElementById('sunoHint');
const sunoBtn = document.getElementById('sunoBtn');
const giftContainer = document.getElementById('giftContainer');
const wishesPanel = document.getElementById('wishesPanel');
const giftImg = document.getElementById('giftImg');
const birthdaySong = document.getElementById('birthdaySong');
const specialBtn = document.getElementById('specialBtn');
const progressHint = document.getElementById('progressHint');
const peekingCat = document.getElementById('peekingCat');
const setupStageWrapper = document.getElementById('setupStageWrapper');
const specialPartyStage = document.getElementById('specialPartyStage');
const specialPartyYesBtn = document.getElementById('specialPartyYesBtn');
const specialPartyNoBtn = document.getElementById('specialPartyNoBtn');
const specialPartyNoStage = document.getElementById('specialPartyNoStage');
const specialPartyConfirmBtn = document.getElementById('specialPartyConfirmBtn');



function updateHint(text) {
    progressHint.innerText = text;
    progressHint.classList.remove('fade-in');
    void progressHint.offsetWidth; // trigger reflow
    progressHint.classList.add('fade-in');
}

// Show the 'suno' flow: hint above a 'Suno' button, which when clicked reveals praise and the gift
function startSunoFlow() {
    if (stepPraise) {
        goToPraiseStep();
        if (praiseTopGif) praiseTopGif.style.display = 'block';
        if (praiseText) praiseText.style.display = 'block';
        if (praiseLong) praiseLong.style.display = 'none';
        if (praiseContinueBtn) {
            praiseContinueBtn.style.display = 'inline-block';
            praiseContinueBtn.innerText = 'Read More 💕';
            praiseContinueBtn.dataset.state = 'more';
            praiseContinueBtn.disabled = false;
        }
        if (sunoWrapper) sunoWrapper.classList.add('hidden');
        if (sunoBtn) sunoBtn.classList.add('hidden');
        return;
    }
    // fallback: reveal gift directly
    giftBoxBtn.classList.remove('hidden');
    const preview = document.getElementById('giftBoxPreview');
    if (preview) preview.classList.remove('hidden');
}

function goToPraiseStep() {
    // hide other steps
    try { step4.classList.remove('active'); step4.classList.add('hidden'); } catch (e) {}
    try { step6.classList.remove('active'); step6.classList.add('hidden'); } catch (e) {}
    if (stepPraise) {
        stepPraise.classList.remove('hidden');
        stepPraise.classList.add('active');
        updateHint('Hear this little praise... 💖');
    }
}

// Continue from praise -> gift
if (praiseContinueBtn) {
    praiseContinueBtn.addEventListener('click', () => {
        if (praiseContinueBtn.dataset.state === 'startCatchMe') {
            stepPraise.classList.add('hidden');
            startCatchMeSequence();
            return;
        }

        if (praiseContinueBtn.dataset.state === 'openGift') {
            if (praiseTopGif) praiseTopGif.style.display = 'none';
            stepPraise.classList.remove('active');
            stepPraise.classList.add('hidden');
            goToGiftStage();
            updateHint('Now open the Gift Box to see your surprise! 🎁');
            return;
        }

        if (praiseText) praiseText.style.display = 'none';
        if (praiseTopGif) praiseTopGif.style.display = 'none';
        if (praiseLong) praiseLong.style.display = 'block';
        praiseContinueBtn.dataset.state = 'openGift';
        praiseContinueBtn.innerText = 'Open Gift 🎁';
        updateHint('Click the gift button below to move to the next step. 💝');
    });
}

// Falling Hearts Rain
function initFallingHearts() {
    const heartBg = document.getElementById('heartBg');
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '🤍'];
    const numberOfHearts = 50; // Rain density

    for (let i = 0; i < numberOfHearts; i++) {
        let heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = Math.random() * 100 + 'vw';
        let size = Math.random() * 0.8 + 0.5; // 0.5rem to 1.3rem
        heart.style.fontSize = size + 'rem';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's'; // 3s to 7s
        heart.style.animationDelay = -(Math.random() * 5) + 's'; // Start at different times (negative delay starts animation midway so it's populated on load)
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        heartBg.appendChild(heart);
    }
}
initFallingHearts();

// Confetti Function
function shootConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Balloon Function
function createBalloons() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#db7093'];
    for (let i = 0; i < 15; i++) {
        let balloon = document.createElement('div');
        balloon.innerHTML = '🎈';
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.fontSize = (Math.random() * 2 + 2) + 'rem';
        balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
        balloon.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(balloon);

        // Remove balloon after animation
        setTimeout(() => {
            balloon.remove();
        }, 7000);
    }
}

// Large Interactive Balloons Function
function createLargeInteractiveBalloons() {
    const balloonCount = 8;
    balloonsRemaining = balloonCount;

    for (let i = 0; i < balloonCount; i++) {
        let balloon = document.createElement('div');
        balloon.innerHTML = '🎈';
        balloon.className = 'large-balloon';
        balloon.style.left = (Math.random() * 80 + 10) + 'vw';
        balloon.style.top = (Math.random() * 60 + 10) + 'vh';
        balloon.style.fontSize = (Math.random() * 4 + 6) + 'rem';
        balloon.style.animationDelay = (Math.random() * 0.5) + 's';

        // Add bobbing motion after blow up
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.style.animation = `floatBob ${Math.random() * 2 + 2}s ease-in-out infinite alternate`;
            }
        }, 1000 + (parseFloat(balloon.style.animationDelay) * 1000));

        balloon.addEventListener('click', function (e) {
            // Burst effect
            this.style.transition = 'transform 0.1s, opacity 0.1s';
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '0';

            // Pop confetti
            const rect = this.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 50,
                spread: 80,
                origin: { x, y },
                colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff'],
                zIndex: 2000
            });

            setTimeout(() => {
                this.remove();

                // Track remaining balloons
                balloonsRemaining--;
                if (balloonsRemaining === 0) {
                    // All balloons burst! Show the cake cut button
                    setTimeout(() => {
                        cutCakeBtn.classList.remove('hidden');
                        cutCakeBtn.classList.add('fade-in');
                        updateHint("Step 5/6: Let's cut the delicious cake! 🎂🔪");
                    }, 500); // Small delay for better feel
                }
            }, 100);
        });

        document.body.appendChild(balloon);
    }
}

// Firecracker Effect
function startFirecracker() {
    var duration = 2000; // burns for 2 seconds
    var end = Date.now() + duration;

    (function frame() {
        // sparks from bottom left
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            colors: ['#ffa500', '#ffff00', '#ff4500', '#ffffff'],
            zIndex: 2000
        });
        // sparks from bottom right
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            colors: ['#ffa500', '#ffff00', '#ff4500', '#ffffff'],
            zIndex: 2000
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Flow Logic
let teddyClicked = false;
let balloonsRemaining = 0;

// Intro -> Step 0 (Evolve nicknames)
forMyBtn.addEventListener('click', () => {
    peekingCat.classList.add('hidden');
    forMyBtn.classList.add('hidden');

    const nicknames = [
        'Cutie! 🥰', 'Sweetheart! 💖', 'Baby! 💕', 'My Love! ❤️', 'Jaan! 😍',
        'Princess! 👑', 'Angel! 👼', 'Bebu! 🧸', 'Gorgeous! ✨', 'Wifey! 💍',
        'Meri Rasmalai! 🍨', 'Jalebi! 🥨', 'Bawli!😝', 'Shona! 🥺', 'Mera Babu! 🐥',
        'Pagal! 😜', 'Gulab Jamun! 🍯', 'Darling! 😁'
    ];
    const textColors = ['#FFD700', '#FF69B4', '#00FFFF', '#FFB6C1', '#FFFFFF', '#E6E6FA', '#FFC0CB'];

    nicknames.forEach((nickname, index) => {
        setTimeout(() => {
            const nicknameEl = document.createElement('div');
            nicknameEl.innerText = nickname;
            nicknameEl.className = 'nickname-bubble';

            // Random position across the screen
            nicknameEl.style.left = (Math.random() * 60 + 20) + 'vw';
            nicknameEl.style.top = (Math.random() * 60 + 20) + 'vh';

            const randomColor = textColors[Math.floor(Math.random() * textColors.length)];
            nicknameEl.style.color = randomColor;
            nicknameEl.style.fontSize = (Math.random() * 1 + 2) + 'rem';

            // Initial state
            nicknameEl.style.opacity = '0';
            nicknameEl.style.transform = 'scale(0) translateY(50px)';
            nicknameEl.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Super bouncy

            document.getElementById('curtainStage').appendChild(nicknameEl);

            // Pop in
            setTimeout(() => {
                nicknameEl.style.opacity = '1';
                nicknameEl.style.transform = `scale(1) translateY(0px) rotate(${Math.random() * 30 - 15}deg)`;
            }, 50);

            // Float up and fade out
            setTimeout(() => {
                nicknameEl.style.opacity = '0';
                nicknameEl.style.transform = `scale(1.3) translateY(-80px) rotate(${Math.random() * 40 - 20}deg)`;
            }, 1800);

            // Remove from DOM
            setTimeout(() => {
                nicknameEl.remove();
            }, 2600);

        }, index * 200); // Stagger by 200ms
    });

    // Show Setup Stage button after all nicknames have appeared
    setTimeout(() => {
        setupStageWrapper.classList.remove('hidden');
        setupStageWrapper.classList.add('fade-in');
    }, nicknames.length * 200 + 1000);
});

// Step 0 -> Step 1 (Open Curtains)
setupStageBtn.addEventListener('click', () => {
    setupStageWrapper.style.display = 'none';
    curtainLeft.classList.add('curtain-open-left');
    curtainRight.classList.add('curtain-open-right');

    // Start firecracker burn effect as curtains open
    startFirecracker();

    setTimeout(() => {
        curtainStage.style.display = 'none';
        updateHint("Step 1/6: A special day awaits you! 💖✨");
    }, 2000);
});

// Step 1 -> Step 2
forYouBtn.addEventListener('click', () => {
    step1.classList.remove('active');
    step1.classList.add('hidden');

    step2.classList.remove('hidden');
    step2.classList.add('active');

    shootConfetti();
    createBalloons();
    updateHint("Step 2/6: Go on, give the teddy a hug! 🧸💝");
});

// Step 2 Interactions (Teddy & Letter)
teddyContainer.addEventListener('click', () => {
    if (teddyClicked) return;
    teddyClicked = true;

    // Evolve a big heart and pop out
    const bigHeart = document.createElement('div');
    bigHeart.innerHTML = '💖';
    bigHeart.className = 'big-heart';
    document.body.appendChild(bigHeart);

    // Trigger confetti near the "pop" moment (around 1.2s)
    setTimeout(() => {
        shootConfetti();
    }, 1200);

    // After big heart animation finishes (1.5s), show the letter
    setTimeout(() => {
        bigHeart.remove(); // Cleanup

        // Show letter
        letterPanel.classList.remove('hidden');
        letterPanel.classList.add('fade-in');

        // Wait a bit for reading, then flying kiss
        setTimeout(() => {
            const kiss = document.createElement('div');
            kiss.innerHTML = '😘';
            kiss.className = 'kiss-emoji';

            // Position it near the teddy
            const rect = teddyContainer.getBoundingClientRect();
            kiss.style.left = (rect.left + rect.width / 2) + 'px';
            kiss.style.top = (rect.top + rect.height / 2) + 'px';

            document.body.appendChild(kiss);

            // Show celebration button shortly after kiss
            setTimeout(() => {
                celebrationBtn.classList.remove('hidden');
                updateHint("Step 3/6: Ready for some magic? 🎉🎊");
                kiss.remove(); // cleanup
            }, 2000);

        }, 2500); // Wait time for reading the message

    }, 1500); // Wait for the big heart animation to finish
});

// Step 2 -> Step 4 (Celebration)
celebrationBtn.addEventListener('click', () => {
    step2.classList.remove('active');
    step2.classList.add('hidden');

    step4.classList.remove('hidden');
    step4.classList.add('active');

    // Blow up large balloons
    createLargeInteractiveBalloons();
    updateHint("Step 4/6: Pop the balloons for a surprise! 🎈💥");
});

// Step 4 Interactions (Cut Cake)
cutCakeBtn.addEventListener('click', () => {
    cutCakeBtn.classList.add('hidden');

    // Show knife and animate
    knife.classList.remove('hidden');
    knife.classList.add('slice-anim');

    // Wait for knife to slice through
    setTimeout(() => {
        // Swap whole cake for the two halves
        wholeCake.classList.add('hidden');
        leftCake.classList.remove('hidden');
        rightCake.classList.remove('hidden');

        // Trigger cut separation animation on next frame
        requestAnimationFrame(() => {
            leftCake.classList.add('cut-left');
            rightCake.classList.add('cut-right');
        });

        shootConfetti();

            // Show 'Aapki Tareef' button
            setTimeout(() => {
                leftCake.classList.add('hidden');
                rightCake.classList.add('hidden');
                knife.classList.add('hidden');
                // Show the Aapki Tareef button
                if (aapkiTareefBtnStep4) {
                    showSpecialPartyStage();
                } else {
                    // fallback: show gift directly
                    giftBoxBtn.classList.remove('hidden');
                    document.getElementById('giftBoxPreview').classList.remove('hidden');
                    updateHint("Step 5/6: Aapki Tareef... 🌟");
                }
            }, 1000);

    }, 500); // Time for knife to reach the middle of the cake
});

// Special Party question stage flow
function showSpecialPartyStage() {
    if (specialPartyStage) {
        specialPartyStage.classList.remove('hidden');
    }
    if (specialPartyNoStage) {
        specialPartyNoStage.classList.add('hidden');
    }
    updateHint("Step 5/6: Mujhe special party doge na..🤤");
}

function hideSpecialPartyStages() {
    if (specialPartyStage) specialPartyStage.classList.add('hidden');
    if (specialPartyNoStage) specialPartyNoStage.classList.add('hidden');
}

function showThankYouThenContinue() {
    const toast = document.createElement('div');
    toast.className = 'thank-you-toast';
    toast.textContent = 'thank you dear';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        if (aapkiTareefBtnStep4) {
            aapkiTareefBtnStep4.classList.remove('hidden');
            if (goodAfternoonGif) goodAfternoonGif.classList.remove('hidden');
            updateHint("Step 5/6: Aapki Tareef... 🌟");
        }
    }, 1400);
}

if (specialPartyYesBtn) {
    specialPartyYesBtn.addEventListener('click', () => {
        hideSpecialPartyStages();
        showThankYouThenContinue();
    });
}

if (specialPartyNoBtn) {
    specialPartyNoBtn.addEventListener('click', () => {
        if (specialPartyStage) specialPartyStage.classList.add('hidden');
        if (specialPartyNoStage) specialPartyNoStage.classList.remove('hidden');
        updateHint('Fir soch lo... 😐');
    });
}

if (specialPartyConfirmBtn) {
    specialPartyConfirmBtn.addEventListener('click', () => {
        showSpecialPartyStage();
    });
}

// Helper: proceed to gift stage (shared)
function goToGiftStage() {
    step4.classList.remove('active');
    step4.classList.add('hidden');

    step6.classList.remove('hidden');
    step6.classList.add('active');
    updateHint("Final Step: Unlock your birthday wishes! 🔓💖");
}

// Step 4 -> Step 6 (Gift Box)
giftBoxBtn.addEventListener('click', goToGiftStage);

// Aapki Tareef -> starts the flow: message first, then game
if (aapkiTareefBtnStep4) {
    aapkiTareefBtnStep4.addEventListener('click', () => {
        aapkiTareefBtnStep4.classList.add('hidden');
        if (goodAfternoonGif) goodAfternoonGif.classList.add('hidden');
        
        // Show the 'apna kaam karo' message first
        startSunoFlow();
        // Update button to start catch me
        if (praiseContinueBtn) {
            praiseContinueBtn.innerText = 'Catch Me! 🎯';
            praiseContinueBtn.dataset.state = 'startCatchMe';
        }
    });
}

// Catch Me mini-game: moves the button every second up to 10 times
function startCatchMeSequence() {
    let moves = 0;
    const maxMoves = 10;

    const catchWrapper = document.createElement('div');
    catchWrapper.style.position = 'fixed';
    catchWrapper.style.zIndex = '2000';
    catchWrapper.style.display = 'flex';
    catchWrapper.style.flexDirection = 'column';
    catchWrapper.style.alignItems = 'center';
    catchWrapper.style.gap = '20px';
    catchWrapper.style.pointerEvents = 'none';

    const catchGif = document.createElement('img');
    catchGif.src = 'bubu-dudu.gif';
    catchGif.alt = 'Bubu Dudu';
    catchGif.style.maxWidth = '120px';
    catchGif.style.pointerEvents = 'none';

    const catchBtn = document.createElement('button');
    catchBtn.className = 'catch-me-btn';
    catchBtn.innerText = 'Catch Me! 🎯';
    catchBtn.style.pointerEvents = 'auto';

    catchWrapper.appendChild(catchGif);
    catchWrapper.appendChild(catchBtn);
    document.body.appendChild(catchWrapper);

    // Position helper
    function placeRandom() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const wrapperRect = catchWrapper.getBoundingClientRect();
        const x = Math.random() * (vw - wrapperRect.width - 40) + 20;
        const y = Math.random() * (vh - wrapperRect.height - 80) + 40;
        catchWrapper.style.left = x + 'px';
        catchWrapper.style.top = y + 'px';
    }

    placeRandom();

    const intervalId = setInterval(() => {
        moves++;
        if (moves >= maxMoves) {
            clearInterval(intervalId);
            catchWrapper.remove();
            const fallbackWrapper = document.createElement('div');
            fallbackWrapper.style.position = 'fixed';
            fallbackWrapper.style.zIndex = '2000';
            fallbackWrapper.style.display = 'flex';
            fallbackWrapper.style.flexDirection = 'column';
            fallbackWrapper.style.alignItems = 'center';
            fallbackWrapper.style.gap = '20px';
            fallbackWrapper.style.left = '50%';
            fallbackWrapper.style.bottom = '60px';
            fallbackWrapper.style.transform = 'translateX(-50%)';

            const fallbackGif = document.createElement('img');
            fallbackGif.src = 'bubu-dudu.gif';
            fallbackGif.alt = 'Bubu Dudu';
            fallbackGif.style.maxWidth = '120px';
            fallbackGif.style.marginBottom = '18px';
            fallbackGif.style.pointerEvents = 'none';

            const fallback = document.createElement('button');
            fallback.id = 'catchMeFallback';
            fallback.className = 'catch-me-btn';
            fallback.innerText = 'Catch Me (Click Me)';
            fallback.style.pointerEvents = 'auto';

            fallbackWrapper.appendChild(fallbackGif);
            fallbackWrapper.appendChild(fallback);
            document.body.appendChild(fallbackWrapper);

            updateHint("You missed it! Click the Catch Me button below to continue. 🌟");

            fallback.addEventListener('click', () => {
                fallbackWrapper.remove();
                showLongPraise();
            });
            return;
        }
        placeRandom();
    }, 1000);

    catchBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        catchWrapper.remove();
        showLongPraise();
    });
}

function showLongPraise() {
    // Play song when entering final praise
    birthdaySong.play().catch(e => console.log("Audio play failed:", e));
    
    shootConfetti();
    createBalloons();
    goToPraiseStep();
    if (praiseTopGif) praiseTopGif.style.display = 'none';
    if (praiseText) praiseText.style.display = 'none';
    if (praiseLong) praiseLong.style.display = 'block';
    if (praiseContinueBtn) {
        praiseContinueBtn.style.display = 'inline-block';
        praiseContinueBtn.innerText = 'Open Gift 🎁';
        praiseContinueBtn.dataset.state = 'openGift';
        praiseContinueBtn.disabled = false;
    }
    updateHint('Now move to the next step to see your gift! 💝');
}

// Step 6 Interactions (Open Gift)
let giftOpened = false;
giftContainer.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;

    giftImg.style.transform = 'scale(0)';

    // Big Fly Kiss evolve and fly up
    const bigKiss = document.createElement('div');
    bigKiss.innerHTML = '😘';
    bigKiss.className = 'big-fly-kiss';
    document.body.appendChild(bigKiss);

    // Cleanup kiss after animation
    setTimeout(() => {
        bigKiss.remove();
    }, 2000);

    setTimeout(() => {
        giftImg.style.display = 'none';
        wishesPanel.classList.remove('hidden');
        wishesPanel.classList.add('fade-in');

        // Show the special button
        specialBtn.classList.remove('hidden');
        specialBtn.classList.add('fade-in');

        shootConfetti();
        updateHint("Happy Birthday Payal! May all your dreams come true! 🎂🥳👑✨");
    }, 300);
});

// Special Button Click
specialBtn.addEventListener('click', () => {
    createBalloons();
    shootConfetti();
});

// Aapki Tareef Button Click - Catch Me Game (Consolidated)
const aapkiTareefBtn = document.getElementById('aapkiTareefBtn');

if (aapkiTareefBtn) {
    aapkiTareefBtn.addEventListener('click', () => {
        aapkiTareefBtn.classList.add('hidden');
        startSunoFlow();
        if (praiseContinueBtn) {
            praiseContinueBtn.innerText = 'Catch Me! 🎯';
            praiseContinueBtn.dataset.state = 'startCatchMe';
        }
    });
}
