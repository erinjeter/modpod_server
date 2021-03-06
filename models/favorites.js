module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("favorites", {
    podcastid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner: {
      type: DataTypes.INTEGER,
    },
  });
  return Favorites;
};

// Original

// module.exports = (sequelize, DataTypes) => {
//   const Favorites = sequelize.define("favorites", {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     entry: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     owner: {
//       type: DataTypes.INTEGER,
//     },
//   });
//   return Favorites;
// };
