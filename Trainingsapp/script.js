 // Navigation
 function navigateTo(page) {
     // Hide all pages
     document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
     // Show selected page
     document.getElementById(page).classList.add('active');

     // Update nav items
     document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
     const navItems = document.querySelectorAll('.nav-item');
     const pages = ['home', 'trainingen', 'berichten', 'team', 'jij'];
     const index = pages.indexOf(page);
     if (index !== -1 && navItems[index]) {
         navItems[index].classList.add('active');
     }

     // Initialize trainingen page if navigating to it
     if (page === 'trainingen') {
         initTrainingenPage();
     }
 }

 // Attendance toggle
 function toggleAttendance(btn, type) {
     const buttons = btn.parentElement.querySelectorAll('.attendance-btn');
     buttons.forEach(b => b.classList.remove('active'));
     btn.classList.add('active');
 }

 // Training details
 // Store the previous page for back navigation
 let previousPage = 'home';

function showTrainingDetails(date, time, boat, team, type) {
    // Store current page
    const currentPage = document.querySelector('.page.active').id;
    previousPage = currentPage;
    
    // Set training details
    document.getElementById('trainingDetailDate').textContent = date || 'Di 4 feb 2026';
    document.getElementById('trainingDetailTime').textContent = time || '17:00 - 18:00';
    
    // Show/hide sections based on type
    const boatSection = document.getElementById('boatPositionsSection');
    const ergoSection = document.getElementById('ergoSection');
    
    if (type === 'ergo') {
        boatSection.style.display = 'none';
        ergoSection.style.display = 'block';
        renderErgoPositions(8); // Default 8 ergo's, you can make this dynamic
    } else {
        boatSection.style.display = 'block';
        ergoSection.style.display = 'none';
        renderBoatPositions(boat);
    }
    
    // Navigate to detail page
    navigateTo('training-detail');
}

// Render boat positions based on boat type
function renderBoatPositions(boatType) {
    const positionsContainer = document.getElementById('positionsContainer');
    
    // Determine number of positions based on boat type
    let positions = [];
    let hasCox = false;
    
    // Parse boat type (e.g., "4+", "2x", "8+", "1x")
    const numRowers = parseInt(boatType);
    hasCox = boatType.includes('+');
    
    // Create position fields
    let html = '';
    for (let i = 1; i <= numRowers; i++) {
        html += `
            <div class="form-group">
                <label class="form-label">${i}</label>
                <input type="text" class="form-input" placeholder="Naam roeier" id="pos${i}">
            </div>
        `;
    }
    
    // Add coxswain if applicable
    if (hasCox) {
        html += `
            <div class="form-group">
                <label class="form-label">st</label>
                <input type="text" class="form-input" placeholder="Naam stuurman" id="posSt">
            </div>
        `;
    }
    
    positionsContainer.innerHTML = html;
}

// Render ergo positions
function renderErgoPositions(numErgos) {
    const ergoContainer = document.getElementById('ergoContainer');
    
    let html = '';
    for (let i = 1; i <= numErgos; i++) {
        html += `
            <div class="form-group">
                <label class="form-label">Ergo ${i}</label>
                <input type="text" class="form-input" placeholder="Naam roeier" id="ergo${i}">
            </div>
        `;
    }
    
    ergoContainer.innerHTML = html;
}

 // Navigate back function
 function navigateBack() {
     navigateTo(previousPage);
 }

