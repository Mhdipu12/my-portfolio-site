// ===================================
// Smooth Scrolling & Navigation
// ===================================

// Get DOM elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('section');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===================================
// Project Filtering
// ===================================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// Project Modal
// ===================================

const modal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const viewProjectBtns = document.querySelectorAll('.btn-view-project');

// Project data - In a real application, this would come from a database or API
const projectData = {
    '1': {
        title: 'Stock Price Forecasting with LSTM',
        problem: 'Predicting stock prices is challenging due to market volatility, non-linear patterns, and multiple influencing factors. Traditional statistical models often fail to capture complex temporal dependencies.',
        dataset: 'Historical stock data from Yahoo Finance API (2015-2024) including daily prices, trading volume, and technical indicators for S&P 500 stocks.',
        method: 'Implemented a multi-layer LSTM (Long Short-Term Memory) network with attention mechanism. The model architecture includes:',
        methodDetails: [
            'Input layer processing 60-day historical sequences',
            '3 LSTM layers (128, 64, 32 units) with dropout (0.2) for regularization',
            'Attention layer to focus on important time steps',
            'Dense output layer for price prediction',
            'Adam optimizer with learning rate scheduling'
        ],
        metrics: 'Model Performance:',
        metricsDetails: [
            'RMSE: 2.34 (on test set)',
            'MAPE: 3.2%',
            'R² Score: 0.89',
            'Direction Accuracy: 87% (up/down prediction)'
        ],
        tools: 'TensorFlow, Keras, Pandas, NumPy, Matplotlib, yfinance, scikit-learn',
        github: 'https://github.com/yourusername/stock-lstm',
        demo: 'https://stock-predictor-demo.com'
    },
    '2': {
        title: 'Sales Forecasting with ARIMA',
        problem: 'E-commerce businesses need accurate sales forecasts for inventory management, resource allocation, and strategic planning. The challenge is handling seasonal patterns, trends, and irregular fluctuations.',
        dataset: '3 years of daily sales data from a retail company (2021-2024), including 1,095 observations with multiple product categories.',
        method: 'Applied SARIMA (Seasonal ARIMA) modeling approach with the following steps:',
        methodDetails: [
            'Time series decomposition (trend, seasonality, residuals)',
            'Stationarity testing using Augmented Dickey-Fuller test',
            'ACF/PACF analysis for parameter selection',
            'Grid search for optimal (p,d,q)(P,D,Q)m parameters',
            'Final model: SARIMA(2,1,2)(1,1,1,7)'
        ],
        metrics: 'Forecast Accuracy:',
        metricsDetails: [
            'MAE: 234 units',
            'RMSE: 312 units',
            'MAPE: 4.8%',
            'Forecast bias: -0.02 (nearly unbiased)'
        ],
        tools: 'Python, Statsmodels, Pandas, NumPy, Matplotlib, Seaborn',
        github: 'https://github.com/yourusername/sales-arima',
        demo: null
    },
    '3': {
        title: 'Customer Sentiment Analysis',
        problem: 'Manual analysis of thousands of customer reviews is time-consuming and inconsistent. Companies need automated, accurate sentiment classification to understand customer feedback at scale.',
        dataset: '50,000 product reviews from Amazon, labeled with sentiment (positive, negative, neutral). Dataset includes review text, ratings, and metadata.',
        method: 'Fine-tuned BERT (Bidirectional Encoder Representations from Transformers) for multi-class sentiment classification:',
        methodDetails: [
            'Preprocessed text (cleaning, tokenization)',
            'Used pre-trained BERT-base-uncased model',
            'Added classification head with dropout',
            'Fine-tuned on domain-specific review data',
            'Applied class weights to handle imbalance',
            'Implemented early stopping and learning rate warmup'
        ],
        metrics: 'Classification Results:',
        metricsDetails: [
            'Overall Accuracy: 94.2%',
            'Positive Precision/Recall: 95%/96%',
            'Negative Precision/Recall: 93%/91%',
            'Neutral Precision/Recall: 92%/93%',
            'F1-Score (macro avg): 0.94'
        ],
        tools: 'PyTorch, Transformers (Hugging Face), NLTK, Pandas, scikit-learn',
        github: 'https://github.com/yourusername/sentiment-bert',
        demo: 'https://sentiment-analyzer-demo.com'
    },
    '4': {
        title: 'Interactive Analytics Dashboard',
        problem: 'Business stakeholders need real-time access to KPIs and data insights without technical expertise. Static reports are outdated by the time they\'re distributed.',
        dataset: 'Real-time business data from PostgreSQL database including sales, customer behavior, inventory, and marketing metrics.',
        method: 'Built interactive web-based dashboard using Plotly Dash framework:',
        methodDetails: [
            'Backend: Python with Dash framework',
            'Database connection: SQLAlchemy with connection pooling',
            'Interactive visualizations: Plotly graphs',
            'Real-time updates: WebSocket integration',
            'Filtering and drill-down capabilities',
            'Responsive design for mobile access'
        ],
        metrics: 'Dashboard Features:',
        metricsDetails: [
            'Real-time data refresh (30-second intervals)',
            '15+ interactive charts and graphs',
            'Custom date range selection',
            'Export functionality (CSV, PDF)',
            'User access control and permissions',
            'Average load time: 1.2 seconds'
        ],
        tools: 'Plotly Dash, Python, PostgreSQL, SQLAlchemy, Pandas, HTML/CSS',
        github: 'https://github.com/yourusername/analytics-dashboard',
        demo: 'https://analytics-dashboard-demo.com'
    },
    '5': {
        title: 'Image Classification CNN',
        problem: 'Manual image categorization is labor-intensive and error-prone. Need automated classification system for large-scale image datasets with high accuracy.',
        dataset: 'Custom dataset of 100,000 images across 10 categories, collected and labeled from various sources. Split: 70% training, 15% validation, 15% test.',
        method: 'Developed Convolutional Neural Network with transfer learning:',
        methodDetails: [
            'Base model: Pre-trained ResNet50 on ImageNet',
            'Froze early layers, fine-tuned later layers',
            'Added custom classification layers',
            'Data augmentation (rotation, flip, zoom, brightness)',
            'Batch normalization and dropout for regularization',
            'Used mixed precision training for efficiency'
        ],
        metrics: 'Model Performance:',
        metricsDetails: [
            'Test Accuracy: 95.3%',
            'Top-5 Accuracy: 99.1%',
            'Average inference time: 23ms per image',
            'Model size: 98MB',
            'Confusion matrix shows balanced performance across all classes'
        ],
        tools: 'Keras, TensorFlow, OpenCV, NumPy, scikit-learn, Matplotlib',
        github: 'https://github.com/yourusername/image-cnn',
        demo: 'https://image-classifier-demo.com'
    },
    '6': {
        title: 'ML Model Deployment Platform',
        problem: 'Data scientists struggle to deploy ML models to production. Need streamlined platform for model serving, monitoring, and version control.',
        dataset: 'Platform supports various model types (scikit-learn, TensorFlow, PyTorch) and handles different data formats.',
        method: 'Built end-to-end ML deployment platform:',
        methodDetails: [
            'Backend API: Flask with RESTful endpoints',
            'Model serialization: Pickle, ONNX format support',
            'Containerization: Docker for reproducibility',
            'Orchestration: Kubernetes for scaling',
            'Cloud deployment: AWS EC2 + S3 for model storage',
            'Monitoring: Prometheus + Grafana dashboards',
            'CI/CD: GitHub Actions for automated deployment'
        ],
        metrics: 'Platform Capabilities:',
        metricsDetails: [
            'API response time: avg 45ms',
            '99.9% uptime',
            'Supports 1000+ requests/second',
            'Auto-scaling based on load',
            'Model versioning and rollback',
            'Real-time performance monitoring'
        ],
        tools: 'Flask, Docker, Kubernetes, AWS (EC2, S3), Prometheus, Grafana, GitHub Actions',
        github: 'https://github.com/yourusername/ml-deployment',
        demo: 'https://ml-platform-demo.com'
    }
};

