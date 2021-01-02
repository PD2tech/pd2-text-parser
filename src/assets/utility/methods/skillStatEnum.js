import allStrings from "../json/allStrings.json";
import skills from "../json/charSkills.json";

const amazon = [...skills.slice(0, 30)];
const sorc = [...skills.slice(30, 63)];
const necro = [...skills.slice(63, 95)];
const pally = [...skills.slice(95, 129)];
const barb = [...skills.slice(129, 156)];
const druid = [...skills.slice(156, 187)];
const sin = [...skills.slice(187)];

export const skillStatEnum = () => {
  const oskills = skills.map((obj) => {
    return {
      code: "oskill",
      name: "item_nonclassskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill}`,
      stats: [
        {
          stat: "item_nonclassskill",
          descstr: `+{X} to ${obj.skill}`,
        },
      ],
    };
  });

  const skilltabs = treeDifferentiator.map((obj) => {
    const string = allStrings.find((str) => str.id === obj.str);
    if (string === undefined) {
      debugger;
    }
    let replace = string.str.split(" ");
    for (let i = 0; i < replace.length; i++) {
      if (replace[i] === "+%d") {
        replace[i] = "+{X}";
      }
    }
    replace.push(`(${obj.char} Only)`);
    const join = replace.join(" ");
    return {
      code: "skilltab",
      name: "item_addskill_tab",
      tree: obj.name,
      display: join,
      stats: [
        {
          stat: "item_addskill_tab",
          descstr: join,
        },
      ],
    };
  });

  const amazonskills = amazon.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Amazon Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Amazon Only)`,
        },
      ],
    };
  });

  const sorcskills = sorc.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Sorceress Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Sorceress Only)`,
        },
      ],
    };
  });

  const necroskills = necro.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Necromancer Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Necromancer Only)`,
        },
      ],
    };
  });

  const pallyskills = pally.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Paladin Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Paladin Only)`,
        },
      ],
    };
  });

  const barbskills = barb.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Barbarian Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Barbarian Only)`,
        },
      ],
    };
  });

  const druidskills = druid.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Druid Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Druid Only)`,
        },
      ],
    };
  });

  const sinskills = sin.map((obj) => {
    return {
      code: "skill",
      name: "item_singleskill",
      skill: obj.skill,
      display: `+{X} to ${obj.skill} (Assassin Only)`,
      stats: [
        {
          stat: "item_singleskill",
          descstr: `+{X} to ${obj.skill} (Assassin Only)`,
        },
      ],
    };
  });

  const deathstats = death.map((obj) => {
    const split = obj.stat1.split("{X}% Chance to cast level {Y} ");
    const split2 = split[1].split(" when you Die");
    return {
      code: "death-skill",
      name: "item_skillondeath",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "item_skillondeath",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const levelstats = level.map((obj) => {
    const split = obj.stat1.split("{X}% Chance to cast level {Y} ");
    const split2 = split[1].split(" when you Level-up");
    return {
      code: "levelup-skill",
      name: "item_skillonlevelup",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "item_skillonlevelup",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const hitstats = hit.map((obj) => {
    const split = obj.stat1.split("{X}% Chance to cast level {Y} ");
    const split2 = split[1].split(" on striking");
    return {
      code: "hit-skill",
      name: "item_skillonhit",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "item_skillonhit",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const gethitstats = gethit.map((obj) => {
    const split = obj.stat1.split("{X}% Chance to cast level {Y} ");
    const split2 = split[1].split(" when struck");
    return {
      code: "gethit-skill",
      name: "item_skillongethit",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "item_skillongethit",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const attackstats = attack.map((obj) => {
    const split = obj.stat1.split("{X}% Chance to cast level {Y} ");
    const split2 = split[1].split(" on attack");
    return {
      code: "att-skill",
      name: "item_skillonattack",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "item_skillonattack",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const aurastats = aura.map((obj) => {
    const split = obj.stat1.split("Level {X} ");
    const split2 = split[1].split(" Aura When Equipped");
    return {
      code: "aura",
      name: "item_aura",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "item_aura",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const killstats = kill.map((obj) => {
    const split = obj.stat1.split("{X}% Chance to cast level {Y} ");
    const split2 = split[1].split(" when you Kill an Enemy");
    return {
      code: "kill-skill",
      name: "item_skillonkill",
      skill: split2[0],
      display: obj.stat1,
      stats: [
        {
          stat: "kill-skill",
          descstr: obj.stat1,
        },
      ],
    };
  });

  const final = [
    ...oskills,
    ...skilltabs,
    ...amazonskills,
    ...sorcskills,
    ...necroskills,
    ...pallyskills,
    ...barbskills,
    ...druidskills,
    ...sinskills,
    ...deathstats,
    ...levelstats,
    ...hitstats,
    ...gethitstats,
    ...attackstats,
    ...aurastats,
    ...killstats,
  ];
  return final;
};

const death = [
  {
    code: "death-skill-56",
    stat1: "{X}% Chance to cast level {Y} Meteor when you Die",
    displayName: "{X}% Chance to cast level {Y} Meteor when you Die",
  },
  {
    code: "death-skill-53",
    stat1: "{X}% Chance to cast level {Y} Chain Lightning when you Die",
    displayName: "{X}% Chance to cast level {Y} Chain Lightning when you Die",
  },
  {
    code: "death-skill-59",
    stat1: "{X}% Chance to cast level {Y} Blizzard when you Die",
    displayName: "{X}% Chance to cast level {Y} Blizzard when you Die",
  },
  {
    code: "death-skill-92",
    stat1: "{X}% Chance to cast level {Y} Poison Nova when you Die",
    displayName: "{X}% Chance to cast level {Y} Poison Nova when you Die",
  },
];

const hit = [
  {
    code: "hit-skill-47",
    stat1: "{X}% Chance to cast level {Y} Fire Ball on striking",
    displayName: "{X}% Chance to cast level {Y} Fire Ball on striking",
  },
  {
    code: "hit-skill-56",
    stat1: "{X}% Chance to cast level {Y} Meteor on striking",
    displayName: "{X}% Chance to cast level {Y} Meteor on striking",
  },
  {
    code: "hit-skill-45",
    stat1: "{X}% Chance to cast level {Y} Ice Blast on striking",
    displayName: "{X}% Chance to cast level {Y} Ice Blast on striking",
  },
  {
    code: "hit-skill-44",
    stat1: "{X}% Chance to cast level {Y} Frost Nova on striking",
    displayName: "{X}% Chance to cast level {Y} Frost Nova on striking",
  },
  {
    code: "hit-skill-59",
    stat1: "{X}% Chance to cast level {Y} Blizzard on striking",
    displayName: "{X}% Chance to cast level {Y} Blizzard on striking",
  },
  {
    code: "hit-skill-91",
    stat1: "{X}% Chance to cast level {Y} Lower Resist on striking",
    displayName: "{X}% Chance to cast level {Y} Lower Resist on striking",
  },
  {
    code: "hit-skill-92",
    stat1: "{X}% Chance to cast level {Y} Poison Nova on striking",
    displayName: "{X}% Chance to cast level {Y} Poison Nova on striking",
  },
  {
    code: "hit-skill-87",
    stat1: "{X}% Chance to cast level {Y} Decrepify on striking",
    displayName: "{X}% Chance to cast level {Y} Decrepify on striking",
  },
  {
    code: "hit-skill-81",
    stat1: "{X}% Chance to cast level {Y} Confuse on striking",
    displayName: "{X}% Chance to cast level {Y} Confuse on striking",
  },
  {
    code: "hit-skill-66",
    stat1: "{X}% Chance to cast level {Y} Amplify Damage on striking",
    displayName: "{X}% Chance to cast level {Y} Amplify Damage on striking",
  },
  {
    code: "hit-skill-53",
    stat1: "{X}% Chance to cast level {Y} Chain Lightning on striking",
    displayName: "{X}% Chance to cast level {Y} Chain Lightning on striking",
  },
  {
    code: "hit-skill-38",
    stat1: "{X}% Chance to cast level {Y} Charged Bolt on striking",
    displayName: "{X}% Chance to cast level {Y} Charged Bolt on striking",
  },
  {
    code: "hit-skill-72",
    stat1: "{X}% Chance to cast level {Y} Weaken on striking",
    displayName: "{X}% Chance to cast level {Y} Weaken on striking",
  },
  {
    code: "hit-skill-234",
    stat1: "{X}% Chance to cast level {Y} Fissure on striking",
    displayName: "{X}% Chance to cast level {Y} Fissure on striking",
  },
  {
    code: "hit-skill-64",
    stat1: "{X}% Chance to cast level {Y} Frozen Orb on striking",
    displayName: "{X}% Chance to cast level {Y} Frozen Orb on striking",
  },
  {
    code: "hit-skill-229",
    stat1: "{X}% Chance to cast level {Y} Molten Boulder on striking",
    displayName: "{X}% Chance to cast level {Y} Molten Boulder on striking",
  },
  {
    code: "hit-skill-48",
    stat1: "{X}% Chance to cast level {Y} Nova on striking",
    displayName: "{X}% Chance to cast level {Y} Nova on striking",
  },
  {
    code: "hit-skill-76",
    stat1: "{X}% Chance to cast level {Y} Iron Maiden on striking",
    displayName: "{X}% Chance to cast level {Y} Iron Maiden on striking",
  },
  {
    code: "hit-skill-131",
    stat1: "{X}% Chance to cast level {Y} Fist of the Heavens on striking",
    displayName: "{X}% Chance to cast level {Y} Fist of the Heavens on striking",
  },
  {
    code: "hit-skill-245",
    stat1: "{X}% Chance to cast level {Y} Tornado on striking",
    displayName: "{X}% Chance to cast level {Y} Tornado on striking",
  },
  {
    code: "hit-skill-84",
    stat1: "{X}% Chance to cast level {Y} Bone Spear on striking",
    displayName: "{X}% Chance to cast level {Y} Bone Spear on striking",
  },
  {
    code: "hit-skill-240",
    stat1: "{X}% Chance to cast level {Y} Twister on striking",
    displayName: "{X}% Chance to cast level {Y} Twister on striking",
  },
  {
    code: "hit-skill-49",
    stat1: "{X}% Chance to cast level {Y} Lightning on striking",
    displayName: "{X}% Chance to cast level {Y} Lightning on striking",
  },
  {
    code: "hit-skill-83",
    stat1: "{X}% Chance to cast level {Y} Desecrate on striking",
    displayName: "{X}% Chance to cast level {Y} Desecrate on striking",
  },
  {
    code: "hit-skill-225",
    stat1: "{X}% Chance to cast level {Y} Firestorm on striking",
    displayName: "{X}% Chance to cast level {Y} Firestorm on striking",
  },
  {
    code: "hit-skill-42",
    stat1: "{X}% Chance to cast level {Y} Static Field on striking",
    displayName: "{X}% Chance to cast level {Y} Static Field on striking",
  },
  {
    code: "hit-skill-52",
    stat1: "{X}% Chance to cast level {Y} Enchant Fire on striking",
    displayName: "{X}% Chance to cast level {Y} Enchant Fire on striking",
  },
  {
    code: "hit-skill-101",
    stat1: "{X}% Chance to cast level {Y} Holy Bolt on striking",
    displayName: "{X}% Chance to cast level {Y} Holy Bolt on striking",
  },
  {
    code: "hit-skill-82",
    stat1: "{X}% Chance to cast level {Y} Life Tap on striking",
    displayName: "{X}% Chance to cast level {Y} Life Tap on striking",
  },
  {
    code: "hit-skill-244",
    stat1: "{X}% Chance to cast level {Y} Volcano on striking",
    displayName: "{X}% Chance to cast level {Y} Volcano on striking",
  },
  {
    code: "hit-skill-137",
    stat1: "{X}% Chance to cast level {Y} Taunt on striking",
    displayName: "{X}% Chance to cast level {Y} Taunt on striking",
  },
  {
    code: "hit-skill-32",
    stat1: "{X}% Chance to cast level {Y} Valkyrie on striking",
    displayName: "{X}% Chance to cast level {Y} Valkyrie on striking",
  },
  {
    code: "hit-skill-87",
    stat1: "{X}% Chance to cast level {Y} Decrepify on striking",
    displayName: "{X}% Chance to cast level {Y} Decrepify on striking",
  },
  {
    code: "hit-skill-278",
    stat1: "{X}% Chance to cast level {Y} Venom on striking",
    displayName: "{X}% Chance to cast level {Y} Venom on striking",
  },
  {
    code: "hit-skill-93",
    stat1: "{X}% Chance to cast level {Y} Bone Spirit on striking",
    displayName: "{X}% Chance to cast level {Y} Bone Spirit on striking",
  },
  {
    code: "hit-skill-62",
    stat1: "{X}% Chance to cast level {Y} Hydra on striking",
    displayName: "{X}% Chance to cast level {Y} Hydra on striking",
  },
];

const gethit = [
  {
    code: "gethit-skill-71",
    stat1: "{X}% Chance to cast level {Y} Dim Vision when struck",
    displayName: "{X}% Chance to cast level {Y} Dim Vision when struck",
  },
  {
    code: "gethit-skill-92",
    stat1: "{X}% Chance to cast level {Y} Poison Nova when struck",
    displayName: "{X}% Chance to cast level {Y} Poison Nova when struck",
  },
  {
    code: "gethit-skill-76",
    stat1: "{X}% Chance to cast level {Y} Iron Maiden when struck",
    displayName: "{X}% Chance to cast level {Y} Iron Maiden when struck",
  },
  {
    code: "gethit-skill-48",
    stat1: "{X}% Chance to cast level {Y} Nova when struck",
    displayName: "{X}% Chance to cast level {Y} Nova when struck",
  },
  {
    code: "gethit-skill-81",
    stat1: "{X}% Chance to cast level {Y} Confuse when struck",
    displayName: "{X}% Chance to cast level {Y} Confuse when struck",
  },
  {
    code: "gethit-skill-51",
    stat1: "{X}% Chance to cast level {Y} Fire Wall when struck",
    displayName: "{X}% Chance to cast level {Y} Fire Wall when struck",
  },
  {
    code: "gethit-skill-235",
    stat1: "{X}% Chance to cast level {Y} Cyclone Armor when struck",
    displayName: "{X}% Chance to cast level {Y} Cyclone Armor when struck",
  },
  {
    code: "gethit-skill-93",
    stat1: "{X}% Chance to cast level {Y} Bone Spirit when struck",
    displayName: "{X}% Chance to cast level {Y} Bone Spirit when struck",
  },
  {
    code: "gethit-skill-38",
    stat1: "{X}% Chance to cast level {Y} Charged Bolt when struck",
    displayName: "{X}% Chance to cast level {Y} Charged Bolt when struck",
  },
  {
    code: "gethit-skill-101",
    stat1: "{X}% Chance to cast level {Y} Holy Bolt when struck",
    displayName: "{X}% Chance to cast level {Y} Holy Bolt when struck",
  },
  {
    code: "gethit-skill-54",
    stat1: "{X}% Chance to cast level {Y} Teleport when struck",
    displayName: "{X}% Chance to cast level {Y} Teleport when struck",
  },
  {
    code: "gethit-skill-46",
    stat1: "{X}% Chance to cast level {Y} Blaze when struck",
    displayName: "{X}% Chance to cast level {Y} Blaze when struck",
  },
  {
    code: "gethit-skill-59",
    stat1: "{X}% Chance to cast level {Y} Blizzard when struck",
    displayName: "{X}% Chance to cast level {Y} Blizzard when struck",
  },
  {
    code: "gethit-skill-121",
    stat1: "{X}% Chance to cast level {Y} Fist of the Heavens when struck",
    displayName: "{X}% Chance to cast level {Y} Fist of the Heavens when struck",
  },
  {
    code: "gethit-skill-245",
    stat1: "{X}% Chance to cast level {Y} Tornado when struck",
    displayName: "{X}% Chance to cast level {Y} Tornado when struck",
  },
  {
    code: "gethit-skill-48",
    stat1: "{X}% Chance to cast level {Y} Nova when struck",
    displayName: "{X}% Chance to cast level {Y} Nova when struck",
  },
  {
    code: "gethit-skill-130",
    stat1: "{X}% Chance to cast level {Y} Howl when struck",
    displayName: "{X}% Chance to cast level {Y} Howl when struck",
  },
  {
    code: "gethit-skill-17",
    stat1: "{X}% Chance to cast level {Y} Slow Missiles when struck",
    displayName: "{X}% Chance to cast level {Y} Slow Missiles when struck",
  },
  {
    code: "gethit-skill-62",
    stat1: "{X}% Chance to cast level {Y} Hydra when struck",
    displayName: "{X}% Chance to cast level {Y} Hydra when struck",
  },
  {
    code: "gethit-skill-72",
    stat1: "{X}% Chance to cast level {Y} Weaken when struck",
    displayName: "{X}% Chance to cast level {Y} Weaken when struck",
  },
  {
    code: "gethit-skill-less",
    stat1: "{X}% Chance to cast level {Y} Lesser Fade when struck",
    displayName: "{X}% Chance to cast level {Y} Lesser Fade when struck",
  },
  {
    code: "gethit-skill-77",
    stat1: "{X}% Chance to cast level {Y} Terror when struck",
    displayName: "{X}% Chance to cast level {Y} Terror when struck",
  },
  {
    code: "gethit-skill-deli",
    stat1: "{X}% Chance to cast level {Y} Delirium when struck",
    displayName: "{X}% Chance to cast level {Y} Delirium when struck",
  },
  {
    code: "gethit-skill-250",
    stat1: "{X}% Chance to cast level {Y} Hurricane when struck",
    displayName: "{X}% Chance to cast level {Y} Hurricane when struck",
  },
  {
    code: "gethit-skill-273",
    stat1: "{X}% Chance to cast level {Y} Mind Blast when struck",
    displayName: "{X}% Chance to cast level {Y} Mind Blast when struck",
  },
  {
    code: "gethit-skill-91",
    stat1: "{X}% Chance to cast level {Y} Lower Resist when struck",
    displayName: "{X}% Chance to cast level {Y} Lower Resist when struck",
  },
  {
    code: "gethit-skill-267",
    stat1: "{X}% Chance to cast level {Y} Fade when struck",
    displayName: "{X}% Chance to cast level {Y} Fade when struck",
  },
];

const attack = [
  {
    code: "att-skill-376",
    stat1: "{X}% Chance to cast level {Y} Combustion on attack",
    displayName: "{X}% Chance to cast level {Y} Combustion on attack",
  },
  {
    code: "att-skill-53",
    stat1: "{X}% Chance to cast level {Y} Chain Lightning on attack",
    displayName: "{X}% Chance to cast level {Y} Chain Lightning on attack",
  },
  {
    code: "att-skill-66",
    stat1: "{X}% Chance to cast level {Y} Amplify Damage on attack",
    displayName: "{X}% Chance to cast level {Y} Amplify Damage on attack",
  },
  {
    code: "att-skill-64",
    stat1: "{X}% Chance to cast level {Y} Frozen Orb on attack",
    displayName: "{X}% Chance to cast level {Y} Frozen Orb on attack",
  },
  {
    code: "att-skill-55",
    stat1: "{X}% Chance to cast level {Y} Glacial Spike on attack",
    displayName: "{X}% Chance to cast level {Y} Glacial Spike on attack",
  },
  {
    code: "att-skill-48",
    stat1: "{X}% Chance to cast level {Y} Nova on attack",
    displayName: "{X}% Chance to cast level {Y} Nova on attack",
  },
  {
    code: "att-skill-38",
    stat1: "{X}% Chance to cast level {Y} Charged Bolt on attack",
    displayName: "{X}% Chance to cast level {Y} Charged Bolt on attack",
  },
];

const aura = [
  {
    code: "aura-103",
    stat1: "Level {X} Thorns Aura When Equipped",
    displayName: "Level {X} Thorns Aura When Equipped",
  },
  {
    code: "aura-120",
    stat1: "Level {X} Meditation Aura When Equipped",
    displayName: "Level {X} Meditation Aura When Equipped",
  },
  {
    code: "aura-115",
    stat1: "Level {X} Vigor Aura When Equipped",
    displayName: "Level {X} Vigor Aura When Equipped",
  },
  {
    code: "aura-119",
    stat1: "Level {X} Sanctuary Aura When Equipped",
    displayName: "Level {X} Sanctuary Aura When Equipped",
  },
  {
    code: "aura-122",
    stat1: "Level {X} Fanaticism Aura When Equipped",
    displayName: "Level {X} Fanaticism Aura When Equipped",
  },
  {
    code: "aura-104",
    stat1: "Level {X} Defiance Aura When Equipped",
    displayName: "Level {X} Defiance Aura When Equipped",
  },
  {
    code: "aura-102",
    stat1: "Level {X} Holy Fire Aura When Equipped",
    displayName: "Level {X} Holy Fire Aura When Equipped",
  },
  {
    code: "aura-123",
    stat1: "Level {X} Conviction Aura When Equipped",
    displayName: "Level {X} Conviction Aura When Equipped",
  },
  {
    code: "aura-118",
    stat1: "Level {X} Holy Shock Aura When Equipped",
    displayName: "Level {X} Holy Shock Aura When Equipped",
  },
  {
    code: "aura-114",
    stat1: "Level {X} Holy Freeze Aura When Equipped",
    displayName: "Level {X} Holy Freeze Aura When Equipped",
  },
  {
    code: "aura-98",
    stat1: "Level {X} Might Aura When Equipped",
    displayName: "Level {X} Might Aura When Equipped",
  },
  {
    code: "aura-124",
    stat1: "Level {X} Redemption Aura When Equipped",
    displayName: "Level {X} Redemption Aura When Equipped",
  },
  {
    code: "aura-109",
    stat1: "Level {X} Cleansing Aura When Equipped",
    displayName: "Level {X} Cleansing Aura When Equipped",
  },
  {
    code: "aura-113",
    stat1: "Level {X} Concentration Aura When Equipped",
    displayName: "Level {X} Concentration Aura When Equipped",
  },
];

const kill = [
  {
    code: "kill-skill-66",
    stat1: "{X}% Chance to cast level {Y} Amplify Damage when you Kill an Enemy",
    displayName: "{X}% Chance to cast level {Y} Amplify Damage when you Kill an Enemy",
  },
  {
    code: "kill-skill-52",
    stat1: "{X}% Chance to cast level {Y} Enchant Fire when you Kill an Enemy",
    displayName: "{X}% Chance to cast level {Y} Enchant Fire when you Kill an Enemy",
  },
  {
    code: "kill-skill-92",
    stat1: "{X}% Chance to cast level {Y} Poison Nova when you Kill an Enemy",
    displayName: "{X}% Chance to cast level {Y} Poison Nova when you Kill an Enemy",
  },
  {
    code: "kill-skill-53",
    stat1: "{X}% Chance to cast level {Y} Chain Lightning when you Kill an Enemy",
    displayName: "{X}% Chance to cast level {Y} Chain Lightning when you Kill an Enemy",
  },
];

const level = [
  {
    code: "levelup-skill-59",
    stat1: "{X}% Chance to cast level {Y} Blizzard when you Level-Up",
    displayName: "{X}% Chance to cast level {Y} Blizzard when you Level-Up",
  },
  {
    code: "levelup-skill-46",
    stat1: "{X}% Chance to cast level {Y} Blaze when you Level-Up",
    displayName: "{X}% Chance to cast level {Y} Blaze when you Level-Up",
  },
  {
    code: "levelup-skill-44",
    stat1: "{X}% Chance to cast level {Y} Frost Nova when you Level-Up",
    displayName: "{X}% Chance to cast level {Y} Frost Nova when you Level-Up",
  },
  {
    code: "levelup-skill-48",
    stat1: "{X}% Chance to cast level {Y} Nova when you Level-Up",
    displayName: "{X}% Chance to cast level {Y} Nova when you Level-Up",
  },
  {
    code: "levelup-skill-278",
    stat1: "{X}% Chance to cast level {Y} Venom when you Level-Up",
    displayName: "{X}% Chance to cast level {Y} Venom when you Level-Up",
  },
];

const treeDifferentiator = [
  {
    str: "StrSklTabItem3",
    char: "Amazon",
    name: "Bow and Crossbow",
    id: "0",
  },
  {
    str: "StrSklTabItem2",
    char: "Amazon",
    name: "Passive and Magic",
    id: "1",
  },
  {
    str: "StrSklTabItem1",
    char: "Amazon",
    name: "Javelin and Spear",
    id: "2",
  },
  {
    str: "StrSklTabItem15",
    char: "Sorceress",
    name: "Fire",
    id: "3",
  },
  {
    str: "StrSklTabItem13",
    char: "Sorceress",
    name: "Cold",
    id: "4",
  },
  {
    str: "StrSklTabItem14",
    name: "Lightning",
    char: "Sorceress",
    id: "5",
  },
  {
    str: "StrSklTabItem8",
    char: "Necromancer",
    name: "Curses",
    id: "6",
  },
  {
    str: "StrSklTabItem7",
    char: "Necromancer",
    name: "Poison and Bone",
    id: "7",
  },
  {
    str: "StrSklTabItem6",
    char: "Necromancer",
    name: "Summoning",
    id: "8",
  },
  {
    str: "StrSklTabItem6",
    char: "Paladin",
    name: "Combat",
    id: "9",
  },
  {
    str: "StrSklTabItem4",
    char: "Paladin",
    name: "Defensive Auras",
    id: "10",
  },
  {
    str: "StrSklTabItem5",
    char: "Paladin",
    name: "Offensive Auras",
    id: "11",
  },
  {
    str: "StrSklTabItem11",
    char: "Barbarian",
    name: "Combat",
    id: "12",
  },
  {
    str: "StrSklTabItem12",
    char: "Barbarian",
    name: "Combat Masteries",
    id: "13",
  },
  {
    str: "StrSklTabItem10",
    char: "Barbarian",
    name: "Warcries",
    id: "14",
  },
  {
    str: "StrSklTabItem16",
    char: "Druid",
    name: "Summoning Druid",
    id: "15",
  },
  {
    str: "StrSklTabItem17",
    char: "Druid",
    name: "Shape Shifting",
    id: "16",
  },
  {
    str: "StrSklTabItem18",
    char: "Druid",
    name: "Elemental",
    id: "17",
  },
  {
    str: "StrSklTabItem19",
    char: "Assassin",
    name: "Traps",
    id: "18",
  },
  {
    str: "StrSklTabItem20",
    char: "Assassin",
    name: "Shadow Disciplines",
    id: "19",
  },
  {
    str: "StrSklTabItem21",
    char: "Assassin",
    name: "Martial Arts",
    id: "20",
  },
];
