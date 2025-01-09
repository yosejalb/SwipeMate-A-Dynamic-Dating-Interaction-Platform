// Get the data
let users = [
  {
    // 0
    profilePic: "./images/portrait3.avif",
    displayPic: "./images/portrait1.avif",
    pendingMessage: 4,
    location: "Bandra, Mumbai, India",
    name: "Harshita",
    age: 23,
    interests: [
      { icon: `<i class="ri-quill-pen-fill"></i>`, interest: "Painting" },
      { icon: `<i class="ri-music-2-fill"></i>`, interest: "Music" },
    ],
    bio: "Harshita, 23, from Bandra, Mumbai. A creative soul with a love for music and painting.",
    isFriend: null,
  },
  {
    // 1
    displayPic: "./images/portrait2.avif",
    profilePic: "./images/profile2.avif",
    pendingMessage: 3,
    location: "Pune, India",
    name: "Ananya",
    age: 22,
    interests: [
      { icon: `<i class="ri-restaurant-line"></i>`, interest: "Food" },
      { icon: `<i class="ri-gamepad-line"></i>`, interest: "Games" },
    ],
    bio: "Ananya, 22, from Pune. A foodie and travel enthusiast who loves exploring flavors and destinations.",
    isFriend: null,
  },
  {
    // 2
    profilePic: "./images/profile3.avif",
    displayPic: "./images/portrait4.avif",
    pendingMessage: 5,
    location: "Dadar, Mumbai, India",
    name: "Isha",
    age: 24,
    interests: [
      { icon: `<i class="ri-book-shelf-line"></i>`, interest: "Reading" },
      { icon: `<i class="ri-music-2-fill"></i>`, interest: "Music" },
    ],
    bio: "Isha, 24, from Dadar, Mumbai. A tech geek and gamer who enjoys diving into the digital world.",
    isFriend: null,
  },
  {
    // 3
    displayPic: "./images/portrait6.avif",
    profilePic: "./images/portrait5.avif",
    pendingMessage: 1,
    location: "Pune City, India",
    name: "Sanya",
    age: 21,
    interests: [
      { icon: `<i class="ri-book-shelf-fill"></i>`, interest: "Writing" },
      { icon: `<i class="ri-shopping-bag-2-fill"></i>`, interest: "Shopping" },
    ],
    bio: "Sanya, 21, from Pune City. A fitness enthusiast and dancer with a passion for rhythm and movement.",
    isFriend: null,
  },
  {
    // 4
    displayPic: "./images/angel.jpeg",
    profilePic: "./images/angel2.jpeg",
    pendingMessage: 1,
    location: "Pune City, India",
    name: "Angela",
    age: 21,
    interests: [
      { icon: `<i class="ri-spotify-fill"></i>`, interest: "Music" },
      { icon: `<i class="ri-shopping-bag-3-fill"></i>`, interest: "Shopping" },
      { icon: `<i class="ri-restaurant-2-line"></i>`, interest: "Food" },
    ],
    bio: "Angela, 21, from Pune. A vibrant and outgoing individual who enjoys indulging in shopping sprees, exploring new cuisines, and getting lost in the rhythms of music.",
    isFriend: null,
  },
];

function select(elem) {
  return document.querySelector(elem);
}

let curr = 0;
let isAnimating = false;

function setData(index) {
  select(".prflimg img").src = users[index].profilePic;
  select(".badge h5").textContent = users[index].pendingMessage;
  select(".location h3").textContent = users[index].location;
  select(".name h1:nth-child(1)").textContent = users[index].name;
  select(".name h1:nth-child(2)").textContent = users[index].age;

  let clutter = "";
  users[index].interests.forEach(function (interest) {
    clutter += `<div class="tag flex items-center bg-white/30 px-3 rounded-full py-1 gap-3">
  ${interest.icon} <!-- Updated to 'interest.icon' -->
  <h3 class="text-sm tracking-tighter capitalize">${interest.interest}</h3>
</div>`;
  });
  select(".tags").innerHTML = clutter;

  select(".bio p").textContent = users[index].bio;
}
(function setInitial() {
  select(".maincard img").src = users[curr].displayPic;
  select(".incomingcard img").src = users[curr + 1]?.displayPic;

  setData(curr);
  curr = 2;
})();

//Image change function
function imageChange() {
  if (!isAnimating) {
    isAnimating = true;

    let tl = gsap.timeline({
      onComplete: function () {
        isAnimating = false;
        let main = select(".maincard");
        let incoming = select(".incomingcard");

        incoming.classList.remove("z-[2]");
        incoming.classList.add("z-[3]");
        incoming.classList.remove("incomingcard");

        main.classList.remove("z-[3]");
        main.classList.add("z-[2]");
        gsap.set(main, {
          scale: 1,
          opacity: 1,
        });
        if (curr === users.length) curr = 0;
        select(".maincard img").src = users[curr].displayPic;

        curr++;
        main.classList.remove("maincard");
        incoming.classList.add("maincard");
        main.classList.add("incomingcard");
      },
    });
    tl.to(
      ".maincard",
      {
        scale: 1.1,
        opacity: 0,
        ease: Circ,
        duration: 0.9,
      },
      "flag"
    ).from(
      ".incomingcard",
      {
        scale: 0.9,
        opacity: 0,
        ease: Circ,
        duration: 1.1,
      },
      "flag"
    );
  }
}

let deny = select(".deny");
let accept = select(".accept");
deny.addEventListener("click", function () {
  imageChange();
  setData(curr - 1);
  gsap.from(".details .element", {
    y: "100%",
    opacity: 0,
    stagger: 0.06,
    ease: Power4.easeInOut,
    duration: 1.5,
  });
});
accept.addEventListener("click", function () {
  imageChange();
  setData(curr - 1);
  gsap.from(".details .element", {
    y: "100%",
    opacity: 0,
    stagger: 0.06,
    ease: Power4.easeInOut,
    duration: 1.5,
  });
});

(function containerCreator() {
  document.querySelectorAll(".element").forEach(function (element) {
    let div = document.createElement("div");
    div.classList.add(`${element.classList[1]}container`, "overflow-hidden");
    console.log(div);
    div.appendChild(element);
    select(".details").appendChild(div);
  });
})();
