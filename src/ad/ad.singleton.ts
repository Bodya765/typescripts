
export class AdSingleton {
  private static instance: AdSingleton;
  private ads: any[] = [];  

  private constructor() {

  }

  public static getInstance(): AdSingleton {
    if (!AdSingleton.instance) {
      AdSingleton.instance = new AdSingleton();
    }
    return AdSingleton.instance;
  }

  getAds() {
    return this.ads;
  }

  addAd(ad: any) {
    this.ads.push(ad);
  }

  updateAd(id: number, updatedAd: any) {
    const index = this.ads.findIndex((ad) => ad.id === id);
    if (index !== -1) {
      this.ads[index] = updatedAd;
    }
  }

  deleteAd(id: number) {
    this.ads = this.ads.filter((ad) => ad.id !== id);
  }
}
