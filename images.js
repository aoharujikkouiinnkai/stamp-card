// images.js
const CARD_IMAGES = {
    // 全体の背景（もしあれば）
    background: 'bg.png', 

    // スタンプ台のジグザグな基盤（7つの穴があるテンプレート画像）
    cardBase: 'cardhaikei.png', 

    // スタンプ画像の種類
    stamps: {
        live: 'stamp_live.png',
        archive: 'stamp_archive.png'
    }
};

// ★スタンプの座標設定（試行錯誤をなくすための設定）
// 1枚の「cardhaikei.png」の中にある7つの穴の「上からの位置(top)」と「左からの位置(left)」を％で指定します。
const STAMP_POSITIONS = [
    { top: '20%', left: '15%' }, // 1個目の穴
    { top: '35%', left: '45%' }, // 2個目の穴（ジグザグに合わせて）
    { top: '50%', left: '75%' }, // 3個目の穴
    { top: '65%', left: '30%' }, // 4個目の穴
    { top: '72%', left: '60%' }, // 5個目の穴
    { top: '80%', left: '15%' }, // 6個目の穴
    { top: '90%', left: '50%' }  // 7個目の穴
];
