/**
 * Vantage Search Media - Landing Page Engine
 * Interactivity, ROI Calculator, Testimonials & Form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize elements
  initScrollNavbar();
  initMobileMenu();
  initRoiCalculator();
  initTestimonialSlider();
  initFaqAccordion();
  highlightActiveLink();
  initMeetingScheduler();
  initAdPreviewBuilder();
  initMapPackBooster();
  initInstantAuditScanner();
  initBeforeAfterSliders();
  initCaseStudyFilters();
  initClientRevenueTicker();
});

/* ==========================================
   NAVBAR SCROLL BEHAVIOR
   ========================================== */
function initScrollNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileMenu || !mobileClose) return;

  const openMenu = () => mobileMenu.classList.add('open');
  const closeMenu = () => mobileMenu.classList.remove('open');

  mobileToggle.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================
   SERVICES TAB CONTROLLER
   ========================================== */
function switchTab(tabType) {
  const btnTabAds = document.getElementById('btn-tab-ads');
  const btnTabSeo = document.getElementById('btn-tab-seo');
  const tabAds = document.getElementById('tab-ads');
  const tabSeo = document.getElementById('tab-seo');

  if (!btnTabAds || !btnTabSeo || !tabAds || !tabSeo) return;

  if (tabType === 'ads') {
    btnTabAds.classList.add('active');
    btnTabSeo.classList.remove('active');
    tabAds.classList.add('active');
    tabSeo.classList.remove('active');
  } else {
    btnTabSeo.classList.add('active');
    btnTabAds.classList.remove('active');
    tabSeo.classList.add('active');
    tabAds.classList.remove('active');
  }
}

/* ==========================================
   INTERACTIVE ROI CALCULATOR
   ========================================== */
function initRoiCalculator() {
  // Inputs
  const budgetInput = document.getElementById('slider-budget');
  const cplInput = document.getElementById('slider-cpl');
  const closeRateInput = document.getElementById('slider-close-rate');
  const dealValueInput = document.getElementById('slider-deal-value');

  // Value Display Boxes
  const budgetVal = document.getElementById('val-budget');
  const cplVal = document.getElementById('val-cpl');
  const closeRateVal = document.getElementById('val-close-rate');
  const dealValueVal = document.getElementById('val-deal-value');

  // Outputs
  const resultRevenue = document.getElementById('result-revenue');
  const resultRoi = document.getElementById('result-roi');
  const resultLeads = document.getElementById('result-leads');
  const resultDeals = document.getElementById('result-deals');

  if (!budgetInput || !cplInput || !closeRateInput || !dealValueInput) return;

  const calculateROI = () => {
    const budget = parseFloat(budgetInput.value);
    const cpl = parseFloat(cplInput.value);
    const closeRate = parseFloat(closeRateInput.value) / 100;
    const dealValue = parseFloat(dealValueInput.value);

    // Update Slider Displays
    budgetVal.textContent = budget.toLocaleString();
    cplVal.textContent = cpl;
    closeRateVal.textContent = Math.round(closeRate * 100);
    dealValueVal.textContent = dealValue.toLocaleString();

    // Calculations
    const leads = Math.floor(budget / cpl);
    const deals = Math.floor(leads * closeRate);
    const revenue = deals * dealValue;
    const roiRatio = budget > 0 ? (revenue / budget).toFixed(1) : "0.0";

    // Update UI Results
    resultLeads.textContent = leads.toLocaleString();
    resultDeals.textContent = deals.toLocaleString();
    resultRevenue.textContent = `$${revenue.toLocaleString()}`;
    resultRoi.textContent = roiRatio;
  };

  // Attach Event Listeners
  [budgetInput, cplInput, closeRateInput, dealValueInput].forEach(slider => {
    slider.addEventListener('input', calculateROI);
  });

  // Run initial calculation on page load
  calculateROI();
}

/* ==========================================
   TESTIMONIALS SLIDER
   ========================================== */
let currentSlideIndex = 0;
let slideInterval;

function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return;

  // Auto scroll every 7 seconds
  startSlideShow();

  // Pause slideshow when user hovers over testimonials
  const sliderContainer = document.querySelector('.testimonial-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);
  }
}

function startSlideShow() {
  stopSlideShow();
  slideInterval = setInterval(() => {
    const slides = document.querySelectorAll('.testimonial-slide');
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    gotoSlide(nextIndex);
  }, 7000);
}

function stopSlideShow() {
  if (slideInterval) clearInterval(slideInterval);
}

function gotoSlide(index) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (slides.length === 0 || index < 0 || index >= slides.length) return;

  // Remove active classes
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Set new active slide & dot
  slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
  
  currentSlideIndex = index;
}

/* ==========================================
   FAQS ACCORDION
   ========================================== */
