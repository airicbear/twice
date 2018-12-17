const TwiceMembers = [
  "Jihyo",
  "Mina",
  "Tzuyu",
  "Nayeon",
  "Sana",
  "Dahyun",
  "Momo",
  "Chaeyoung",
  "Jeongyeon",
];

const TwiceMemberInfo = {
  "Nayeon": {
    "birthName": "Im Nayeon (임나연)",
    "dateOfBirth": "September 22, 1995",
    "nationality": "South Korean",
    "birthplace": "Seoul, South Korea",
  },
  "Jeongyeon": {
    "birthName": "Yoo Kyung Wan (유경완)",
    "legalName": "Yoo Jung Yeon (유정연)",
    "dateOfBirth": "November 1, 1996",
    "nationality": "South Korean",
    "birthplace": "Suwon, South Korea",
  },
  "Momo": {
    "birthName": "Hirai Momo (히라이 모모)",
    "dateOfBirth": "November 9, 1996",
    "nationality": "Japanese",
    "birthplace": "Kyōtanabe, Kyoto, Japan",
  },
  "Sana": {
    "birthName": "Minatozaki Sana (미나토자키 사나)",
    "dateOfBirth": "December 29, 1996",
    "nationality": "Japanese",
    "birthplace": "Tennōji-ku, Osaka, Japan",
  },
  "Jihyo": {
    "birthName": "Park Ji Soo (박지수)",
    "legalName": "Park Ji Hyo (박지효)",
    "dateOfBirth": "February 1, 1997",
    "nationality": "South Korean",
    "birthplace": "Guri, Gyeonggi-do, South Korea",    
  },
  "Mina": {
    "birthName": "Myoui Mina (묘이 미나)",
    "englishName": "Sharon Myoui",
    "dateOfBirth": "March 24, 1997",
    "nationality": "Japanese",
    "birthplace": "San Antonio, Texas, United States",
  },
  "Dahyun": {
    "birthName": "Kim Dahyun (김다현)",
    "dateOfBirth": "May 28, 1998",
    "nationality": "South Korean",
    "birthplace": "Seongnam, Gyeonggi-do, South Korea",
  },
  "Chaeyoung": {
    "birthName": "Son Chae Young (손채영)",
    "dateOfBirth": "April 23, 1999",
    "nationality": "South Korean",
    "birthplace": "Seoul, South Korea",
  },
  "Tzuyu": {
    "birthName": "Chou Tzuyu (저우쯔위)",
    "dateOfBirth": "June 14, 1999",
    "nationality": "Taiwanese",
    "birthplace": "East District, Tainan, Taiwan",
  },
}

/**
 * Focus image with delay to allow smooth anchor jump
 * @param {string} id
 * @param {number} delay
 **/
let setFocusDelay = (id, delay = 1000) => {
  setTimeout(() => {
    document.getElementById(id).focus();
  }, delay);
};

let getFocusDelay = (index) => 800 + (index * 110);

// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function calculateAge(birthday) {
  let birthDate = new Date(birthday);
  let ageDifMs = Date.now() - birthDate.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function Section(id = "Twice", tabIndex = -1) {
  let section = document.createElement("section");
  section.id = id;
  if (tabIndex === 0) {
    section.tabIndex = tabIndex;
  }
  return section;
}

function Link(href = "", focus = "", focusDelay = 1000, id = "") {
  let a = document.createElement("a");
  a.href = "#" + href;
  a.setAttribute("onclick", "setFocusDelay('" + focus + "', " + focusDelay + ")");
  a.id = id;
  return a;
}

function H2() {
  let h2 = document.createElement("h2");
  return h2;
}

function Title(title = "TWICE", href = "Home", focus = "Home", focusDelay = 1000, id = "TwiceTitle") {
  let h2 = H2(title);
  let h2Link = Link(href, focus, focusDelay, id);
  h2Link.innerHTML = title;
  h2.appendChild(h2Link);
  return h2;
}

