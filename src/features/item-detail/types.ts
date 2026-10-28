export type ItemKind = 'personal' | 'equipment';

export interface ItemComment {
  id: number;
  name: string;
  displayName: string;
  createdAt: string;
  body: string;
}

export interface ItemOwnership {
  ownershipId: number;
  name: string;
  status: 'available' | 'borrowed' | 'unavailable';
  comment?: string;
  returnDate?: string;
}

export interface BorrowFormValues {
  purpose: string;
  returnDate: Date;
  method?: 'room' | 'manual';
}

export type BorrowRequest = BorrowFormValues &
  (
    | { kind: 'personal'; itemId: string; ownershipId: number }
    | { kind: 'equipment'; itemId: string }
  );
