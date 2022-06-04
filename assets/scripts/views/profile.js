function renderProfile() {
  return `
    <h1>Closed</h1>
  `
}


const ProfilePage = {
  toString() {
    return renderProfile();
  },
  addListeners() {
    
  },
};

export {
  ProfilePage
};
