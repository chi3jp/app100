const appsData = [
    {
        id: 1,
        title: "トレンドキーワード・ファインダー",
        path: "01-Trend-Keyword-Finder/index.html",
        category: "情報収集",
        tags: ["情報収集", "トレンド", "Web", "API不要"]
    },
    {
        id: 2,
        title: "ニッチ・キーワード合成アプリ",
        path: "02-Niche-Keyword-Combiner/index.html",
        category: "アイデア生成",
        tags: ["アイデア生成", "クリエイティブ", "Web", "API不要"]
    },
    {
        id: 3,
        title: "Midjourney プロンプト・ビルダー",
        path: "03-Midjourney-Prompt-Builder/index.html",
        category: "AI",
        tags: ["AI", "画像生成", "プロンプト", "Web", "API必要"]
    },
    {
        id: 4,
        title: "AIキャッチコピー・ジェネレーター",
        path: "04-AI-Catchphrase-Generator/index.html",
        category: "AI",
        tags: ["AI", "文章生成", "マーケティング", "Web", "API必要"]
    },
    {
        id: 5,
        title: "ブログ記事構成アシスタント",
        path: "05-Blog-Outline-Assistant/index.html",
        category: "AI",
        tags: ["AI", "文章生成", "コンテンツ作成", "Web", "API必要"]
    },
    {
        id: 6,
        title: "配色パターン提案アプリ",
        path: "06-Color-Palette-Suggester/index.html",
        category: "デザイン",
        tags: ["デザイン", "Web", "ツール", "API不要"]
    },
    {
        id: 7,
        title: "ランダムお題メーカー",
        path: "07-Random-Topic-Generator/index.html",
        category: "アイデア生成",
        tags: ["アイデア生成", "クリエイティブ", "Web", "API不要"]
    },
    {
        id: 8,
        title: "簡易版 ENSドメイン検索",
        path: "08-Simple-ENS-Search/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "ドメイン", "Web", "API必要"]
    },
    {
        id: 9,
        title: "AIニュース・ヘッドライン",
        path: "09-AI-News-Headlines/index.html",
        category: "情報収集",
        tags: ["AI", "情報収集", "ニュース", "Web", "API不要"]
    },
    {
        id: 10,
        title: "ミニマル目標トラッカー",
        path: "10-Minimal-Goal-Tracker/index.html",
        category: "生産性",
        tags: ["生産性", "タスク管理", "Web", "API不要"]
    },
    {
        id: 11,
        title: "YouTube動画タイトル案ジェネレーター",
        path: "11-YouTube-Title-Generator/index.html",
        category: "AI",
        tags: ["AI", "文章生成", "YouTube", "Web", "API必要"]
    },
    {
        id: 12,
        title: "ハッシュタグ提案ツール",
        path: "12-Hashtag-Suggester/index.html",
        category: "AI",
        tags: ["AI", "SNS", "マーケティング", "Web", "API必要"]
    },
    {
        id: 13,
        title: "ペルソナ設定ヘルパー",
        path: "13-Persona-Helper/index.html",
        category: "AI",
        tags: ["AI", "マーケティング", "ビジネス", "Web", "API必要"]
    },
    {
        id: 14,
        title: "ストーリープロット・ジェネレーター",
        path: "14-Story-Plot-Generator/index.html",
        category: "AI",
        tags: ["AI", "文章生成", "クリエイティブ", "Web", "API必要"]
    },
    {
        id: 15,
        title: "キャラクター名ジェネレーター",
        path: "15-Character-Name-Generator/index.html",
        category: "AI",
        tags: ["AI", "アイデア生成", "クリエイティブ", "Web", "API必要"]
    },
    {
        id: 16,
        title: "ドメイン名アイデア出しツール",
        path: "16-Domain-Name-Suggester/index.html",
        category: "AI",
        tags: ["AI", "アイデア生成", "Web", "API必要"]
    },
    {
        id: 17,
        title: "アナロジー（たとえ話）メーカー",
        path: "17-Analogy-Maker/index.html",
        category: "AI",
        tags: ["AI", "文章生成", "教育", "Web", "API必要"]
    },
    {
        id: 18,
        title: "記事タイトルA/Bテスト案ジェネレーター",
        path: "18-AB-Test-Title-Generator/index.html",
        category: "AI",
        tags: ["AI", "マーケティング", "Web", "API必要"]
    },
    {
        id: 19,
        title: "X(Twitter)投稿スレッド作成アシスタント",
        path: "19-X-Thread-Assistant/index.html",
        category: "AI",
        tags: ["AI", "SNS", "文章生成", "Web", "API必要"]
    },
    {
        id: 20,
        title: "ポッドキャスト・トピック・ジェネレーター",
        path: "20-Podcast-Topic-Generator/index.html",
        category: "AI",
        tags: ["AI", "アイデア生成", "コンテンツ作成", "Web", "API必要"]
    },
    {
        id: 21,
        title: "メルマガ件名ジェネレーター",
        path: "21-Newsletter-Subject-Generator/index.html",
        category: "AI",
        tags: ["AI", "マーケティング", "文章生成", "Web", "API必要"]
    },
    {
        id: 22,
        title: "ランディングページ構成案メーカー",
        path: "22-Landing-Page-Outline-Maker/index.html",
        category: "AI",
        tags: ["AI", "マーケティング", "Web", "API必要"]
    },
    {
        id: 23,
        title: "プレゼンテーション構成案メーカー",
        path: "23-Presentation-Outline-Maker/index.html",
        category: "AI",
        tags: ["AI", "ビジネス", "Web", "API必要"]
    },
    {
        id: 24,
        title: "インタビュー質問ジェネレーター",
        path: "24-Interview-Question-Generator/index.html",
        category: "AI",
        tags: ["AI", "ビジネス", "Web", "API必要"]
    },
    {
        id: 25,
        title: "クイズ問題作成ツール",
        path: "25-Quiz-Question-Creator/index.html",
        category: "AI",
        tags: ["AI", "教育", "Web", "API必要"]
    },
    {
        id: 26,
        title: "テキスト要約アプリ",
        path: "26-Text-Summarizer/index.html",
        category: "AI",
        tags: ["AI", "文章処理", "Web", "API必要"]
    },
    {
        id: 27,
        title: "文章校正・リライトツール",
        path: "27-Text-Proofreader-Rewriter/index.html",
        category: "AI",
        tags: ["AI", "文章処理", "Web", "API必要"]
    },
    {
        id: 28,
        title: "感情分析ツール",
        path: "28-Sentiment-Analyzer/index.html",
        category: "AI",
        tags: ["AI", "文章処理", "Web", "API必要"]
    },
    {
        id: 29,
        title: "キーワード抽出ツール",
        path: "29-Keyword-Extractor/index.html",
        category: "AI",
        tags: ["AI", "文章処理", "SEO", "Web", "API必要"]
    },
    {
        id: 30,
        title: "音声文字起こし（簡易版）",
        path: "30-Audio-Transcriber/index.html",
        category: "ツール",
        tags: ["音声", "ツール", "Web", "デモ"]
    },
    {
        id: 31,
        title: "テキスト読み上げ（簡易版）",
        path: "31-Text-to-Speech/index.html",
        category: "ツール",
        tags: ["音声", "ツール", "Web", "API不要"]
    },
    {
        id: 32,
        title: "翻訳比較ツール",
        path: "32-Translation-Comparer/index.html",
        category: "ツール",
        tags: ["翻訳", "ツール", "Web", "デモ"]
    },
    {
        id: 33,
        title: "正規表現ジェネレーター",
        path: "33-Regex-Generator/index.html",
        category: "開発",
        tags: ["AI", "開発", "ツール", "Web", "API必要"]
    },
    {
        id: 34,
        title: "コード解説AI",
        path: "34-Code-Explainer-AI/index.html",
        category: "開発",
        tags: ["AI", "開発", "学習", "Web", "API必要"]
    },
    {
        id: 35,
        title: "コミットメッセージ生成AI",
        path: "35-Commit-Message-Generator/index.html",
        category: "開発",
        tags: ["AI", "開発", "Git", "Web", "API必要"]
    },
    {
        id: 36,
        title: "FAQ自動生成ツール",
        path: "36-FAQ-Generator/index.html",
        category: "AI",
        tags: ["AI", "ビジネス", "Web", "API必要"]
    },
    {
        id: 37,
        title: "議事録フォーマット整形ツール",
        path: "37-Meeting-Minutes-Formatter/index.html",
        category: "AI",
        tags: ["AI", "ビジネス", "文章処理", "Web", "API必要"]
    },
    {
        id: 38,
        title: "問い合わせメール返信文案ジェネレーター",
        path: "38-Email-Reply-Generator/index.html",
        category: "AI",
        tags: ["AI", "ビジネス", "文章生成", "Web", "API必要"]
    },
    {
        id: 39,
        title: "AI画像プロンプト翻訳ツール",
        path: "39-AI-Image-Prompt-Translator/index.html",
        category: "AI",
        tags: ["AI", "画像生成", "翻訳", "Web", "API必要"]
    },
    {
        id: 40,
        title: "類似画像検索（手持ち画像から）",
        path: "40-Similar-Image-Search/index.html",
        category: "画像",
        tags: ["画像", "ツール", "Web", "デモ"]
    },
    {
        id: 41,
        title: "SVGシェイプ・ジェネレーター",
        path: "41-SVG-Shape-Generator/index.html",
        category: "デザイン",
        tags: ["デザイン", "Web", "ツール", "API不要"]
    },
    {
        id: 42,
        title: "CSSグラデーション・ジェネレーター",
        path: "42-CSS-Gradient-Generator/index.html",
        category: "デザイン",
        tags: ["デザイン", "Web", "ツール", "API不要"]
    },
    {
        id: 43,
        title: "ダミー画像プレースホルダー作成",
        path: "43-Dummy-Image-Placeholder/index.html",
        category: "開発",
        tags: ["開発", "デザイン", "ツール", "Web", "API不要"]
    },
    {
        id: 44,
        title: "OGP画像シミュレーター",
        path: "44-OGP-Image-Simulator/index.html",
        category: "SNS",
        tags: ["SNS", "Web", "ツール", "API不要"]
    },
    {
        id: 45,
        title: "アイコン・リサイザー",
        path: "45-Icon-Resizer/index.html",
        category: "画像",
        tags: ["画像", "ツール", "Web", "API不要"]
    },
    {
        id: 46,
        title: "画像カラーパレット抽出ツール",
        path: "46-Image-Color-Palette-Extractor/index.html",
        category: "画像",
        tags: ["画像", "デザイン", "ツール", "Web", "API不要"]
    },
    {
        id: 47,
        title: "QRコード・ジェネレーター",
        path: "47-QR-Code-Generator/index.html",
        category: "ツール",
        tags: ["ツール", "Web", "API不要"]
    },
    {
        id: 48,
        title: "ウォーターマーク（透かし）追加ツール",
        path: "48-Watermark-Adder/index.html",
        category: "画像",
        tags: ["画像", "ツール", "Web", "API不要"]
    },
    {
        id: 49,
        title: "アニメーションCSSジェネレーター",
        path: "49-Animation-CSS-Generator/index.html",
        category: "開発",
        tags: ["開発", "デザイン", "Web", "API不要"]
    },
    {
        id: 50,
        title: "フォント組み合わせ提案ツール",
        path: "50-Font-Pairing-Suggester/index.html",
        category: "デザイン",
        tags: ["デザイン", "Web", "API不要"]
    },
    {
        id: 51,
        title: "モックアップ画像作成ツール",
        path: "51-Mockup-Creator/index.html",
        category: "デザイン",
        tags: ["デザイン", "Web", "ツール", "API不要"]
    },
    {
        id: 52,
        title: "Faviconジェネレーター",
        path: "52-Favicon-Generator/index.html",
        category: "開発",
        tags: ["Web", "ツール", "API不要"]
    },
    {
        id: 53,
        title: "画像圧縮ツール（簡易版）",
        path: "53-Image-Compressor/index.html",
        category: "画像",
        tags: ["画像", "ツール", "Web", "API不要"]
    },
    {
        id: 54,
        title: "アスペクト比計算ツール",
        path: "54-Aspect-Ratio-Calculator/index.html",
        category: "ツール",
        tags: ["ツール", "計算", "Web", "API不要"]
    },
    {
        id: 55,
        title: "ロゴアイデア・ジェネレーター",
        path: "55-Logo-Idea-Generator/index.html",
        category: "AI",
        tags: ["AI", "デザイン", "アイデア生成", "Web", "API必要"]
    },
    {
        id: 56,
        title: "ウォレットアドレスQRコード表示",
        path: "56-Wallet-Address-QR-Display/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "ツール", "API不要"]
    },
    {
        id: 57,
        title: "ガス代（Gas Fee）チェッカー",
        path: "57-Gas-Fee-Checker/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "ツール", "API必要"]
    },
    {
        id: 58,
        title: "NFTコレクション・フロア価格チェッカー",
        path: "58-NFT-Floor-Price-Checker/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "NFT", "Web", "API必要"]
    },
    {
        id: 59,
        title: "トランザクション履歴ビューア（簡易版）",
        path: "59-Transaction-History-Viewer/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "Web", "API必要"]
    },
    {
        id: 60,
        title: "暗号資産ポートフォリオ計算機",
        path: "60-Crypto-Portfolio-Calculator/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "ツール", "Web", "API必要"]
    },
    {
        id: 61,
        title: "IPFSアップローダー（簡易版）",
        path: "61-IPFS-Uploader/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "ツール", "Web", "API必要"]
    },
    {
        id: 62,
        title: "分散型ドメイン検索",
        path: "62-Decentralized-Domain-Search/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "ドメイン", "Web", "API必要"]
    },
    {
        id: 63,
        title: "最新エアドロップ情報チェッカー",
        path: "63-Airdrop-Checker/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "情報収集", "Web", "デモ"]
    },
    {
        id: 64,
        title: "ブロックチェーン・エクスプローラー（簡易版）",
        path: "64-Blockchain-Explorer/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "Web", "API必要"]
    },
    {
        id: 65,
        title: "スマートコントラクト・テンプレート集",
        path: "65-Smart-Contract-Templates/index.html",
        category: "Web3",
        tags: ["Web3", "ブロックチェーン", "開発", "Web", "API不要"]
    },
    {
        id: 66,
        title: "ポモドーロ・タイマー",
        path: "66-Pomodoro-Timer/index.html",
        category: "生産性",
        tags: ["生産性", "時間管理", "Web", "API不要"]
    },
    {
        id: 67,
        title: "ToDoリスト",
        path: "67-Todo-List/index.html",
        category: "生産性",
        tags: ["生産性", "タスク管理", "Web", "API不要"]
    },
    {
        id: 68,
        title: "メモ帳アプリ（ブラウザ保存）",
        path: "68-Browser-Notepad/index.html",
        category: "生産性",
        tags: ["生産性", "ツール", "Web", "API不要"]
    },
    {
        id: 69,
        title: "パスワード・ジェネレーター",
        path: "69-Password-Generator/index.html",
        category: "セキュリティ",
        tags: ["セキュリティ", "ツール", "Web", "API不要"]
    },
    {
        id: 70,
        title: "単位変換ツール",
        path: "70-Unit-Converter/index.html",
        category: "ツール",
        tags: ["ツール", "計算", "Web", "API不要"]
    },
    {
        id: 71,
        title: "タイムゾーン変換ツール",
        path: "71-Timezone-Converter/index.html",
        category: "ツール",
        tags: ["ツール", "時間", "Web", "API不要"]
    },
    {
        id: 72,
        title: "文字数カウンター",
        path: "72-Character-Counter/index.html",
        category: "文章処理",
        tags: ["文章処理", "ツール", "Web", "API不要"]
    },
    {
        id: 73,
        title: "URL短縮ツール",
        path: "73-URL-Shortener/index.html",
        category: "Web",
        tags: ["Web", "ツール", "API必要"]
    },
    {
        id: 74,
        title: "日数計算機",
        path: "74-Days-Calculator/index.html",
        category: "ツール",
        tags: ["ツール", "計算", "Web", "API不要"]
    },
    {
        id: 75,
        title: "簡易アンケートフォーム作成",
        path: "75-Simple-Survey-Form-Creator/index.html",
        category: "ビジネス",
        tags: ["ビジネス", "ツール", "Web", "API不要"]
    },
    {
        id: 76,
        title: "割り勘計算機",
        path: "76-Split-Bill-Calculator/index.html",
        category: "ツール",
        tags: ["ツール", "計算", "Web", "API不要"]
    },
    {
        id: 77,
        title: "ショートカットキー・チートシート",
        path: "77-Shortcut-Cheat-Sheet/index.html",
        category: "学習",
        tags: ["学習", "ツール", "Web", "API不要"]
    },
    {
        id: 78,
        title: "ブレインストーミング・ツール",
        path: "78-Brainstorming-Tool/index.html",
        category: "アイデア生成",
        tags: ["アイデア生成", "生産性", "Web", "API不要"]
    },
    {
        id: 79,
        title: "読書記録アプリ",
        path: "79-Book-Tracker/index.html",
        category: "生産性",
        tags: ["生産性", "ライフログ", "Web", "API不要"]
    },
    {
        id: 80,
        title: "習慣トラッカー",
        path: "80-Habit-Tracker/index.html",
        category: "生産性",
        tags: ["生産性", "ライフログ", "Web", "API不要"]
    },
    {
        id: 81,
        title: "CSV/JSONコンバーター",
        path: "81-CSV-JSON-Converter/index.html",
        category: "開発",
        tags: ["開発", "ツール", "Web", "API不要"]
    },
    {
        id: 82,
        title: "Markdownエディタ＆プレビュー",
        path: "82-Markdown-Editor-Preview/index.html",
        category: "開発",
        tags: ["開発", "文章作成", "Web", "API不要"]
    },
    {
        id: 83,
        title: "テキスト差分比較ツール",
        path: "83-Text-Diff-Tool/index.html",
        category: "開発",
        tags: ["開発", "ツール", "Web", "API不要"]
    },
    {
        id: 84,
        title: "Lorem Ipsum（ダミーテキスト）生成",
        path: "84-Lorem-Ipsum-Generator/index.html",
        category: "開発",
        tags: ["開発", "デザイン", "ツール", "Web", "API不要"]
    },
    {
        id: 85,
        title: "大文字/小文字変換ツール",
        path: "85-Case-Converter/index.html",
        category: "文章処理",
        tags: ["文章処理", "ツール", "Web", "API不要"]
    },
    {
        id: 86,
        title: "テキスト並び替えツール",
        path: "86-Text-Sorter/index.html",
        category: "文章処理",
        tags: ["文章処理", "ツール", "Web", "API不要"]
    },
    {
        id: 87,
        title: "重複行削除ツール",
        path: "87-Duplicate-Line-Remover/index.html",
        category: "文章処理",
        tags: ["文章処理", "ツール", "Web", "API不要"]
    },
    {
        id: 88,
        title: "Base64エンコーダー/デコーダー",
        path: "88-Base64-Converter/index.html",
        category: "開発",
        tags: ["開発", "ツール", "Web", "API不要"]
    },
    {
        id: 89,
        title: "URLエンコーダー/デコーダー",
        path: "89-URL-Encoder-Decoder/index.html",
        category: "開発",
        tags: ["開発", "ツール", "Web", "API不要"]
    },
    {
        id: 90,
        title: "テキストから単語リスト抽出",
        path: "90-Word-List-Extractor/index.html",
        category: "文章処理",
        tags: ["文章処理", "ツール", "Web", "API不要"]
    },
    {
        id: 91,
        title: "今日のラッキーカラー表示",
        path: "91-Lucky-Color-Display/index.html",
        category: "エンタメ",
        tags: ["エンタメ", "Web", "API不要"]
    },
    {
        id: 92,
        title: "ランダム名言ジェネレーター",
        path: "92-Random-Quote-Generator/index.html",
        category: "エンタメ",
        tags: ["エンタメ", "クリエイティブ", "Web", "API不要"]
    },
    {
        id: 93,
        title: "簡易お絵かきツール",
        path: "93-Simple-Drawing-Tool/index.html",
        category: "クリエイティブ",
        tags: ["クリエイティブ", "ツール", "Web", "API不要"]
    },
    {
        id: 94,
        title: "ライフカウンター（ゲーム用）",
        path: "94-Life-Counter/index.html",
        category: "ゲーム",
        tags: ["ゲーム", "ツール", "Web", "API不要"]
    },
    {
        id: 95,
        title: "サイコロ・ローラー",
        path: "95-Dice-Roller/index.html",
        category: "ゲーム",
        tags: ["ゲーム", "エンタメ", "Web", "API不要"]
    },
    {
        id: 96,
        title: "コイントス・シミュレーター",
        path: "96-Coin-Flipper/index.html",
        category: "ゲーム",
        tags: ["ゲーム", "エンタメ", "Web", "API不要"]
    },
    {
        id: 97,
        title: "記念日までのカウントダウン",
        path: "97-Countdown-Timer/index.html",
        category: "時間管理",
        tags: ["時間管理", "ライフログ", "Web", "API不要"]
    },
    {
        id: 98,
        title: "簡易的な性格診断",
        path: "98-Simple-Personality-Quiz/index.html",
        category: "エンタメ",
        tags: ["エンタメ", "Web", "API不要"]
    },
    {
        id: 99,
        title: "ランダム単語連想ゲーム",
        path: "99-Random-Word-Association/index.html",
        category: "エンタメ",
        tags: ["エンタメ", "クリエイティブ", "Web", "API不要"]
    },
    {
        id: 100,
        title: "打ち間違い風テキストジェネレーター",
        path: "100-Typo-Text-Generator/index.html",
        category: "エンタメ",
        tags: ["エンタメ", "文章処理", "Web", "API不要"]
    }
];