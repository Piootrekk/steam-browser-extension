const getListingTab = () => {
  const listingsTab = document.querySelector<HTMLElement>(
    "#myListings #tabContentsMyListings"
  );
  return listingsTab;
};

export { getListingTab };
