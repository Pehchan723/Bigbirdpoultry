document.addEventListener('DOMContentLoaded', function() {
    // Product Filtering Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            const filter = button.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonials Slider Functionality
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Next button click event
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Previous button click event
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Stop auto-rotation when user interacts with controls
    document.querySelector('.testimonial-controls').addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    // Resume auto-rotation when user leaves controls
    document.querySelector('.testimonial-controls').addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
    
    // Product Item Hover Animation
    productItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.product-image img').style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.product-image img').style.transform = 'scale(1)';
        });
    });
});
// Get the modal
var modal = document.getElementById("orderFormModal");

// Get all Order Now buttons
var orderButtons = document.querySelectorAll(".read-more");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Set the product in the form when clicking Order Now
orderButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    // Prevent the default anchor behavior - IMPORTANT!
    event.preventDefault();
    event.stopPropagation(); // Also stop propagation for good measure
    
    // Get the product name from the parent element
    var productItem = this.closest('.product-item');
    var productName = productItem.querySelector('h3').textContent;
    
    // Set the selected product in the dropdown
    var productSelect = document.getElementById("product");
    for (var i = 0; i < productSelect.options.length; i++) {
      if (productSelect.options[i].value === productName) {
        productSelect.selectedIndex = i;
        break;
      }
    }
    
    // Display the modal
    modal.style.display = "block";
    
    // Return false to ensure the link doesn't navigate
    return false;
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Form submission
document.getElementById("orderForm").addEventListener("submit", function(event) {
  event.preventDefault();
  // Here you would normally send the form data to your server
  alert("Thank you for your order! We will contact you soon to confirm.");
  modal.style.display = "none";
});
// Add this to your JavaScript file or include in a <script> tag at the bottom of your page
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const bookingForm = document.getElementById('poultryBookingForm');
    const productSelect = document.getElementById('product');
    const quantityUnit = document.getElementById('quantityUnit');
    const formSubmitMessage = document.getElementById('formSubmitMessage');
    
    // Update quantity unit based on selected product
    productSelect.addEventListener('change', function() {
        switch(this.value) {
            case 'whole-chicken':
                quantityUnit.textContent = 'pcs';
                break;
            case 'chicken-legs':
                quantityUnit.textContent = 'kg';
                break;
            case 'chicken-wings':
                quantityUnit.textContent = 'kg';
                break;
            default:
                quantityUnit.textContent = 'kg';
        }
    });
    
    // Form submission handling
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const bookingData = {};
        
        formData.forEach((value, key) => {
            bookingData[key] = value;
        });
        
        // Validate form data
        if (validateForm(bookingData)) {
            // Simulate form submission
            submitForm(bookingData);
        }
    });
    
    // Form validation
    function validateForm(data) {
        // Reset previous messages
        formSubmitMessage.className = 'hidden';
        
        // Basic validation
        if (!data.name || data.name.trim() === '') {
            showMessage('Please enter your name', 'error');
            return false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!data.phone || !isValidPhone(data.phone)) {
            showMessage('Please enter a valid phone number', 'error');
            return false;
        }
        
        if (!data.product) {
            showMessage('Please select a product', 'error');
            return false;
        }
        
        if (!data.quantity || data.quantity < 1) {
            showMessage('Please enter a valid quantity', 'error');
            return false;
        }
        
        if (!data.deliveryDate) {
            showMessage('Please select a delivery date', 'error');
            return false;
        }
        
        // Check if delivery date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deliveryDate = new Date(data.deliveryDate);
        
        if (deliveryDate < today) {
            showMessage('Please select a future delivery date', 'error');
            return false;
        }
        
        return true;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation helper
    function isValidPhone(phone) {
        const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
        return phoneRegex.test(phone);
    }
    
    // Submit form data (simulated)
    function submitForm(data) {
        // In a real application, you would send this data to your server
        console.log('Form data to be submitted:', data);
        
        // Simulate successful submission after a delay
        setTimeout(() => {
            showMessage('Your order has been booked successfully! We will contact you shortly to confirm.', 'success');
            bookingForm.reset();
            quantityUnit.textContent = 'kg';
        }, 1000);
    }
    
    // Show message helper
    function showMessage(message, type) {
        formSubmitMessage.textContent = message;
        formSubmitMessage.className = type;
    }
});