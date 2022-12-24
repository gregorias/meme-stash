import { StaticImageData } from "next/image";
import angryThumbsUp from "../public/angry thumbs up.gif";
import bigThonk from "../public/big thonk.gif";
import coralineDad from "../public/coraline dad.gif";
import creepyButILikeIt from "../public/creepy but I like it.gif";
import disgustedClintEastwood from "../public/disgusted clint eastwood.gif";
import elsaFuck from "../public/elsa fuck.gif";
import judgeJudyWatch from "../public/judge judy watch.gif";
import koalaGasolineExplosion from "../public/koala gasoline explosion.gif";
import sadCatOnAPillow from "../public/sad cat on a pillow.gif";
import steveBuscemiFuckAllThat from "../public/steve buscemi fuck all that.gif";

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
    { gif: bigThonk, tags: ["think", "emoji", "thonk"] },
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
    { gif: judgeJudyWatch, tags: ["judge", "judy", "watch"] },
    {
      gif: koalaGasolineExplosion,
      tags: ["koala", "gasoline", "cigarette", "explosion"],
    },
    { gif: sadCatOnAPillow, tags: ["cat", "pillow", "sad", "bed"] },
    { gif: steveBuscemiFuckAllThat, tags: ["buscemi", "fuck"] },
  ];

  getMemesByTags(tags: string[]): Meme[] {
    console.log(tags);

    return this.memes.filter((meme) => fuzzyMatchArray(tags, meme.tags));
  }
}
