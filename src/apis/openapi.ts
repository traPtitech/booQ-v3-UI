/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

/** OneOf type helpers */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
type OneOf<T extends any[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
    ? OneOf<[XOR<A, B>, ...Rest]>
    : never;

export interface paths {
  '/items': {
    /** 物品の一覧を取得します。 */
    get: operations['getItems'];
    /** 物品を新しく登録します。 */
    post: operations['postItem'];
  };
  '/items/{itemId}': {
    /** 物品の詳細情報を取得します。 */
    get: operations['getItem'];
    /** 物品を削除します。 */
    delete: operations['deleteItem'];
    /** 物品の情報を変更します。 */
    patch: operations['editItem'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
  };
  '/items/{itemId}/comments': {
    /** コメントを新規作成します。 */
    post: operations['postComment'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
  };
  '/items/{itemId}/owners': {
    /**
     * 物品の所有者を追加します。
     * @description 他者の所有権を操作する場合は権限が必要です。
     */
    post: operations['postItemOwners'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
  };
  '/items/{itemId}/owners/{ownershipId}': {
    /**
     * 物品の所有者を削除します
     * @description 他者の所有権を操作する場合は権限が必要です。
     */
    delete: operations['deleteItemOwners'];
    /**
     * 物品の所有者を編集します。(所有者と管理者のみ)
     * @description 他者の所有権を操作する場合は権限が必要です。
     */
    patch: operations['editItemOwners'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
      };
    };
  };
  '/items/{itemId}/borrowing/equipment': {
    /** 備品を借ります。 */
    post: operations['postBorrowEquipment'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
  };
  '/items/{itemId}/borrowing/equipment/return': {
    /** 備品を返します。 */
    post: operations['postBorrowEquipmentReturn'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
  };
  '/items/{itemId}/owners/{ownershipId}/borrowings': {
    /** 個人所有物を「借りたい」と意見表明します。 */
    post: operations['postBorrow'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
      };
    };
  };
  '/items/{itemId}/owners/{ownershipId}/borrowings/{borrowingId}': {
    /** 個人所有物を借りたいという要望を取得します。 (○○日に借りたい、○○日に返す予定、など) */
    get: operations['getBorrowingById'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
        borrowingId: components['parameters']['borrowingIdInPath'];
      };
    };
  };
  '/items/{itemId}/owners/{ownershipId}/borrowings/{borrowingId}/reply': {
    /** 個人所有物を○○日まで借りたいという要望に対して返答します。 */
    post: operations['postBorrowReply'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
        borrowingId: components['parameters']['borrowingIdInPath'];
      };
    };
  };
  '/items/{itemId}/owners/{ownershipId}/borrowings/{borrowingId}/return': {
    /** 個人所有物を返します。 */
    post: operations['postReturn'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
        borrowingId: components['parameters']['borrowingIdInPath'];
      };
    };
  };
  '/items/{itemId}/likes': {
    /**
     * 物品にいいねをつけます。
     * @description すでにいいねしている状態の場合、エラー(400)を返します。
     */
    post: operations['addLike'];
    /**
     * 物品のいいねを取り消します。
     * @description すでに所有済み状態の場合、エラー(400)を返します。
     */
    delete: operations['removeLike'];
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
  };
  '/files': {
    /** 画像ファイルをアップロードします。 */
    post: operations['postFile'];
  };
  '/files/{fileId}': {
    /** 画像ファイルをダウンロードします。 */
    get: operations['getFile'];
    parameters: {
      path: {
        fileId: components['parameters']['fileIdInPath'];
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * isBook
     * @description アイテム種別
     * 0: 本でない
     * 1: 本
     * @enum {integer}
     */
    isBook: 0 | 1;
    /**
     * isEquipment
     * @description アイテム種別
     * 0: 個人所有
     * 1: 備品
     * @enum {integer}
     */
    isEquipment: 0 | 1;
    itemPosted: {
      /** @example 1 */
      id: number;
      /** @example 小説 天気の子 */
      name: string;
      /** @example 0 */
      isTrapItem: components['schemas']['isEquipment'];
      /** @example 1 */
      isBook: components['schemas']['isBook'];
      /** @example 100 */
      count?: number;
      /** @example 9784041026403 */
      code?: string;
      tags?: string[];
      /** @example 高校1年の夏、帆高（ほだか）は離島から家出し、東京にやってきた。連日降り続ける雨の中、雑踏ひしめく都会の片隅で、帆高は不思議な能力を持つ少女・陽菜（ひな）に出会う。「ねぇ、今から晴れるよ」。それは祈るだけで、空を晴れに出来る力だった――。天候の調和が狂っていく時代に、運命に翻弄される少年と少女が自らの生き方を「選択」する物語。長編アニメーション映画『天気の子』の、新海誠監督自身が執筆した原作小説。 */
      description: string;
      /**
       * @default
       * @example https://cover.openbd.jp/9784041026403.jpg
       */
      imgUrl: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      updatedAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      deletedAt: string | null;
    };
    item: components['schemas']['itemPosted'] &
      ({
        tags: readonly components['schemas']['tag'][];
        comments: readonly components['schemas']['comment'][];
      } & OneOf<
        [
          {
            count: number;
            countMax: number;
          },
          {
            ownerships: components['schemas']['ownership'][];
          },
        ]
      >);
    itemSummary: components['schemas']['item'] & {
      /** @example 1 */
      likeCounts: number;
      /** @example true */
      isLiked: boolean;
    };
    itemDetail: components['schemas']['item'] &
      ({
        likesByUsers?: readonly string[];
      } & OneOf<
        [
          {
            transactionsEquipment: components['schemas']['transactionEquipment'][];
          },
          {
            transactions: components['schemas']['transaction'][];
          },
        ]
      >);
    comment: {
      /** @example 1 */
      id: number;
      /** @example 1 */
      itemId: number;
      item: components['schemas']['itemSummary'];
      /** @example s9 */
      userId: string;
      /** @example 小説版は夏美の心理描写がよく描かれていて、映画版を補完するものになっている。あとがきと解説だけでも読む価値はあると思います。 */
      text: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      updatedAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      deletedAt: string | null;
    };
    postComment: {
      /** @example 小説版は夏美の心理描写がよく描かれていて、映画版を補完するものになっている。あとがきと解説だけでも読む価値はあると思います。 */
      text: string;
    };
    transaction: {
      /** @example 1 */
      id: number;
      /** @example 1 */
      ownershipId: number;
      /** @example s9 */
      userId: string;
      /**
       * @description 0=リクエスト済み、1=貸し出し中、2=返却済み、3=貸し出し拒否
       * @example 1
       */
      status: number;
      /** @example 読みたかったから。 */
      purpose?: string;
      /** @example 2/17に部室でお貸しします */
      message: string;
      /** @example ずっと読みたかったんですよね。ありがとう！ */
      returnMessage: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      due_date: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      checkout_date: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      return_date: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      updatedAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      deletedAt: string | null;
    };
    transactionEquipment: {
      /** @example 1 */
      id: number;
      /** @example 1 */
      itemId?: number;
      /** @example s9 */
      userId: string;
      /**
       * @description 0=リクエスト済み、1=貸し出し中、2=返却済み、3=貸し出し拒否
       * @example 1
       */
      status: number;
      /** @example 読みたかったから。 */
      purpose?: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      due_date: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      return_date: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      updatedAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      deletedAt: string | null;
    };
    borrowRequest: {
      /** @example 読みたかったから。 */
      propose?: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      dueDate: string;
      /** @example true */
      borrowInClubRoom: boolean;
    };
    borrowRequestEquipment: {
      /** @example 読みたかったから。 */
      propose?: string;
      /** @example 1 */
      count?: number;
      /**
       * Format: date
       * @example 2024-02-16
       */
      dueDate: string;
      /** @example true */
      borrowInClubRoom: boolean;
    };
    borrowing: {
      /** @example 1 */
      id: number;
      /** @example 読みたかったから。 */
      propose?: string;
      /**
       * Format: date
       * @example 2024-02-16
       */
      dueDate: string;
      /** @example true */
      borrowInClubRoom: boolean;
    };
    borrowReply: {
      /** @example true */
      answer: boolean;
      /** @example 2/20に部室に置きます */
      comment: string;
    };
    borrowReturn: {
      /** @example ありがとうございました。面白かったです */
      text: string;
    };
    ownership: {
      /** @example 1 */
      id: number;
      /** @example 1 */
      itemId: number;
      /** @example s9 */
      userId: string;
      /** @example true */
      rentalable: boolean;
      /** @example おもしろいのでぜひ読んでください */
      memo: string;
    };
    postOwnership: {
      /** @example s9 */
      userId: string;
      /** @example true */
      rentalable: boolean;
      /** @example 読んでください */
      memo: string;
    };
    tag: {
      /** @example 小説 */
      name: string;
    };
    owner: {
      /** @example 1 */
      id: number;
      /** @example 1 */
      ownerId: number;
      /** @example s9 */
      userId: string;
      /** @example true */
      rentalable: boolean;
      /** @example 1 */
      count: number;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      updatedAt: string;
      /**
       * Format: date-time
       * @example 2019-07-28T22:00:00Z
       */
      deletedAt: string;
    };
    file: {
      /**
       * @description ファイルID
       * @example 1
       */
      id: number;
      /**
       * @description ファイルURL
       * @example /api/files/1
       */
      url: string;
    };
  };
  responses: never;
  parameters: {
    /** @description アイテムID */
    itemIdInPath: number;
    /** @description 所有権ID */
    ownershipIdInPath: number;
    /** @description 所有権ID */
    borrowingIdInPath: number;
    /** @description ファイルID */
    fileIdInPath: number;
    /** @description tagID */
    tagIdInPath: number;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /** 物品の一覧を取得します。 */
  getItems: {
    parameters: {
      query?: {
        /** @description 指定したユーザーの所有する物品一覧を取得します。 */
        userId?: string;
        /** @description 名称が部分一致する物品一覧を取得します。 */
        search?: string;
        /** @description 指定したユーザーの借りている物品一覧を取得します。 */
        rental?: string;
        /** @description 取得したい件数を指定します。リクエストした件数が全部の件数より多い場合は全部の一覧になります。 */
        limit?: number;
        /** @description 取得したいデータの開始場所を指定します。リクエストした件数が全部の件数より多い場合は空の配列が返ってきます。 */
        offset?: number;
        /** @description リクエストしたタグのついている物品一覧を取得します。 */
        tag?: string[];
        /** @description リクエストしたタグのついている物品一覧を除外します */
        'tag-exclude'?: string[];
        /** @description 何の要素でソートするか */
        sortby?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['itemSummary'][];
        };
      };
      /** @description リクエストが不正です */
      400: {
        content: never;
      };
    };
  };
  /** 物品を新しく登録します。 */
  postItem: {
    requestBody: {
      content: {
        'application/json': components['schemas']['itemPosted'][];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          'application/json': components['schemas']['itemPosted'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description 権限がありません */
      403: {
        content: never;
      };
    };
  };
  /** 物品の詳細情報を取得します。 */
  getItem: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['itemDetail'];
        };
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 物品を削除します。 */
  deleteItem: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 物品の情報を変更します。 */
  editItem: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['itemPosted'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['item'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** コメントを新規作成します。 */
  postComment: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['postComment'];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          'application/json': components['schemas']['comment'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /**
   * 物品の所有者を追加します。
   * @description 他者の所有権を操作する場合は権限が必要です。
   */
  postItemOwners: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['postOwnership'];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          'application/json': components['schemas']['ownership'];
        };
      };
      /** @description 権限がありません。 */
      403: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /**
   * 物品の所有者を削除します
   * @description 他者の所有権を操作する場合は権限が必要です。
   */
  deleteItemOwners: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
      /** @description 権限がありません。 */
      403: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /**
   * 物品の所有者を編集します。(所有者と管理者のみ)
   * @description 他者の所有権を操作する場合は権限が必要です。
   */
  editItemOwners: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['postOwnership'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['ownership'];
        };
      };
      /** @description 権限がありません。 */
      403: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 備品を借ります。 */
  postBorrowEquipment: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['borrowRequestEquipment'];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          'application/json': components['schemas']['borrowRequestEquipment'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 備品を返します。 */
  postBorrowEquipmentReturn: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['borrowReturn'];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          'application/json': components['schemas']['borrowReturn'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 個人所有物を「借りたい」と意見表明します。 */
  postBorrow: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['borrowRequest'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['borrowRequest'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 個人所有物を借りたいという要望を取得します。 (○○日に借りたい、○○日に返す予定、など) */
  getBorrowingById: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
        borrowingId: components['parameters']['borrowingIdInPath'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['borrowing'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 個人所有物を○○日まで借りたいという要望に対して返答します。 */
  postBorrowReply: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
        borrowingId: components['parameters']['borrowingIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['borrowReply'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['borrowReply'];
        };
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 個人所有物を返します。 */
  postReturn: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
        ownershipId: components['parameters']['ownershipIdInPath'];
        borrowingId: components['parameters']['borrowingIdInPath'];
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['borrowReturn'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
      /** @description リクエストボディが不正です。 */
      400: {
        content: never;
      };
      /** @description アイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /**
   * 物品にいいねをつけます。
   * @description すでにいいねしている状態の場合、エラー(400)を返します。
   */
  addLike: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    responses: {
      /** @description 正常にいいねしました */
      201: {
        content: never;
      };
      /** @description 不正なリクエストです */
      400: {
        content: never;
      };
      /** @description 指定されたアイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /**
   * 物品のいいねを取り消します。
   * @description すでに所有済み状態の場合、エラー(400)を返します。
   */
  removeLike: {
    parameters: {
      path: {
        itemId: components['parameters']['itemIdInPath'];
      };
    };
    responses: {
      /** @description 正常に削除しました */
      200: {
        content: never;
      };
      /** @description 不正なリクエストです */
      400: {
        content: never;
      };
      /** @description 指定されたアイテムが存在しません */
      404: {
        content: never;
      };
    };
  };
  /** 画像ファイルをアップロードします。 */
  postFile: {
    requestBody: {
      content: {
        'multipart/form-data': {
          /**
           * Format: binary
           * @description 3MBまでのJPG, PNGファイル
           */
          file?: string;
        };
      };
    };
    responses: {
      /** @description OK */
      201: {
        content: {
          'application/json': components['schemas']['file'];
        };
      };
      /** @description 不正なリクエストです。 */
      400: {
        content: never;
      };
    };
  };
  /** 画像ファイルをダウンロードします。 */
  getFile: {
    parameters: {
      path: {
        fileId: components['parameters']['fileIdInPath'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'image/jpeg': string;
        };
      };
      /** @description ファイルが存在しません。 */
      404: {
        content: never;
      };
    };
  };
}
