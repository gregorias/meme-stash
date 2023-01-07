import { StaticImageData } from "next/image";
import { fuzzyMatch } from "./string-extra";
import angryThumbsUp from "../public/memes/angry thumbs up.gif";
import byAllMeansContinue from "../public/memes/by all means continue.gif";
import classyApplause from "../public/memes/classy applause.gif";
import coralineDad from "../public/memes/coraline dad.gif";
import creepyButILikeIt from "../public/memes/creepy but I like it.gif";
import disgustedClintEastwood from "../public/memes/disgusted clint eastwood.gif";
import elsaFuck from "../public/memes/elsa fuck.gif";
import hackerman from "../public/memes/hackerman.gif";
import headTurningRockEyebrowRaise from "../public/memes/rock head turning eyebrow raise.gif";
import homerBackIntoBush from "../public/memes/homer-back-into-bush.gif";
import imNotProudOfIt from "../public/memes/im-not-proud-of-it.gif";
import judgeJudyWatch from "../public/memes/judge judy watch.gif";
import koalaGasolineExplosion from "../public/memes/koala gasoline explosion.gif";
import impossibleThanos from "../public/memes/impossible Thanos.gif";
import laughingLizard from "../public/memes/Laughing Lizard.gif";
import noTakBylo from "../public/memes/no-tak-bylo-nie-zmyslam-urban.gif";
import notReallyMaybeClassified from "../public/memes/not really maybe classified.gif";
import phewDenzelWashington from "../public/memes/phew-denzel-washington.gif";
import plotTwist from "../public/memes/plot twist.gif";
import popcornChewing from "../public/memes/popcorn chewing.gif";
import rockOneEyebrowRaised from "../public/memes/rock one eyebrow raised.gif";
import rotatingThinkEmoji from "../public/memes/rotating think emoji.gif";
import sadCatOnAPillow from "../public/memes/sad cat on a pillow.gif";
import shockedOwl from "../public/memes/shocked owl.gif";
import steveBuscemiFuckAllThat from "../public/memes/steve buscemi fuck all that.gif";
import sureNoddingDoubt from "../public/memes/sure nodding doubt.gif";
import tellMeMore from "../public/memes/tell me more.gif";
import theBigLebowskiThatsLikeYourOpinionMan from "../public/memes/the-big-lebowski-thats-like-your-opinion-man.gif";
import thonkEmoji from "../public/memes/thonk emoji.png";
import weMustHaveVengeance from "../public/memes/we must have vengeance.gif";
import wtfMulletBlonde from "../public/memes/what the fuck mullet blonde.gif";
import zombielandWipingTearsWithMoney from "../public/memes/zombieland wiping tears with money.gif";
import iUnderstoodThatReference from "../public/memes/I understood that reference.gif";
import weHaveHadAgoodRun from "../public/memes/we-have-had-a-good-run-kaulder.gif";
import whatTheHeckIsGoingOnHere from "../public/memes/what-the-heck-is-going-on-here-confused.gif";
import alarm from "../public/memes/alarm.gif";
import wtfCat from "../public/memes/WTF cat.gif";
import hammeringWallace from "../public/memes/hammering wallace.gif";
import flintLockwoodOpenMouth from "../public/memes/wow omg flint-lockwood.webp";
import skepticalCouldIntriguedMay from "../public/memes/skeptical-intrigued.gif";
import gretaYouHaveStolenMyDreams from "../public/memes/greta-you-have-stolen-my-dreams.gif";
import brainHeart from "../public/memes/Brain heart.gif";
import whateverDuck from "../public/memes/whatever.gif";
import shameCube from "../public/memes/shame cube.gif";
import noted from "../public/memes/noted-notes.gif";
import awakeButAtWhatCostCat from "../public/memes/awake but at what cost cat.png";
import letsNotGetAheadOfOurselves from "../public/memes/Let's not get ahead of ourselves.png";
import anticipationTruckCrash from "../public/memes/anticipation truck crash.gif";
import disappointedSoccer from "../public/memes/disappointed soccer.gif";
import sweat from "../public/memes/Sweat Peele Key.gif";
import whatAmIWatching from "../public/memes/ja pierdolę nic nie rozumiem.gif";
import freeGuyWakeUp from "../public/memes/free guy wake up.gif";
import okay from "../public/memes/okay.gif";
import keyLaugh from "../public/memes/peele laugh suit.gif";
import whatHaveIBecomeCat from "../public/memes/what have i become cat.png";
import heresyDetected from "../public/memes/heresy detected.gif";

export interface Meme {
  // The meme image.
  img: StaticImageData;
  // The basename of the meme in public/memes/.
  src: string;
  // A description of the image.
  description?: string;
  tags: string[];
}

