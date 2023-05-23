export const getUserDocumentPath = (steamId: string) => `nuclear-users/${steamId}`;
export const getRunsCollectionPathForUser = (steamId: string) => `${getUserDocumentPath(steamId)}/runs`;
export const getRunPathFromUser = (steamId: string, runId: string) => `${getRunsCollectionPathForUser(steamId)}/${runId}`;
export const getPartnerCollectionPath = 'partners'