/**
 * Vehicle auction yards near Sacramento, for the Auto Auction Pickup & Delivery section.
 *
 * These are public addresses of auction locations, listed so buyers recognise where we can collect
 * from. They do not imply any partnership with or endorsement by the operators. Pickup always
 * depends on the auction's release rules, the buyer's authorization and the lot's status.
 *
 * `verified` says how each address was checked (2026-10-23):
 *  - 'operator-page': read on the operator's own location page;
 *  - 'operator-snippet': from the operator's own site, via search results (page itself not loaded);
 *  - 'unverified': supplied in the brief, not yet confirmed on an operator domain.
 * `ownerReview`: whether Serhii has confirmed he collects from that yard. Remove a yard by deleting
 * its line; the page groups whatever remains.
 */
export type AuctionArea = 'sacramento' | 'corridor' | 'bay';
export type AuctionOperator = 'Copart' | 'IAA' | 'ADESA' | 'Manheim';

export interface AuctionYard {
  operator: AuctionOperator;
  /** Display name, as the operator labels the yard. */
  name: string;
  street: string;
  city: string;
  zip: string;
  area: AuctionArea;
  source: string;
  verified: 'operator-page' | 'operator-snippet' | 'unverified';
  ownerReview: 'pending' | 'confirmed';
}

export const AUCTION_AREAS: readonly AuctionArea[] = ['sacramento', 'corridor', 'bay'];

export const AUCTION_YARDS: readonly AuctionYard[] = [
  // Greater Sacramento
  { operator: 'Copart', name: 'Copart Sacramento', street: '8600 Morrison Creek Dr', city: 'Sacramento', zip: '95828', area: 'sacramento', source: 'https://www.copart.com/locations/sacramento-ca-2', verified: 'operator-snippet', ownerReview: 'pending' },
  { operator: 'Copart', name: 'Copart South Sacramento', street: '8687 Weyand Ave', city: 'Sacramento', zip: '95828', area: 'sacramento', source: 'https://www.copart.com/locations/so-sacramento-ca-16', verified: 'operator-snippet', ownerReview: 'pending' },
  { operator: 'Copart', name: 'Copart Antelope', street: '8650 Antelope North Rd', city: 'Antelope', zip: '95843', area: 'sacramento', source: 'https://www.copart.com/locations/antelope-ca-151', verified: 'unverified', ownerReview: 'pending' },
  { operator: 'IAA', name: 'IAA Sacramento', street: '11499 Douglas Rd', city: 'Rancho Cordova', zip: '95742', area: 'sacramento', source: 'https://www.iaai.com/locations/331', verified: 'operator-page', ownerReview: 'pending' },
  { operator: 'ADESA', name: 'ADESA Sacramento', street: '8649 Kiefer Blvd', city: 'Sacramento', zip: '95826', area: 'sacramento', source: 'https://www.adesa.com/auction_location/adesa-sacramento/', verified: 'operator-page', ownerReview: 'pending' },
  { operator: 'ADESA', name: 'ADESA Brasher’s', street: '6233 Blacktop Rd', city: 'Rio Linda', zip: '95673', area: 'sacramento', source: 'https://www.adesa.com/auction_location/adesa-brashers/', verified: 'operator-page', ownerReview: 'pending' },
  // Northern California corridor (I-80 / I-5)
  { operator: 'IAA', name: 'IAA Sacramento West', street: '6734 Midway Rd', city: 'Dixon', zip: '95620', area: 'corridor', source: 'https://www.iaai.com/US/Locations/120', verified: 'operator-page', ownerReview: 'pending' },
  { operator: 'IAA', name: 'IAA Stockton', street: '3235 Newton Rd', city: 'Stockton', zip: '95205', area: 'corridor', source: 'https://www.iaai.com/Locations/138', verified: 'operator-page', ownerReview: 'pending' },
  { operator: 'ADESA', name: 'ADESA Golden Gate', street: '18501 W Stanford Rd', city: 'Tracy', zip: '95377', area: 'corridor', source: 'https://www.adesa.com/auction_location/adesa-golden-gate/', verified: 'operator-page', ownerReview: 'pending' },
  // San Francisco Bay Area (scheduled routes)
  { operator: 'Copart', name: 'Copart Vallejo', street: '282 Fifth St', city: 'Vallejo', zip: '94590', area: 'bay', source: 'https://www.copartdirect.com/locations/california', verified: 'operator-snippet', ownerReview: 'pending' },
  { operator: 'Copart', name: 'Copart Martinez', street: '2701 Waterfront Rd', city: 'Martinez', zip: '94553', area: 'bay', source: 'https://www.copartdirect.com/locations/california', verified: 'operator-snippet', ownerReview: 'pending' },
  { operator: 'IAA', name: 'IAA East Bay', street: '2780 Willow Pass Rd', city: 'Bay Point', zip: '94565', area: 'bay', source: 'https://www.iaai.com/Locations/332', verified: 'operator-page', ownerReview: 'pending' },
  { operator: 'Copart', name: 'Copart Hayward', street: '1964 Sabre St', city: 'Hayward', zip: '94545', area: 'bay', source: 'https://www.copartdirect.com/locations/california/hayward', verified: 'operator-snippet', ownerReview: 'pending' },
  { operator: 'Manheim', name: 'Manheim San Francisco Bay', street: '29900 Auction Way', city: 'Hayward', zip: '94544', area: 'bay', source: 'https://site.manheim.com/en/states/california', verified: 'operator-page', ownerReview: 'pending' },
  { operator: 'IAA', name: 'IAA Fremont', street: '6700 Stevenson Blvd', city: 'Fremont', zip: '94538', area: 'bay', source: 'https://www.iaai.com/Locations/334', verified: 'operator-snippet', ownerReview: 'pending' },
];

export const yardsIn = (area: AuctionArea): readonly AuctionYard[] => AUCTION_YARDS.filter((y) => y.area === area);