export function fuzzyMatchArray(sub: string[], sup: string[]) {
  return sub.every((vs) => sup.find((vt) => fuzzyMatch(vs, vt)) !== undefined);
}

export class MemeDatabase {
  memes: Meme[] = [
    {
      img: angryThumbsUp,
      src: "angry thumbs up.gif",
      tags: ["angry", "juho", "thumbs-up"],
    },
    {
      img: byAllMeansContinue,
      src: "by all means continue.gif",
      tags: ["love-is-war", "chika", "by-all-means-continue"],
    },
    {
      img: classyApplause,
      src: "classy applause.gif",
      tags: [
        "glass",
        "alcohol",
        "nod",
        "classy",
        "applause",
        "men",
        "bravo",
        "respect",
      ],
    },
    {
      img: coralineDad,
      src: "coraline dad.gif",
      tags: [
        "coraline",
        "father",
        "dad",
        "type",
        "computer",
        "tired",
        "boredom",
      ],
    },
    {
      img: creepyButILikeIt,
      src: "creepy but I like it.gif",
      tags: ["creepy", "like"],
    },
    {
      img: disgustedClintEastwood,
      src: "disgusted clint eastwood.gif",
      tags: ["coffee", "disgust", "clint-eastwood"],
    },
    { img: elsaFuck, src: "elsa fuck.gif", tags: ["elsa", "frozen", "fuck"] },
    {
      img: hackerman,
      src: "hackerman.gif",
      tags: ["hackerman", "moustache", "80s"],
    },
    {
      img: headTurningRockEyebrowRaise,
      src: "rock head turning eyebrow raise.gif",
      tags: ["dwayne-johnson", "rock", "head-turn", "eyebrow-raise"],
    },
    {
      img: homerBackIntoBush,
      src: "homer-back-into-bush.gif",
      tags: [
        "simpsons",
        "homer-simpson",
        "bush",
        "back",
        "retreat",
        "embarassment",
      ],
    },
    {
      img: imNotProudOfIt,
      src: "im-not-proud-of-it.gif",
      tags: ["im-not-proud-of-it", "i-am-a-bit", "simon-pegg", "worlds-end"],
    },
    {
      img: impossibleThanos,
      src: "impossible Thanos.gif",
      tags: ["impossible", "thanos"],
    },
    {
      img: judgeJudyWatch,
      src: "judge judy watch.gif",
      tags: ["judge", "judy", "watch"],
    },
    {
      img: koalaGasolineExplosion,
      src: "koala gasoline explosion.gif",
      tags: ["koala", "gasoline", "cigarette", "explosion"],
    },
    {
      img: laughingLizard,
      src: "Laughing Lizard.gif",
      tags: ["laugh", "lizard", "hehehehehe", "desert"],
    },
    {
      img: noTakBylo,
      src: "no-tak-bylo-nie-zmyslam-urban.gif",
      tags: ["no-tak-było-nie-zmyślam", "jerzy-urban"],
    },
    {
      img: notReallyMaybeClassified,
      src: "not really maybe classified.gif",
      tags: ["not-really", "maybe", "classified", "obama"],
    },
    {
      img: phewDenzelWashington,
      src: "phew-denzel-washington.gif",
      tags: ["denzel-washington", "phew", "relief"],
    },
    { img: plotTwist, src: "plot twist.gif", tags: ["plot", "twist"] },
    {
      img: popcornChewing,
      src: "popcorn chewing.gif",
      tags: ["popcorn", "chewing"],
    },
    {
      img: rockOneEyebrowRaised,
      src: "rock one eyebrow raised.gif",
      tags: ["rock", "eyebrow", "raise", "dwayne-johnson"],
    },
    {
      img: rotatingThinkEmoji,
      src: "rotating think emoji.gif",
      tags: ["rotate", "think", "emoji"],
    },
    {
      img: sadCatOnAPillow,
      src: "sad cat on a pillow.gif",
      tags: ["cat", "pillow", "sad", "bed"],
    },
    {
      img: shockedOwl,
      src: "shocked owl.gif",
      tags: ["shock", "surprise", "owl"],
    },
    {
      img: steveBuscemiFuckAllThat,
      src: "steve buscemi fuck all that.gif",
      tags: ["buscemi", "fuck"],
    },
    {
      img: sureNoddingDoubt,
      src: "sure nodding doubt.gif",
      tags: ["sure", "nod", "doubt"],
    },
    {
      img: tellMeMore,
      src: "tell me more.gif",
      tags: ["tell-me-more", "song", "high-school"],
    },
    {
      img: theBigLebowskiThatsLikeYourOpinionMan,
      src: "the-big-lebowski-thats-like-your-opinion-man.gif",
      tags: ["the-big-lebowski", "thats-like-your-opinion-man"],
    },
    {
      img: thonkEmoji,
      src: "thonk emoji.png",
      tags: ["think", "emoji", "thonk"],
    },
    {
      img: weMustHaveVengeance,
      src: "we must have vengeance.gif",
      tags: ["we-must-have-vengeance", "furby", "arrow"],
    },
    {
      img: wtfMulletBlonde,
      src: "what the fuck mullet blonde.gif",
      tags: ["what-the-fuck", "wtf", "blonde", "mullet"],
    },
    {
      img: zombielandWipingTearsWithMoney,
      src: "zombieland wiping tears with money.gif",
      tags: ["zombieland", "tear", "cry", "money"],
    },
    {
      img: iUnderstoodThatReference,
      src: "I understood that reference.gif",
      tags: ["captain-america", "i-understood-that-reference", "avengers"],
    },
    {
      img: weHaveHadAgoodRun,
      src: "we-have-had-a-good-run-kaulder.gif",
      tags: ["we-have-had-a-good-run"],
    },
    {
      img: whatTheHeckIsGoingOnHere,
      src: "what-the-heck-is-going-on-here-confused.gif",
      tags: ["will-smith", "what-the-hell-is-going-on-here"],
    },
    { img: alarm, src: "alarm.gif", tags: ["alarm", "red"] },
    {
      img: wtfCat,
      src: "WTF cat.gif",
      tags: ["wtf", "what-the-fuck", "cat", "surprise", "shock"],
    },
    {
      img: hammeringWallace,
      src: "hammering wallace.gif",
      tags: ["hammer", "wallace", "work"],
    },
    {
      img: flintLockwoodOpenMouth,
      src: "wow omg flint-lockwood.webp",
      tags: [
        "flint-lockwood",
        "wow",
        "omg",
        "cloudy-with-a-chance-of-meatballs",
        "mouth-open",
      ],
    },
    {
      img: skepticalCouldIntriguedMay,
      src: "skeptical-intrigued.gif",
      tags: ["skeptical-you-could", "intrigued-you-may"],
    },
    {
      img: gretaYouHaveStolenMyDreams,
      src: "greta-you-have-stolen-my-dreams.gif",
      tags: ["greta-thunberg", "you-have-stolen-my-dreams", "empty-words"],
    },
    { img: brainHeart, src: "Brain heart.gif", tags: ["brain", "heart"] },
    { img: whateverDuck, src: "whatever.gif", tags: ["whatever", "duck"] },
    { img: shameCube, src: "shame cube.gif", tags: ["shame", "cube"] },
    { img: noted, src: "noted-notes.gif", tags: ["noted", "notes", "office"] },
    {
      img: awakeButAtWhatCostCat,
      src: "awake but at what cost cat.png",
      tags: ["awake-but-at-what-cost", "cat"],
    },
    {
      img: letsNotGetAheadOfOurselves,
      src: "Let's not get ahead of ourselves.png",
      tags: ["lets-not-get-ahead-of-ourselves"],
    },
    {
      img: anticipationTruckCrash,
      src: "anticipation truck crash.gif",
      tags: ["anticipation", "truck", "crash"],
    },
    {
      img: disappointedSoccer,
      src: "disappointed soccer.gif",
      tags: ["disappointed", "soccer"],
    },
    { img: sweat, src: "Sweat Peele Key.gif", tags: ["sweat", "peele", "key"] },
    {
      img: whatAmIWatching,
      src: "ja pierdolę nic nie rozumiem.gif",
      tags: ["black-man", "phone", "bus"],
    },
    {
      img: freeGuyWakeUp,
      src: "free guy wake up.gif",
      tags: ["free-guy", "wake-up", "bed"],
    },
    {
      img: okay,
      src: "okay.gif",
      description: "A black man saying OK after a brief pause.",
      tags: ["okay", "black-man"],
    },
    {
      img: keyLaugh,
      src: "peele laugh suit.gif",
      description: "Keegan-Michael Key wearing a suit and laughing.",
      tags: ["key", "laugh", "suit"],
    },
    {
      img: whatHaveIBecomeCat,
      src: "what have i become cat.png",
      description:
        'A sad cat looking in a mirror and asking "What have I become?"',
      tags: ["cat", "mirror", "what-have-i-become", "sad"],
    },
    {
      img: heresyDetected,
      src: "heresy detected.gif",
      description:
        'Warhammer soldiers running around with a "Heresy Detected" alert in the background.',
      tags: ["heresy-detected", "warhammer", "alert"],
    },
  ];

  getMemesByTags(tags: string[]): Meme[] {
    console.log(tags);

    return this.memes.filter((meme) => fuzzyMatchArray(tags, meme.tags));
  }
}
