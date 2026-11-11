// Filter Cars in Catalog
function filterCars() {
    let searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let search = searchInput.value.toLowerCase();
    let brand = document.getElementById('brandFilter').value;
    let cards = document.querySelectorAll('.car-card');

    cards.forEach(card => {
        let carName = card.getAttribute('data-name').toLowerCase();
        let carBrand = card.getAttribute('data-brand');
        let matchSearch = carName.includes(search);
        let matchBrand = (brand === 'all' || carBrand === brand);

        if (matchSearch && matchBrand) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Credit Calculator
function calculateCredit() {
    let priceInput = document.getElementById('carPrice');
    if (!priceInput) return;

    let price = parseFloat(priceInput.value) || 0;
    let dpPct = parseFloat(document.getElementById('dpPercent').value) || 0;
    let term = parseInt(document.getElementById('loanTerm').value) || 12;

    let dpAmount = price * (dpPct / 100);
    let principal = price - dpAmount;
    
    // Interest rate 6.5% flat per year
    let totalInterest = principal * (0.065 * (term / 12));
    let totalLoan = principal + totalInterest;
    let monthlyPayment = totalLoan / term;

    document.getElementById('resPrincipal').innerText = 'Rp ' + principal.toLocaleString('id-ID');
    document.getElementById('resDp').innerText = 'Rp ' + dpAmount.toLocaleString('id-ID');
    document.getElementById('resMonthly').innerText = 'Rp ' + Math.round(monthlyPayment).toLocaleString('id-ID') + ' /bln';
}

// Auto calculate on load if element exists
window.onload = function() {
    if (document.getElementById('carPrice')) {
        calculateCredit();
    }
};

// Modal Detail Handler
function openDetail(name, price, hp, accel, speed, engine, img) {
    let modal = document.getElementById('detailModal');
    let content = document.getElementById('modalContent');
    if (!modal || !content) return;
    
    content.innerHTML = `
        <img src="${img}" alt="${name}" class="w-full h-56 object-cover rounded-xl mb-4 border border-gray-800">
        <h3 class="text-2xl font-bold text-white mb-1">${name}</h3>
        <span class="text-red-600 font-bold text-lg block mb-4">${price}</span>
        <div class="grid grid-cols-2 gap-3 text-sm mb-6">
            <div class="bg-[#0a0a0a] p-3 rounded-xl border border-gray-800"><span class="text-gray-400 block text-xs">Tenaga</span> <strong class="text-white">${hp}</strong></div>
            <div class="bg-[#0a0a0a] p-3 rounded-xl border border-gray-800"><span class="text-gray-400 block text-xs">Akselerasi</span> <strong class="text-white">${accel}</strong></div>
            <div class="bg-[#0a0a0a] p-3 rounded-xl border border-gray-800"><span class="text-gray-400 block text-xs">Kecepatan Maks</span> <strong class="text-white">${speed}</strong></div>
            <div class="bg-[#0a0a0a] p-3 rounded-xl border border-gray-800"><span class="text-gray-400 block text-xs">Mesin</span> <strong class="text-white">${engine}</strong></div>
        </div>
        <a href="index.html#testdrive" onclick="closeDetail()" class="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition">Booking Test Drive Unit Ini</a>
    `;
    modal.classList.remove('hidden');
}

function closeDetail() {
    let modal = document.getElementById('detailModal');
    if (modal) modal.classList.add('hidden');
}

// Test Drive Alert
function submitTestDrive(e) {
    e.preventDefault();
    alert('Berhasil! Jadwal Test Drive VIP Anda telah dikirim. Tim concierge kami akan menghubungi Anda melalui WhatsApp.');
    e.target.reset();
}