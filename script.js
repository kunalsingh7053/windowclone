window.onload = function () {
  // 📦 Start Menu Elements
  const searchbar = document.querySelector('.searchbarpng');
  const windowIcon = document.querySelector('.windowpng');
  const startmenu = document.querySelector('.startmenu');

  // 🌐 Language Menu
  const lang = document.querySelector('.lang');
  const langmenu = document.querySelector('.langmenu');

  // ⬆️ Arrow Menu
  const arrow = document.querySelector('.arrow');
  const arrowmenu = document.querySelector('.arrowmenu');

  // 📺 Video Element for Right-Click Menu
  const video = document.querySelector('video');
  const foldermenu = document.querySelector('.foldermenu');

  // 🕒 Time and Date
  const timeElement = document.querySelector('.time');
  const dateElement = document.querySelector('.date');

  // ⚙️ Taskbar and Dark Mode
  const taskbar = document.querySelector('.taskbar');

  // 🎨 Wallpaper Panel
  const wallpaper = document.querySelector('.wallpaper');
  const wallpaperdiv = document.querySelector('.wallpaperdiv');
  const desktop = document.body;

  //folder 
  
let neww = document.querySelector('#new');
let folder = document.querySelector('.folder');

  let flag = false;

  //sidebar and weather
  let weather = document.querySelector('.weather');
let sidebar =  document.querySelector('.sidebar');

  //calculator
  let calculator = document.querySelector('.calculator')
  let calcmenu = document.querySelector('.calcmenu');

  // ✅ Start Menu Toggle
  function toggleStartMenu() {
    flag = !flag;
    if (flag) {
      startmenu.style.display = "block";
      startmenu.style.bottom = "52px";
      searchbar.style.backgroundColor = "#0651DE";
    } else {
      startmenu.style.bottom = "-100%";
      setTimeout(() => {
        startmenu.style.display = "none";
      }, 300);
      searchbar.style.backgroundColor = "#dacbcb";
    }
  }

  // ✅ Menu Click Events
  searchbar.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleStartMenu();
  });

  windowIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleStartMenu();
  });

  lang.addEventListener('click', function (e) {
    e.stopPropagation();
    langmenu.style.bottom = (langmenu.style.bottom === "52px") ? "-100%" : "52px";
  });

  arrow.addEventListener('click', function (e) {
    e.stopPropagation();
    arrowmenu.style.bottom = (arrowmenu.style.bottom === "52px") ? "-100%" : "52px";
  });

  // ✅ Update Clock
  function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let year = now.getFullYear();

    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${day}-${month}-${year}`;
  }

  updateClock();
  setInterval(updateClock, 50000);

  // ✅ Video Right Click Context Menu
  video.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    foldermenu.style.display = "flex";
    foldermenu.style.left = `${e.clientX}px`;
    foldermenu.style.top = `${e.clientY}px`;
  });

  // ✅ List Click for Wallpaper Panel
  const listwallpaper = document.querySelector('#listwallpaper');
  listwallpaper.addEventListener('click', function (e) {
    e.stopPropagation();
    wallpaper.classList.toggle("active");
  });
console.log(wallpaperdiv);

  // ✅ Wallpaper Image Click
  console.log(document.querySelectorAll('.wallpaperimg'));
  wallpaperdiv.addEventListener('click', function (e) {
    console.log("salfjljaf");
    
    if (e.target && e.target.classList.contains('wallpaperimg')) {
      console.log("Image clicked:", e.target.src);
      const imgURL = e.target.src;
      desktop.style.backgroundImage = `url('${imgURL}')`;
      desktop.style.backgroundSize = 'cover';
      desktop.style.backgroundPosition = 'center';
          // Hide the video
    video.style.opacity = "0"; // ✅ fade out the video
   

      localStorage.setItem('wallpaper', imgURL);
    }
  });


let darkmode = document.querySelector('#darkmode');
darkmode.addEventListener('click',mode)
  function mode() {
  document.body.classList.toggle("dark-mode");
  taskbar.classList.toggle("dark-mode");
  foldermenu.classList.toggle("dark-mode");
  wallpaper.classList.toggle("dark-mode");
  folder.classList.toggle("dark-mode");

  // Save state in localStorage
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

  // ✅ Dark Mode Load
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    taskbar.classList.add("dark-mode");
    foldermenu.classList.add("dark-mode");
    wallpaper.classList.add("dark-mode")
    folder.classList.add("dark-mode")
  }

  // ✅ Restore Saved Wallpaper
  const savedWallpaper = localStorage.getItem('wallpaper');
  if (savedWallpaper) {
    desktop.style.backgroundImage = `url('${savedWallpaper}')`;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center';
    video.style.opacity = "0"
  }
const resetBtn = document.querySelector('.resetbtn');
resetBtn.addEventListener('click', Resetwallpaper);

  function Resetwallpaper(e) {
    e.preventDefault();
    
  // Remove wallpaper from body
  document.body.style.backgroundImage = "none";

  // Show the video again
  video.style.opacity = "1"

  // Remove from localStorage
  localStorage.removeItem("wallpaper");
  localStorage.removeItem("videoHidden");
}

neww.addEventListener('click', function (e) {
    e.preventDefault();

    // Create folder container
    const folderDiv1 = document.createElement('div');
    const folderDiv2 = document.createElement('div');
      
    // Add image
    const img = document.createElement('img');
    img.src = 'folder.png';
    img.alt = 'folder';

    

    // Add editable name
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = 'New Folder';
    nameInput.className = 'rename-input';

    // Append children
    folderDiv1.appendChild(img);
    folderDiv2.appendChild(nameInput);
    folder.appendChild(folderDiv1);
    folder.appendChild(folderDiv2);

    // Focus & select the input so user can rename immediately
    nameInput.focus();
    nameInput.select();

    // Convert to normal text after Enter or blur
    nameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            finalizeRename();
        }
    });

    nameInput.addEventListener('blur', finalizeRename);

    function finalizeRename() {
        const h4 = document.createElement('h4');
        h4.textContent = nameInput.value.trim() || 'New Folder';
        folderDiv2.replaceChild(h4, nameInput);
    }
});


weather.addEventListener('click',function(e){
  e.preventDefault();
    e.stopPropagation(); // ✅ Stop event from bubbling to document

  if(sidebar.style.left == '-100%')
  {
    sidebar.style.left = '0%'; 
  }
  else{
    sidebar.style.left = '-100%'; 
  }
})
let str = '';
calculator.addEventListener('click',updown)
document.querySelector('.close-btn').addEventListener('click', parmanentdown);
document.querySelector('.minimiz-btn').addEventListener('click', updown);

function updown(e) {
console.log("kkk");

if (e) {
  e.preventDefault();
  e.stopPropagation();
}
if(calcmenu.style.bottom == '-100%')
  {
    calcmenu.style.bottom = '40%';
    
  }
  else{
    calcmenu.style.bottom = '-100%';
    
  }
  
}
function parmanentdown(e) {
  console.log("kkk");
  
  document.querySelector('.calcoutput').value = '';
  
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  calcmenu.style.bottom = '-100%';
  
  
}

// ✅ Prevent document click from closing when clicking inside calcmenu
calcmenu.addEventListener('click', function(e) {
  e.stopPropagation();
});

//calculator main logic.
document.addEventListener('keydown', function (e) {
  let key = e.key;
  
  // Prevent default button focus behavior
  if ((/\d/).test(key) || ['+', '-', '*', '/', '.', '%', 'Enter'].includes(key)) {
    e.preventDefault();
  }
  
  if ((/\d/).test(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    str += key;
    document.querySelector('.calcoutput').value = str;
  }
  else if (key === 'Enter') {
    try {
      str = eval(str);
    } catch {
      str = "Error";
    }
    document.querySelector('.calcoutput').value = str;
  }
  else if (key === 'Escape' || key === 'Delete') {
    str = '';
    document.querySelector('.calcoutput').value = str;
  }
  else if (key === 'Backspace') {
    str = str.slice(0, -1);
    document.querySelector('.calcoutput').value = str;
  }
});
let browser = document.querySelector('.browser');
document.querySelector('.browser-close-btn').addEventListener('click', browser_parmanentdown);
document.querySelector('.browser-minimiz-btn').addEventListener('click', browser_updown);
document.querySelector('.edge').addEventListener('click', browser_updown);
document.querySelector('.browser-restore-btn').addEventListener('click',browser_restore);

function browser_restore(e){
  if(browser.style.width == '100%')
  {
    browser.style.width = '30%';
    
  }
  else{
    browser.style.width = '100%';
    
  }
  
}
function browser_updown(e) {
console.log("kkk");

if (e) {
  e.preventDefault();
  e.stopPropagation();
}
if(browser.style.bottom == '-100%')
  {
    browser.style.bottom = '0%';
    
  }
  else{
    browser.style.bottom = '-100%';
    
  }
  
}
function browser_parmanentdown(e){
if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  browser.style.bottom = '-100%';
  
}
  // ✅ Auto-close Menus on Outside Click
  document.addEventListener('click', function () {
    langmenu.style.bottom = "-100%";
    arrowmenu.style.bottom = "-100%";
    startmenu.style.bottom = "-100%";
    setTimeout(() => {
      startmenu.style.display = "none";
    }, 300);
    searchbar.style.backgroundColor = "#dacbcb";
    wallpaper.classList.remove("active");
    foldermenu.style.display = "none";
        sidebar.style.left = '-100%'; 
  calcmenu.style.bottom = '-100%';

  });


};
