/**
 * Everything personal lives in this one file.
 * Change the names, messages, photos and music here, then redeploy.
 */

export const BOY_NAME = "Chirag";
export const GIRL_NAME = "Vishaka";

/** Shown on the first screen under the big heading. */
export const BIRTHDAY_MESSAGE =
  "Today is not just another day. Today is the day someone truly special came into this world. You deserve all the happiness, love, laughter, and beautiful moments life can offer. May your smile always shine brighter than the stars, and may this new chapter of your life be filled with magical memories. Happy Birthday to someone who makes the world a little more beautiful just by being in it. 💖";

export const HERO_TITLE = `Happy Birthday, ${GIRL_NAME}! 🎂❤️`;
export const SURPRISE_BUTTON_LABEL = "Open Your Surprise 💌";

export const PROPOSAL_QUESTION = `${GIRL_NAME}, will you be my life partner? 💍❤️`;
export const PROPOSAL_MESSAGE =
  "Out of all the beautiful things life has to offer, meeting you would be one of the most wonderful gifts. I don't promise a perfect life, but I promise to stand beside you, celebrate your happiness, support your dreams, and make every ordinary moment a little more special. So today, I have one little question for you...";

export const NO_LABEL = "No 💔";
export const YES_LABEL = "Absolutely Yes! ❤️";

/** Little lines announced (and shown) each time the No button runs away. */
export const NO_BUTTON_MESSAGES = [
  "Oops, the No button got shy! 🙈",
  "Nice try! It ran away 💨",
  "That button is camera-shy 😄",
  "Hmm, maybe try the other one? 💖",
  "It slipped right out of reach! ✨",
  "The No button is not available today 💌",
];

export const CELEBRATION_TITLE = "A Thousand Times YES! ❤️🎉";
export const CELEBRATION_SUBTITLE = `Happy Birthday, ${GIRL_NAME}, and welcome to our beautiful new chapter! 💍`;

/** Each string is one paragraph in the letter on the celebration page. */
export const CELEBRATION_MESSAGE: string[] = [
  "Happy Birthday, my special person! ❤️",
  "Today is already beautiful because it celebrates your existence, but imagining a future filled with laughter, adventures, dreams, and countless little moments makes it even more magical.",
  "I hope your days are filled with reasons to smile, your dreams find their way into reality, and your heart always feels appreciated.",
  "If life is a journey, I hope we can walk beside each other, learn together, support one another, and create memories that we will treasure for years to come.",
  "May this birthday mark the beginning of a wonderful chapter filled with happiness, kindness, trust, and love.",
  `Happy Birthday, ${GIRL_NAME}. Here's to beautiful memories and a future full of possibilities. ❤️✨`,
];

export const FINAL_LINE = "You make ordinary moments feel extraordinary. ❤️";
export const SIGNATURE = `With love, ${BOY_NAME} 💌`;
export const FOOTER_TEXT = `Made with ❤️, especially for ${GIRL_NAME}.`;

export const SEND_LOVE_LABEL = "Send More Love 💖";
export const REPLAY_LABEL = "Replay the Surprise 🔄";

/**
 * Photos for the gallery on the celebration page.
 * 1. Put image files in /public/photos (for example /public/photos/us-1.jpg)
 * 2. Add them here. The gallery stays hidden while this list is empty.
 */
export const PHOTOS: { src: string; alt: string }[] = [
  // { src: "/photos/us-1.jpg", alt: "The two of us at the beach" },
];
export const GALLERY_TITLE = "Our little moments 📸";

/**
 * Background music.
 * 1. Put an audio file in /public/music (for example /public/music/our-song.mp3)
 * 2. Set the path below. The music button only appears when a path is set.
 * Music never starts on its own; she has to press the button.
 */
export const MUSIC_SRC: string | null = null; // e.g. "/music/our-song.mp3"

export const SITE_TITLE = `Happy Birthday, ${GIRL_NAME} ❤️`;
export const SITE_DESCRIPTION = `A little birthday surprise made just for ${GIRL_NAME}.`;
