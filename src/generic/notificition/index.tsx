import { notification } from "antd";

const notificationApi = () => {
  const notify = ({ type }) => {
    switch (type) {
      case "buyCourses":
        return notification.error({
          message: "You have already purchased this course!",
        });
      case "success":
        return notification.success({
          message: "Course purchased successfully!",
        });

      case "token":
        return notification.error({
          message: "Ro'yhatdan o'ting",
        });
      case "loginSuccses":
        return notification.success({
          message: "Tizimga kirdingiz",
        });
      default:
        return notification.info({
          message: "Noma’lum holat yuz berdi!",
        });
    }
  };
  return notify;
};

export default notificationApi;