// Open modal with project details
viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                
                <h3>Problem Statement</h3>
                <p>${project.problem}</p>
                
                <h3>Dataset</h3>
                <p>${project.dataset}</p>
                
                <h3>Method & Approach</h3>
                <p>${project.method}</p>
                <ul>
                    ${project.methodDetails.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                
                <h3>Evaluation Metrics</h3>
                <p>${project.metrics}</p>
                <ul>
                    ${project.metricsDetails.map(metric => `<li>${metric}</li>`).join('')}
                </ul>
                
                <h3>Tools & Technologies</h3>
                <div class="project-tags">
                    ${project.tools.split(', ').map(tool => `<span class="tag">${tool}</span>`).join('')}
                </div>
                
                <div class="modal-links">
                    <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary">
                        View on GitHub
                    </a>
                    ${project.demo ? `
                        <a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-secondary">
                            Live Demo
                        </a>
                    ` : ''}
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission (replace with actual API call)
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to a server:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        contactForm.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
    });
    */
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px   0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ===================================

function typeEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing effect after page load
    setTimeout(type, 500);
}

// Uncomment to enable typing effect
// window.addEventListener('load', typeEffect);

// ===================================
// Parallax Effect for Hero Section (Optional)
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Initialize on Page Load
// ===================================

window.addEventListener('load', () => {
    // Initial active link update
    updateActiveNavLink();
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    console.log('Portfolio website loaded successfully! 🚀');
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events for better performance
const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ===================================
// Accessibility Enhancements
// ===================================

// Focus trap for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

// Apply focus trap when modal opens
const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    trapFocus(modalContent);
}

// Announce page changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Example usage: announce filter changes
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.textContent;
        announceToScreenReader(`Filtered projects by ${filter}`);
    });
});