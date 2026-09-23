// Main JavaScript for Dr. Sudhanya Das Physiotherapy Website

// Safely render Lucide Icons supporting both v0.x and v1.x (which requires { icons: lucide.icons })
function renderLucideIcons() {
  if (typeof lucide !== 'undefined') {
    try {
      if (lucide.icons && lucide.createIcons) {
        lucide.createIcons({ icons: lucide.icons });
      } else if (lucide.createIcons) {
        lucide.createIcons();
      }
    } catch (e) {
      console.warn('Lucide icons initialization:', e);
    }
  }
}

function initWebsite() {
  // Render Lucide Icons
  renderLucideIcons();

  // Set current copyright year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 1. Scroll Progress Bar & Floating Header Scroll Effects
  const scrollProgress = document.getElementById('scroll-progress');
  const mainNav = document.getElementById('main-nav');
  const parallaxBg = document.getElementById('parallax-bg');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update top progress bar
    if (scrollProgress && docHeight > 0) {
      const scrolledPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${scrolledPercent}%`;
    }

    // Header elevation shadow on scroll
    if (mainNav) {
      if (scrollTop > 10) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }


    // Parallax subtle background movement
    if (parallaxBg && window.innerWidth > 768) {
      parallaxBg.style.transform = `translate3d(0, ${scrollTop * 0.05}px, 0)`;
    }

    // Scroll-Spy: Highlight current active section in navigation
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIconOpen) menuIconOpen.classList.add('hidden');
        if (menuIconClose) menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      });
    });
  }

  // 3. Conditions Treated Interactive Tabs
  const conditionTabs = document.querySelectorAll('.condition-tab-btn');
  const conditionContents = document.querySelectorAll('.condition-content');

  conditionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      conditionTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');

      const targetId = tab.getAttribute('data-target');

      // Hide all contents
      conditionContents.forEach(content => {
        content.classList.add('hidden');
      });

      // Show target content
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
        renderLucideIcons();
      }
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');

    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.classList.add('hidden');
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('open');
          answer.classList.remove('hidden');
        } else {
          item.classList.remove('open');
          answer.classList.add('hidden');
        }
      });
    }
  });

  // 5. WhatsApp Appointment Booking Handler
  const btnSubmitWhatsApp = document.getElementById('btn-submit-whatsapp');
  const appointmentForm = document.getElementById('appointment-form');

  function handleBooking(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('patient-name');
    const phoneInput = document.getElementById('patient-phone');
    const serviceInput = document.getElementById('patient-service');
    const timeInput = document.getElementById('patient-time');
    const notesInput = document.getElementById('patient-notes');

    if (!nameInput || !phoneInput || !serviceInput || !timeInput) return;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceInput.value;
    const timeSlot = timeInput.value;
    const notes = notesInput ? notesInput.value.trim() : '';

    const isBn = (typeof currentLang !== 'undefined' && currentLang === 'bn') || (localStorage.getItem('clinic_lang') === 'bn');

    // Validate required fields
    if (!name) {
      alert(isBn ? 'দয়া করে রোগীর সম্পূর্ণ নাম লিখুন।' : 'Please enter your full name.');
      nameInput.focus();
      return;
    }

    if (!phone) {
      alert(isBn ? 'দয়া করে ফোন বা হোয়াটসঅ্যাপ নম্বর লিখুন।' : 'Please enter your contact phone or WhatsApp number.');
      phoneInput.focus();
      return;
    }

    if (!service) {
      alert(isBn ? 'দয়া করে চিকিৎসার বিভাগ নির্বাচন করুন।' : 'Please select the specialized clinical department.');
      serviceInput.focus();
      return;
    }

    if (!timeSlot) {
      alert(isBn ? 'দয়া করে পরামর্শের সময় নির্বাচন করুন।' : 'Please choose a preferred consultation time window.');
      timeInput.focus();
      return;
    }

    // Build formatted WhatsApp message
    let message = `*Consultation Request - Dr. Sudhanya Das Clinic Belda*\n\n`;
    message += `👤 *Patient Name:* ${name}\n`;
    message += `📞 *Phone / Contact:* ${phone}\n`;
    message += `🩺 *Clinical Department:* ${service}\n`;
    message += `⏰ *Preferred Slot:* ${timeSlot}\n`;
    if (notes) {
      message += `📝 *Clinical Notes / History:* ${notes}\n`;
    }
    message += `\n_Submitted via Dr. Sudhanya Das Clinic Desk (Belda)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappDoctorNumber = '918167412511';
    const whatsappUrl = `https://wa.me/${whatsappDoctorNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  }

  if (btnSubmitWhatsApp) {
    btnSubmitWhatsApp.addEventListener('click', handleBooking);
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', handleBooking);
  }

  // 6. Pain Navigator Chips Click Handler
  const painChips = document.querySelectorAll('.pain-chip');
  painChips.forEach(chip => {
    chip.addEventListener('click', () => {
      painChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const painType = chip.getAttribute('data-pain');
      if (typeof updatePainDetail === 'function') {
        updatePainDetail(painType);
      }
    });
  });

  // Initialize Pain Navigator with default back condition
  if (typeof updatePainDetail === 'function') {
    updatePainDetail('back');
  }

  // 7. Automatic Background Photo Slideshow
  function initHeroBgSlider() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    const dots = document.querySelectorAll('.hero-slider-dot');
    if (!slides.length) return;

    let currentSlide = 0;
    let slideTimer = null;

    function showSlide(index) {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
      }

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function startTimer() {
      stopTimer();
      slideTimer = setInterval(nextSlide, 4500);
    }

    function stopTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    // Click on dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(idx);
        startTimer();
      });
    });

    // Start auto-changing
    startTimer();
  }

  initHeroBgSlider();
}

// Ensure execution whether loaded synchronously or after DOM is already interactive
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebsite);
} else {
  initWebsite();
}

// Helper function to pre-select service from cards
function preselectService(serviceName) {
  const serviceDropdown = document.getElementById('patient-service');
  if (serviceDropdown) {
    serviceDropdown.value = serviceName;
  }
  const bookingSection = document.getElementById('appointment') || document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Expose globally
window.preselectService = preselectService;
window.renderLucideIcons = renderLucideIcons;


// Pain Navigator Data and Controller
const painData = {
  back: {
    en: {
      tag: "Spine & Nerve Focus • Lumbar Spine",
      title: "Lower Back Pain, Slip Disc & Sciatica",
      desc: "Sharp shooting pain radiating down your leg, numbness in the feet, or severe stiffness getting out of bed. Often caused by herniated discs (L4-L5, L5-S1) compressing the sciatic nerve.",
      therapy: "Computerized Lumbar Traction + IFT deep tissue pain gating",
      recovery: "Noticeable pain reduction within 3 to 5 clinical sessions",
      advice: "Avoid surgery and heavy painkillers through non-invasive spinal mobilization",
      waText: "Hello Dr. Sudhanya Das, I am suffering from Lower Back Pain & Sciatica and would like to book a consultation in Belda.",
      serviceVal: "Back, Neck & Spine Relief",
      factTitle: "Did You Know?",
      factDesc: "Over 90% of slip disc (herniated disc) and sciatica cases can be healed completely with mechanical decompression and core spinal stabilization, avoiding costly surgery."
    },
    bn: {
      tag: "স্পাইন ও নার্ভ কেয়ার • Lower Back & Sciatica",
      title: "কোমর ব্যথা, স্লিপ ডিস্ক ও সায়াটিকা",
      desc: "কোমর থেকে পায়ের দিকে তীব্র ব্যথা ছড়িয়ে পড়া, পায়ে অবশ ভাব বা সকালে বিছানা থেকে উঠতে গিয়ে কোমর লক হয়ে যাওয়া। সাধারণত L4-L5 বা L5-S1 ডিস্ক স্থানচ্যুত হয়ে নার্ভে চাপ দিলে এমনটি হয়।",
      therapy: "কম্পিউটারাইজড লাম্বার ট্র্যাকশন + আইএফটি (IFT) ডিপ টিস্যু থেরাপি",
      recovery: "৩ থেকে ৫টি থেরাপি সেশনের মধ্যেই লক্ষণীয় ব্যথা উপশম",
      advice: "বিনা অপারেশনে এবং ক্ষতিকর পেইনকিলার ছাড়াই স্বাভাবিক জীবনে ফেরা সম্ভব",
      waText: "নমস্কার ডাঃ সুধন্য দাস, আমি কোমর ও সায়াটিকা ব্যথার জন্য বেলদা ক্লিনিকে অ্যাপয়েন্টমেন্ট বুক করতে চাই।",
      serviceVal: "Back, Neck & Spine Relief",
      factTitle: "আপনি কি জানেন?",
      factDesc: "৯০% এরও বেশি স্লিপ ডিস্ক ও সায়াটিকা রোগী সঠিক স্পাইনাল ডিকম্প্রেশন এবং ফিজিওথেরাপির মাধ্যমে সম্পূর্ণ অস্ত্রোপচার ছাড়াই সুস্থ হয়ে ওঠেন।"
    }
  },
  neck: {
    en: {
      tag: "Cervical & Posture • Neck Care",
      title: "Neck Pain & Cervical Spondylosis",
      desc: "Chronic stiffness in neck, radiating pain down shoulders and arms, dizziness, tension headaches, and finger numbness caused by desk work or cervical disc degeneration.",
      therapy: "Targeted Cervical Traction + Ultrasound Heat Therapy + Suboccipital Release",
      recovery: "70-80% stiffness resolved in 4-6 clinical sessions",
      advice: "Ergonomic screen realignment and deep neck flexor strengthening prevent relapse",
      waText: "Hello Dr. Sudhanya Das, I am suffering from Neck Pain & Cervical Spondylosis and would like to book a consultation.",
      serviceVal: "Back, Neck & Spine Relief",
      factTitle: "Tech Neck Impact",
      factDesc: "Looking down at a mobile phone adds up to 27 kg of pressure onto cervical vertebrae. Early physical therapy corrects alignment before irreversible disc degeneration occurs."
    },
    bn: {
      tag: "সারভাইকাল কেয়ার • Neck & Cervical",
      title: "ঘাড় ব্যথা ও সারভাইকাল স্পন্ডিলাইটিস",
      desc: "ঘাড়ে দীর্ঘস্থায়ী টান ও ব্যথা, কাঁধ ও হাতে ব্যথা নেমে যাওয়া, মাথা ঘোরা এবং আঙুলে অবশ ভাব। দীর্ঘক্ষণ ঝুঁকে মোবাইল বা কম্পিউটার ব্যবহার এবং হাড়ের ক্ষয়ের কারণে এটি ঘটে।",
      therapy: "সারভাইকাল ট্র্যাকশন + আল্ট্রাসাউন্ড থেরাপি + সাব-অক্সিপিটাল রিলিজ",
      recovery: "৪ থেকে ৬টি সেশনে ঘাড়ের স্বাভাবিক মুভমেন্ট ফিরে আসে",
      advice: "বসার সঠিক নিয়ম এবং নির্দিষ্ট ঘাড়ের ব্যায়াম দীর্ঘমেয়াদে আরাম দেয়",
      waText: "নমস্কার ডাঃ সুধন্য দাস, আমি ঘাড় ব্যথা ও সারভাইকাল সমস্যার জন্য পরামর্শ নিতে চাই।",
      serviceVal: "Back, Neck & Spine Relief",
      factTitle: "স্মার্টফোন ও ঘাড়ের ক্ষতি",
      factDesc: "ঝুঁকে ফোন দেখার কারণে ঘাড়ের হাড়ের ওপর অতিরিক্ত চাপ পড়ে। সময়মতো ফিজিওথেরাপি গ্রহণ করলে মারাত্মক নার্ভ কম্প্রেশন রোধ করা যায়।"
    }
  },
  knee: {
    en: {
      tag: "Joint Health • Knee Joint Care",
      title: "Knee Joint Pain & Osteoarthritis",
      desc: "Cracking sounds (crepitus), pain while descending stairs, joint swelling, morning stiffness, and difficulty walking caused by cartilage wear and knee joint arthritis.",
      therapy: "SWD Diathermy Deep Heat + Patellar Mobilization + Quadriceps Strengthening",
      recovery: "Substantial pain reduction and joint mobility within 1-2 weeks",
      advice: "Joint preservation therapy delays or completely eliminates the need for Knee Replacement (TKR)",
      waText: "Hello Dr. Sudhanya Das, I would like to consult for Knee Joint Pain & Osteoarthritis treatment in Belda.",
      serviceVal: "Orthopedic & Joint Care",
      factTitle: "Avoid Knee Surgery",
      factDesc: "Targeted muscle kinetic chain strengthening transfers joint load onto the powerful quadriceps, preserving your natural knee cartilage for decades."
    },
    bn: {
      tag: "অস্থিসন্ধি কেয়ার • Knee Joint Care",
      title: "হাঁটু ব্যথা ও অস্টিওআর্থারাইটিস (বাত)",
      desc: "হাঁটুতে কটকট শব্দ হওয়া, সিঁড়ি দিয়ে ওঠা-নামায় প্রচণ্ড কষ্ট, ফোলা ভাব এবং হাঁটার শক্তি কমে যাওয়া। হাড়ের কার্টিলেজ ক্ষয়ে যাওয়ার ফলে এই সমস্যা দেখা দেয়।",
      therapy: "শর্টওয়েভ ডায়াথার্মি + প্যাটেলার মোবিলাইজেশন + কুয়াড্রিসেপস ব্যায়াম",
      recovery: "১ থেকে ২ সপ্তাহের মধ্যে ফোলা ও ব্যথায় স্পষ্ট উন্নতি",
      advice: "সঠিক সময়ে ফিজিওথেরাপি নিলে হাঁটু প্রতিস্থাপন (Knee Replacement) সার্জারি এড়ানো সম্ভব",
      waText: "নমস্কার ডাঃ সুধন্য দাস, আমি হাঁটুর বাতের ব্যথার চিকিৎসার জন্য অ্যাপয়েন্টমেন্ট বুক করতে চাই।",
      serviceVal: "Orthopedic & Joint Care",
      factTitle: "অস্ত্রোপচার এড়ানোর উপায়",
      factDesc: "হাঁটুর চারপাশের পেশিগুলোকে শক্তিশালী করে তুললে শরীরের ওজন হাড়ের ওপর না পড়ে পেশির ওপর পড়ে, ফলে ন্যাচারাল জয়েন্ট দীর্ঘদিন সুস্থ থাকে।"
    }
  },
  shoulder: {
    en: {
      tag: "Shoulder Mobility • Shoulder Care",
      title: "Frozen Shoulder (Adhesive Capsulitis)",
      desc: "Severe limitation in lifting the arm overhead or reaching behind the back, painful sleep on the affected side, and gradual loss of functional shoulder mobility.",
      therapy: "Therapeutic Ultrasound + High-Frequency Moist Heat + Progressive Capsule Stretching",
      recovery: "Full functional range of motion restored in progressive structured sessions",
      advice: "Safe non-invasive restoration without relying on painful steroid injections",
      waText: "Hello Dr. Sudhanya Das, I need consultation for Frozen Shoulder treatment in Belda.",
      serviceVal: "Orthopedic & Joint Care",
      factTitle: "Early Intervention",
      factDesc: "Frozen shoulder typically passes through 3 stages (Freezing, Frozen, Thawing). Early medical physiotherapy cuts recovery duration by more than half."
    },
    bn: {
      tag: "কাঁধের মুভমেন্ট • Frozen Shoulder",
      title: "ফ্রোজেন শোল্ডার (কাঁধ জ্যাম হওয়া)",
      desc: "হাত ওপরে তুলতে বা পিঠের দিকে নিতে না পারা, রাতে আক্রান্ত কাঁধের দিকে ফিরে ঘুমাতে প্রচণ্ড কষ্ট হওয়া এবং দিন দিন হাতের নড়াচড়া বন্ধ হয়ে আসা।",
      therapy: "থেরাপিউটিক আল্ট্রাসাউন্ড + স্পেশাল ক্যাপসুল স্ট্রেচিং + পুলি এক্সারসাইজ",
      recovery: "নির্দিষ্ট সেশনে কাঁধের ১০০% স্বাভাবিক মুভমেন্ট পুনরুদ্ধার",
      advice: "বেদনাদায়ক স্টেরয়েড ইনজেকশন ছাড়াই বৈজ্ঞানিক পদ্ধতিতে স্থায়ী সুস্থতা",
      waText: "নমস্কার ডাঃ সুধন্য দাস, আমি ফ্রোজেন শোল্ডার সমস্যার জন্য পরামর্শ নিতে চাই।",
      serviceVal: "Orthopedic & Joint Care",
      factTitle: "দ্রুত চিকিৎসার গুরুত্ব",
      factDesc: "ফ্রোজেন শোল্ডার অবহেলা করলে কাঁধ সম্পূর্ণ লক হয়ে যেতে পারে। প্রাথমিক অবস্থায় থেরাপি নিলে মাত্র কয়েক সপ্তাহেই হাত স্বাভাবিক অবস্থায় ফেরে।"
    }
  },
  neuro: {
    en: {
      tag: "Neuro Rehabilitation • Stroke Care",
      title: "Stroke, Hemiplegia & Paralysis Rehabilitation",
      desc: "Weakness or loss of voluntary movement on one side of the body, difficulty in standing, walking, facial drooping (Bell's palsy), or loss of fine motor control after stroke.",
      therapy: "Neuro-Developmental Therapy (NDT) + Functional Electrical Stimulation + Gait Balance Training",
      recovery: "Continuous neuro-plastic functional gains over a customized 30-90 day protocol",
      advice: "Home Visit Physiotherapy is available in Belda for bedridden patients",
      waText: "Hello Dr. Sudhanya Das, I would like to request Stroke / Paralysis Rehabilitation (Home Visit / Clinic) in Belda.",
      serviceVal: "Neurological Rehabilitation",
      factTitle: "Neuroplasticity Power",
      factDesc: "The human brain has remarkable neuro-plastic ability to re-route motor signals after stroke when stimulated with intensive, repetitive physical rehabilitation."
    },
    bn: {
      tag: "নিউরো রিহ্যাব • Stroke & Paralysis",
      title: "পক্ষাঘাত, স্ট্রোক ও বেলস পালসি রিহ্যাব",
      desc: "শরীরের একপাশ অবশ বা দুর্বল হয়ে যাওয়া, উঠে দাঁড়াতে বা হাঁটতে না পারা, মুখের পেশি বেঁকে যাওয়া (বেলস পালসি) এবং হাতের গ্রিপ শক্তি কমে যাওয়া।",
      therapy: "নিউরো-ডেভেলপমেন্টাল থেরাপি (NDT) + ফাংশনাল ইলেকট্রিক্যাল স্টিমুলেশন + ব্যালেন্স ট্রেনিং",
      recovery: "৩০ থেকে ৯০ দিনের সুনির্দিষ্ট প্রোটোকলে ধাপে ধাপে স্বাবলম্বী হওয়া",
      advice: "শয্যাশায়ী রোগীদের জন্য বেলদায় বাড়িতে গিয়ে ফিজিওথেরাপি (Home Visit) সেবা উপলব্ধ",
      waText: "নমস্কার ডাঃ সুধন্য দাস, আমি পক্ষাঘাত/স্ট্রোক রিহ্যাবিলিটেশন ও হোম ভিজিটের জন্য পরামর্শ চাই।",
      serviceVal: "Neurological Rehabilitation",
      factTitle: "ব্রেন নিউরোপ্লাস্টিসিটি",
      factDesc: "স্ট্রোকের পর সঠিক ফিজিওথেরাপি শুরু করলে মস্তিষ্কের নিউরোপ্লাস্টিসিটির মাধ্যমে অন্যান্য সুস্থ কোষগুলো অবশ অংশের নিয়ন্ত্রণ নিতে সক্ষম হয়।"
    }
  }
};

function updatePainDetail(painKey) {
  const panel = document.getElementById('pain-detail-content');
  if (!panel) return;
  const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('clinic_lang') || 'en');
  const data = (painData[painKey] && painData[painKey][lang]) ? painData[painKey][lang] : painData['back']['en'];

  const waUrl = 'https://wa.me/918167412511?text=' + encodeURIComponent(data.waText);

  panel.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div class="md:col-span-7 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>${data.tag}</span>
        </div>
        <h3 class="font-serif text-2xl sm:text-3xl font-bold text-royal-950">
          ${data.title}
        </h3>
        <p class="text-slate-600 text-sm leading-relaxed font-light">
          ${data.desc}
        </p>
        
        <div class="space-y-2 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-700">
          <div class="flex items-center gap-2.5">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-600 flex-shrink-0"></i>
            <span><strong>${lang === 'bn' ? 'চিকিৎসা পদ্ধতি:' : 'Clinical Therapy:'}</strong> ${data.therapy}</span>
          </div>
          <div class="flex items-center gap-2.5">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-600 flex-shrink-0"></i>
            <span><strong>${lang === 'bn' ? 'আরোগ্যের সময়সীমা:' : 'Expected Relief:'}</strong> ${data.recovery}</span>
          </div>
          <div class="flex items-center gap-2.5">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-600 flex-shrink-0"></i>
            <span><strong>${lang === 'bn' ? 'ডাক্তারের পরামর্শ:' : 'Doctor Advice:'}</strong> ${data.advice}</span>
          </div>
        </div>

        <div class="pt-4 flex flex-wrap gap-3">
          <a href="${waUrl}"
             target="_blank" rel="noopener noreferrer"
             class="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>${lang === 'bn' ? 'হোয়াটসঅ্যাপে বুক করুন' : 'Consult Doctor on WhatsApp'}</span>
          </a>
          <button type="button" onclick="preselectService('${data.serviceVal}')" 
                  class="px-5 py-3.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs uppercase tracking-wider border border-brand-200 transition flex items-center gap-1.5">
            <span>${lang === 'bn' ? 'ক্লিনিক ফর্ম পূরণ' : 'Book in Clinic Form'}</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <div class="md:col-span-5 bg-gradient-to-br from-brand-900 to-royal-950 text-white rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg">
        <span class="text-gold-300 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
          <i data-lucide="shield-check" class="w-4 h-4 text-gold-400"></i>
          <span>${lang === 'bn' ? 'প্রমাণভিত্তিক সেবা' : 'Evidence-Based Care'}</span>
        </span>
        <h4 class="font-serif font-bold text-lg">${data.factTitle}</h4>
        <p class="text-xs text-slate-300 leading-relaxed font-light">
          ${data.factDesc}
        </p>
        <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
          <span>${lang === 'bn' ? 'বেলদা ক্লিনিক' : 'Belda Clinic Suite'}</span>
          <span class="text-gold-300 font-bold">${lang === 'bn' ? 'সোম - শনি (সকাল ৯টা - রাত ৮টা)' : 'Mon - Sat (9 AM - 8 PM)'}</span>
        </div>
      </div>
    </div>
  `;

  if (typeof renderLucideIcons === 'function') {
    renderLucideIcons();
  }
}

window.updatePainDetail = updatePainDetail;
window.painData = painData;
