export const getTimeToNow = (time: any) => {
  const now = new Date();
  const created = new Date(time);
  const diff = now.getTime() - created.getTime();
  const weeks = Math.floor(diff / (7 * 24 * 3600 * 1000));
  const days = Math.floor(diff / (24 * 3600 * 1000));
  const hours = Math.floor(diff / (3600 * 1000));
  const minutes = Math.floor(diff / (60 * 1000));
  const seconds = Math.floor(diff / 1000);

  if (weeks > 0) {
    return `${weeks}w`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};
