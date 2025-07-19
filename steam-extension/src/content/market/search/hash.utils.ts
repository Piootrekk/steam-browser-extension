const replacePageInHash = (hash: string | null, newPage: number): string => {
  if (!hash) return `#p${newPage}_popular_desc`;
  return hash.replace(/(#p)\d+(_)/, `$1${newPage}$2`);
};

const parseNumberFromHash = (hash: string | null) => {
  if (!hash) return null;
  const match = hash.match(/#p(\d+)_/);
  return match ? Number(match[1]) : null;
};

const onChangeHash = (page: number) => {
  const currentHash = location.hash ? location.hash : null;
  const currentPage = parseNumberFromHash(location.hash);
  if (!currentPage || currentPage === page) return;
  const newHashPage = replacePageInHash(currentHash, page);
  location.hash = newHashPage;
};

export { replacePageInHash, parseNumberFromHash, onChangeHash };
