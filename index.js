// add smooth scrolling to all anchor links
var scroll = new SmoothScroll('a[href*="#"]');

/* --------logo draw-------- */
let current_frame, total_frames, path, length, handle;

const init = () => {
  current_frame = 0;
  total_frames = 290;
  path = new Array();
  length = new Array();
  for (let i = 0; i < 1; i++) {
    path[i] = document.getElementById("i" + i);
    l = path[i].getTotalLength();
    length[i] = l;
    path[i].style.strokeDasharray = l + " " + l;
    path[i].style.strokeDashoffset = l;
  }
  handle = 0;
};

const draw = () => {
  var progress = current_frame / total_frames;
  if (progress > 0) {
    document.getElementById("i0").style.animation =
      "2s fadeIn ease-in forwards";
  }
  if (progress > 1) {
    window.cancelAnimationFrame(handle);
  } else {
    current_frame++;
    for (var j = 0; j < path.length; j++) {
      path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
    }
    handle = window.requestAnimationFrame(draw);
  }
};

init();
draw();

/* ------skill chart animations-----*/

const animateSkills = () => {
  let elems, windowHeight;
  const init = () => {
    elems = document.getElementsByClassName("pre-hide-bars");
    windowHeight = window.innerHeight;
    _addEventHandlers();
  };
  const _addEventHandlers = () => {
    window.addEventListener("scroll", _checkPosition);
    window.addEventListener("resize", init);
  };
  const _checkPosition = () => {
    // let posFromTop = elems[0].getBoundingClientRect().top
    // if (posFromTop - windowHeight <= 0) {
    //     for (let i = 0; i < elems.length; i++) {
    //         elems[i].className = elems[i].className.replace('pre-hide-bars', 'animate-bars')
    //     }
    // }

    for (let i = 0; i < elems.length; i++) {
      let posFromTop = elems[i].getBoundingClientRect().top;
      if (posFromTop - windowHeight <= 0) {
        elems[i].className = elems[i].className.replace(
          "pre-hide-bars",
          "animate-bars"
        );
      }
    }
  };
  return {
    init: init
  };
};
animateSkills().init();

/* -------script for filtering the projects --------*/
var row1 = document.getElementById("row1");
var row2 = document.getElementById("row2");
var row3 = document.getElementById("row3");
let t = 400;
// nav bar js
var navLinks = document.getElementsByClassName("navli");
var selectedStatus = {
  all: true,
  electric_cloud: false,
  webconnext: false,
  uc_davis: false
};
function unSelectAll() {
  var j = 0;
  for (var prop in selectedStatus) {
    if (selectedStatus[prop]) {
      navLinks[j].classList.toggle("selected");
      selectedStatus[prop] = false;
      return;
    }
    j++;
  }
}
function setSelected(navNum) {
  unSelectAll();
  navLinks[navNum].classList.toggle("selected");
  switch (navNum) {
    case 0:
      selectedStatus["all"] = true;
      break;
    case 1:
      selectedStatus["electric_cloud"] = true;
      break;
    case 2:
      selectedStatus["webconnext"] = true;
      break;
    case 3:
      selectedStatus["uc_davis"] = true;
      break;
  }
}
// outer modal js
var slides_and_dots = {
  slidez: [
    "mySlides1",
    "mySlides2",
    "mySlides3",
    "mySlides4",
    "mySlides5",
    "mySlides6",
    "mySlides7",
    "mySlides8",
    "mySlides9"
  ],
  dotz: ["dot1", "dot2", "dot3", "dot4", "dot5", "dot6", "dot7", "dot8", "dot9"]
};
var curSlideDot = {
  slide: "",
  dawt: ""
};
function setSlideDot(n) {
  curSlideDot["slide"] = slides_and_dots["slidez"][n - 1];
  curSlideDot["dawt"] = slides_and_dots["dotz"][n - 1];
}
function openModal() {
  document.getElementById("myModal").style.display = "block";
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
  var slides = document.getElementsByClassName(curSlideDot["slide"]);
  slides[slideIndex - 1].style.display = "none";
  var dots = document.getElementsByClassName(curSlideDot["dawt"]);
  for (i = 0; i < dots.length; i++) {
    dots[i].style.display = "none";
  }
}
var modal = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  var slides = document.getElementsByClassName(curSlideDot["slide"]);
  var dots = document.getElementsByClassName(curSlideDot["dawt"]);
  var i;
  for (i = 0; i < dots.length; i++) {
    dots[i].style.display = "inline-block";
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
function setAndShowProj(n) {
  setSlideDot(n);
  currentSlide(1);
}
// project filtering js
function gridFade(gridRow) {
  switch (gridRow) {
    case 1:
      addOut(row2);
      addOut(row3);
      break;
    case 2:
      addOut(row1);
      addOut(row3);
      break;
    case 3:
      addOut(row1);
      addOut(row2);
  }
}
function removeGrid(gridRow) {
  switch (gridRow) {
    case 1:
      row1.style.display = "flex";
      row2.style.display = "none";
      row3.style.display = "none";
      break;
    case 2:
      row1.style.display = "none";
      row2.style.display = "flex";
      row3.style.display = "none";
      break;
    case 3:
      row1.style.display = "none";
      row2.style.display = "none";
      row3.style.display = "flex";
      break;
  }
}
function formatGrids(gridRow) {
  gridFade(gridRow);
  setTimeout(function() {
    removeGrid(gridRow);
  }, 420);
  rowFadeIn();
}
function rowFadeIn() {
  if (row1.classList.contains("get-out")) {
    fadeIn(row1, t);
  }
  if (row2.classList.contains("get-out")) {
    fadeIn(row2, t);
  }
  if (row3.classList.contains("get-out")) {
    fadeIn(row3, t);
  }
}
function resetGrid() {
  row1.style.display = "flex";
  row2.style.display = "flex";
  row3.style.display = "flex";
  rowFadeIn();
}
function addOut(ele) {
  ele.classList.add("get-out");
}
function noOut(ele) {
  ele.classList.remove("get-out");
}
function addIn(ele) {
  ele.classList.add("get-in");
}
function noIn(ele) {
  ele.classList.remove("get-in");
}
function fadeIn(row, delay) {
  setTimeout(function() {
    addIn(row);
  }, delay);
  setTimeout(function() {
    noOut(row);
  }, delay * 2);
  setTimeout(function() {
    noIn(row);
  }, delay * 3);
}
//format filter projects and adjust nav bar styling with one fucntion
function filterAndNavStyle(projs) {
  setSelected(projs);
  formatGrids(projs);
}
function resetNavAndGrid() {
  setSelected(0);
  resetGrid();
}
var shiftWindow = function() {
  scrollBy(0, -60);
};
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);