function Picture(fileName = "Twice") {
  let img = document.createElement("img");
  img.setAttribute("data-src", "./img/webp/" + fileName + ".webp");
  img.setAttribute("alt", fileName);
  img.tabIndex = 0;

  // Use .jpg or .png if browser doesn't support .webp images
  img.onerror = () => {
    img.onerror = () => {
      img.onerror = () => {
        console.log("Error: Could not find image of " + fileName + ".");
      };
      img.src = "./img/png/" + fileName + ".png";
    };
    img.src = "./img/jpg/" + fileName + ".jpg";
  }

  img.className = "lazyload";
  return img;
}

function Div(className = "") {
  let div = document.createElement("div");
  div.className = className;
  return div;
}

function PictureSide(memberName = "Nayeon") {
  let pictureSide = Div("picture-side");
  let img = Picture(memberName);
  pictureSide.appendChild(img);
  return pictureSide;
}

function Span(className = "", text = "") {
  let span = document.createElement("span");
  span.className = className;
  span.innerHTML = text;
  return span;
}

function Info(memberName = "Nayeon", infoList = TwiceMemberInfo) {
  let memberInfo = infoList[memberName];
  memberInfo["age"] = calculateAge(memberInfo["dateOfBirth"]);
  let div = Div("info");
  for (let info in memberInfo) {
    let p = document.createElement("p");
    let property = Span("property");

    // Formatting profile information--thanks, Stack Overflow
    property.innerHTML = info.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) + ": ";

    let value = Span("value", memberInfo[info]);
    value.tabIndex = 0;
    p.appendChild(property);
    p.appendChild(value);
    div.appendChild(p);
  }
  return div;
}

function InfoSide(memberName = "Nayeon", focusDelay = 1000) {
  let infoSide = Div("info-side");
  let title = Title(memberName, "Twice", memberName + "Link", focusDelay, memberName + "Title");
  let info = Info(memberName);
  infoSide.appendChild(title);
  infoSide.appendChild(info);
  return infoSide;
}

function Profile(memberName = "Nayeon", swapSides = true, focusDelay = 1000) {
  let section = Section(memberName);
  section.id = memberName;
  section.className += swapSides ? " left" : "";
  let pictureSide = PictureSide(memberName);
  let infoSide = InfoSide(memberName, focusDelay);
  if (swapSides) {
    section.appendChild(infoSide);
    section.appendChild(pictureSide);
  } else {
    section.appendChild(pictureSide);
    section.appendChild(infoSide);
  }
  return section;
}

function Profiles(members = TwiceMembers, swapSides = (i) => i % 2 === 1 /* Swap sides every odd number */) {
  let profiles = document.createElement("article");
  for (let i = 0; i < members.length; i++) {
    let profile = Profile(members[i], swapSides(i), getFocusDelay(i));
    profiles.appendChild(profile);
  }
  return profiles;
}

/**
 * Create an navigation index for the group picture caption
 * @param {string[]} members 
 */
function TwicePictureList(members = TwiceMembers) {
  let p = document.createElement("p");
  p.className = "ignore";
  for (let i = 0; i < members.length; i++) {
    let memberLink = Link(members[i], members[i] + "Title", getFocusDelay(i), members[i] + "Link");
    memberLink.innerHTML = members[i];
    p.appendChild(memberLink);
    if (i < members.length - 1) {
      p.appendChild(document.createTextNode(", "));
    }
  }
  return p;
}

/**
 * Create a section containing the title, group picture, and navigation index caption
 */
function TwicePicture() {
  let section, title, img, list;
  section = Section(title = "Twice", tabIndex = 0);
  title = Title();
  img = Picture();
  list = TwicePictureList();
  section.appendChild(title);
  section.appendChild(img);
  section.appendChild(list);
  return section;
}

/**
 * Create an article with the group picture at the top and the individual profiles below it
 */
function TwiceProfiles() {
  let profiles = Profiles();
  profiles.insertBefore(TwicePicture(), profiles.firstChild);
  return profiles;
}