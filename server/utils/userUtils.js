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
