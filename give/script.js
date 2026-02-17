// Chargement des données depuis le fichier JSON
let itemsData = [];

async function loadItems() {
    try {
        const response = await fetch('data.json');
        itemsData = await response.json();
        displayItems();
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // En cas d'erreur, on peut utiliser des données par défaut
        itemsData = [];
    }
}

// Affichage des objets dans la grille
function displayItems() {
    const grid = document.getElementById('items-grid');
    grid.innerHTML = '';

    itemsData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.onclick = () => openModal(item);

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.nomJaponais}" class="item-image" loading="lazy" decoding="async" onerror="this.src='https://via.placeholder.com/300?text=Image+non+disponible'">
            <div class="item-info">
                <div class="item-info-line1">${item.id} - ${item.nomJaponais}</div>
                <div class="item-info-line2">${item.nomAnglais}</div>
            </div>
        `;

        grid.appendChild(itemElement);
    });
}

// Ouverture de la modale
function openModal(item) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalGallery = document.getElementById('modal-gallery');

    modalImage.src = item.image;
    modalImage.alt = item.nomJaponais;
    modalDescription.textContent = item.description || 'Aucune description disponible.';

    // Galerie d'images supplémentaires
    if (modalGallery) {
        modalGallery.innerHTML = '';

        if (Array.isArray(item.extraImages) && item.extraImages.length > 0) {
            modalGallery.style.display = 'grid';

            item.extraImages.forEach((url) => {
                const thumb = document.createElement('img');
                thumb.src = url;
                thumb.alt = item.nomJaponais;
                thumb.loading = 'lazy';
                thumb.onerror = () => {
                    thumb.style.display = 'none';
                };
                thumb.onclick = () => {
                    // Échanger l'image principale avec la vignette cliquée
                    const previousMain = modalImage.src;
                    const previousThumb = thumb.src;
                    modalImage.src = previousThumb;
                    thumb.src = previousMain;
                };

                modalGallery.appendChild(thumb);
            });
        } else {
            modalGallery.style.display = 'none';
        }
    }

    // Utiliser flex sur mobile, block sur desktop
    const isMobile = window.innerWidth <= 768;
    modal.style.display = isMobile ? 'flex' : 'block';
    document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
    
    // Animation d'apparition
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

// Fermeture de la modale
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    
    // Attendre la fin de l'animation avant de cacher la modale
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactiver le scroll
    }, 150);
}

// Gestion des événements de fermeture
document.addEventListener('DOMContentLoaded', () => {
    // Bouton de fermeture
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Clic en dehors de la modale
    const modal = document.getElementById('modal');
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };
    }

    // Chargement des données
    loadItems();
});

// Fermeture avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

