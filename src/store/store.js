import createStore from "./init";

const data = {
  global: {
    //Viewport stuff
    vW: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    //viewportMode: Desktop/Mobile layout. Automatically set by GameFrame.js
    viewportMode: "portrait", //"portrait" or "landscape"

    scene: "normal",
  },
  player: {
    name: "匿名玩家",   //名字
    level: 1,           //等级
    exping: 0,          //当前经验
    exped: 0,           //当前经验上限
    money: 0,           //金钱
    blood: 100,         //生命值上限
    useblood: 0,        //生命值
    att: 6,             //攻击
    def: 6,             //防御
    fightN: false,      //是否战斗状态
    fightA: 0,          //怪物战斗编号
    fightL: [],         //战斗情况
    maping: 0,          //当前地图,
    winN: [],           //杀死怪物列表
    states: {},         //状态
    role: [],           //任务
    roles: [],          //任务进度
    roleData: [],       //任务数据
  },
  settings: {
    Uplevel: 100,       //等级上限
    ADD_blood: 1,       //每秒加生命
    ADD_time: 1000,     //恢复时间(毫秒)
    ADD_att: 3,         //每升一级加攻击
    ADD_def: 3,         //每升一级加防御
    ADD_life: 15,       //每升一级加体力
    exped: [],          //经验集合
    map: [],            //地图集合
    animal: [],         //怪物集合 animal无s
    people: [],         //人物集合
    role: [],           //任务集合 核心
    goods: [],          //物品集合
  }
};

// 暂时这样表示，后续会用alasql和graphql操作
data.settings.map = [
  //编号，名称，通往其他地图，怪物编号，人物编号
  [0, "村庄", [1, 2], [0], [0, 1, 2]],
  [1, "树林1", [0, 3], [0, 1], []],
  [2, "草丛1", [0, 4], [0, 1, 2], []],
  [3, "树林2", [1, 5], [2, 4], []],
  [4, "草丛2", [2, 6], [2, 3, 4], []],
  [5, "森林1", [6, 3, 7], [3, 5, 4, 6], []],
  [6, "草丛3", [4, 5], [3, 5], []],
  [7, "森林2", [5, 8], [6, 7, 8], []],
  [8, "森林3", [7, 9], [7, 8], []],
  [9, "火山1", [8, 10], [9], []],
  [10, "火山2", [9], [10], []],
];

data.settings.animal = [
  //名称，级，体，攻，防，金，经，N秒，－N滴血
  ["白兔", 1, 28, 7, 5, 2, 5, 3, 2, "草"],
  ["小黄狗", 2, 35, 11, 9, 5, 3, 5, 2, "土"],
  ["小花蛇", 3, 42, 14, 12, 9, 6, 3, 5, "草"],
  ["野猫", 4, 52, 18, 20, 12, 9, 4, 6, "土"],
  ["毒蛇", 6, 78, 25, 27, 18, 14, 5, 8, "土"],
  ["BOSS-鼠王", 5, 250, 50, 48, 120, 30, 10, 10, "BOSS"],
  ["灰鸟", 8, 102, 32, 34, 28, 20, 8, 9, "飞"],
  ["白狼", 9, 141, 40, 35, 39, 28, 10, 9, "爪"],
  ["BOSS-猎豹", 10, 500, 100, 100, 300, 50, 20, 20, "BOSS"],
  ["火鸡", 11, 182, 45, 40, 43, 34, 15, 5, "土"],
  ["BOSS-烈焰", 15, 750, 500, 500, 500, 200, 60, 300, "BOSS"],
];

data.settings.people = [
  //编号……所属地图号，常用语言
  [0, "村长", "罗克先生", 0, "我是村长我最大，\n我的地盘我做主。\n……"],
  [1, "村长的儿子", "摩西", 0, "……真无聊。\n你能和我一起玩吗？"],
  [2, "摩西的玩伴", "纳斯", 0, "摩西，和我玩吧。\n你干嘛不理我？\n呜呜……"],
];

data.settings.role = [
  // 任务类型，任务名称，任务内容，确定内容，拒绝内容，[所抓怪物ID，怪物数量]，完成内容，回复内容，加金钱，加经验
  // 类型：0=怪物
  [
    [0, "帮村长抓白兔", "我很饿，麻烦你帮我抓三只白兔来。", "好吧。", "请你找别人吧，我很忙。", [0, 3], "谢啦，这下可以吃兔肉了……", "不用客气。", 20, 10],
    [0, "小黄狗事件", "最近村内很多人被小黄狗咬伤了，请你去处理掉十只。", "我马上去。", "……恐怕我不行。", [1, 10], "你是我们村的大英雄！", "这是我应该做的。", 60, 50]
  ],
  [
    [0, "逃跑的小白兔", "我心爱的一只小白兔逃跑了，你能把它抓来吗？", "当然可以。", "不行，我可抓不着。", [0, 1], "谢谢你！", "小菜一碟。", 15, 10],
    [0, "处理小黄狗", "我调查了一下，原来是小黄狗把它抓走了，你能帮我吗？", "可以。", "我现在很累啊。", [1, 1], "非常感谢！", "用不着这样。", 12, 15]
  ],
  [
    [0, "恶毒的小花蛇", "小花蛇曾经把我的宠物咬死了，所以……", "绝对没问题！", "所以什么？", [2, 1], "谢谢你……", "我能理解你。", 15, 22]
  ]
];

data.settings.goods = [
  //0加体力，1加经，2任务，名字，金钱，加的量，所花时间
  [0, 0, "小型生命药水", 8, 20, 4],
  [1, 0, "小型生命药水A", 10, 20, 0],
  [2, 0, "中型生命药水", 25, 50, 5],
  [3, 0, "中型生命药水A", 32, 50, 0],
  [4, 0, "大型生命药水", 50, 100, 10],
  [5, 0, "大型生命药水A", 60, 100, 0],
  [6, 1, "小型经验药水", 150, 60, 2],
];

//经验值计算
for (let i = 1; i <= data.settings.Uplevel; i++) {
  data.settings.exped[i] = 3 + i * (i + 1) * (i + 2) / 3;
}

data.player.useblood = data.player.blood;
data.player.exped = data.settings.exped[data.player.level];
data.player.role = data.settings.role.map(() => false);
data.player.roles = data.settings.role.map(() => 0);
data.player.roleData = data.settings.role.map(() => {
  return {type: -1}
});

const store = createStore(data);

export default store;
