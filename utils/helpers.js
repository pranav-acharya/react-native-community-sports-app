export const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export const phoneNumberRegex = /[2-9]{2}\d{8}/;

export const getAvatarText = (text) => {
  const splits = text.split(' ');
  let avatarText = splits[0][0];
  if (splits.length > 1) { avatarText += splits[1][0]; } else { avatarText += splits[0][1]; }

  return avatarText.toUpperCase();
};

export const formatDate = (date) => {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];
  const d = new Date(date);
  const day = d.getDate();
  const monthIndex = d.getMonth();
  // const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]}`;
};
