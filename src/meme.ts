import { StaticImageData } from "next/image";
import { fuzzyMatch } from "./string-extra";
import angryThumbsUp from "../public/memes/angry thumbs up.gif";
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
import rockOneEyebrowRaised from "../public/memes/rock one eyebrow raised.gif";
import rotatingThinkEmoji from "../public/memes/rotating think emoji.gif";
import sadCatOnAPillow from "../public/memes/sad cat on a pillow.gif";
import shockedOwl from "../public/memes/shocked owl.gif";
import steveBuscemiFuckAllThat from "../public/memes/steve buscemi fuck all that.gif";
import sureNoddingDoubt from "../public/memes/sure nodding doubt.gif";
import tellMeMore from "../public/memes/tell me more.gif";
import theBigLebowskiThatsLikeYourOpinionMan from "../public/memes/the-big-lebowski-thats-like-your-opinion-man.gif";
import thonkEmoji from "../public/memes/thonk emoji.png";
import wtfMulletBlonde from "../public/memes/what the fuck mullet blonde.gif";
import zombielandWipingTearsWithMoney from "../public/memes/zombieland wiping tears with money.gif";

export interface Meme {
  // The meme image.
  img: StaticImageData;
  // The basename of the meme in public/memes/.
  src: string;
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
      img: wtfMulletBlonde,
      src: "what the fuck mullet blonde.gif",
      tags: ["what-the-fuck", "wtf", "blonde", "mullet"],
    },
    {
      img: zombielandWipingTearsWithMoney,
      src: "zombieland wiping tears with money.gif",
      tags: ["zombieland", "tear", "cry", "money"],
    },
  ];

  getMemesByTags(tags: string[]): Meme[] {
    console.log(tags);

    return this.memes.filter((meme) => fuzzyMatchArray(tags, meme.tags));
  }
}
