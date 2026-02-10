import type { User } from "@prisma/client";

/**
 * Sanitizes a user object for client consumption.
 * Removes sensitive fields (password) and maps id to _id for frontend compatibility.
 */
export function sanitizeUser(user: User) {
  return {
    _id: user.id, // keep _id for frontend compatibility
    pseudo: user.pseudo,
    firstName: user.firstName,
    lastName: user.lastName,
    partyName: user.partyName,
    themes: user.themes,
    isCandidate: user.isCandidate,
    friends: [], // populated separately when needed
    isPublic: user.isCandidate || user.isPublic,
    picture: user.picture,
    color: user.color,
  };
}
