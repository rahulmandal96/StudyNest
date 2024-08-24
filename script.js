// Fetch group data from JSON file
fetch('assets/group-data.json')
    .then(response => response.json())
    .then(data => {
        displayGroups(data);
        setupSearchFilter(data);
    });

// Display groups function
function displayGroups(groups) {
    const groupList = document.getElementById('group-list');
    groupList.innerHTML = '';

    groups.forEach(group => {
        const groupItem = document.createElement('div');
        groupItem.classList.add('group-item');
        groupItem.innerHTML = `
            <h3>${group.groupName}</h3>
            <p>Subject: ${group.subject}</p>
            <p>Time: ${group.time}</p>
            <p>Location: ${group.location}</p>
        `;
        groupList.appendChild(groupItem);
    });
}

// Setup search and filter functionality
function setupSearchFilter(groups) {
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    searchInput.addEventListener('input', () => filterGroups(groups));
    filterSelect.addEventListener('change', () => filterGroups(groups));
}

// Filter groups function
function filterGroups(groups) {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filterSelect = document.getElementById('filter').value;

    const filteredGroups = groups.filter(group => {
        const matchesSearch = group.groupName.toLowerCase().includes(searchInput);
        const matchesFilter = filterSelect === 'all' || group.subject.toLowerCase() === filterSelect;
        return matchesSearch && matchesFilter;
    });

    displayGroups(filteredGroups);
}
