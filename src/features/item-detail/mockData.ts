import personalImage from '@/assets/img/mock/item-detail/personal-book.png';
import equipmentImage from '@/assets/img/mock/item-detail/equipment-book.png';

import type { ItemComment, ItemOwnership } from './types';

export const currentUser = { name: 'o_ER4', displayName: 'o_ER4' };

const now = Date.now();
const minutesAgo = (minutes: number) =>
  new Date(now - minutes * 60_000).toISOString();

function mockComments(recent: string[]): ItemComment[] {
  return [
    {
      id: 1,
      name: 's9',
      displayName: 'すきゅう',
      createdAt: minutesAgo(10),
      body: recent[0] ?? '',
    },
    {
      id: 2,
      name: 'quarantineeeeeeeeee',
      displayName: 'くあらんてぃん',
      createdAt: minutesAgo(45),
      body: recent[1] ?? '',
    },
    {
      id: 3,
      name: 'quarantineeeeeeeeee',
      displayName: 'くあらんてぃん',
      createdAt: minutesAgo(24 * 60),
      body: '昨日読み終わりました。おすすめです！',
    },
    {
      id: 4,
      name: 's9',
      displayName: 'すきゅう',
      createdAt: minutesAgo(3 * 24 * 60),
      body: '前から気になっていたので借りてみました。',
    },
  ];
}

// 画面確認用のデータ。API 接続時に物品・所有者・コメントの取得結果へ置き換える。
export const itemDetails = {
  personal: {
    id: 'personal',
    likeCount: 998,
    stock: { available: 0, unavailable: 0 },
    title: 'まちカドまぞく 1巻',
    description:
      '15歳のある朝、封印されし魔族の力に目覚めた吉田優子の任務は、ご町内に住む「魔法少女」を倒すこと!? ツノと尻尾は生えたけど、力は普通の女の子以下な優子が「月4万円生活の呪い」解除めざして奮闘する、逆転マジカルヒロイン4コマ!',
    image: personalImage,
    tags: ['本', '漫画', '百合', 'かわいい'],
    comments: mockComments(['とても面白かったです', '良質な百合でした']),
    liked: true,
  },
  equipment: {
    id: 'equipment',
    likeCount: 998,
    stock: { available: 1, unavailable: 2 },
    title:
      '達人が教えるWebパフォーマンスチューニング　〜ISUCONから学ぶ高速化の実践',
    description:
      'LINE株式会社が主催するWebサービスのパフォーマンスチューニングコンテスト、ISUCON（Iikanjini Speed Up Contest）で技術を競い合ってきた著者がWebサービス高速化のための考え方とノウハウをわかりやすく解説。本書では、お題となるWebサービスをひとつ用意して、手を動かしながら高速化手法を学んでいきます。Webサービスがどのくらいの負荷に耐えられるか、どのくらいの負荷で不具合が起こるかを検証し、不具合が起こる原因を突き止め、改善していきます。また、負荷に対応する方法だけでなく、負荷を発生させる方法（ベンチマーカーの作成方法）も紹介します。本書を読んで、Webサービス高速化について理解を深め、性能を向上させましょう。',
    image: equipmentImage,
    tags: ['本', '技術書', 'ISUCON'],
    comments: mockComments(['ためになりました', '読みました']),
    liked: false,
  },
};

export const owners: ItemOwnership[] = [
  { ownershipId: 1, name: 's9', status: 'available' },
  { ownershipId: 2, name: 'quarantineeeeeeeeee', status: 'available' },
  {
    ownershipId: 3,
    name: 's9',
    status: 'available',
    comment: 'ひとことコメント',
  },
  { ownershipId: 4, name: 's9', status: 'borrowed', returnDate: '12/31' },
  { ownershipId: 5, name: 's9', status: 'unavailable' },
  ...Array.from({ length: 10 }, (_, index) => ({
    ownershipId: index + 6,
    name: 's9',
    status: 'available' as const,
  })),
] as const;