function saveTrainingDetails() {
    const boatSection = document.getElementById('boatPositionsSection');
    const isErgo = boatSection.style.display === 'none';
    
    let details = {};
    
    if (isErgo) {
        // Save ergo details
        details.type = 'ergo';
        details.coach = document.getElementById('coachErgo').value;
        
        // Get all ergo positions
        const ergoInputs = document.querySelectorAll('#ergoContainer input');
        details.ergos = [];
        ergoInputs.forEach((input, index) => {
            details.ergos.push({
                position: index + 1,
                name: input.value
            });
        });
    } else {
        // Save boat details
        details.type = 'boat';
        details.boatName = document.getElementById('boatName').value;
        details.coach = document.getElementById('coach').value;
        details.meefietser = document.getElementById('meefietser').value;
        
        // Get all position inputs
        const positionInputs = document.querySelectorAll('#positionsContainer input');
        details.positions = [];
        positionInputs.forEach(input => {
            details.positions.push({
                position: input.id,
                name: input.value
            });
        });
    }
    
    // Common fields
    details.warmingUp = document.getElementById('warmingUp').value;
    details.kern1 = document.getElementById('kern1').value;
    details.kern2 = document.getElementById('kern2').value;
    details.gamifier = document.getElementById('gamifier').value;
    
    console.log('Training details saved:', details);
    alert('Training details opgeslagen!');
    navigateBack();
}

 function selectTraining(block) {
     alert('Training geselecteerd: ' + block.querySelector('.training-block-date').textContent);
 }

 // Team functions
 function showTeamDetails() {
     navigateTo('team-detail');
 }

 function showAddMember() {
     alert('Persoon toevoegen functie...');
 }

 // Trainingen Page
 let currentWeekOffset = 0;
 const trainingsData = {
     1: [{
         boat: 'ergometer',
         team: 'Leren roeien',
         time: '17:00 - 18:00',
         type: 'ergo',
         date: 'dinsdag 3 februari'
     }], // Tuesday
     5: [{
         boat: '2x',
         team: 'Leren roeien',
         time: '13:00 - 14:30',
         type: 'boot',
         date: 'zaterdag 7 februari'
     }] // Saturday
 };

 function initTrainingenPage() {
     renderWeek();
 }

 function renderWeek() {
     const weekDaysContainer = document.getElementById('weekDays');
     const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
     const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
     const today = new Date();
     const currentDay = today.getDay() || 7; // Convert Sunday (0) to 7

     // Calculate start of week
     const startOfWeek = new Date(today);
     startOfWeek.setDate(today.getDate() - currentDay + 1 + (currentWeekOffset * 7));

     weekDaysContainer.innerHTML = '';
     let firstTrainingDaySelected = false;

     for (let i = 0; i < 7; i++) {
         const date = new Date(startOfWeek);
         date.setDate(startOfWeek.getDate() + i);

         const dayItem = document.createElement('div');
         dayItem.className = 'day-item';

         // Check if training day
         const isTrainingDay = (i === 1 || i === 5); // Tuesday and Saturday
         if (isTrainingDay) {
             dayItem.classList.add('training-day');
         }

         // Check if today
         if (currentWeekOffset === 0 && i === currentDay - 1) {
             dayItem.classList.add('today');
         }

         // Auto-select first training day
         // if (isTrainingDay && !firstTrainingDaySelected) {
         //     dayItem.classList.add('selected');
         //     firstTrainingDaySelected = true;
         //     renderTrainingsForDay(i);
         // }

         const dayName = days[i];
         const boldDay = (i === 1 || i === 5); // D and Z
         const monthName = months[date.getMonth()];

         dayItem.innerHTML = `
                    <div class="day-name">${boldDay ? '<strong>' + dayName + '</strong>' : dayName}</div>
                    <div class="day-date">${boldDay ? '<strong>' + date.getDate() + ' ' + monthName + '</strong>' : date.getDate() + ' ' + monthName}</div>
        `;

         dayItem.onclick = function () {
             document.querySelectorAll('.day-item').forEach(d => d.classList.remove('selected'));
             this.classList.add('selected');
             renderTrainingsForDay(i);
         };

         weekDaysContainer.appendChild(dayItem);
     }

     // Update week number
     const weekNum = getWeekNumber(startOfWeek);
     document.getElementById('currentWeek').textContent = `Week ${weekNum}, ${startOfWeek.getFullYear()}`;
 }


