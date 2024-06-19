document.getElementById('file-input').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const resumeText = event.target.result;
        const parsedExperiences = parseResumeText(resumeText);

        // Log the parsed experiences array to the console
        console.log(parsedExperiences);

        displayExperiences(parsedExperiences);
    };
    reader.readAsText(file);
}

function parseResumeText(resumeText) {
    const experiences = [];
    // Regex pattern to match titles, date ranges (with months and "Present"), and bullet points
    const experienceRegex = /(?:\bat\b\s*(.*?)\s*(?:\n|$))|((?:\w+\s+\d{4}\s*-\s*(?:\w+\s+)?\d{4}|Present))|(?:[*-]\s*(.*?)\n)/gs;

    let match;
    let currentTitle = '';
    let currentYear = '';
    let currentDescription = '';

    while ((match = experienceRegex.exec(resumeText)) !== null) {
        const title = match[1]?.trim();
        const dateRange = match[2]?.trim();
        const bulletDescription = match[3]?.trim();

        if (title) {
            // If we found a title marker
            if (currentTitle && (currentYear || currentDescription)) {
                experiences.push({ title: currentTitle, year: currentYear, description: currentDescription });
            }
            currentTitle = title;
            currentYear = '';
            currentDescription = '';
        } else if (dateRange) {
            // If we found a date range with months or "Present"
            currentYear = dateRange;
        } else if (bulletDescription) {
            // If we found a bullet description
            if (currentTitle) {
                if (currentDescription) {
                    currentDescription += '\n';
                }
                currentDescription += bulletDescription;
            }
        }
    }

    // Push the last experience to the array
    if (currentTitle && (currentYear || currentDescription)) {
        experiences.push({ title: currentTitle, year: currentYear, description: currentDescription });
    }

    return experiences;
}

function displayExperiences(experiences) {
    const experienceSection = document.getElementById('experience-section');
    experienceSection.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    table.id = 'experiences';

    // Table header
    const headerRow = table.createTHead().insertRow();
    headerRow.innerHTML = '<th>Title</th><th>Year</th><th>Description</th>';

    // Table body
    const tbody = table.createTBody();
    experiences.forEach(exp => {
        const row = tbody.insertRow();
        row.insertCell().textContent = exp.title;
        row.insertCell().textContent = exp.year;
        row.insertCell().textContent = exp.description;
    });

    experienceSection.appendChild(table);
}
