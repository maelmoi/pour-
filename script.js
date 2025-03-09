// Gestion des produits et du calcul du prix total
const produits = document.querySelectorAll('.produit-checkbox');
const quantites = document.querySelectorAll('.quantite');
const totalElement = document.getElementById('total');

produits.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    quantites[index].disabled = !checkbox.checked;
    if (!checkbox.checked) quantites[index].value = 0;
    calculerTotal();
  });

  quantites[index].addEventListener('input', () => {
    calculerTotal();
  });
});

function calculerTotal() {
  let total = 0;
  produits.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const prix = parseInt(checkbox.getAttribute('data-prix'));
      const quantite = parseInt(quantites[index].value);
      total += prix * quantite;
    }
  });
  totalElement.textContent = total;
}

// Envoi de la commande sur WhatsApp
const commandeForm = document.getElementById('commande-form');

commandeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let message = "Bonjour, je souhaite commander :\n";

  produits.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const prix = parseInt(checkbox.getAttribute('data-prix'));
      const quantite = parseInt(quantites[index].value);
      message += `- ${quantite} x Paquet de ${prix} XAF\n`;
    }
  });

  const total = totalElement.textContent;
  message += `\nTotal : ${total} XAF`;

  const whatsappUrl = `https://wa.me/[VotreNuméroWhatsApp]?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});
