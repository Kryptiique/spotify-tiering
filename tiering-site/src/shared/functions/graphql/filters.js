

/* Filter for getting circles that are visible to general public */
export const findCirclesFilter = {
  filter: {
    public: true
  },
  orderBy: 'name_ASC'
}

/**
 * Filter for finding songs tied to 
 * @param {string} userId 
 * @param {string} cirlcId 
 */
export const findUserSongs = (userId, circleId) => ({
  filter: {
    circle: {
      id: circleId
    },
    adder: {
      id: userId
    } 
  }
})