function renderTrainingsForDay(dayIndex) {
    const trainingList = document.getElementById('trainingList');
    const trainings = trainingsData[dayIndex] || [];

    if (trainings.length === 0) {
        trainingList.innerHTML = '<div class="content"><p style="text-align: center; color: #666;">Geen trainingen gepland voor deze dag</p></div>';
        return;
    }

    trainingList.innerHTML = trainings.map(training => `
        <div class="training-item" onclick="showTrainingDetails('${training.date}', '${training.time}', '${training.boat}', '${training.team}', '${training.type}')" style="cursor: pointer;">
            <div class="training-item-left">
                <div class="training-item-icon">
                    <img src="Figures/${training.type}.svg" alt="Icon" width="24" height="24">
                    
                </div>
                <div class="training-item-info">
                    <h3>${training.team}</h3>
                    <div class="training-item-time">${training.boat} • ${training.time}</div>
                </div>
            </div>
            <button class="details-btn" onclick="event.stopPropagation(); showTrainingDetails('${training.date}', '${training.time}', '${training.boat}', '${training.team}', '${training.type}')">Details</button>
        </div>
    `).join('');
}

 function changeWeek(offset) {
     currentWeekOffset += offset;
     renderWeek();
 }

 function getWeekNumber(date) {
     const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
     const dayNum = d.getUTCDay() || 7;
     d.setUTCDate(d.getUTCDate() + 4 - dayNum);
     const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
     return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
 }

 // Modal functions
 function openAddTrainingModal() {
     document.getElementById('addTrainingModal').classList.add('active');
 }

 function closeModal(modalId) {
     document.getElementById(modalId).classList.remove('active');
 }

 function selectAddOption(option) {
     const buttons = document.querySelectorAll('.option-btn');
     buttons.forEach(b => b.classList.remove('active'));
     event.target.classList.add('active');

     if (option === 'search') {
         document.getElementById('searchExisting').style.display = 'block';
         document.getElementById('addNew').style.display = 'none';
     } else {
         document.getElementById('searchExisting').style.display = 'none';
         document.getElementById('addNew').style.display = 'block';
     }
 }

 function searchTrainings(query) {
     // Simple search filter
     const options = document.querySelectorAll('.training-option');
     options.forEach(option => {
         const text = option.textContent.toLowerCase();
         if (text.includes(query.toLowerCase())) {
             option.style.display = 'block';
         } else {
             option.style.display = 'none';
         }
     });
 }

 function selectExistingTraining(element) {
     alert('Training geselecteerd: ' + element.querySelector('strong').textContent);
     closeModal('addTrainingModal');
 }

 function toggleTag(tag) {
     tag.classList.toggle('selected');
 }

 function saveNewTraining() {
     alert('Nieuwe training opgeslagen!');
     closeModal('addTrainingModal');
 }

 // Tabs
 function switchTab(tab) {
     const tabs = document.querySelectorAll('.tab');
     const contents = document.querySelectorAll('.tab-content');

     tabs.forEach(t => t.classList.remove('active'));
     contents.forEach(c => c.classList.remove('active'));

     if (tab === 'messages') {
         tabs[0].classList.add('active');
         document.getElementById('messagesTab').classList.add('active');
     } else {
         tabs[1].classList.add('active');
         document.getElementById('notesTab').classList.add('active');
     }
 }

 function openNewMessageModal() {
     alert('Nieuw bericht aanmaken...');
 }

 function openNewNoteModal() {
     alert('Nieuwe notitie aanmaken...');
 }

 // Team Detail
 function showTeamDetail(teamId) {
     document.getElementById('teamDetailName').textContent = teamId.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
     navigateTo('team-detail');
 }

 function openAddMemberModal(type) {
     alert('Nieuwe ' + type + ' toevoegen...');
 }

 // Competencies
 function toggleCompetencyView(view) {
     const buttons = document.querySelectorAll('.toggle-btn');
     buttons.forEach(b => b.classList.remove('active'));
     event.target.classList.add('active');

     if (view === 'roeier') {
         document.getElementById('competencyByRoeier').style.display = 'block';
         document.getElementById('competencyByCompetentie').style.display = 'none';
     } else {
         document.getElementById('competencyByRoeier').style.display = 'none';
         document.getElementById('competencyByCompetentie').style.display = 'block';
     }
 }

 // Initialize
 document.addEventListener('DOMContentLoaded', function () {
     // Any initialization code
 });