
const courses = [
    {
        "title": "JavaScript Basics",
        "description": "Learn fundamentals of JS.",
        "thumbnail": "https://images.theengineeringprojects.com/image/main/2019/12/Introduction-to-JavaScript-with-complete-Guide-1.jpg",
        "progress": 40,
        "status": "In Progress"
    },
    {
        "title": "HTML & CSS",
        "description": "Design beautiful web pages.",
        "thumbnail": "https://media.sketchfab.com/models/c705869a59ae4b3497ef7b5332963c3c/thumbnails/d790ffc579794d528e06d905d6ccfc9c/502972474da047ed9c497efb4aa2f6a2.jpeg",
        "progress": 80,
        "status": "In Progress"
    },
    {
        "title": "React JS",
        "description": "Build dynamic web apps.",
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlvLaY144kl5P1hiySpwofhZ6YSXDwfl15JA&s",
        "progress": 100,
        "status": "Completed"
    },
    {
        "title": "Python Basics",
        "description": "Intro to Python programming.",
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmufbA6dVDM-BY-HTVPpsSUCbyrcOf4d0Dcg&s",
        "progress": 20,
        "status": "Not Started"
    }
];

const coursesContainer = document.getElementById('courses-container');
let totalCourses = courses.length;
let completedCourses = 0;
let totalProgress = 0;

courses.forEach(course => {
    
    if(course.status === "Completed") completedCourses++;

    totalProgress += course.progress;

    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <img src="${course.thumbnail}" alt="${course.title}">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
        </div>
        <div class="status">${course.status}</div>
        <button class="resume-btn">Resume</button>
    `;
    coursesContainer.appendChild(card);
});

document.getElementById('total-courses').innerText = totalCourses;
document.getElementById('completed-courses').innerText = completedCourses;
document.getElementById('overall-progress').innerText = Math.round(totalProgress / totalCourses) + "%";

const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
            data: [
                courses.filter(c => c.status === 'Completed').length,
                courses.filter(c => c.status === 'In Progress').length,
                courses.filter(c => c.status === 'Not Started').length
            ],
            backgroundColor: ['#6C63FF', '#FF6584', '#00C49F'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});
fetch('courses.json')
  .then(response => response.json())
  .then(data => {
      data.forEach(course => {
          const card = document.createElement('div');
          card.className = 'course-card';
          card.innerHTML = `
              <img src="${course.thumbnail}" alt="${course.title}">
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
              </div>
              <div class="status">${course.status}</div>
              <button class="resume-btn">Resume</button>
          `;
          document.getElementById('courses-container').appendChild(card);
      });
  })
  .catch(err => console.error(err));

