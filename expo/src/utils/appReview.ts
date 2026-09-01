import * as StoreReview from 'expo-store-review';
import storage from '~/utils/storage';

export const REVIEW_REQUESTED_KEY = 'app-review-requested';

// The OS decides whether the prompt actually shows and throttles it, so asking
// more than once per install is pointless: the flag is set as soon as we ask.
export const requestAppReviewOnce = async () => {
  if (storage.getString(REVIEW_REQUESTED_KEY)) return;
  try {
    if (!(await StoreReview.hasAction())) return;
    storage.set(REVIEW_REQUESTED_KEY, '1');
    await StoreReview.requestReview();
  } catch {
    // never block the UI on a review prompt
  }
};