function initFaqAccordion() {
  // Accordions are toggled directly by inline onclick on the header
}

function toggleFaq(headerElement) {
  const item = headerElement.parentElement;
  const body = item.querySelector('.faq-body');
  const isActive = item.classList.contains('active');

  // Close all other FAQs
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(otherItem => {
    if (otherItem !== item) {
      otherItem.classList.remove('active');
      otherItem.querySelector('.faq-body').style.maxHeight = null;
    }
  });

  if (isActive) {
    item.classList.remove('active');
    body.style.maxHeight = null;
  } else {
    item.classList.add('active');
    // Set max height dynamically based on content scrollHeight
    body.style.maxHeight = body.scrollHeight + "px";
  }
}

/* ==========================================
   CONTACT FORM SUBMISSION (LOCAL SIMULATOR)
   ========================================== */
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('lead-form');
  const successOverlay = document.getElementById('form-success');
  const submittedEmailSpan = document.getElementById('submitted-email');
  
  if (!form || !successOverlay) return;

  // Gather values
  const businessName = document.getElementById('business-name').value;
  const websiteUrl = document.getElementById('website-url').value;
  const leadGoal = document.getElementById('lead-goal').value;
  const clientName = document.getElementById('client-name').value;
  const clientEmail = document.getElementById('client-email').value;
  const clientPhone = document.getElementById('client-phone').value;

  // Visual feedback: disable submit button during processing simulation
  const submitBtn = form.querySelector('.form-submit-btn');
  const submitBtnText = submitBtn.querySelector('span');
  const originalText = submitBtnText.textContent;
  
  submitBtn.disabled = true;
  submitBtnText.textContent = "Analyzing competitors...";

  // Simulated Delay representing API webhook execution
  setTimeout(() => {
    // 1. Log submission locally for user verification / database backup
    const leadData = {
      businessName,
      websiteUrl,
      leadGoal,
      clientName,
      clientEmail,
      clientPhone,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage so developers can verify submission logs in DevTools
    const submissions = JSON.parse(localStorage.getItem('lead_submissions') || '[]');
    submissions.push(leadData);
    localStorage.setItem('lead_submissions', JSON.stringify(submissions));
    
    console.log("=== MOCK WEBHOOK LEAD CAPTURE ===");
    console.log("Lead payload successfully processed locally:", leadData);
    
    /**
     * =========================================================================
     * NOTE: HOW TO INTEGRATE CRM / WEBHOOK (ZAPIER, HUBSPOT, ACTIVE CAMPAIGN)
     * =========================================================================
     * To start sending real leads to your CRM, replace this timeout code block with:
     * 
     * fetch('YOUR_WEBHOOK_URL_HERE', {
     *   method: 'POST',
     *   headers: {
     *     'Content-Type': 'application/json',
     *   },
     *   body: JSON.stringify(leadData)
     * })
     * .then(response => response.json())
     * .then(data => {
     *   // Handle success interface transition
     * })
     * .catch((error) => {
     *   console.error('Error sending lead data:', error);
     * });
     */

    // 2. Transition form UI into success panel
    form.style.display = 'none';
    submittedEmailSpan.textContent = clientEmail;
    successOverlay.style.display = 'flex';
    
    // Scroll to form panel container
    document.getElementById('form-panel').scrollIntoView({ behavior: 'smooth' });

    // Restore button values
    submitBtn.disabled = false;
    submitBtnText.textContent = originalText;
  }, 1800);
}

function resetForm() {
  const form = document.getElementById('lead-form');
  const successOverlay = document.getElementById('form-success');
  
  if (!form || !successOverlay) return;

  form.reset();
  successOverlay.style.display = 'none';
  form.style.display = 'block';
}

/* ==========================================
   DYNAMIC ACTIVE NAV HIGHLIGHTING
   ========================================== */
function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    // Extract file name from href e.g. "about.html" or "about.html#contact"
    const hrefVal = link.getAttribute('href').split('#')[0];
    const linkPath = hrefVal.split('/').pop() || 'index.html';
    
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================
   MEETING SCHEDULER WIDGET
   ========================================== */
