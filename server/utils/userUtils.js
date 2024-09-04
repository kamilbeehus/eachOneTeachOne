export const formatUserResponse = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  bio: user.bio,
  profilePicture: user.profilePicture,
  credits: user.credits,
  createdAt: user.createdAt,
});

export const formatUserByIdResponse = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  credits: user.credits,
  profilePicture: user.profilePicture,
  bio: user.bio,
});
