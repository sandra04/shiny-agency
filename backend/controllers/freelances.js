const freelancesData = require('../models/freelances')

function getFreelances() {
  return freelancesData.map(
    ({ id, name, job, picture, location, available }) => ({
      id,
      name,
      job,
      picture,
      location,
      available,
    }),
  )
}

module.exports = getFreelances