function initMeetingScheduler() {
  const calendarDays = document.querySelectorAll('.calendar-day.available');
  const timeSlotsContainer = document.getElementById('time-slots-container');
  const timeSlots = document.querySelectorAll('.time-slot');
  const bookingConfirmBox = document.getElementById('booking-confirm');
  const selectedDateEl = document.getElementById('selected-booking-date');
  const confirmBtn = document.getElementById('confirm-booking-btn');

  if (!calendarDays.length || !timeSlotsContainer) return;

  let selectedDateText = '';
  let selectedTimeText = '';

  calendarDays.forEach(day => {
    day.addEventListener('click', () => {
      // Clear previous day selection
      calendarDays.forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');

      selectedDateText = day.getAttribute('data-date');
      if (selectedDateEl) selectedDateEl.textContent = selectedDateText;

      // Reveal time slots
      timeSlotsContainer.style.display = 'grid';
      if (bookingConfirmBox) bookingConfirmBox.style.display = 'none';
      timeSlots.forEach(slot => slot.classList.remove('selected'));
      selectedTimeText = '';
    });
  });

  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');

      selectedTimeText = slot.getAttribute('data-time');
      
      // Reveal confirmation button
      if (bookingConfirmBox) bookingConfirmBox.style.display = 'block';
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Scheduling Strategy Call...';

      setTimeout(() => {
        const schedulerWrapper = document.getElementById('scheduler-wrapper');
        if (schedulerWrapper) {
          schedulerWrapper.innerHTML = `
            <div style="text-align:center; padding:3rem 1rem; animation: scaleIn 0.4s ease forwards;">
              <div class="success-icon-wrapper" style="margin: 0 auto 1.5rem auto;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:32px; height:32px;"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style="font-size:1.5rem; margin-bottom:0.5rem; font-family:var(--font-heading);">Strategy Call Confirmed!</h3>
              <p style="color:var(--text-secondary); max-width:400px; margin:0 auto 1.5rem auto; font-size:0.95rem;">Your call is scheduled for <strong>${selectedDateText}</strong> at <strong>${selectedTimeText}</strong>. An invite with meeting details has been sent to your email.</p>
              <button class="btn btn-secondary" onclick="window.location.reload()">Schedule Another Call</button>
            </div>
          `;
        }
      }, 1500);
    });
  }
}

/* ==========================================
   GOOGLE AD COPY BUILDER PREVIEW
   ========================================== */
function initAdPreviewBuilder() {
  const inputService = document.getElementById('ad-input-service');
  const inputCity = document.getElementById('ad-input-city');
  
  const previewHeadline = document.getElementById('ad-preview-headline');
  const previewUrlCity = document.getElementById('ad-preview-url-city');
  const previewDescCity = document.getElementById('ad-preview-desc-city');

  if (!inputService || !previewHeadline) return;

  const updatePreview = () => {
    const serviceText = inputService.value.trim() || 'Local Services';
    const cityText = inputCity ? inputCity.value.trim() || 'Your Area' : 'Your Area';

    // Format like Google Search Ads headlines
    previewHeadline.textContent = `Top Rated ${serviceText} In ${cityText} | 24/7 Professional Service`;
    if (previewUrlCity) previewUrlCity.textContent = cityText.toLowerCase().replace(/\s+/g, '-');
    if (previewDescCity) {
      previewDescCity.textContent = `${cityText}'s top rated ${serviceText.toLowerCase()} experts. Fast response times, licensed team, and 100% satisfaction guaranteed. Request your free quote blueprint now!`;
    }
  };

  inputService.addEventListener('input', updatePreview);
  if (inputCity) inputCity.addEventListener('input', updatePreview);
  
  // Trigger once initially
  updatePreview();
}

/* ==========================================
   LOCAL MAP PACK RANK BOOSTER SEQUENCE
   ========================================== */
function initMapPackBooster() {
  const triggerBtn = document.getElementById('booster-trigger');
  const clientListing = document.getElementById('listing-client');
  
  if (!triggerBtn || !clientListing) return;

  triggerBtn.addEventListener('click', () => {
    triggerBtn.disabled = true;
    triggerBtn.textContent = 'Analyzing Directory Signals...';
    triggerBtn.style.cursor = 'not-allowed';
    
    clientListing.classList.add('ranking-up');
    
    // Step 1: Rise to #3
    setTimeout(() => {
      const listC = document.getElementById('listing-c');
      if (listC) {
        clientListing.style.order = '3';
        listC.style.order = '4';
        clientListing.querySelector('.map-listing-rank').textContent = '3';
        listC.querySelector('.map-listing-rank').textContent = '4';
      }
      triggerBtn.textContent = 'Building Citations & Consistency...';
    }, 1500);

    // Step 2: Rise to #2
    setTimeout(() => {
      const listB = document.getElementById('listing-b');
      if (listB) {
        clientListing.style.order = '2';
        listB.style.order = '3';
        clientListing.querySelector('.map-listing-rank').textContent = '2';
        listB.querySelector('.map-listing-rank').textContent = '3';
      }
      triggerBtn.textContent = 'Acquiring Verified Client Reviews...';
    }, 3000);

    // Step 3: Rise to #1
    setTimeout(() => {
      const listA = document.getElementById('listing-a');
      if (listA) {
        clientListing.style.order = '1';
        listA.style.order = '2';
        clientListing.querySelector('.map-listing-rank').textContent = '1';
        listA.querySelector('.map-listing-rank').textContent = '2';
      }
      
      // Update Client Review Count
      const reviewsCount = clientListing.querySelector('.reviews-count');
      if (reviewsCount) {
        reviewsCount.textContent = '5.0 (148 Reviews) • Open';
      }
      
      triggerBtn.textContent = 'Domination Achieved! Rank #1';
      triggerBtn.style.background = 'var(--accent-emerald)';
      triggerBtn.style.borderColor = 'transparent';
      triggerBtn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
    }, 4500);
  });
}

