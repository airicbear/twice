// Some videos are unavailable when embedded...
const twiceVideos = [
  'mAKsZ26SabQ', // Yes or Yes
  'i0p1bmr0EmE', // What is Love?
  'ePpPVE-GGJw', // TT
  'V2hlQkVJZhE', // Likey
  'Fm5iP0S1z9w', // Dance The Night Away
  '0rtV5esQT6I', // Like OOH-AHH
  'rRzxEiBLQCA', // Heart Shaker
  'c7rCyll5AeY', // CHEER UP
  'VQtonf1fv_s', // SIGNAL
  // '8A2t_tAjMz8', // KNOCK KNOCK
  // 'CMNahhgR_ss', // BDZ
  // 'wQ_POfToaVY', // Candy Pop
  // 'X3H-4crGD6k', // I WANT YOU BACK
  // 'DdLYSziSXII', // Wake Me Up
  // 'zi_6oaQyckM', // Merry & Happy
  // 'HuoOEry-Yc4', // One More Time
  // 'r1CMjQ0QJ1E', // BRAND NEW GIRL
]

/**
 * Add random TWICE MV to target given its id
 * @param {string} target_id 
 * @param {string[]} video_id_list 
 */
function randomVideo(target_id, video_id_list = twiceVideos) {
  let target = document.getElementById(target_id);
  let random_index = Math.floor(Math.random() * video_id_list.length);
  let video_id = video_id_list[random_index];
  let random_src = "https://www.youtube.com/embed/" + video_id; // + "?autoplay=1";
  if (target.hasChildNodes()) {
    target.firstChild.src = random_src;
    return;
  }
  let vid = document.createElement("iframe");
  vid.width = 750;
  vid.height = 420;
  vid.id = "MV";
  vid.src = random_src;
  vid.frameborder = "0";
  vid.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  vid.allowFullscreen = true;
  target.appendChild(vid);
  console.log(vid.src);
}