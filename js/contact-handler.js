// ============================================
// CONTACT HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Only run on contact page
    if (!document.body.classList.contains('page-contact')) return;
    
    // Update social links from contact-data.js
    if (typeof contactLinks !== 'undefined') {
        const itchioLink = document.getElementById('social-itchio');
        const linkedinLink = document.getElementById('social-linkedin');
        const githubLink = document.getElementById('social-github');
        const cvLink = document.getElementById('social-cv');
        
        if (itchioLink && contactLinks.itchio) {
            itchioLink.href = contactLinks.itchio;
        }
        
        if (linkedinLink && contactLinks.linkedin) {
            linkedinLink.href = contactLinks.linkedin;
        }
        
        if (githubLink && contactLinks.github) {
            githubLink.href = contactLinks.github;
        }
        
        if (artstationLink && contactLinks.cv) {
            cvLink.href = contactLinks.cv;
        }
    }
});