/* ==========================================
   WEBFX INSTANT SEO AUDIT SCANNER
   ========================================== */
function initInstantAuditScanner() {
  const auditForms = document.querySelectorAll('.audit-search-group');
  const overlay = document.getElementById('audit-scanner-modal');
  const progressFill = document.getElementById('audit-progress-fill');
  
  const step1 = document.getElementById('scan-step-1');
  const step2 = document.getElementById('scan-step-2');
  const step3 = document.getElementById('scan-step-3');
  
  const scannerPanel = document.getElementById('scanner-loading-panel');
  const reportPanel = document.getElementById('scanner-report-panel');
  const reportUrl = document.getElementById('report-url-display');

  if (!auditForms.length || !overlay || !progressFill) return;

  auditForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputField = form.querySelector('.audit-search-input');
      const urlVal = inputField.value.trim() || 'yourwebsite.com';
      
      overlay.style.display = 'flex';
      scannerPanel.style.display = 'block';
      reportPanel.style.display = 'none';
      
      progressFill.style.width = '0%';
      [step1, step2, step3].forEach(step => {
        if (step) step.className = 'scan-step-item';
      });
      
      setTimeout(() => {
        if (step1) step1.classList.add('active');
        progressFill.style.width = '35%';
      }, 400);

      setTimeout(() => {
        if (step1) {
          step1.classList.remove('active');
          step1.classList.add('completed');
        }
        if (step2) step2.classList.add('active');
        progressFill.style.width = '70%';
      }, 1800);

      setTimeout(() => {
        if (step2) {
          step2.classList.remove('active');
          step2.classList.add('completed');
        }
        if (step3) step3.classList.add('active');
        progressFill.style.width = '100%';
      }, 3200);

      setTimeout(() => {
        if (step3) {
          step3.classList.remove('active');
          step3.classList.add('completed');
        }
        scannerPanel.style.display = 'none';
        reportPanel.style.display = 'block';
        if (reportUrl) reportUrl.textContent = urlVal;
      }, 4500);
    });
  });

  const closeBtn = document.getElementById('close-audit-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
  }
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });
}

/* ==========================================
   COALITION BEFORE/AFTER CHART SLIDERS
   ========================================== */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-container');
  if (!sliders.length) return;

  sliders.forEach(container => {
    const handle = container.querySelector('.slider-handle');
    const afterPane = container.querySelector('.after-pane');

    if (!handle || !afterPane) return;

    let isDragging = false;

    const updateSlider = (clientX) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      handle.style.left = `${percentage}%`;
      afterPane.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      
      const beforeLabel = container.parentElement.querySelector('.val-before');
      const afterLabel = container.parentElement.querySelector('.val-after');
      
      if (beforeLabel && afterLabel) {
        const progressVal = Math.round(120 + (percentage / 100) * (1840 - 120));
        if (percentage < 35) {
          beforeLabel.textContent = `${Math.round(120 + (percentage/35)*40)} clicks/mo`;
          afterLabel.textContent = '---';
        } else {
          beforeLabel.textContent = '120 clicks/mo';
          afterLabel.textContent = `${progressVal.toLocaleString()} clicks/mo`;
        }
      }
    };

    const onStart = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    };

    const onEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    container.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  });
}

/* ==========================================
   KLIENTBOOST CASE STUDIES FILTER GRID
   ========================================== */
function initCaseStudyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card-wrapper');

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const categoryFilter = btn.getAttribute('data-filter-category') || 'all';
      const channelFilter = btn.getAttribute('data-filter-channel') || 'all';

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardChannel = card.getAttribute('data-channel');

        const matchesCategory = (categoryFilter === 'all' || cardCategory === categoryFilter);
        const matchesChannel = (channelFilter === 'all' || cardChannel === channelFilter);

        if (matchesCategory && matchesChannel) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================
   LIVE CLIENT REVENUE COUNT-UP TICKER
   ========================================== */
function initClientRevenueTicker() {
  const tickerVal = document.getElementById('live-revenue-ticker');
  if (!tickerVal) return;

  let baseRevenue = 10142293485;
  tickerVal.textContent = baseRevenue.toLocaleString();

  setInterval(() => {
    const increment = Math.floor(Math.random() * 12) + 3;
    baseRevenue += increment;
    tickerVal.textContent = baseRevenue.toLocaleString();
  }, 800);
}

