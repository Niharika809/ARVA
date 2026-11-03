/**
 * ARVA – Marketing Beyond Limits
 * Interactive UI Engine & Client-Side Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation & Header Scroll State
  const header = document.querySelector('.site-header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Navigation Active Link Tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => navObserver.observe(section));

  // 4. Animated Number Counters
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let hasAnimatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedCounters) {
        hasAnimatedCounters = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1600; // ms
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              counter.innerText = target + suffix;
              clearInterval(timer);
            } else {
              counter.innerText = count + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.about-stats-column');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // 5. Service Detail Modal Data & Interactions
  const serviceDetails = {
    'digital-marketing': {
      title: '01. Smart Digital Marketing',
      category: 'Growth & Visibility',
      desc: 'Our digital marketing ecosystem combines analytical rigour with imaginative storytelling to maximize visibility, customer acquisition, and return on ad spend (ROAS).',
      bullets: [
        'Search Engine Optimization (SEO) with on-page, off-page & technical architecture',
        'Search Engine Marketing (SEM) high-intent search campaigns',
        'Omni-channel Social Media Marketing & community amplification',
        'Data-driven Content Marketing & thought leadership',
        'Hyper-targeted Paid Advertising across Google, Meta, and LinkedIn'
      ]
    },
    'brand-visibility': {
      title: '02. Brand Visibility & Growth',
      category: 'Brand Equity',
      desc: 'We engineer memorable, authentic brand identities that command market attention, instill lasting trust, and elevate consumer loyalty.',
      bullets: [
        'End-to-End Brand Identity & Visual Language Development',
        'Comprehensive Online Brand Presence & Digital Footprint',
        'Strategic Corporate Reputation & Sentiment Management',
        'Disruptive Creative Marketing Campaigns & Product Launches',
        'Multi-tiered Brand Promotion & Strategic Amplification'
      ]
    },
    'non-it-solutions': {
      title: '03. End-to-End Non-IT Solutions',
      category: 'Operational Excellence',
      desc: 'ARVA bridges the gap between digital ambition and physical world execution through specialized non-IT business support, field promotions, and operational coordination.',
      bullets: [
        'High-Impact On-Ground Promotional Activities & Roadshows',
        'Targeted Offline Marketing, Print & Regional Outreach',
        'Dedicated Business Support & Workflow Optimization',
        'Seamless Marketing Coordination & Vendor Alignment',
        'Turnkey Campaign Execution with verifiable deliverables'
      ]
    },
    'lead-generation': {
      title: '04. Lead Generation & Sales',
      category: 'Revenue Acceleration',
      desc: 'Fuel your sales pipeline with verified, qualified, and high-conversion prospects generated through systematic multi-channel outreach.',
      bullets: [
        'Laser-Targeted Customer Acquisition Frameworks',
        'B2B & B2C High-Conversion Lead Generation Systems',
        'Strategic Business Outreach & Decision-Maker Engagement',
        'Multi-Touch Customer Engagement & Nurturing Sequences',
        'Continuous Performance Analysis, Attribution & Optimization'
      ]
    }
  };

  const serviceModal = document.getElementById('serviceModal');
  const serviceModalTitle = document.getElementById('serviceModalTitle');
  const serviceModalBody = document.getElementById('serviceModalBody');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const modalRequestServiceBtn = document.getElementById('modalRequestServiceBtn');
  let currentSelectedService = '';

  document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      const data = serviceDetails[serviceKey];
      if (data) {
        currentSelectedService = data.title;
        serviceModalTitle.innerText = data.title;
        serviceModalBody.innerHTML = `
          <div style="margin-bottom: 12px; font-size: 0.8rem; font-weight: 700; color: var(--primary-blue); text-transform: uppercase;">
            ${data.category}
          </div>
          <p style="margin-bottom: 20px; font-size: 0.95rem; line-height: 1.6;">${data.desc}</p>
          <h4 style="font-size: 1rem; color: var(--steel-dark); margin-bottom: 12px;">Core Capabilities & Deliverables:</h4>
          <ul style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
            ${data.bullets.map(b => `<li style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.88rem; color: var(--steel-slate);"><span style="color: var(--primary-blue); font-weight: bold;">✓</span> ${b}</li>`).join('')}
          </ul>
        `;
        serviceModal.classList.add('active');
      }
    });
  });

  if (closeServiceModal && serviceModal) {
    closeServiceModal.addEventListener('click', () => serviceModal.classList.remove('active'));
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) serviceModal.classList.remove('active');
    });
  }

  if (modalRequestServiceBtn) {
    modalRequestServiceBtn.addEventListener('click', () => {
      serviceModal.classList.remove('active');
      const serviceSelect = document.getElementById('serviceSelect');
      if (serviceSelect && currentSelectedService) {
        // Find matching option
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(currentSelectedService.slice(4, 15))) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 6. Video Preview Modal
  const videoModal = document.getElementById('videoModal');
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  const closeVideoModal = document.getElementById('closeVideoModal');

  if (watchVideoBtn && videoModal) {
    watchVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
    });
  }

  if (closeVideoModal && videoModal) {
    closeVideoModal.addEventListener('click', () => videoModal.classList.remove('active'));
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) videoModal.classList.remove('active');
    });
  }

  // 7. Search Modal
  const searchModal = document.getElementById('searchModal');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeSearchModal = document.getElementById('closeSearchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchableIndex = [
    { title: 'Smart Digital Marketing', category: 'Services', link: '#services' },
    { title: 'Search Engine Optimization (SEO)', category: 'Capabilities', link: '#services' },
    { title: 'Brand Visibility & Growth', category: 'Services', link: '#services' },
    { title: 'Online Brand Presence & Reputation', category: 'Capabilities', link: '#services' },
    { title: 'End-to-End Non-IT Solutions', category: 'Services', link: '#services' },
    { title: 'Promotional & Offline Activities', category: 'Capabilities', link: '#services' },
    { title: 'Lead Generation & Sales Outreach', category: 'Services', link: '#services' },
    { title: 'About ARVA & STRINT Business Unit', category: 'Company', link: '#about' },
    { title: 'Our 4-Step Process: Understand, Strategize, Execute, Review', category: 'Process', link: '#process' },
    { title: 'Industries We Serve: Retail, Real Estate, Healthcare, Education', category: 'Industries', link: '#industries' },
    { title: 'Contact Enquiry Form & Offices', category: 'Contact', link: '#contact' }
  ];

  if (openSearchBtn && searchModal) {
    openSearchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      setTimeout(() => searchInput.focus(), 100);
      renderSearchResults(searchableIndex);
    });
  }

  if (closeSearchModal && searchModal) {
    closeSearchModal.addEventListener('click', () => searchModal.classList.remove('active'));
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('active');
    });
  }

  function renderSearchResults(items) {
    if (!searchResults) return;
    if (items.length === 0) {
      searchResults.innerHTML = `<div style="padding: 12px; color: var(--silver-dark); font-size: 0.88rem; text-align: center;">No matching services or topics found.</div>`;
      return;
    }
    searchResults.innerHTML = items.map(item => `
      <a href="${item.link}" class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('active');">
        <span class="search-result-category">${item.category}</span>
        <span class="search-result-title">${item.title}</span>
      </a>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderSearchResults(searchableIndex);
      } else {
        const filtered = searchableIndex.filter(item =>
          item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
        );
        renderSearchResults(filtered);
      }
    });
  }

  // 8. Contact Enquiry Form Submission & Persistence
  const enquiryForm = document.getElementById('enquiryForm');
  const submitBtn = document.getElementById('submitEnquiryBtn');
  const successToast = document.getElementById('successToast');
  const successToastMsg = document.getElementById('successToastMsg');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic Validation
      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('emailAddress').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const service = document.getElementById('serviceSelect').value;
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !phone) {
        alert('Please provide your Full Name, Email Address, and Phone Number.');
        return;
      }

      // Email format check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const enquiryData = {
        id: 'ARVA-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        service,
        message
      };

      // Button loading state
      const origBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Submitting...</span>`;
      submitBtn.disabled = true;

      // 1. Save to localStorage database
      let storedEnquiries = [];
      try {
        storedEnquiries = JSON.parse(localStorage.getItem('arva_enquiries') || '[]');
      } catch (err) {
        storedEnquiries = [];
      }
      storedEnquiries.unshift(enquiryData);
      localStorage.setItem('arva_enquiries', JSON.stringify(storedEnquiries));

      // 2. Try posting to submit_enquiry.php if supported
      try {
        await fetch('submit_enquiry.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enquiryData)
        });
      } catch (postErr) {
        console.log('Static preview mode: enquiry stored in browser database.');
      }

      // Reset button
      submitBtn.innerHTML = origBtnText;
      submitBtn.disabled = false;
      enquiryForm.reset();

      // Show toast
      if (successToastMsg) {
        successToastMsg.innerHTML = `<strong>Enquiry Submitted Successfully!</strong><br><small>Reference ID: ${enquiryData.id} • An ARVA representative will reach out shortly.</small>`;
      }
      successToast.classList.add('show');
      setTimeout(() => {
        successToast.classList.remove('show');
      }, 5500);
    });
  }

  // 9. Secret key shortcut to inspect stored enquiries (Ctrl + Shift + E)
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
      showEnquiriesModal();
    }
  });

  const viewEnquiriesFooterLink = document.getElementById('viewEnquiriesFooterLink');
  if (viewEnquiriesFooterLink) {
    viewEnquiriesFooterLink.addEventListener('click', (e) => {
      e.preventDefault();
      showEnquiriesModal();
    });
  }

  function showEnquiriesModal() {
    const enquiries = JSON.parse(localStorage.getItem('arva_enquiries') || '[]');
    let modal = document.getElementById('adminEnquiriesModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'adminEnquiriesModal';
      modal.className = 'modal-backdrop active';
      modal.innerHTML = `
        <div class="modal-box" style="max-width: 720px; max-height: 85vh; display: flex; flex-direction: column;">
          <div class="modal-header">
            <h3 class="modal-title">ARVA Enquiries Database (${enquiries.length})</h3>
            <button class="modal-close-btn" onclick="document.getElementById('adminEnquiriesModal').remove()">&times;</button>
          </div>
          <div class="modal-body" style="overflow-y: auto; flex-grow: 1; padding: 20px;">
            ${enquiries.length === 0 ? '<p style="text-align:center; color: var(--silver-dark);">No enquiries submitted yet. Fill out the contact form to see records here.</p>' :
              enquiries.map(enq => `
                <div style="background: var(--frost-white); border: 1px solid var(--silver-border); border-radius: 8px; padding: 14px 18px; margin-bottom: 12px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
                    <strong style="color: var(--primary-blue);">${enq.id}</strong>
                    <span style="font-size: 0.78rem; color: var(--silver-dark);">${new Date(enq.timestamp).toLocaleString()}</span>
                  </div>
                  <div style="font-size: 0.92rem; font-weight: 700; color: var(--steel-dark);">${enq.name}</div>
                  <div style="font-size: 0.85rem; color: var(--steel-grey); margin-bottom: 4px;">📧 ${enq.email} | 📞 ${enq.phone}</div>
                  <div style="font-size: 0.82rem; color: var(--primary-blue); font-weight: 600; margin-bottom: 4px;">🎯 Service: ${enq.service}</div>
                  <div style="font-size: 0.84rem; color: var(--steel-slate); background: white; padding: 8px 12px; border-radius: 4px; border: 1px solid var(--silver-light);">
                    ${enq.message || 'No additional message.'}
                  </div>
                </div>
              `).join('')
            }
          </div>
          <div style="padding: 16px 24px; border-top: 1px solid var(--silver-light); display: flex; justify-content: space-between; align-items: center;">
            <button class="btn btn-outline btn-sm" onclick="localStorage.removeItem('arva_enquiries'); document.getElementById('adminEnquiriesModal').remove();">Clear Records</button>
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('adminEnquiriesModal').remove()">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    } else {
      modal.remove();
    }
  }

  // 10. Why Choose Video Showcase Controls
  const arvaVideo = document.getElementById('arvaVideo');
  const videoPlayToggle = document.getElementById('videoPlayToggle');
  const videoMuteToggle = document.getElementById('videoMuteToggle');
  const videoFullscreenToggle = document.getElementById('videoFullscreenToggle');

  if (arvaVideo) {
    // Attempt auto-playback
    arvaVideo.play().catch(() => {});

    // Sync play/pause icons
    const updatePlayState = () => {
      if (!videoPlayToggle) return;
      const iconPause = videoPlayToggle.querySelector('.icon-pause');
      const iconPlay = videoPlayToggle.querySelector('.icon-play');
      if (arvaVideo.paused) {
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
        videoPlayToggle.setAttribute('title', 'Play');
      } else {
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
        videoPlayToggle.setAttribute('title', 'Pause');
      }
    };

    // Sync mute/sound icons
    const updateMuteState = () => {
      if (!videoMuteToggle) return;
      const iconMuted = videoMuteToggle.querySelector('.icon-muted');
      const iconSound = videoMuteToggle.querySelector('.icon-sound');
      if (arvaVideo.muted) {
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconSound) iconSound.style.display = 'none';
        videoMuteToggle.setAttribute('title', 'Unmute Sound');
      } else {
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconSound) iconSound.style.display = 'block';
        videoMuteToggle.setAttribute('title', 'Mute Sound');
      }
    };

    if (videoPlayToggle) {
      videoPlayToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (arvaVideo.paused) {
          arvaVideo.play().catch(() => {});
        } else {
          arvaVideo.pause();
        }
        updatePlayState();
      });
    }

    if (videoMuteToggle) {
      videoMuteToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        arvaVideo.muted = !arvaVideo.muted;
        updateMuteState();
      });
    }

    if (videoFullscreenToggle) {
      videoFullscreenToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const container = arvaVideo.closest('.why-skyscraper-card') || arvaVideo;
        if (!document.fullscreenElement) {
          if (container.requestFullscreen) {
            container.requestFullscreen();
          } else if (arvaVideo.webkitRequestFullscreen) {
            arvaVideo.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // Clicking the video directly toggles play/pause
    arvaVideo.addEventListener('click', () => {
      if (arvaVideo.paused) {
        arvaVideo.play().catch(() => {});
      } else {
        arvaVideo.pause();
      }
      updatePlayState();
    });

    arvaVideo.addEventListener('play', updatePlayState);
    arvaVideo.addEventListener('pause', updatePlayState);
    arvaVideo.addEventListener('volumechange', updateMuteState);

    // IntersectionObserver to auto-pause when out of view and resume when scrolled into view
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          arvaVideo.play().catch(() => {});
        } else {
          arvaVideo.pause();
        }
      });
    }, { threshold: 0.25 });

    videoObserver.observe(arvaVideo);
  }
});
