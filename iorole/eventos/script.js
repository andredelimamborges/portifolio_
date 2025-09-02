document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  // Filtro por categoria
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      eventCards.forEach(card => {
        if (category === 'todos' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Curtir (só marca visualmente)
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Salvar
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Compartilhar
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: "Confira esse evento!",
          url: window.location.href
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência!");
      }
    });
  });

  // Reservar (toggle + contador)
  document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.event-card');
      const interestText = card.querySelector('.interest-count');
      let count = parseInt(interestText.textContent.match(/\d+/)[0], 10);

      if (btn.classList.contains('reserved')) {
        count -= 1;
        btn.textContent = 'Reservar';
      } else {
        count += 1;
        btn.textContent = 'Reservado';
      }

      interestText.textContent = `${count} interessados`;
      btn.classList.toggle('reserved');
    });
  });
});
