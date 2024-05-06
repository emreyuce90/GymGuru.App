/**
 * Sayfalanmış veriler için bir liste ve toplam kayıt sayısı belirtir.
 * @typeparam T
 */
export interface IQueryResult<T = any> {
  /** Veri listesi */
  Items: T[] | any[];
  /** Verinin toplam filtrelenmiş kayıt sayısı.  */
  TotalItems: number;
}
