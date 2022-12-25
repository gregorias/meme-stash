import { StaticImageData } from "next/image";
import angryThumbsUp from "../public/angry thumbs up.gif";
import classyApplause from "../public/classy applause.gif";
import coralineDad from "../public/coraline dad.gif";
import creepyButILikeIt from "../public/creepy but I like it.gif";
import disgustedClintEastwood from "../public/disgusted clint eastwood.gif";
import elsaFuck from "../public/elsa fuck.gif";
import judgeJudyWatch from "../public/judge judy watch.gif";
import koalaGasolineExplosion from "../public/koala gasoline explosion.gif";
import impossibleThanos from "../public/impossible Thanos.gif";
import notReallyMaybeClassified from "../public/not really maybe classified.gif";
import rockOneEyebrowRaised from "../public/rock one eyebrow raised.gif";
import rotatingThinkEmoji from "../public/rotating think emoji.gif";
import sadCatOnAPillow from "../public/sad cat on a pillow.gif";
import shockedOwl from "../public/shocked owl.gif";
import steveBuscemiFuckAllThat from "../public/steve buscemi fuck all that.gif";
import tellMeMore from "../public/tell me more.gif";
import theBigLebowskiThatsLikeYourOpinionMan from "../public/the-big-lebowski-thats-like-your-opinion-man.gif";
import thonkEmoji from "../public/thonk emoji.png";
import zombielandWipingTearsWithMoney from "../public/zombieland wiping tears with money.gif";

export interface Meme {
  gif: StaticImageData;
  tags: string[];
}

function stringToCharacterMap(s: string): Record<string, number> {
  let characterMap: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (char in characterMap) {
      characterMap[char] += 1;
    } else {
      characterMap[char] = 1;
    }
  }
  return characterMap;
}

function fuzzyMatch(pattern: string, target: string): boolean {
  let patternCharacterMap = stringToCharacterMap(pattern);
  let targetCharacterMap = stringToCharacterMap(target);

  for (let key in patternCharacterMap) {
    if (!(key in targetCharacterMap)) return false;
    if (patternCharacterMap[key] > targetCharacterMap[key]) return false;
  }
  return true;
}

function fuzzyMatchArray(sub: string[], sup: string[]) {
  return sub.every((vs) => sup.find((vt) => fuzzyMatch(vs, vt)) !== undefined);
}

export class MemeDatabase {
  memes: Meme[] = [
    { gif: angryThumbsUp, tags: ["angry", "juho", "thumbs-up"] },
    {
      gif: classyApplause,
      tags: ["classy", "applause", "men", "bravo", "respect"],
    },
    {
      gif: coralineDad,
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
    { gif: creepyButILikeIt, tags: ["creepy", "like"] },
    {
      gif: disgustedClintEastwood,
      tags: ["coffee", "disgust", "clint-eastwood"],
    },
    { gif: elsaFuck, tags: ["elsa", "frozen", "fuck"] },
    { gif: impossibleThanos, tags: ["impossible", "thanos"] },
    { gif: judgeJudyWatch, tags: ["judge", "judy", "watch"] },
    {
      gif: koalaGasolineExplosion,
      tags: ["koala", "gasoline", "cigarette", "explosion"],
    },
    {
      gif: notReallyMaybeClassified,
      tags: ["not-really", "maybe", "classified", "obama"],
    },
    {
      gif: rockOneEyebrowRaised,
      tags: ["rock", "eyebrow", "raise", "dwayne-johnson"],
    },
    { gif: rotatingThinkEmoji, tags: ["rotate", "think", "emoji"] },
    { gif: sadCatOnAPillow, tags: ["cat", "pillow", "sad", "bed"] },
    { gif: shockedOwl, tags: ["shock", "surprise", "owl"] },
    { gif: steveBuscemiFuckAllThat, tags: ["buscemi", "fuck"] },
    { gif: tellMeMore, tags: ["tell-me-more", "song", "high-school"] },
    {
      gif: theBigLebowskiThatsLikeYourOpinionMan,
      tags: ["the-big-lebowski", "thats-like-your-opinion-man"],
    },
    { gif: thonkEmoji, tags: ["think", "emoji", "thonk"] },
    {
      gif: zombielandWipingTearsWithMoney,
      tags: ["zombieland", "tear", "cry", "money"],
    },
  ];

  getMemesByTags(tags: string[]): Meme[] {
    console.log(tags);

    return this.memes.filter((meme) => fuzzyMatchArray(tags, meme.tags));
  }
}
