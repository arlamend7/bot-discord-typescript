export const getComands = (message) => message.content.split(' ').map((x) => x.toLowerCase());
