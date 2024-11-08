// Utility functions for formatting user related responses
export const formatUserResponse = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
});

export const formatUserByIdResponse = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  credits: user.credits,
  profilePicture: user.profilePicture,
  bio: user.bio,
});
