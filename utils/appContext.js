export const setUserContext = (context) => {
  global.context = context;
  // console.log(context);
  // console.log(global.context);
};

export const getUserId = () => global.context.userId;
