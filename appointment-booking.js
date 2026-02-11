let selectedTime = "";

// Set minimum date to today
document.getElementById('date').min = new Date().toISOString().split('T')[0];

function selectTimeSlot(element) {
    if (element.classList.contains('unavailable')) return;
    
    // Remove selection from all slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Select clicked slot
    element.classList.add('selected');
    selectedTime = element.getAttribute('data-time');
}

function updateAISuggestions() {
    const reason = document.getElementById('reason').value;
    const aiSuggestions = document.getElementById('aiSuggestions');
    
    let suggestions = {
        'General Checkup': '💚 Great choice! Regular checkups help prevent health issues. Please fast for 8 hours before your appointment for accurate test results.',
        'Follow-up': '🔄 Follow-up appointments are important for tracking your progress. Bring your previous medical reports.',
        'Consultation': '👨‍⚕️ New consultation booked! Please bring any relevant medical history, current medications, and insurance details.',
        'Emergency': '🚨 Emergency detected! We recommend calling the clinic immediately for urgent cases. Click to call: <a href="tel:+917602711924" style="color:white;text-decoration:underline;">+91 95933 62928</a>',
        'Lab Results': '📊 Lab results discussion. Please bring your test reports and any questions you have.',
        'Vaccination': '💉 Vaccination appointment. Please inform if you have any allergies or are currently taking medications.',
        'Other': '📋 Please describe your requirements in the notes section for better assistance.'
    };
    
    if (reason && suggestions[reason]) {
        aiSuggestions.innerHTML = `
            <h3>💡 AI Smart Suggestions</h3>
            <div class="suggestion-item">${suggestions[reason]}</div>
        `;
    }
}

function applySuggestion(type) {
    if (type === 'routine-checkup') {
        document.getElementById('reason').value = 'General Checkup';
        updateAISuggestions();
    }
}

function showAIAnalysis() {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const reason = document.getElementById('reason').value;
    
    if (!age || !sex) {
        alert('⚠️ Please fill in your age and gender to get personalized AI health tips.');
        return;
    }
    
    let tips = '';
    
    // Age-based tips
    if (age < 18) {
        tips += `<div class="tip-section">
            <h3>👶 Young Patient (${age} years)</h3>
            <ul>
                <li>Focus on growth and development</li>
                <li>Ensure proper nutrition and exercise</li>
                <li>Keep vaccinations up to date</li>
                <li>Regular dental checkups</li>
            </ul>
        </div>`;
    } else if (age >= 18 && age < 40) {
        tips += `<div class="tip-section">
            <h3>💪 Adult (${age} years)</h3>
            <ul>
                <li>Maintain regular exercise routine</li>
                <li>Annual health checkups recommended</li>
                <li>Monitor stress levels and mental health</li>
                <li>Maintain healthy work-life balance</li>
            </ul>
        </div>`;
    } else if (age >= 40 && age < 60) {
        tips += `<div class="tip-section">
            <h3>🧑 Middle Age (${age} years)</h3>
            <ul>
                <li>Regular cardiovascular screening</li>
                <li>Monitor blood pressure and cholesterol</li>
                <li>Consider bone density tests</li>
                <li>Cancer screening as recommended</li>
            </ul>
        </div>`;
    } else {
        tips += `<div class="tip-section">
            <h3>👴 Senior (${age} years)</h3>
            <ul>
                <li>Comprehensive annual checkups essential</li>
                <li>Monitor chronic conditions closely</li>
                <li>Focus on mobility and balance</li>
                <li>Regular vision and hearing tests</li>
            </ul>
        </div>`;
    }
    
    // General tips
    tips += `<div class="tip-section">
        <h3>📋 General Recommendations</h3>
        <ul>
            <li>Drink 8 glasses of water daily</li>
            <li>Get 7-8 hours of quality sleep</li>
            <li>Exercise at least 30 minutes daily</li>
            <li>Eat a balanced diet rich in fruits and vegetables</li>
            <li>Practice stress management techniques</li>
            <li>Avoid smoking and limit alcohol</li>
        </ul>
    </div>`;
    
    tips += `<div class="warning-note">
        ⚠️ <strong>Note:</strong> These are general suggestions based on age and gender. Please consult Dr. Indrojit for personalized medical advice tailored to your specific health needs.
    </div>`;
    
    // Show modal
    document.getElementById('modalBody').innerHTML = tips;
    document.getElementById('aiModal').style.display = 'block';
}

function closeModal(event) {
    if (!event || event.target.id === 'aiModal') {
        document.getElementById('aiModal').style.display = 'none';
    }
}

function sendWhatsApp() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let sex = document.getElementById("sex").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let reason = document.getElementById("reason").value;
    let symptoms = document.getElementById("symptoms").value;

    // Validation
    if (!name || !age || !sex || !phone || !date || !reason) {
        alert("⚠️ Please fill all required fields");
        return;
    }

    if (!selectedTime) {
        alert("⚠️ Please select a time slot");
        return;
    }

    // Format date nicely
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Doctor's WhatsApp number
    let phoneNumber = "+917602711924";

    let message =
        `*NEW APPOINTMENT BOOKING*%0A%0A` +
        `*Patient Details:*%0A` +
        `Name: ${name}%0A` +
        `Age: ${age} years%0A` +
        `Gender: ${sex}%0A` +
        `Contact: ${phone}%0A%0A` +
        `*Appointment Details:*%0A` +
        `Date: ${formattedDate}%0A` +
        `Time: ${selectedTime}%0A%0A` +
        `*Reason for Visit:*%0A${reason}%0A%0A`;
    
    if (symptoms) {
        message += `*Additional Notes:*%0A${symptoms}%0A%0A`;
    }
    
    message += `*Booked via Appointment System created by GBT*`;

    let url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, "_blank");
    
    // Show success message
    setTimeout(() => {
        alert("Appointment request sent! Dr. Indrojit's clinic will confirm your appointment shortly via WhatsApp.");
    }, 500);
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize AOS
AOS.init({
    once: true,
    offset: 50,
    duration: 800,
    easing: 'ease-out-cubic',
});

// Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;

    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            setTimeout(() => {
                follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }, 80);
        });

        const interactiveElements = document.querySelectorAll('a, button, .suggestion-item, .time-slot, input, select, textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
            });
        });
    }
});
