// images.js
const CONFIG = {
    // 🔴【超重要】カードの横幅に対して、スタンプの大きさを何％にするか
    // 穴の大きさに合わせて、10% 〜 25% の間で自由に数値を調整してください
    stampSizePercent: '16%', 

    // 使用する画像ファイルの一覧（画像が増えたらここに追記していきます）
    images: {
        cardBase: 'cardhaikei.png',      // スタンプ台の基盤（2048x1536）
        stamps: {
            live: 'stamp_live.png',       // リアタイ用スタンプ
            archive: 'stamp_archive.png'  // アーカイブ用スタンプ
        }
    },

    // 1枚のカード内にある7つの穴の座標（中心点の位置を % で指定）
    stampPositions: [
        { top: '20%', left: '15%' }, // 1個目の穴
        { top: '35%', left: '45%' }, // 2個目の穴
        { top: '50%', left: '75%' }, // 3個目の穴
        { top: '65%', left: '30%' }, // 4個目の穴
        { top: '72%', left: '60%' }, // 5個目の穴
        { top: '80%', left: '15%' }, // 6個目の穴
        { top: '90%', left: '50%' }  // 7個目の穴
    ]
};
