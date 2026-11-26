export type PublicProfileSource = {
  displayName: string;
  photoUrl: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
};

export type PublicClientProfile = {
  displayName: string;
  photoUrl: string | null;
  bio: string | null;
};

export type PublicProviderProfile = PublicClientProfile & {
  city: string | null;
  region: string | null;
};

export function toPublicClientProfile(profile: PublicProfileSource): PublicClientProfile {
  return {
    displayName: profile.displayName,
    photoUrl: profile.photoUrl,
    bio: profile.bio,
  };
}

export function toPublicProviderProfile(profile: PublicProfileSource): PublicProviderProfile {
  return {
    ...toPublicClientProfile(profile),
    city: profile.city,
    region: profile.region,
  };
}
