export const formatTime = (dateInt) => {
  // format Timestamp (HH:MM)
  let msgTime = new Date(dateInt);
  var timeOptions = { hour: "numeric", minute: "numeric" };
  msgTime = msgTime.toLocaleTimeString("en-US", timeOptions);
  return msgTime;
};

export const formatDate = (dateInt) => {
  // format Date (MM DD, YYYY)
  let convoDate = new Date(dateInt);
  var dateOptions = { year: "numeric", month: "long", day: "numeric" };
  convoDate = convoDate.toLocaleDateString("en-US", dateOptions);
  return convoDate;
};
